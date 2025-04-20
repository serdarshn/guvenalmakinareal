'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useClientTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export default function AccessibilityPage() {
  const { locale } = useClientTranslation(['common']);
  const [isEnglish, setIsEnglish] = useState(false);
  
  useEffect(() => {
    setIsEnglish(locale === 'en');
  }, [locale]);

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
                  {isEnglish ? 'Accessibility' : 'Erişilebilirlik'}
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  {isEnglish ? 'An accessible web experience for everyone' : 'Herkes için erişilebilir bir web deneyimi'}
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-strong:text-black prose-h2:text-black prose-p:text-black prose-li:text-black">
            <h2 className="text-black font-bold">
              {isEnglish ? 'General Information' : 'Genel Bilgilendirme'}
            </h2>
            <p className="font-semibold text-black">
              {isEnglish 
                ? 'At Güvenal Machinery, we make every effort to design our website in a way that is easily accessible and usable by all our users. Our site has been developed to be compatible with different devices and browsers.' 
                : 'Güvenal Makina olarak, web sitemizi tüm kullanıcılarımızın kolayca erişebileceği ve kullanabileceği şekilde tasarlamaya özen gösteriyoruz. Sitemiz, farklı cihazlar ve tarayıcılarla uyumlu olacak şekilde geliştirilmiştir.'}
            </p>

            <h2 className="text-black font-bold">
              {isEnglish ? 'Accessibility Features' : 'Erişilebilirlik Özellikleri'}
            </h2>
            <ul className="text-black font-semibold">
              <li>{isEnglish ? 'Easy navigation and clear site structure' : 'Kolay gezinme ve net site yapısı'}</li>
              <li>{isEnglish ? 'Alternative texts for visual contents' : 'Görsel içeriklere alternatif metinler'}</li>
              <li>{isEnglish ? 'Compatibility with mobile devices' : 'Mobil cihazlarla uyumluluk'}</li>
              <li>{isEnglish ? 'Compliance with WCAG 2.1 standards' : 'WCAG 2.1 standartlarına uygunluk'}</li>
            </ul>

            <h2 className="text-black font-bold">
              {isEnglish ? 'JavaScript Usage' : 'JavaScript Kullanımı'}
            </h2>
            <p className="font-semibold text-black">
              {isEnglish
                ? 'Our website uses modern web technologies to provide you with a better experience. Interactive features such as form validations, dynamic page transitions, and mobile menus are provided with JavaScript. Basic site functions are designed to work even when JavaScript is disabled.'
                : 'Web sitemiz, modern web teknolojilerini kullanarak size daha iyi bir deneyim sunmaktadır. Sitemizde form doğrulamaları, dinamik sayfa geçişleri ve mobil menü gibi interaktif özellikler JavaScript ile sağlanmaktadır. Temel site işlevleri, JavaScript devre dışı bırakıldığında da çalışacak şekilde tasarlanmıştır.'}
            </p>

            <div className="bg-primary/5 p-6 rounded-xl mt-8">
              <h3 className="text-black font-bold">
                {isEnglish ? 'Feedback' : 'Geri Bildirim'}
              </h3>
              <p className="mb-0 font-semibold text-black">
                {isEnglish
                  ? 'Please let us know through the contact form about any accessibility issues you encounter on our website. Your feedback will help us make our site more accessible.'
                  : 'Sitemizde karşılaştığınız herhangi bir erişilebilirlik sorunu için lütfen iletişim formu üzerinden bize bildirin. Geri bildirimleriniz, sitemizi daha erişilebilir hale getirmemize yardımcı olacaktır.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}