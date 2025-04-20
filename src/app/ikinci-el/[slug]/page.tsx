'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { use } from 'react';
import { getSecondHandProductBySlug, type SecondHandProduct } from '@/data/secondhand-products';

export default function SecondHandProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<SecondHandProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = () => {
      setIsLoading(true);
      const foundProduct = getSecondHandProductBySlug(resolvedParams.slug);
      setProduct(foundProduct || null);
      setIsLoading(false);
    };

    loadProduct();
  }, [resolvedParams.slug]);

  if (isLoading) {
    return (
      <main>
        <Header />
        <section className="pt-[104px] min-h-screen bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto py-12">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="aspect-square bg-gray-200 rounded"></div>
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main>
        <Header />
        <section className="pt-[104px] min-h-screen bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto py-12">
              <h1 className="text-3xl font-bold text-text mb-4">
                Ürün Bulunamadı
              </h1>
              <Link href="/ikinci-el" className="text-primary hover:underline">
                İkinci El ürünler sayfasına dön
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />

      <section className="pt-[104px] min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8">
              <Link href="/ikinci-el" className="text-text-light hover:text-primary transition-colors">
                İkinci El
              </Link>
              <span className="text-text-light">/</span>
              <Link 
                href={`/ikinci-el?category=${product.category.id}`} 
                className="text-text-light hover:text-primary transition-colors"
              >
                {product.category.name}
              </Link>
              <span className="text-text-light">/</span>
              <span className="text-primary font-medium">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Sol Taraf - Ürün Görselleri */}
              <div className="space-y-6">
                {/* Ana Görsel */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {/* Durum Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'available' ? 'bg-green-100 text-green-800' :
                      product.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status === 'available' ? 'Satılık' :
                       product.status === 'reserved' ? 'Rezerve' :
                       'Satıldı'}
                    </span>
                  </div>
                </motion.div>

                {/* Küçük Görseller */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-4 gap-4"
                >
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm transition-all ${
                        selectedImage === index ? 'ring-2 ring-primary' : 'hover:ring-2 ring-primary/50'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} Görsel ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </motion.div>
              </div>

              {/* Sağ Taraf - Ürün Bilgileri */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                {/* Başlık ve Temel Bilgiler */}
                <div>
                  <h1 className="text-3xl font-bold text-text mb-4">
                    {product.name}
                  </h1>
                  <p className="text-text-light leading-relaxed mb-8">
                    {product.description}
                  </p>
                  
                  {/* Temel Özellikler */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-sm text-text-light mb-1">Üretim Yılı</div>
                      <div className="font-medium text-text">{product.year}</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-sm text-text-light mb-1">Durumu</div>
                      <div className="font-medium text-text">{product.condition}</div>
                    </div>
                    {product.workingHours && (
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="text-sm text-text-light mb-1">Çalışma Saati</div>
                        <div className="font-medium text-text">{product.workingHours}</div>
                      </div>
                    )}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-sm text-text-light mb-1">Konum</div>
                      <div className="font-medium text-text">{product.location}</div>
                    </div>
                  </div>
                </div>

                {/* Teknik Özellikler */}
                <div>
                  <h2 className="text-xl font-semibold text-text mb-4">Teknik Özellikler</h2>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {product.specifications.map((spec, index) => (
                        <div key={index}>
                          <div className="text-sm text-text-light mb-1">{spec.label}</div>
                          <div className="font-medium text-text">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* İletişim Butonu */}
                <div className="pt-4">
                  <Link
                    href="/iletisim"
                    className="w-full bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Bu Ürün Hakkında Bilgi Al
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 