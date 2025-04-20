'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';

// Varsayılan ürün görseli
const DEFAULT_PRODUCT_IMAGE = '/images/placeholder-product.jpg';

// Kategori tipleri
interface CategoryBase {
  id: string;
  name: string;
  nameEn: string;
  subcategories?: CategoryBase[];
}

// Ürün kategorileri
const productCategories: CategoryBase[] = [
  { 
    id: 'cnc-double', 
    name: 'CNC Double Kolon Dik İşleme Merkezi',
    nameEn: 'CNC Double Column Vertical Machining Center',
    subcategories: []
  },
  { 
    id: 'dalma-erozyon', 
    name: 'Dalma Erozyon Tezgahları',
    nameEn: 'EDM Machines',
    subcategories: [
      { 
        id: 'best-edm', 
        name: 'BEST EDM',
        nameEn: 'BEST EDM',
        subcategories: [
          { id: 'znc-serisi', name: 'ZNC Serisi', nameEn: 'ZNC Series' },
          { id: 'pnc-serisi', name: 'PNC Serisi', nameEn: 'PNC Series' },
          { id: 'cnc-serisi', name: 'CNC Serisi', nameEn: 'CNC Series' }
        ]
      },
      { 
        id: 'cift-kafali-dalma-erezyon', 
        name: 'ÇİFT KAFALI DALMA EREZYON',
        nameEn: 'DOUBLE HEAD EDM'
      },
      { 
        id: 'king-edm', 
        name: 'KING EDM',
        nameEn: 'KING EDM',
        subcategories: [
          { id: 'pnc-serisi-king', name: 'PNC SERİSİ', nameEn: 'PNC SERIES' },
          { id: 'znc-serisi-king', name: 'ZNC SERİSİ', nameEn: 'ZNC SERIES' }
        ]
      }
    ]
  },
  { 
    id: 'kalipci-freze', 
    name: 'Kalıpçı Freze Tezgahları',
    nameEn: 'Mold Milling Machines',
    subcategories: [
      { id: 'king', name: 'KİNG', nameEn: 'KING' },
      { id: 'jetco', name: 'JETCO', nameEn: 'JETCO' },
      { id: 'kg-super', name: 'KG SUPER', nameEn: 'KG SUPER' }
    ]
  },
  { 
    id: 'universal-kalipci-freze', 
    name: 'Üniversal Kalıpçı Freze Tezgahları',
    nameEn: 'Universal Mold Milling Machines',
    subcategories: [
      { id: 'king-universal', name: 'KİNG', nameEn: 'KING' },
      { id: 'king-ysm', name: 'KİNG YSM', nameEn: 'KING YSM' },
      { id: 'kg-super-universal', name: 'KG SUPER', nameEn: 'KG SUPER' }
    ]
  },
  { 
    id: 'koc-kafa-universal-freze', 
    name: 'Koç Kafa Universal Freze',
    nameEn: 'Ram Head Universal Milling Machine'
  },
  { 
    id: 'taslama', 
    name: 'Taşlama Tezgahları',
    nameEn: 'Grinding Machines',
    subcategories: [
      { id: 'king-grinder', name: 'KİNG GRINDER', nameEn: 'KING GRINDER' }
    ]
  },
  { 
    id: 'universal-torna', 
    name: 'Torna Tezgahları',
    nameEn: 'Lathe Machines',
    subcategories: [
      { id: 'king-torna', name: 'KING', nameEn: 'KING' },
      { id: 'jetco-torna', name: 'JETCO', nameEn: 'JETCO' },
      { id: 'tos', name: 'TOS', nameEn: 'TOS' }
    ]
  },
  { 
    id: 'masa-ustu-torna', 
    name: 'Masaüstü Torna Tezgahları',
    nameEn: 'Desktop Lathe Machines'
  },
  { 
    id: 'radyal-matkap', 
    name: 'Radyal Matkap Tezgahları',
    nameEn: 'Radial Drilling Machines',
    subcategories: [
      { id: 'tailift', name: 'TAILIFT', nameEn: 'TAILIFT' },
      { id: 'kg-super-matkap', name: 'KG SUPER', nameEn: 'KG SUPER' }
    ]
  },
  { 
    id: 'sutunlu-matkap', 
    name: 'Sütunlu Matkap Tezgahları',
    nameEn: 'Column Drilling Machines',
    subcategories: [
      { id: 'king-matkap', name: 'KING', nameEn: 'KING' },
      { id: 'jetco-matkap', name: 'JETCO', nameEn: 'JETCO' },
      { id: 'sahin', name: 'ŞAHİN', nameEn: 'SAHIN' },
      { id: 'boyka', name: 'BOYKA', nameEn: 'BOYKA' }
    ]
  },
  { 
    id: 'testere', 
    name: 'Testere Tezgahları',
    nameEn: 'Sawing Machines',
    subcategories: [
      { id: 'king-tyc', name: 'KING TYC', nameEn: 'KING TYC' },
      { id: 'jetco-testere', name: 'JETCO', nameEn: 'JETCO' },
      { id: 'kesmak', name: 'KESMAK', nameEn: 'KESMAK' }
    ]
  },
  { 
    id: 'kilavuz', 
    name: 'Kılavuz Çekme Tezgahları',
    nameEn: 'Tapping Machines',
    subcategories: [
      { id: 'king-tapping', name: 'KING TAPPING', nameEn: 'KING TAPPING' }
    ]
  }
];

