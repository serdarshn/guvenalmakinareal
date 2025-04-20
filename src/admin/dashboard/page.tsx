'use client';

import AdminLayout from '../components/AdminLayout';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Başlık */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Hoş geldiniz! Sitenizin genel durumunu buradan takip edebilirsiniz.
          </p>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Toplam Ürün */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">Toplam Ürün</h2>
                <p className="text-2xl font-semibold text-gray-900">128</p>
              </div>
            </div>
          </div>

          {/* İkinci El */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">İkinci El</h2>
                <p className="text-2xl font-semibold text-gray-900">24</p>
              </div>
            </div>
          </div>

          {/* Yedek Parça */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-50 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">Yedek Parça</h2>
                <p className="text-2xl font-semibold text-gray-900">56</p>
              </div>
            </div>
          </div>

          {/* Aktif Kampanya */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">Aktif Kampanya</h2>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Son Eklenenler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Son Eklenen Ürünler */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-900">Son Eklenen Ürünler</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((item) => (
                <div key={item} className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gray-100"></div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Ürün {item}</p>
                      <p className="text-sm text-gray-500">2 saat önce eklendi</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Son Eklenen Kampanyalar */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-900">Son Eklenen Kampanyalar</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((item) => (
                <div key={item} className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gray-100"></div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Kampanya {item}</p>
                      <p className="text-sm text-gray-500">3 gün önce eklendi</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 