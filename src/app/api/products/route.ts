import { NextResponse } from 'next/server';
import { join } from 'path';
import fs from 'fs/promises';
import { Product } from '@/data/products';

const PRODUCTS_FILE = join(process.cwd(), 'src/data/products.json');

// GET metodu - Tüm ürünleri getir
export async function GET() {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
    const products: Product[] = JSON.parse(data);
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Ürünler yüklenirken hata:', error);
    return NextResponse.json({ success: false, error: 'Sunucu hatası' }, { status: 500 });
  }
} 