type FilterType = 'urunler' | 'ikinci-el' | 'yedek-parca' | 'aksesuar' | 'kampanya' | '';

// Aktif kategori adını bulmak için yardımcı fonksiyon
// Şu anda kullanılmıyor, ileride kullanılabilir
// const findCategoryNameById = (categories: CategoryBase[], categoryId: string): string | null => {
//   for (const category of categories) {
//     if (category.id === categoryId) {
//       return category.name;
//     }
//     
//     if (category.subcategories) {
// ... existing code ...

// Bir kategorinin açık olup olmadığını kontrol eden yardımcı fonksiyon
const isCategoryOpen = (category: CategoryBase, activeCategory: string): boolean => {
  // Kategori aktif ise açık
  if (category.id === activeCategory) return true;
  
  // Alt kategorilerden biri aktif ise açık
  if (category.subcategories) {
    for (const subcat of category.subcategories) {
      if (subcat.id === activeCategory) return true;
      
      // 3. seviye alt kategorilerden biri aktif ise açık
      if (subcat.subcategories) {
        for (const subsubcat of subcat.subcategories) {
          if (subsubcat.id === activeCategory) return true;
        }
      }
    }
  }
  
  return false;
};

// Kategori yolunu bulan yardımcı fonksiyon
const findCategoryPath = (categories: CategoryBase[], categoryId: string): CategoryBase[] => {
  // Doğrudan bu kategoride mi kontrol et
  for (const category of categories) {
    if (category.id === categoryId) {
      return [category];
    }
    
    // Alt kategorilerde ara
    if (category.subcategories) {
      const pathInSubcategories = findCategoryPath(category.subcategories, categoryId);
      if (pathInSubcategories.length > 0) {
        return [category, ...pathInSubcategories];
      }
    }
  }
  
  return [];
};

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // Sayfalama için state'ler
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  // Ürün listesi için ref
  const productListRef = useRef<HTMLDivElement>(null);
  // Istemci tarafında olup olmadığımızı kontrol etmek için
  const [isClient, setIsClient] = useState(false);
  // Dil seçeneği
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  // İstemci tarafında olduğumuzu belirle
  useEffect(() => {
    setIsClient(true);
  }, []);

  // URL parametrelerini sadece istemci tarafında oku
  useEffect(() => {
    if (isClient) {
      const params = new URLSearchParams(window.location.search);
      const filterParam = params.get('filter') as FilterType;
      if (filterParam) {
        setActiveFilter(filterParam);
      }
      
      // Category parametresini de okuyalım
      const categoryParam = params.get('category');
      if (categoryParam) {
        setActiveCategory(categoryParam);
      }
      
      // Dil parametresini okuyalım
      const langParam = params.get('lang');
      if (langParam === 'en') {
        setLang('en');
      } else {
        setLang('tr');
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      async function fetchProducts() {
        try {
          const response = await fetch('/api/products');
          const data = await response.json();
          if (data.success) {
            setAllProducts(data.products);
          }
        } catch (error) {
          console.error('Ürünler yüklenirken hata:', error);
        }
      }

      fetchProducts();
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient && allProducts.length > 0) {
      let filtered = allProducts;

      if (activeFilter === 'urunler') {
        filtered = allProducts.filter(product => product.type === 'products' && !product.campaign);
      } else if (activeFilter === 'ikinci-el') {
        filtered = allProducts.filter(product => product.type === 'used' && !product.campaign);
      } else if (activeFilter === 'yedek-parca') {
        filtered = allProducts.filter(product => product.type === 'spare' && !product.campaign);
      } else if (activeFilter === 'aksesuar') {
        filtered = allProducts.filter(product => product.type === 'accessories' && !product.campaign);
      } else if (activeFilter === 'kampanya') {
        filtered = allProducts.filter(product => product.type === 'campaign' || product.campaign);
      }

      if (activeCategory) {
        // Seçilen kategoriye ait ürünleri bul
        const findProductsForCategory = (categoryId: string) => {
          // Doğrudan eşleşen ürünler
          let matchingProducts = filtered.filter(product => product.category === categoryId);
          
          // Kategori hiyerarşisinde bu kategoriyi bul
          let isMainCategory = false;
          let mainCategory: CategoryBase | null = null;
          
          // Ana kategori mi kontrol et
          for (const cat of productCategories) {
            if (cat.id === categoryId) {
              isMainCategory = true;
              mainCategory = cat;
              break;
            }
            
            // Alt kategori mi kontrol et
            if (cat.subcategories) {
              for (const subcat of cat.subcategories) {
                if (subcat.id === categoryId) {
                  mainCategory = subcat;
                  break;
                }
                
                // 3. seviye alt kategori mi kontrol et
                if (subcat.subcategories) {
                  for (const subsubcat of subcat.subcategories) {
                    if (subsubcat.id === categoryId) {
                      mainCategory = subsubcat;
                      break;
                    }
                  }
                  if (mainCategory) break;
                }
              }
              if (mainCategory && !isMainCategory) break;
            }
          }
          
          // Ana kategori ise ve alt kategorileri varsa tüm alt kategorilerdeki ürünleri ekle
          if (isMainCategory && mainCategory?.subcategories && mainCategory.subcategories.length > 0) {
            const addProductsFromSubcategories = (subcategories: CategoryBase[]) => {
              for (const subcat of subcategories) {
                // Alt kategorideki ürünleri ekle
                const subcatProducts = filtered.filter(product => product.category === subcat.id);
                matchingProducts = [...matchingProducts, ...subcatProducts];
                
                // Daha alt kategoriler varsa onları da ekle
                if (subcat.subcategories) {
                  addProductsFromSubcategories(subcat.subcategories);
                }
              }
            };
            
            addProductsFromSubcategories(mainCategory.subcategories);
          } 
          // Alt kategori ise sadece bu kategorideki ve alt kategorilerindeki ürünleri göster
          else if (mainCategory) {
            // Alt kategorinin alt kategorileri varsa onları da ekle
            if (mainCategory.subcategories) {
              const addProductsFromSubcategories = (subcategories: CategoryBase[]) => {
                for (const subcat of subcategories) {
                  const subcatProducts = filtered.filter(product => product.category === subcat.id);
                  matchingProducts = [...matchingProducts, ...subcatProducts];
                  
                  if (subcat.subcategories) {
                    addProductsFromSubcategories(subcat.subcategories);
                  }
                }
              };
              
              addProductsFromSubcategories(mainCategory.subcategories);
            }
          }
          
          return matchingProducts;
        };
        
        if (activeCategory === 'all-campaigns') {
          // Tüm kampanyalar
          filtered = filtered.filter(product => (product.type === 'campaign' || product.campaign));
        } else {
          // Kategori filtrelemesi
          filtered = findProductsForCategory(activeCategory);
        }
      }

      // Arama terimine göre filtreleme
      if (searchTerm.trim() !== '') {
        const searchLower = searchTerm.toLowerCase().trim();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchLower) || 
          (product.description && product.description.toLowerCase().includes(searchLower))
        );
      }

      setFilteredProducts(filtered);
      // Filtreleme değiştiğinde sayfa numarasını 1'e sıfırla
      setCurrentPage(1);
    }
  }, [activeFilter, activeCategory, allProducts, searchTerm, isClient]);

  // Mevcut sayfadaki ürünleri hesapla
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Sayfa değiştirme fonksiyonu
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Sayfa değiştiğinde ürün listesinin başlangıcına kaydır
    if (productListRef.current) {
      // Ürün listesinin üstünden biraz yukarıya kaydır (header'ın altına)
      const yOffset = -120; // Header yüksekliğine göre ayarlayın
      const y = productListRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  // Önceki sayfa fonksiyonu
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  // Sonraki sayfa fonksiyonu
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  // İstemci tarafında değilsek yükleme durumunu göster
  if (!isClient) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[104px]">
          <section className="relative bg-background-dark overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 transform -skew-y-6 origin-top-left scale-110"></div>
            <div className="container mx-auto px-4 relative">
              <div className="py-16 lg:py-24">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                  {lang === 'en' ? 'Our Products' : 'Ürünlerimiz'}
                </h1>
                <p className="text-lg text-white/90 max-w-2xl">
                  {lang === 'en' 
                    ? 'Discover our wide range of products for your industrial production needs.' 
                    : 'Endüstriyel üretim ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin.'}
                </p>
              </div>
            </div>
          </section>
          <div className="container mx-auto px-4 py-12">
            <div className="flex justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-48 bg-gray-200 rounded mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                  {[...Array(12)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-4 h-80">
                      <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!allProducts.length) {
    return (
      <Suspense fallback={<div>{lang === 'en' ? 'Loading...' : 'Yükleniyor...'}</div>}>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-[104px]">
            {/* Banner */}
            <section className="relative bg-background-dark overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 transform -skew-y-6 origin-top-left scale-110"></div>
              <div className="container mx-auto px-4 relative">
                <div className="py-16 lg:py-24">
                  <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                    {lang === 'en' ? 'Our Products' : 'Ürünlerimiz'}
                  </h1>
                  <p className="text-lg text-white/90 max-w-2xl">
                    {lang === 'en' 
                      ? 'Discover our wide range of products for your industrial production needs.' 
                      : 'Endüstriyel üretim ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin.'}
                  </p>
                </div>
              </div>
            </section>
            {/* Filtreler */}
            <section className="py-8">
              <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sol Taraf - Tip Filtreleri */}
                    <div className="lg:w-3/4">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Ürün Filtreleri
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <button
                          onClick={() => {
                            window.location.href = lang === 'en' 
                              ? '/urunler?filter=urunler&lang=en' 
                              : '/urunler?filter=urunler';
                          }}
                          className={`relative px-4 py-3 rounded-xl font-medium transition-all ${
                            activeFilter === 'urunler'
                              ? 'bg-primary text-white shadow-lg shadow-primary/25'
                              : 'bg-gray-50 text-gray-600 hover:bg-primary/10 hover:text-primary'
                          }`}
                        >
                          <span className="relative z-10">{lang === 'en' ? 'Products' : 'Ürünler'}</span>
                          <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                            {allProducts.filter(p => p.type === 'products').length}
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            window.location.href = lang === 'en' 
                              ? '/urunler?filter=ikinci-el&lang=en' 
                              : '/urunler?filter=ikinci-el';
                          }}
                          className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                            activeFilter === 'ikinci-el'
                              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                              : 'bg-white text-gray-600 hover:bg-amber-500/10 hover:text-amber-600 border-amber-500/20 shadow-sm hover:shadow'
                          }`}
                        >
                          <span className="relative z-10">{lang === 'en' ? 'Used' : 'İkinci El'}</span>
                          <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                            {allProducts.filter(p => p.type === 'used').length}
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            window.location.href = lang === 'en' 
                              ? '/urunler?filter=yedek-parca&lang=en' 
                              : '/urunler?filter=yedek-parca';
                          }}
                          className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                            activeFilter === 'yedek-parca'
                              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                              : 'bg-white text-gray-600 hover:bg-blue-500/10 hover:text-blue-600 border-blue-500/20 shadow-sm hover:shadow'
                          }`}
                        >
                          <span className="relative z-10">{lang === 'en' ? 'Spare Parts' : 'Yedek Parçalar'}</span>
                          <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                            {allProducts.filter(p => p.type === 'spare').length}
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            window.location.href = lang === 'en' 
                              ? '/urunler?filter=aksesuar&lang=en' 
                              : '/urunler?filter=aksesuar';
                          }}
                          className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                            activeFilter === 'aksesuar'
                              ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                              : 'bg-white text-gray-600 hover:bg-green-500/10 hover:text-green-600 border-green-500/20 shadow-sm hover:shadow'
                          }`}
                        >
                          <span className="relative z-10">{lang === 'en' ? 'Accessories' : 'Aksesuarlar'}</span>
                          <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                            {allProducts.filter(p => p.type === 'accessories').length}
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            window.location.href = lang === 'en' 
                              ? '/urunler?filter=kampanya&lang=en' 
                              : '/urunler?filter=kampanya';
                          }}
                          className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                            activeFilter === 'kampanya'
                              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                              : 'bg-white text-gray-600 hover:bg-rose-500/10 hover:text-rose-600 border-rose-500/20 shadow-sm hover:shadow'
                          }`}
                        >
                          <span className="relative z-10">{lang === 'en' ? 'Campaigns' : 'Kampanyalar'}</span>
                          <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                            {allProducts.filter(p => p.type === 'campaign' || p.campaign).length}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Sağ Taraf - Arama ve Görünüm */}
                    <div className="lg:w-1/4">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {lang === 'en' ? 'Product Search' : 'Ürün Ara'}
                      </h2>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder={lang === 'en' ? 'Search for a product...' : 'Ürün ara...'}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all pr-10"
                        />
                        {searchTerm && (
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Aktif Filtreler */}
                  {(activeFilter || activeCategory) && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-gray-500">{lang === 'en' ? 'Active Filters:' : 'Aktif Filtreler:'}</span>
                        
                        {/* Ürün tipi filtresi */}
                        {activeFilter && (
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                            activeFilter === 'urunler' ? 'bg-primary/10 text-primary' :
                            activeFilter === 'ikinci-el' ? 'bg-amber-500/10 text-amber-600' :
                            activeFilter === 'yedek-parca' ? 'bg-blue-500/10 text-blue-600' :
                            activeFilter === 'aksesuar' ? 'bg-green-500/10 text-green-600' :
                            'bg-rose-500/10 text-rose-600'
                          }`}>
                            {activeFilter === 'urunler' ? (lang === 'en' ? 'Products' : 'Ürünler') :
                             activeFilter === 'ikinci-el' ? (lang === 'en' ? 'Used' : 'İkinci El') :
                             activeFilter === 'yedek-parca' ? (lang === 'en' ? 'Spare Parts' : 'Yedek Parçalar') :
                             activeFilter === 'aksesuar' ? (lang === 'en' ? 'Accessories' : 'Aksesuarlar') :
                             (lang === 'en' ? 'Campaign Products' : 'Kampanyalı Ürünler')}
                            <button
                              onClick={() => {
                                setActiveFilter('');
                                setActiveCategory('');
                                // URL'i temizle
                                const url = new URL(window.location.href);
                                url.search = lang === 'en' ? '?lang=en' : '';
                                window.history.pushState({}, '', url.toString());
                              }}
                              className="ml-1 hover:text-primary-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        )}
                        
                        {/* Kategori filtreleri - her bir seviye için ayrı kutu */}
                        {activeCategory && findCategoryPath(productCategories, activeCategory).map((cat, index) => (
                          <span 
                            key={cat.id} 
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg ${
                              index === 0 ? 'bg-blue-500/10 text-blue-600' :
                              index === 1 ? 'bg-green-500/10 text-green-600' :
                              index === 2 ? 'bg-amber-500/10 text-amber-600' :
                              'bg-rose-500/10 text-rose-600'
                            } text-sm`}
                          >
                            {lang === 'en' ? cat.nameEn : cat.name}
                            {index === findCategoryPath(productCategories, activeCategory).length - 1 && (
                              <button
                                onClick={() => {
                                  setActiveCategory('');
                                  // URL'den kategori parametresini kaldır
                                  const url = new URL(window.location.href);
                                  url.searchParams.delete('category');
                                  window.history.pushState({}, '', url.toString());
                                }}
                                className="ml-1 hover:text-primary-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </span>
                        ))}
                        
                        <button
                          onClick={() => {
                            setActiveFilter('');
                            setActiveCategory('');
                            // URL'i temizle
                            const url = new URL(window.location.href);
                            url.search = lang === 'en' ? '?lang=en' : '';
                            window.history.pushState({}, '', url.toString());
                          }}
                          className="text-sm text-gray-500 hover:text-primary"
                        >
                          {lang === 'en' ? 'Clear Filters' : 'Filtreleri Temizle'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Sonuç Sayısı */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {lang === 'en' 
                        ? <>Total <span className="font-medium text-gray-900">{filteredProducts.length}</span> products found</>
                        : <>Toplam <span className="font-medium text-gray-900">{filteredProducts.length}</span> ürün bulundu</>
                      }
                      {filteredProducts.length > 0 && (
                        <span className="ml-2">
                          {lang === 'en' 
                            ? <>(Displayed: {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)})</>
                            : <>(Gösterilen: {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)})</>
                          }
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Ana İçerik */}
        <main className="pt-[104px]">
          {/* Banner */}
          <section className="relative bg-background-dark overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 transform -skew-y-6 origin-top-left scale-110"></div>
            <div className="container mx-auto px-4 relative">
              <div className="py-16 lg:py-24">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                  {lang === 'en' ? 'Our Products' : 'Ürünlerimiz'}
                </h1>
                <p className="text-lg text-white/90 max-w-2xl">
                  {lang === 'en' 
                    ? 'Discover our wide range of products for your industrial production needs.' 
                    : 'Endüstriyel üretim ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin.'}
                </p>
              </div>
            </div>
          </section>

          {/* Ürünler Bölümü */}
          <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="products-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#products-grid)"/>
                </svg>
              </div>
            </div>

            {/* Floating Dots */}
            <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
            <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
            <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>

            <div className="container mx-auto px-4 relative">
              {/* Filtreler */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Sol Taraf - Tip Filtreleri */}
                  <div className="lg:w-3/4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      {lang === 'en' ? 'Product Filters' : 'Ürün Filtreleri'}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <button
                        onClick={() => {
                          window.location.href = lang === 'en' 
                            ? '/urunler?filter=urunler&lang=en' 
                            : '/urunler?filter=urunler';
                        }}
                        className={`relative px-4 py-3 rounded-xl font-medium transition-all ${
                          activeFilter === 'urunler'
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'bg-gray-50 text-gray-600 hover:bg-primary/10 hover:text-primary'
                        }`}
                      >
                        <span className="relative z-10">{lang === 'en' ? 'Products' : 'Ürünler'}</span>
                        <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                          {allProducts.filter(p => p.type === 'products').length}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = lang === 'en' 
                            ? '/urunler?filter=ikinci-el&lang=en' 
                            : '/urunler?filter=ikinci-el';
                        }}
                        className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                          activeFilter === 'ikinci-el'
                            ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                            : 'bg-white text-gray-600 hover:bg-amber-500/10 hover:text-amber-600 border-amber-500/20 shadow-sm hover:shadow'
                        }`}
                      >
                        <span className="relative z-10">{lang === 'en' ? 'Used' : 'İkinci El'}</span>
                        <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                          {allProducts.filter(p => p.type === 'used').length}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = lang === 'en' 
                            ? '/urunler?filter=yedek-parca&lang=en' 
                            : '/urunler?filter=yedek-parca';
                        }}
                        className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                          activeFilter === 'yedek-parca'
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-white text-gray-600 hover:bg-blue-500/10 hover:text-blue-600 border-blue-500/20 shadow-sm hover:shadow'
                        }`}
                      >
                        <span className="relative z-10">{lang === 'en' ? 'Spare Parts' : 'Yedek Parçalar'}</span>
                        <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                          {allProducts.filter(p => p.type === 'spare').length}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = lang === 'en' 
                            ? '/urunler?filter=aksesuar&lang=en' 
                            : '/urunler?filter=aksesuar';
                        }}
                        className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                          activeFilter === 'aksesuar'
                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                            : 'bg-white text-gray-600 hover:bg-green-500/10 hover:text-green-600 border-green-500/20 shadow-sm hover:shadow'
                        }`}
                      >
                        <span className="relative z-10">{lang === 'en' ? 'Accessories' : 'Aksesuarlar'}</span>
                        <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                          {allProducts.filter(p => p.type === 'accessories').length}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = lang === 'en' 
                            ? '/urunler?filter=kampanya&lang=en' 
                            : '/urunler?filter=kampanya';
                        }}
                        className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                          activeFilter === 'kampanya'
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                            : 'bg-white text-gray-600 hover:bg-rose-500/10 hover:text-rose-600 border-rose-500/20 shadow-sm hover:shadow'
                        }`}
                      >
                        <span className="relative z-10">{lang === 'en' ? 'Campaigns' : 'Kampanyalar'}</span>
                        <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                          {allProducts.filter(p => p.type === 'campaign' || p.campaign).length}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Sağ Taraf - Arama ve Görünüm */}
                  <div className="lg:w-1/4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {lang === 'en' ? 'Product Search' : 'Ürün Ara'}
                    </h2>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={lang === 'en' ? 'Search for a product...' : 'Ürün ara...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all pr-10"
                      />
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Aktif Filtreler */}
                {(activeFilter || activeCategory) && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-500">{lang === 'en' ? 'Active Filters:' : 'Aktif Filtreler:'}</span>
                      
                      {/* Ürün tipi filtresi */}
                      {activeFilter && (
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                          activeFilter === 'urunler' ? 'bg-primary/10 text-primary' :
                          activeFilter === 'ikinci-el' ? 'bg-amber-500/10 text-amber-600' :
                          activeFilter === 'yedek-parca' ? 'bg-blue-500/10 text-blue-600' :
                          activeFilter === 'aksesuar' ? 'bg-green-500/10 text-green-600' :
                          'bg-rose-500/10 text-rose-600'
                        }`}>
                          {activeFilter === 'urunler' ? (lang === 'en' ? 'Products' : 'Ürünler') :
                           activeFilter === 'ikinci-el' ? (lang === 'en' ? 'Used' : 'İkinci El') :
                           activeFilter === 'yedek-parca' ? (lang === 'en' ? 'Spare Parts' : 'Yedek Parçalar') :
                           activeFilter === 'aksesuar' ? (lang === 'en' ? 'Accessories' : 'Aksesuarlar') :
                           (lang === 'en' ? 'Campaign Products' : 'Kampanyalı Ürünler')}
                          <button
                            onClick={() => {
                              window.location.href = lang === 'en'
                                ? `/urunler${activeFilter ? `?filter=${activeFilter}&lang=en` : '?lang=en'}`
                                : `/urunler${activeFilter ? `?filter=${activeFilter}` : ''}`;
                            }}
                            className="ml-1 hover:text-primary-600"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      )}
                      
                      {/* Kategori filtreleri - her bir seviye için ayrı kutu */}
                      {activeCategory && findCategoryPath(productCategories, activeCategory).map((cat, index) => (
                        <span 
                          key={cat.id} 
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg ${
                            index === 0 ? 'bg-blue-500/10 text-blue-600' :
                            index === 1 ? 'bg-green-500/10 text-green-600' :
                            index === 2 ? 'bg-amber-500/10 text-amber-600' :
                            'bg-rose-500/10 text-rose-600'
                          } text-sm`}
                        >
                          {lang === 'en' ? cat.nameEn : cat.name}
                          {index === findCategoryPath(productCategories, activeCategory).length - 1 && (
                            <button
                              onClick={() => {
                                setActiveCategory('');
                                // URL'den kategori parametresini kaldır
                                const url = new URL(window.location.href);
                                url.searchParams.delete('category');
                                window.history.pushState({}, '', url.toString());
                              }}
                              className="ml-1 hover:text-primary-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </span>
                      ))}
                      
                      <button
                        onClick={() => {
                          window.location.href = lang === 'en' ? '/urunler?lang=en' : '/urunler';
                        }}
                        className="text-sm text-gray-500 hover:text-primary"
                      >
                        {lang === 'en' ? 'Clear Filters' : 'Filtreleri Temizle'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Sonuç Sayısı */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {lang === 'en' 
                      ? <>Total <span className="font-medium text-gray-900">{filteredProducts.length}</span> products found</>
                      : <>Toplam <span className="font-medium text-gray-900">{filteredProducts.length}</span> ürün bulundu</>
                    }
                    {filteredProducts.length > 0 && (
                      <span className="ml-2">
                        {lang === 'en' 
                          ? <>(Displayed: {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)})</>
                          : <>(Gösterilen: {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)})</>
                        }
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Ürün Listesi ve Kategoriler */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sol Taraf - Kategoriler (Sadece Ürünler seçiliyse göster) */}
                {activeFilter === 'urunler' && (
                  <div className="lg:w-1/4">
                    <div className="bg-white rounded-2xl shadow-lg sticky top-[120px] overflow-hidden border border-gray-100">
                      {/* Başlık */}
                      <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-5 text-white">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                          </svg>
                          {lang === 'en' ? 'Categories' : 'Kategoriler'}
                        </h2>
                        <p className="text-xs text-white/70 mt-1">
                          {lang === 'en' ? 'Browse product categories' : 'Ürün kategorilerine göz atın'}
                        </p>
                      </div>
                      
                      {/* Kategori Listesi */}
                      <div className="p-3">
                        <div className="space-y-2">
                          {productCategories.map((category) => (
                            <div key={category.id} className="mb-3 bg-gray-50 rounded-xl overflow-hidden">
                              <button
                                onClick={() => {
                                  setActiveCategory(category.id);
                                  // URL parametrelerini güncelle ama sayfayı yenileme
                                  const url = new URL(window.location.href);
                                  url.searchParams.set('category', category.id);
                                  window.history.pushState({}, '', url.toString());
                                }}
                                className={`w-full text-left px-4 py-3 transition-all flex items-center justify-between ${
                                  activeCategory === category.id || isCategoryOpen(category, activeCategory)
                                    ? 'bg-primary text-white font-medium shadow-md'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                              >
                                <span>{lang === 'en' ? category.nameEn : category.name}</span>
                                {category.subcategories && (
                                  <svg 
                                    className={`w-4 h-4 transition-transform ${isCategoryOpen(category, activeCategory) ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                )}
                              </button>
                              
                              {/* Alt kategoriler */}
                              {category.subcategories && isCategoryOpen(category, activeCategory) && (
                                <div className="bg-white">
                                  {category.subcategories.map((subcat) => (
                                    <div key={subcat.id} className="border-b border-gray-100 last:border-b-0">
                                      <button
                                        onClick={() => {
                                          setActiveCategory(subcat.id);
                                          // URL parametrelerini güncelle ama sayfayı yenileme
                                          const url = new URL(window.location.href);
                                          url.searchParams.set('category', subcat.id);
                                          window.history.pushState({}, '', url.toString());
                                        }}
                                        className={`w-full text-left px-4 py-2.5 transition-all flex items-center justify-between ${
                                          activeCategory === subcat.id || (subcat.subcategories && subcat.subcategories.some(subsub => subsub.id === activeCategory))
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                      >
                                        <span className="flex items-center">
                                          <svg className="w-3 h-3 mr-2 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                          </svg>
                                          {lang === 'en' ? subcat.nameEn : subcat.name}
                                        </span>
                                        {subcat.subcategories && (
                                          <svg 
                                            className={`w-3 h-3 transition-transform ${activeCategory === subcat.id || subcat.subcategories.some(subsub => subsub.id === activeCategory) ? 'rotate-180' : ''}`} 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                          >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                          </svg>
                                        )}
                                      </button>
                                      
                                      {/* 3. seviye alt kategoriler */}
                                      {subcat.subcategories && (activeCategory === subcat.id || subcat.subcategories.some(subsub => subsub.id === activeCategory)) && (
                                        <div className="bg-gray-50/50 py-1">
                                          {subcat.subcategories.map((subsubcat) => (
                                            <button
                                              key={subsubcat.id}
                                              onClick={() => {
                                                setActiveCategory(subsubcat.id);
                                                // URL parametrelerini güncelle ama sayfayı yenileme
                                                const url = new URL(window.location.href);
                                                url.searchParams.set('category', subsubcat.id);
                                                window.history.pushState({}, '', url.toString());
                                              }}
                                              className={`w-full text-left px-8 py-2 text-sm transition-all ${
                                                activeCategory === subsubcat.id
                                                  ? 'text-primary font-medium'
                                                  : 'hover:bg-gray-100 text-gray-600'
                                              }`}
                                            >
                                              <span className="flex items-center">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                                                {lang === 'en' ? subsubcat.nameEn : subsubcat.name}
                                              </span>
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sağ Taraf - Ürün Listesi */}
                <div className={activeFilter === 'urunler' ? 'lg:w-3/4' : 'w-full'}>
                  <div ref={productListRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentProducts.map((product) => {
                      // Dile göre içeriği seç
                      const content = lang === 'en' && product.translations?.en ? {
                        name: product.translations.en.name,
                        description: product.translations.en.description
                      } : {
                        name: product.name,
                        description: product.description
                      };

                      return (
                        <Link
                          key={product.id}
                          href={`/urunler/${product.id}?lang=${lang}`}
                          className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                          <div className="aspect-square relative">
                            <Image
                              src={product.images?.[0] || product.image || DEFAULT_PRODUCT_IMAGE}
                              alt={content.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2">
                              {content.name}
                            </h3>
                            <p className="text-text-light line-clamp-3">
                              {content.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  
                  {/* Sayfalama */}
                  {totalPages > 1 && (
                    <div className="mt-10 flex justify-center">
                      <div className="flex items-center gap-2">
                        {/* Önceki sayfa butonu */}
                        <button
                          onClick={goToPreviousPage}
                          disabled={currentPage === 1}
                          className={`px-3 py-2 rounded-lg border ${
                            currentPage === 1
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white text-gray-700 hover:bg-primary hover:text-white hover:border-primary'
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        
                        {/* Sayfa numaraları */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
                          // Çok fazla sayfa varsa, sadece belirli sayfaları göster
                          if (
                            number === 1 ||
                            number === totalPages ||
                            (number >= currentPage - 1 && number <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  currentPage === number
                                    ? 'bg-primary text-white font-medium'
                                    : 'bg-white text-gray-700 hover:bg-primary/10 hover:text-primary'
                                }`}
                              >
                                {number}
                              </button>
                            );
                          }
                          
                          // Sayfa numaraları arasında boşluk olduğunda üç nokta göster
                          if (
                            (number === 2 && currentPage > 3) ||
                            (number === totalPages - 1 && currentPage < totalPages - 2)
                          ) {
                            return (
                              <span key={number} className="px-2 text-gray-500">
                                ...
                              </span>
                            );
                          }
                          
                          return null;
                        })}
                        
                        {/* Sonraki sayfa butonu */}
                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-2 rounded-lg border ${
                            currentPage === totalPages
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white text-gray-700 hover:bg-primary hover:text-white hover:border-primary'
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </Suspense>
  );
} 