'use client';

import AdminLayout from '../components/AdminLayout';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminSecondHand() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Örnek ikinci el ürün verileri
  const products = [
    {
      id: 1,
      name: 'KİNG SZ A8 V (2019)',
      condition: 'Çok İyi',
      status: 'available',
      location: 'İstanbul',
      addedAt: '2024-02-21',
    },
    {
      id: 2,
      name: 'PNC 500 Dalma Erozyon (2020)',
      condition: 'Mükemmel',
      status: 'reserved',
      location: 'Ankara',
      addedAt: '2024-02-20',
    },
    {
      id: 3,
      name: 'Universal Torna (2018)',
      condition: 'İyi',
      status: 'sold',
      location: 'İzmir',
      addedAt: '2024-02-19',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Başlık ve Aksiyon Butonları */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">İkinci El Ürünler</h1>
            <p className="mt-1 text-sm text-gray-600">
              İkinci el ürünlerinizi buradan yönetebilirsiniz.
            </p>
          </div>
          <Link
            href="/admin/secondhand/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni İkinci El Ürün Ekle
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

            {/* Durum Filtresi */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Durum
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="all">Tümü</option>
                <option value="available">Satılık</option>
                <option value="reserved">Rezerve</option>
                <option value="sold">Satıldı</option>
              </select>
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
                    Durum
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Konum
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satış Durumu
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
                      <div className="text-sm text-gray-500">{product.condition}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : product.status === 'reserved'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status === 'available'
                          ? 'Satılık'
                          : product.status === 'reserved'
                          ? 'Rezerve'
                          : 'Satıldı'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.addedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/secondhand/${product.id}`}
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