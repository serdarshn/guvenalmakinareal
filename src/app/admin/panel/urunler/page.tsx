'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { products } from '@/data/products'; // Ürünleri içe aktarma
import { toast } from 'react-hot-toast';

// Varsayılan ürün görseli
const DEFAULT_PRODUCT_IMAGE = '/images/placeholder-product.jpg';

const PRODUCT_TYPES = [
  { id: 'products', name: 'Ürünler', color: 'blue' },
  { id: 'used', name: 'İkinci El', color: 'amber' },
  { id: 'spare', name: 'Yedek Parçalar', color: 'green' },
  { id: 'accessories', name: 'Aksesuarlar', color: 'purple' },
  { id: 'campaign', name: 'Kampanyalar', color: 'red' }
];

interface Product {
  id: string;
  name: string;
  category: string;
  status: string;
  addedAt: string;
  standardAccessories?: string[];
  optionalAccessories?: string[];
  type: string;
  description: string;
  image?: string;
  subcategory?: string;
  campaign?: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/admin/products', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        console.error('Ürünler yüklenemedi:', data.error);
      }
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      return;
    }
    
    setDeleteLoading(id);
    
    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Ürün başarıyla silindi');
        // Ürünleri yeniden yükle
        loadProducts();
      } else {
        toast.error(data.message || 'Ürün silinirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Ürün silme hatası:', error);
      toast.error('Ürün silinirken bir hata oluştu');
    } finally {
      setDeleteLoading(null);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesType = selectedType === 'all' || product.type === selectedType;
    const matchesSearch = (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Görsel URL'sini kontrol eden yardımcı fonksiyon
  const getProductImage = (image: string | undefined) => {
    if (!image || image === '') {
      return DEFAULT_PRODUCT_IMAGE;
    }
    // Eğer görsel URL'si göreceli ise başına public klasör yolunu ekle
    if (image.startsWith('/')) {
      return image;
    }
    return `/${image}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Başlık ve Yeni Ürün Ekleme Butonları */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text mb-4">Ürün Yönetimi</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {PRODUCT_TYPES.map((type) => (
            <Link
              key={type.id}
              href={`/admin/panel/urunler/ekle?type=${type.id}`}
              className={`flex items-center justify-center gap-2 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border-2 border-${type.color}-500/20 hover:border-${type.color}-500 text-text hover:text-${type.color}-600`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {type.name} Ekle
            </Link>
          ))}
        </div>
      </div>

      {/* Filtreler */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Arama */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Ürün Ara
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün adı veya açıklama ile ara..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-text-light/60"
            />
          </div>

          {/* Tip Filtresi */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Ürün Tipi
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-text"
            >
              <option value="all">Tümü</option>
              {PRODUCT_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-text font-semibold">
                  Ürün
                </th>
                <th scope="col" className="px-6 py-3 text-left text-primary font-bold">
                  Tip
                </th>
                <th scope="col" className="px-6 py-3 text-left text-text font-semibold">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                  Kampanya
                </th>
                <th scope="col" className="relative px-6 py-3 text-center text-text">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          src={getProductImage(product.image)}
                          alt={product.name ? `${product.name} ürün görseli` : 'Ürün görseli'}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text">{product.name}</div>
                        <div className="text-sm text-text-light">{product.description?.substring(0, 50) || 'Açıklama yok'}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold text-primary`}>
                      {PRODUCT_TYPES.find(t => t.id === product.type)?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text">{product.category}</div>
                    {product.subcategory && (
                      <div className="text-sm text-text-light">{product.subcategory}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.campaign ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-text">
                        Yok
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center justify-center space-x-3">
                      <Link
                        href={`/admin/panel/urunler/duzenle/${product.id.toString()}`}
                        className="text-primary hover:text-primary-600 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Düzenle
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id.toString())}
                        disabled={deleteLoading === product.id.toString()}
                        className="text-red-600 hover:text-red-800 flex items-center disabled:opacity-50"
                      >
                        {deleteLoading === product.id.toString() ? (
                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-1"></div>
                        ) : (
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 