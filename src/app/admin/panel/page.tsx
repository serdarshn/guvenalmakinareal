'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Admin yetkisi kontrolü
    const checkAuth = async () => {
      try {
        console.log('Yetki kontrolü yapılıyor...');
        const response = await fetch('/api/admin/check-auth', {
          credentials: 'include'
        });
        const data = await response.json();
        console.log('Yetki kontrolü yanıtı:', data);

        if (!data.success) {
          console.log('Yetki kontrolü başarısız, giriş sayfasına yönlendiriliyor...');
          window.location.href = '/admin/login';
        }
      } catch (error) {
        console.error('Yetki kontrolü hatası:', error);
        window.location.href = '/admin/login';
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Güvenal Makina"
                width={150}
                height={38}
                className="h-8 w-auto"
              />
              <h1 className="ml-8 text-2xl font-semibold text-gray-900">
                Admin Paneli
              </h1>
            </div>
            <button
              onClick={() => router.push('/api/admin/logout')}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-center">
            {/* Ürün Yönetimi Kartı */}
            <div className="bg-white overflow-hidden shadow rounded-lg max-w-md w-full">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Ürün Yönetimi</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Ürünleri ekle, düzenle ve yönet
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="/admin/panel/urunler"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Ürünleri Yönet
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 