'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { getAllSecondHandProducts, type SecondHandProduct } from '@/data/secondhand-products';

export default function SecondHandPage() {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<SecondHandProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  // Ürünleri filtreleme
  const filteredProducts = useMemo(() => {
    if (!mounted || isLoading) return [];

    let filtered = products;

    // Arama filtresi
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Sıralama
    switch (sortBy) {
      case 'newest':
        return [...filtered].reverse();
      case 'oldest':
        return filtered;
      case 'name_asc':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filtered;
    }
  }, [searchQuery, sortBy, products, isLoading, mounted]);

  useEffect(() => {
    setMounted(true);
    const loadProducts = () => {
      try {
        setIsLoading(true);
        const allProducts = getAllSecondHandProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main>
      <Header />
      
      {/* Banner Section */}
      <section className="pt-[104px] relative bg-background-dark overflow-hidden">
        {/* Diagonal Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 transform -skew-y-6 origin-top-left scale-110"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[200px]">
              {/* Left Side - Text */}
              <div className="relative z-10 py-12">
                <h1 className="text-6xl font-bold text-white mb-4">
                  İkinci El
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  Güvenal Makina güvencesiyle bakımlı ve test edilmiş ikinci el makinalar
                </p>
              </div>
              
              {/* Right Side - Decorative Elements */}
              <div className="relative hidden lg:block">
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full border-8 border-white/10"></div>
                    <div className="w-32 h-32 rounded-full border-8 border-white/10 absolute -top-8 -right-8"></div>
                    <div className="w-16 h-16 rounded-full bg-white/10 absolute bottom-8 -left-8"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-16 left-8 w-3 h-3 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-16 right-16 w-4 h-4 bg-white/20 rounded-full"></div>
        <div className="absolute top-32 right-32 w-2 h-2 bg-white/20 rounded-full"></div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="corporate-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#corporate-grid)"/>
            </svg>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full filter blur-3xl"></div>

        {/* Floating Dots */}
        <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
        <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Filtreler */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
              <div className="flex flex-wrap items-center gap-4">
                {/* Arama */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Görünüm Tipi */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewType('grid')}
                    className={`p-2 rounded-lg ${
                      viewType === 'grid'
                        ? 'bg-primary-50 text-primary-600'
                        : 'hover:bg-gray-50 text-text'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewType('list')}
                    className={`p-2 rounded-lg ${
                      viewType === 'list'
                        ? 'bg-primary-50 text-primary-600'
                        : 'hover:bg-gray-50 text-text'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>

                {/* Sıralama */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="newest">En Yeni</option>
                  <option value="oldest">En Eski</option>
                  <option value="name_asc">İsim (A-Z)</option>
                  <option value="name_desc">İsim (Z-A)</option>
                </select>
              </div>
            </div>

            {/* Ürün Listesi */}
            {isLoading ? (
              <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
                    <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all group overflow-hidden border border-gray-100 ${
                      viewType === 'list' ? 'flex gap-6' : ''
                    }`}
                  >
                    {/* Resim Alanı */}
                    <div className={`${viewType === 'list' ? 'w-1/3' : ''} relative`}>
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Durum Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm ${
                            product.status === 'available' ? 'bg-green-500/90 text-white' :
                            product.status === 'reserved' ? 'bg-yellow-500/90 text-white' :
                            'bg-red-500/90 text-white'
                          }`}>
                            {product.status === 'available' ? 'Satılık' :
                             product.status === 'reserved' ? 'Rezerve' :
                             'Satıldı'}
                          </span>
                        </div>
                        {/* Konum Badge */}
                        <div className="absolute bottom-4 left-4 z-10">
                          <span className="bg-black/50 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {product.location}
                          </span>
                        </div>
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      </div>
                    </div>
                    
                    {/* İçerik Alanı */}
                    <div className={`p-6 ${viewType === 'list' ? 'w-2/3' : ''}`}>
                      {/* Başlık ve Durum */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {product.name}
                        </h3>
                        <span className={`text-sm font-semibold px-3 py-1 rounded-lg ${
                          product.condition === 'Mükemmel' ? 'bg-primary-50 text-primary-700' :
                          product.condition === 'Çok İyi' ? 'bg-blue-50 text-blue-700' :
                          'bg-gray-50 text-gray-700'
                        }`}>
                          {product.condition}
                        </span>
                      </div>

                      {/* Özellikler */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* Üretim Yılı */}
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="text-xs text-gray-500 mb-1">Üretim Yılı</div>
                          <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {product.year}
                          </div>
                        </div>

                        {/* Çalışma Saati */}
                        {product.workingHours && (
                          <div className="bg-gray-50 rounded-xl p-3">
                            <div className="text-xs text-gray-500 mb-1">Çalışma Saati</div>
                            <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {product.workingHours}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Detay Butonu */}
                      <Link
                        href={`/ikinci-el/${product.slug}`}
                        className="w-full bg-primary/5 hover:bg-primary/10 text-primary-600 px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 group/btn"
                      >
                        Detayları İncele
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100">
                <div className="text-text-light">Aradığınız kriterlere uygun ürün bulunamadı.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 