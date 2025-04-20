'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useClientTranslation } from '@/lib/i18n';
import { useState, useEffect } from 'react';

export default function CorporateSection() {
  const { t } = useClientTranslation(['common']);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sadece istemci tarafında çevirileri göster
  const getTranslation = (key: string, fallback: string = '') => {
    if (!isMounted) return fallback;
    try {
      const translated = t(key);
      return translated === key ? fallback : translated;
    } catch (error) {
      console.error('Çeviri hatası:', error);
      return fallback;
    }
  };

  return (
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

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
                {getTranslation('corporateSection.title', 'Güvenal Makina –')} <span className="text-primary">{getTranslation('corporateSection.titleHighlight', 'Güvenal Group\'un Güçlü Markası')}</span>
              </h2>
              <p className="text-text-light text-lg max-w-4xl mx-auto">
                {getTranslation('corporateSection.description1', 'Güvenal Makina, Güvenal Group bünyesinde faaliyet gösteren ve takım tezgahları sektöründe öncü çözümler sunan bir markadır. 40 yılı aşkın deneyimimiz ve 150 kişilik uzman ekibimizle, sanayi üretimine yüksek kalite, yenilikçi teknoloji ve verimli çözümler sunuyoruz.')}
                <br /><br />
                {getTranslation('corporateSection.description2', '22 yıldır üniversal takım tezgahları ve CNC makinaları satışıyla müşterilerimizin üretim gücünü artırıyoruz. Müşterilerimize yalnızca satış sürecinde değil, 7/24 teknik servis desteği ve orijinal yedek parça temini ile de kesintisiz hizmet sunuyoruz.')}
              </p>
            </motion.div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                key: 'experience',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                key: 'team',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                key: 'support',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">{getTranslation(`corporateSection.stats.${stat.key}.value`, '40+')}</div>
                    <div className="text-sm text-text-light">{getTranslation(`corporateSection.stats.${stat.key}.label`, 'Years of Experience')}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 relative"
            >
              <div className="relative z-10 bg-white p-4 rounded-2xl shadow-xl overflow-hidden group">
                <div className="aspect-[16/9] rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/Hakkimizda/hakkimizdafoto.jpg"
                    alt={getTranslation('corporateSection.imageAlt', 'Güvenal Makina')}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[98%] h-[98%] bg-primary/5 rounded-2xl -rotate-2"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[96%] h-[96%] bg-primary/10 rounded-2xl rotate-2"></div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {[
                {
                  key: 'team',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )
                },
                {
                  key: 'experience',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  )
                },
                {
                  key: 'service',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 text-primary-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">{getTranslation(`corporateSection.features.${feature.key}.title`, 'Team of 150 Experts')}</h3>
                  <p className="text-text-light text-sm">{getTranslation(`corporateSection.features.${feature.key}.description`, 'Strong production capacity with a team of 150 experts')}</p>
                </motion.div>
              ))}

              <Link
                href="/corporate"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-xl font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary/25 w-full justify-center text-sm sm:text-base"
              >
                {getTranslation('corporateSection.cta', 'Güvenal Makina ile üretiminize güç katın, geleceğe güvenle ilerleyin!')}
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
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