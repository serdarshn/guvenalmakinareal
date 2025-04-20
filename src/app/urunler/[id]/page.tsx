import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { join } from 'path';
import fs from 'fs/promises';
import ProductDetailContent from './ProductDetailContent';
import { Product } from '@/data/products';

const PRODUCTS_FILE = join(process.cwd(), 'src/data/products.json');

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

// Ürünü ID'ye göre getir
async function getProductById(id: string): Promise<Product | null> {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
    const products: Product[] = JSON.parse(data);
    const product = products.find(p => p.id === id);
    
    // Debug için ürün bilgilerini kontrol et
    console.log('Loading product with ID:', id);
    if (product) {
      console.log('Product found:', {
        id: product.id,
        name: product.name,
        hasTranslations: Boolean(product.translations),
        hasEnglishTranslation: Boolean(product.translations?.en)
      });
    } else {
      console.log('Product not found');
    }
    
    return product || null;
  } catch (error) {
    console.error('Ürün yüklenirken hata:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProductById(params.id);
  
  if (!product) {
    return {
      title: 'Ürün Bulunamadı | Güvenal Makina',
      description: 'Aradığınız ürün bulunamadı veya kaldırılmış olabilir.',
    };
  }

  return {
    title: `${product.name} | Güvenal Makina`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await loadProducts();
  return products.map((product: Product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params, searchParams }: { params: { id: string }, searchParams: { lang?: string } }) {
  const product = await getProductById(params.id);
  const lang = searchParams.lang === 'en' ? 'en' : 'tr';

  // Debug için dil ve ürün bilgilerini kontrol et
  console.log('URL params:', params);
  console.log('Search params:', searchParams);
  console.log('Selected language:', lang);
  console.log('Product ID:', params.id);
  console.log('Product found:', Boolean(product));
  if (product) {
    console.log('Product translations available:', Boolean(product.translations?.en));
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[104px]">
          <div className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h1 className="text-2xl font-bold text-text mb-4">
                {lang === 'en' ? 'Product Not Found' : 'Ürün Bulunamadı'}
              </h1>
              <p className="text-text-light mb-6">
                {lang === 'en' 
                  ? 'The product you are looking for does not exist or has been removed.' 
                  : 'Aradığınız ürün mevcut değil veya kaldırılmış.'}
              </p>
              <Link 
                href={`/urunler?lang=${lang}`}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {lang === 'en' ? 'Back to Products' : 'Ürünlere Dön'}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[104px]">
        <ProductDetailContent product={product} lang={lang} />
      </main>
      <Footer />
    </div>
  );
} 