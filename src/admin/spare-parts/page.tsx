'use client';

import AdminLayout from '../components/AdminLayout';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminSpareParts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Örnek yedek parça verileri
  const parts = [
    {
      id: 1,
      name: 'Fanuc αi Serisi Servo Motor',
      brand: 'Fanuc',
      partNumber: 'A06B-6117-H203',
      status: 'in-stock',
      stock: 5,
      addedAt: '2024-02-21',
    },
    {
      id: 2,
      name: 'CNC Tezgah Spindle Ünitesi',
      brand: 'NSK',
      partNumber: 'SP-15000-BT40',
      status: 'low-stock',
      stock: 2,
      addedAt: '2024-02-20',
    },
    {
      id: 3,
      name: 'Hassas Vidalı Mil',
      brand: 'THK',
      partNumber: 'DIK4010-600L-C3',
      status: 'out-of-stock',
      stock: 0,
      addedAt: '2024-02-19',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Başlık ve Aksiyon Butonları */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Yedek Parçalar</h1>
            <p className="mt-1 text-sm text-gray-600">
              Yedek parçalarınızı buradan yönetebilirsiniz.
            </p>
          </div>
          <Link
            href="/admin/spare-parts/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Yedek Parça Ekle
          </Link>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Arama */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Parça Ara
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Parça adı veya numarası ile ara..."
              />
            </div>

            {/* Stok Durumu Filtresi */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Stok Durumu
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="all">Tümü</option>
                <option value="in-stock">Stokta</option>
                <option value="low-stock">Sınırlı Stok</option>
                <option value="out-of-stock">Stokta Yok</option>
              </select>
            </div>
          </div>
        </div>

        {/* Parça Listesi */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parça
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marka
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parça No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stok Durumu
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stok Miktarı
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
                {parts.map((part) => (
                  <tr key={part.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{part.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{part.brand}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{part.partNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        part.status === 'in-stock'
                          ? 'bg-green-100 text-green-800'
                          : part.status === 'low-stock'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {part.status === 'in-stock'
                          ? 'Stokta'
                          : part.status === 'low-stock'
                          ? 'Sınırlı Stok'
                          : 'Stokta Yok'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {part.stock} adet
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {part.addedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/spare-parts/${part.id}`}
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