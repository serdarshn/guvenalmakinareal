'use server';

import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/auth';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import { Product } from '@/data/products';
import * as fsSync from 'fs';
import path from 'path';

const PRODUCTS_FILE = join(process.cwd(), 'src/data/products.json');
const UPLOADS_DIR = join(process.cwd(), 'public/uploads');

// Ürünleri yükle
async function loadProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Ürünler yüklenirken hata:', error);
    return [];
  }
}

// Ürünleri kaydet
async function saveProducts(products: Product[]): Promise<void> {
  try {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Ürünler kaydedilirken hata:', error);
    throw new Error('Ürünler kaydedilemedi');
  }
}

const generateSlug = async (name: string) => {
  const baseSlug = name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]+/g, '');

  // Mevcut ürünleri yükle
  const products = await loadProducts();
  
  // Aynı base slug'a sahip ürünleri bul
  const similarSlugs = products
    .map(p => p.id)
    .filter(id => id.startsWith(baseSlug));

  // Eğer aynı isimde ürün yoksa base slug'ı kullan
  if (similarSlugs.length === 0) {
    return baseSlug;
  }

  // Mevcut numaraları bul
  const numbers = similarSlugs
    .map(slug => {
      const match = slug.match(new RegExp(`${baseSlug}(\\d+)$`));
      return match ? parseInt(match[1]) : 1;
    })
    .filter(n => !isNaN(n));

  // En yüksek numarayı bul ve bir artır
  const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 2;
  return `${baseSlug}${nextNumber}`;
};

// GET metodu - Ürünleri listele veya tek bir ürün getir
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const isValid = await verifyJwtToken(token);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Geçersiz token' }, { status: 401 });
    }

    const products = await loadProducts();
    
    // URL'den id parametresini al
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Eğer id parametresi varsa, o ürünü getir
    if (id) {
      const product = products.find(p => p.id === id);
      if (!product) {
        return NextResponse.json({ success: false, message: 'Ürün bulunamadı' }, { status: 404 });
      }
      return NextResponse.json({ success: true, product });
    }
    
    // id parametresi yoksa tüm ürünleri getir
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Ürünler getirilirken hata:', error);
    return NextResponse.json({ success: false, error: 'Sunucu hatası' }, { status: 500 });
  }
}

// POST metodu - Yeni ürün ekle
export async function POST(request: NextRequest) {
  try {
    console.log('Ürün ekleme isteği alındı');
    
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const isValid = await verifyJwtToken(token);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Geçersiz token' }, { status: 401 });
    }

    const formData = await request.formData();
    console.log('Form verisi alındı:', formData);

    const type = formData.get('type');
    const dataString = formData.get('data');

    if (!type || !dataString) {
      return NextResponse.json({ success: false, error: 'Eksik veri' }, { status: 400 });
    }

    const data = JSON.parse(dataString.toString());
    console.log('İşlenmiş veri:', data);

    // Gerekli alanları kontrol et
    if (!data.name || !data.description || !data.category) {
      return NextResponse.json({ 
        success: false, 
        error: 'Gerekli alanlar eksik: isim, açıklama ve kategori zorunludur' 
      }, { status: 400 });
    }

    const slug = data.name ? await generateSlug(data.name) : '';
    if (!data.name) {
      return NextResponse.json({ success: false, error: 'Ürün adı boş olamaz.' }, { status: 400 });
    }

    // Görsel işleme
    const images: string[] = [];
    let i = 0;
    while (formData.get(`image${i}`)) {
      const file = formData.get(`image${i}`) as File;
      if (file) {
        try {
          const fileName = `${uuidv4()}-${file.name}`;
          const buffer = Buffer.from(await file.arrayBuffer());
          await fs.mkdir(UPLOADS_DIR, { recursive: true });
          await fs.writeFile(join(UPLOADS_DIR, fileName), buffer);
          images.push(`/uploads/${fileName}`);
        } catch (error) {
          console.error(`Görsel ${i} kaydedilirken hata:`, error);
        }
      }
      i++;
    }

    // Yeni ürün oluştur
    const newProduct: Product = {
      id: slug,
      type: type as Product['type'],
      name: data.name.trim(),
      description: data.description.trim(),
      category: data.category.trim(),
      price: data.price || undefined,
      oldPrice: data.oldPrice || undefined,
      campaign: data.campaign || undefined,
      image: images[0] || '/images/placeholder-product.jpg',
      images: images,
      specs: data.specifications.filter((spec: { label: string; value: string }) => spec.label && spec.value),
      standardAccessories: data.standardAccessories || [],
      optionalAccessories: data.optionalAccessories || [],
      translations: {
        en: data.translations?.en ? {
          name: data.translations.en.name.trim(),
          description: data.translations.en.description.trim(),
          specs: data.translations.en.specifications.filter((spec: { label: string; value: string }) => spec.label && spec.value),
          standardAccessories: data.translations.en.standardAccessories || [],
          optionalAccessories: data.translations.en.optionalAccessories || []
        } : undefined
      }
    };

    console.log('Eklenen ürün kategorisi:', data.category.trim());
    console.log('Eklenen ürün tipi:', type);

    // Mevcut ürünleri yükle ve yeni ürünü ekle
    const products = await loadProducts();
    products.push(newProduct);
    await saveProducts(products);

    console.log('Yeni ürün eklendi:', newProduct);
    console.log('Toplam ürün sayısı:', products.length);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Ürün eklenirken hata:', error);
    return NextResponse.json({ success: false, error: 'Sunucu hatası' }, { status: 500 });
  }
}

