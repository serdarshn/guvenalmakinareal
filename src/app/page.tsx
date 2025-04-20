'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSlider';
import BrandSection from '@/components/BrandSlider';
import CorporateSection from '@/components/CorporateSection';
import ProductsSection from '@/components/ProductsSection';
import SecondHandSection from '@/components/SecondHandSection';
import CareerSection from '@/components/CareerSection';
import Link from 'next/link';
import { useClientTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export default function Home() {
  const { locale } = useClientTranslation(['common']);
  const [isEnglish, setIsEnglish] = useState(false);
  
  useEffect(() => {
    setIsEnglish(locale === 'en');
  }, [locale]);

  return (
    <main>
      <Header />
      <div className="pt-[104px]"> {/* Header (64px) + Top Bar (40px) yüksekliği kadar padding */}
        <HeroSection />
        <BrandSection />
        <CorporateSection />
        <ProductsSection />

        {/* Features Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="features-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#features-grid)"/>
              </svg>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full filter blur-3xl"></div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {/* E-Catalog */}
                <Link href={isEnglish ? "/e-katalog?lang=en" : "/e-katalog"} className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative shadow-inner">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-text mb-3 relative">{isEnglish ? "E-Catalog" : "E-Katalog"}</h3>
                    <p className="text-text-light relative h-[48px]">{isEnglish ? "You can browse and download our product catalog." : "Ürün kataloğumuzu inceleyebilir ve indirebilirsiniz."}</p>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center gap-2 text-primary-600 font-semibold relative">
                      <span>{isEnglish ? "View" : "İncele"}</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>

                {/* Certificates */}
                <Link href={isEnglish ? "/sertifikalar?lang=en" : "/sertifikalar"} className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative shadow-inner">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-text mb-3 relative">{isEnglish ? "Certificates" : "Sertifikalar"}</h3>
                    <p className="text-text-light relative h-[48px]">{isEnglish ? "You can review our quality and safety certificates." : "Kalite ve güvenlik sertifikalarımızı inceleyebilirsiniz."}</p>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center gap-2 text-primary-600 font-semibold relative">
                      <span>{isEnglish ? "View" : "İncele"}</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>

                {/* Solution Partners */}
                <Link href={isEnglish ? "/solution-partners?lang=en" : "/solution-partners"} className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative shadow-inner">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-text mb-3 relative">{isEnglish ? "Solution Partners" : "Çözüm Ortakları"}</h3>
                    <p className="text-text-light relative h-[48px]">{isEnglish ? "View our business and solution partners." : "İş ve çözüm ortaklarımızı inceleyebilirsiniz."}</p>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center gap-2 text-primary-600 font-semibold relative">
                      <span>{isEnglish ? "View" : "İncele"}</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Dots */}
          <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
          <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
          <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>
        </section>

        <SecondHandSection />
        <CareerSection />

        {/* Contact CTA Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-800">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)"/>
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side */}
                <div className="text-white space-y-8">
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                    {isEnglish ? (
                      <>
                        The Best Machinery Solutions <br />
                        <span className="text-primary-200">For Your Project</span>
                      </>
                    ) : (
                      <>
                        En İyi Makine Çözümleri <br />
                        <span className="text-primary-200">Projeleriniz İçin</span>
                      </>
                    )}
                  </h2>
                  <p className="text-white/80 text-lg max-w-xl">
                    {isEnglish 
                      ? "With over 40 years of experience, we are at your service for your industrial machinery needs. We offer customized solutions with our expert team."
                      : "40 yılı aşkın deneyimimizle endüstriyel makine ihtiyaçlarınız için hizmetinizdeyiz. Uzman ekibimizle özel çözümler sunuyoruz."}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href={isEnglish ? "/iletisim?lang=en" : "/iletisim"}
                      className="inline-flex items-center gap-2 bg-white text-primary-900 px-8 py-4 rounded-xl font-medium hover:bg-primary-50 transition-colors"
                    >
                      {isEnglish ? "Contact Us" : "Bizimle İletişime Geçin"}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <a 
                      href="tel:+902164990983" 
                      className="inline-flex items-center gap-2 bg-primary-700/30 text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-700/40 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      0216 499 09 83
                    </a>
                  </div>
                </div>

                {/* Right Side - Decorative Elements */}
                <div className="relative">
                  <div className="relative z-10">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="h-32 bg-primary-700/30 rounded-2xl backdrop-blur-sm border border-white/10"></div>
                        <div className="h-48 bg-primary-700/30 rounded-2xl backdrop-blur-sm border border-white/10"></div>
                      </div>
                      <div className="space-y-4 pt-8">
                        <div className="h-48 bg-primary-700/30 rounded-2xl backdrop-blur-sm border border-white/10"></div>
                        <div className="h-32 bg-primary-700/30 rounded-2xl backdrop-blur-sm border border-white/10"></div>
                      </div>
                    </div>
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-primary-400/20 rounded-full filter blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-200/20 rounded-full filter blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Dots */}
          <div className="absolute top-12 left-8 w-3 h-3 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-24 right-16 w-4 h-4 bg-white/20 rounded-full"></div>
          <div className="absolute top-1/2 right-32 w-2 h-2 bg-white/20 rounded-full"></div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
