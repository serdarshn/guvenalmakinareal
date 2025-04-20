'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useClientTranslation } from '@/lib/i18n';
import { useState, useEffect } from 'react';

export default function Footer() {
  const { t, locale } = useClientTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const isEnglish = locale === 'en';

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
    <footer className="bg-background-dark text-white">
      {/* Üst Kısım */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Şirket Bilgileri */}
            <div className="space-y-6">
              <Link href={isEnglish ? "/?lang=en" : "/"} className="block">
                <Image
                  src="/logo.png"
                  alt="Güvenal Makina Logo"
                  width={180}
                  height={48}
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                {getTranslation('footer.companyDesc', '1983\'ten beri endüstriyel makina sektöründe öncü çözümler sunuyoruz. Kalite ve güvenilirlik ilkelerimizle müşterilerimize en iyi hizmeti sağlıyoruz.')}
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Hızlı Linkler */}
            <div>
              <h3 className="text-lg font-semibold mb-6">{getTranslation('footer.quickLinks', 'Hızlı Linkler')}</h3>
              <ul className="space-y-4">
                <li>
                  <Link href={isEnglish ? "/?lang=en" : "/"} className="text-gray-400 hover:text-primary transition-colors">
                    {getTranslation('footer.homePage', 'Ana Sayfa')}
                  </Link>
                </li>
                <li>
                  <Link href={isEnglish ? "/kurumsal?lang=en" : "/kurumsal"} className="text-gray-400 hover:text-primary transition-colors">
                    {getTranslation('footer.corporate', 'Kurumsal')}
                  </Link>
                </li>
                <li>
                  <Link href={isEnglish ? "/urunler?lang=en" : "/urunler"} className="text-gray-400 hover:text-primary transition-colors">
                    {getTranslation('footer.ourProducts', 'Ürünler')}
                  </Link>
                </li>
                <li>
                  <Link href={isEnglish ? "/kariyer?lang=en" : "/kariyer"} className="text-gray-400 hover:text-primary transition-colors">
                    {getTranslation('footer.career', 'Kariyer')}
                  </Link>
                </li>
                <li>
                  <Link href={isEnglish ? "/guvenal-shop?lang=en" : "/guvenal-shop"} className="text-gray-400 hover:text-primary transition-colors">
                    {getTranslation('header.guvenaShop', 'Güvenal Shop')}
                  </Link>
                </li>
                <li>
                  <Link href={isEnglish ? "/iletisim?lang=en" : "/iletisim"} className="text-gray-400 hover:text-primary transition-colors">
                    {getTranslation('footer.contact', 'İletişim')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* İletişim Bilgileri */}
            <div>
              <h3 className="text-lg font-semibold mb-6">{getTranslation('footer.contactUs', 'İletişim')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400 text-sm leading-relaxed">
                    {getTranslation('footer.address', 'Organize Sanayi Bölgesi, 1. Cadde No: 123 34555 İstanbul / Türkiye')}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">{getTranslation('footer.phone', '+90 (212) 123 45 67')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">{getTranslation('footer.email', 'info@guvenalmakina.com')}</span>
                </li>
              </ul>
            </div>

            {/* Çalışma Saatleri */}
            <div>
              <h3 className="text-lg font-semibold mb-6">{getTranslation('footer.workingHours', 'Çalışma Saatleri')}</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-white">{getTranslation('footer.mondayToFriday', 'Pazartesi - Cuma')}</p>
                    <p className="text-gray-400">{getTranslation('footer.time1', '09:00 - 18:00')}</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-white">{getTranslation('footer.saturday', 'Cumartesi')}</p>
                    <p className="text-gray-400">{getTranslation('footer.time2', '09:00 - 14:00')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Kısım */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <div className="flex flex-col md:flex-row gap-6">
                  <Link href="/kullanim-kosullari" className="text-gray-400 hover:text-primary text-sm transition-colors">
                    {getTranslation('footer.termsOfUse', 'Kullanım Koşulları')}
                  </Link>
                  <Link href="/gizlilik-bildirimi" className="text-gray-400 hover:text-primary text-sm transition-colors">
                    {getTranslation('footer.privacyPolicy', 'Gizlilik Bildirimi')}
                  </Link>
                  <Link href="/erisilebilirlik" className="text-gray-400 hover:text-primary text-sm transition-colors">
                    {getTranslation('footer.accessibilityStatement', 'Erişilebilirlik')}
                  </Link>
                </div>
              </div>
              <div className="md:col-span-2 text-right">
                <p className="text-gray-400 text-sm">
                  © 2024 Güvenal Makina. {getTranslation('footer.allRightsReserved', 'Tüm hakları saklıdır.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 