// PUT metodu - Ürün güncelleme
export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const isValid = await verifyJwtToken(token);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Geçersiz token' }, { status: 401 });
    }

    const formData = await request.formData();
    const productId = formData.get('id') as string;
    const dataString = formData.get('data');
    
    if (!productId || !dataString) {
      return NextResponse.json({ success: false, message: 'Eksik veri' }, { status: 400 });
    }

    // Mevcut ürünleri yükle
    const products = await loadProducts();
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return NextResponse.json({ success: false, message: 'Ürün bulunamadı' }, { status: 404 });
    }

    // Form verilerini parse et
    const data = JSON.parse(dataString.toString());
    const existingImagesJson = formData.get('existingImages') as string;
    const existingImages = existingImagesJson ? JSON.parse(existingImagesJson) : [];
    
    console.log('Güncellenen ürün kategorisi:', data.category);
    console.log('Güncellenen ürün tipi:', data.type);
    
    // Yeni yüklenen resimleri işle
    const newImagePaths: string[] = [];
    let i = 0;
    while (formData.get(`image${i}`)) {
      const file = formData.get(`image${i}`) as File;
      if (file) {
        try {
          const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
          const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
          
          // Dizinin var olduğundan emin ol
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          if (!fsSync.existsSync(uploadDir)) {
            fsSync.mkdirSync(uploadDir, { recursive: true });
          }
          
          const buffer = Buffer.from(await file.arrayBuffer());
          fsSync.writeFileSync(filePath, buffer);
          newImagePaths.push(`/uploads/${fileName}`);
        } catch (error) {
          console.error(`Görsel ${i} kaydedilirken hata:`, error);
        }
      }
      i++;
    }
    
    // Ürünü güncelle
    const updatedProduct = {
      ...products[productIndex],
      name: data.name.trim(),
      description: data.description.trim(),
      category: data.category,
      price: data.price || undefined,
      images: [...existingImages, ...newImagePaths],
      oldPrice: data.oldPrice || undefined,
      campaign: data.campaign || undefined,
      image: existingImages[0] || newImagePaths[0] || products[productIndex].image,
      specs: data.specifications.filter((spec: { label: string; value: string }) => spec.label && spec.value),
      standardAccessories: data.standardAccessories || [],
      optionalAccessories: data.optionalAccessories || [],
      translations: {
        en: data.translations?.en ? {
          name: data.translations.en.name.trim(),
          description: data.translations.en.description.trim(),
          specs: data.translations.en.specifications.filter((spec: { label: string; value: string }) => spec.label && spec.value),
          standardAccessories: data.translations.en.standardAccessories || [],
          optionalAccessories: data.translations.en.optionalAccessories || []
        } : undefined
      }
    };
    
    console.log('Güncellenecek ürün:', updatedProduct);
    
    products[productIndex] = updatedProduct;
    
    // Güncellenmiş ürünleri kaydet
    await saveProducts(products);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Ürün başarıyla güncellendi',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Ürün güncelleme hatası:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Ürün güncellenirken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}

// DELETE metodu - Ürün sil
export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const isValid = await verifyJwtToken(token);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Geçersiz token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Ürün ID\'si gerekli' }, { status: 400 });
    }

    const products = await loadProducts();
    const productToDelete = products.find(p => p.id === id);

    if (!productToDelete) {
      return NextResponse.json({ success: false, error: 'Ürün bulunamadı' }, { status: 404 });
    }

    const updatedProducts = products.filter(p => p.id !== id);
    await saveProducts(updatedProducts);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ürün silinirken hata:', error);
    return NextResponse.json({ success: false, error: 'Sunucu hatası' }, { status: 500 });
  }
} 