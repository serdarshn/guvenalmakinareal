'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { getAllSpareParts, type SparePart } from '@/data/spare-parts';

// Framer Motion için dinamik import
const DynamicMotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

export default function SparePartsPage() {
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState<SparePart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'name'>('newest');

  // Parçaları yükle
  useEffect(() => {
    setMounted(true);
    const loadParts = () => {
      try {
        setIsLoading(true);
        const allParts = getAllSpareParts();
        setParts(allParts);
      } catch (error) {
        console.error('Error loading spare parts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadParts();
  }, []);

  // Filtreleme ve sıralama
  const filteredParts = useMemo(() => {
    if (!mounted) return [];
    
    let filtered = [...parts];

    // Arama filtrelemesi
    if (searchQuery) {
      filtered = filtered.filter(
        (part) =>
          part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          part.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          part.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          part.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sıralama
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [parts, searchQuery, sortBy, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <main>
      <Header />

      {/* Banner */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/spare-parts-banner.jpg"
          alt="Yedek Parça"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Yedek Parçalar
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto px-4">
            Tüm CNC tezgahlarınız için orijinal ve kaliteli yedek parçalar
          </p>
        </div>
      </section>

      {/* Ana İçerik */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Arkaplan Deseni */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Filtreler */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 mb-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Arama */}
                <div className="w-full md:w-96">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Parça adı, marka veya parça numarası ile arayın..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                    <svg
                      className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Görünüm ve Sıralama */}
                <div className="flex items-center gap-4">
                  {/* Görünüm Tipi */}
                  <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
                    <button
                      onClick={() => setViewType('grid')}
                      className={`p-2 rounded-lg transition-all ${
                        viewType === 'grid'
                          ? 'bg-white shadow text-primary'
                          : 'text-gray-500 hover:text-primary'
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewType('list')}
                      className={`p-2 rounded-lg transition-all ${
                        viewType === 'list'
                          ? 'bg-white shadow text-primary'
                          : 'text-gray-500 hover:text-primary'
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Sıralama */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'name')}
                    className="p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-white"
                  >
                    <option value="newest">En Yeni</option>
                    <option value="name">İsme Göre</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Yükleniyor */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl p-4 animate-pulse"
                  >
                    <div className="aspect-square rounded-xl bg-gray-200 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {/* Parça Listesi */}
            {!isLoading && (
              <>
                {filteredParts.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl text-text-light">
                      Aradığınız kriterlere uygun parça bulunamadı.
                    </h3>
                  </div>
                ) : (
                  <div
                    className={
                      viewType === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                        : 'space-y-6'
                    }
                  >
                    {filteredParts.map((part) => (
                      <DynamicMotionDiv
                        key={part.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`group relative bg-white/80 backdrop-blur border border-gray-100 rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5 ${
                          viewType === 'list'
                            ? 'flex items-center gap-8'
                            : ''
                        }`}
                      >
                        {/* Görsel */}
                        <div
                          className={`relative ${
                            viewType === 'list'
                              ? 'w-48 h-48'
                              : 'aspect-square'
                          }`}
                        >
                          <Image
                            src={part.images[0]}
                            alt={part.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Stok Durumu */}
                          <div className="absolute top-4 right-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-xl ${
                                part.status === 'in-stock'
                                  ? 'bg-green-500/90 text-white'
                                  : part.status === 'low-stock'
                                  ? 'bg-yellow-500/90 text-white'
                                  : 'bg-red-500/90 text-white'
                              }`}
                            >
                              {part.status === 'in-stock'
                                ? 'Stokta'
                                : part.status === 'low-stock'
                                ? 'Sınırlı Stok'
                                : 'Stokta Yok'}
                            </span>
                          </div>
                        </div>

                        {/* İçerik */}
                        <div className="p-6 flex-1">
                          <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2">
                            {part.name}
                          </h3>
                          <p className="text-text-light mb-4 line-clamp-2">
                            {part.description}
                          </p>

                          {/* Özellikler */}
                          <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-sm text-text-light">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                              <span>{part.brand}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-light">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                              </svg>
                              <span>{part.partNumber}</span>
                            </div>
                          </div>

                          {/* Detay Butonu */}
                          <Link
                            href={`/yedek-parca/${part.slug}`}
                            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-600 transition-colors"
                          >
                            Detayları İncele
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </DynamicMotionDiv>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 