'use client';

import AdminLayout from '../components/AdminLayout';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: string;
  status: string;
  addedAt: string;
}

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [standardAccessories, setStandardAccessories] = useState<string[]>([]);
  const [optionalAccessories, setOptionalAccessories] = useState<string[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      console.log('Ürünler yükleniyor...');
      try {
        const response = await fetch('/api/admin/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Yüklenen ürün verileri:', data);
        
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Beklenmeyen veri formatı:', data);
          throw new Error('Geçersiz veri formatı');
        }
      } catch (error) {
        console.error('Ürünler yüklenirken bir hata oluştu:', error);
        // Hata durumunda boş array set et
        setProducts([]);
      }
    };

    loadProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Başlık ve Aksiyon Butonları */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ürünler</h1>
            <p className="mt-1 text-sm text-gray-600">
              Tüm ürünlerinizi buradan yönetebilirsiniz.
            </p>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Ürün Ekle
          </Link>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Arama */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Ürün Ara
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Ürün adı ile ara..."
              />
            </div>

            {/* Kategori Filtresi */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="all">Tümü</option>
                <optgroup label="Dalma Erozyon Tezgahları">
                  <option value="best-edm">BEST EDM</option>
                  <option value="cift-kafali-dalma-erezyon">ÇİFT KAFALI DALMA EREZYON</option>
                  <option value="king-edm">KING EDM</option>
                </optgroup>
                <option value="torna">Torna</option>
                <option value="isleme">İşleme</option>
                <option value="freze">Freze</option>
              </select>
            </div>
          </div>
        </div>

        {/* Aksesuarlar */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Aksesuarlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="standard-accessories" className="block text-sm font-medium text-gray-700">Standart Aksesuarlar</label>
              <input
                type="text"
                id="standard-accessories"
                value={standardAccessories.join(', ')}
                onChange={(e) => setStandardAccessories(e.target.value.split(',').map(item => item.trim()))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Standart aksesuarları virgülle ayırarak girin..."
              />
            </div>
            <div>
              <label htmlFor="optional-accessories" className="block text-sm font-medium text-gray-700">Opsiyonel Aksesuarlar</label>
              <input
                type="text"
                id="optional-accessories"
                value={optionalAccessories.join(', ')}
                onChange={(e) => setOptionalAccessories(e.target.value.split(',').map(item => item.trim()))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Opsiyonel aksesuarları virgülle ayırarak girin..."
              />
            </div>
          </div>
        </div>

        {/* Ürün Listesi */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürün
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Eklenme Tarihi
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Düzenle</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.addedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-primary hover:text-primary-600"
                      >
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 