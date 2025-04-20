'use client';

import AdminLayout from '../components/AdminLayout';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminCampaigns() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Örnek kampanya verileri
  const campaigns = [
    {
      id: 1,
      name: 'Yaz Sonu İndirimi',
      description: 'Tüm CNC tezgahlarda %20 indirim',
      startDate: '2024-02-21',
      endDate: '2024-03-21',
      status: 'active',
    },
    {
      id: 2,
      name: 'Yedek Parça Kampanyası',
      description: 'Seçili yedek parçalarda 2 al 1 öde',
      startDate: '2024-02-15',
      endDate: '2024-02-28',
      status: 'active',
    },
    {
      id: 3,
      name: 'Kış Kampanyası',
      description: 'Universal tezgahlarda özel fiyatlar',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      status: 'expired',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Başlık ve Aksiyon Butonları */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kampanyalar</h1>
            <p className="mt-1 text-sm text-gray-600">
              Kampanyalarınızı buradan yönetebilirsiniz.
            </p>
          </div>
          <Link
            href="/admin/campaigns/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Kampanya Ekle
          </Link>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Arama */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Kampanya Ara
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Kampanya adı ile ara..."
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
                <option value="active">Aktif</option>
                <option value="scheduled">Planlanmış</option>
                <option value="expired">Sona Ermiş</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kampanya Listesi */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kampanya
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Açıklama
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Başlangıç Tarihi
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bitiş Tarihi
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Düzenle</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{campaign.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        campaign.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : campaign.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {campaign.status === 'active'
                          ? 'Aktif'
                          : campaign.status === 'scheduled'
                          ? 'Planlanmış'
                          : 'Sona Ermiş'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/campaigns/${campaign.id}`}
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