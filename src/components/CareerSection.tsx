'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useClientTranslation } from '@/lib/i18n';
import { useState, useEffect } from 'react';

export default function CareerSection() {
  const { t, initialized } = useClientTranslation(['common']);
  const [mounted, setMounted] = useState(false);
  
  // Client tarafında olduğumuzu kontrol et
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Client tarafında ve çeviriler yüklenmediyse yükleme durumunu göster
  if (!mounted || !initialized) {
    return (
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-10 bg-gray-200 rounded w-64"></div>
              <div className="h-4 bg-gray-200 rounded w-full max-w-lg"></div>
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="career-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#career-grid)"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-text">
                  {t('careerSection.title', 'Kariyer')} <span className="text-primary">{t('careerSection.titleHighlight', 'Fırsatları')}</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {t('careerSection.description', 'Güvenal Makina\'da kariyer fırsatları ve açık pozisyonlar hakkında bilgi alın')}
                </p>

                {/* Benefits */}
                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  {[
                    {
                      title: t('careerSection.benefits.development.title', 'Sürekli Gelişim'),
                      description: t('careerSection.benefits.development.description', 'Profesyonel gelişim programları ve eğitim fırsatları'),
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      )
                    },
                    {
                      title: t('careerSection.benefits.environment.title', 'Dinamik Ortam'),
                      description: t('careerSection.benefits.environment.description', 'Yenilikçi ve teknoloji odaklı çalışma kültürü'),
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )
                    },
                    {
                      title: t('careerSection.benefits.benefits.title', 'Sosyal Haklar'),
                      description: t('careerSection.benefits.benefits.description', 'Rekabetçi maaş ve kapsamlı yan haklar paketi'),
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )
                    },
                    {
                      title: t('careerSection.benefits.teamwork.title', 'Takım Ruhu'),
                      description: t('careerSection.benefits.teamwork.description', 'Destekleyici ve işbirlikçi çalışma ortamı'),
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
                    >
                      <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 text-primary-600">
                        {benefit.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-text mb-2">{benefit.title}</h3>
                      <p className="text-text-light text-sm">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/kariyer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary/25"
                  >
                    {t('careerSection.viewPositions', 'Açık Pozisyonları İncele')}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Image */}
            <div className="relative lg:h-[600px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative h-full"
              >
                {/* Main Image Container */}
                <div className="relative z-10 bg-white p-4 rounded-2xl shadow-xl rotate-3 transform hover:rotate-0 transition-transform duration-500">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                    <Image
                      src="/images/kariyer.webp"
                      alt={t('careerSection.imageAlt', 'Kariyer Fırsatları')}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-primary/5 rounded-2xl -rotate-3"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-primary/10 rounded-2xl rotate-6"></div>

                {/* Floating Elements */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary-500/20 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary-500/20 rounded-full filter blur-3xl"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Dots */}
      <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
      <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
      <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>
    </section>
  );
} 