'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useClientTranslation } from '@/lib/i18n';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { t, initialized, locale } = useClientTranslation(['common']);
  const isEnglish = locale === 'en';

  // Client-side rendering kontrolü
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Ana menü öğeleri
  const mainMenuItems = useMemo(() => {
    if (!isMounted || !initialized) return [];
    
    return [
      {
        name: t('header.products'),
        slug: '/urunler?filter=urunler',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
      },
      {
        name: t('header.secondHand'),
        slug: '/urunler?filter=ikinci-el',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        name: t('header.spareParts'),
        slug: '/urunler?filter=yedek-parca',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        )
      },
      {
        name: t('header.accessories'),
        slug: '/urunler?filter=aksesuar',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        )
      },
      {
        name: t('header.campaigns'),
        slug: '/urunler?filter=kampanya',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        )
      }
    ];
  }, [t, isMounted, initialized]);

  // Ürün kategorileri
  const productCategories = useMemo(() => {
    if (!isMounted || !initialized) return [];
    
    return [
      {
        name: t('productCategories.cncDoubleColumn'),
        slug: 'cnc-double-kolon',
        subcategories: ['DK-1000', 'DK-2000', 'DK-3000']
      },
      {
        name: t('productCategories.edmMachines'),
        slug: 'dalma-erozyon',
        subcategories: ['EDM-800', 'EDM-1000', 'EDM-1200']
      },
      {
        name: t('productCategories.millingMachines'),
        slug: 'kalipci-freze',
        subcategories: ['KF-2000', 'KF-3000', 'KF-4000']
      }
    ];
  }, [t, isMounted, initialized]);

  // İçerik henüz client-side render edilmediyse veya çeviriler yüklenmediyse
  if (!isMounted || !initialized) {
    return <div className="fixed w-full top-0 z-50 h-[144px] bg-white"></div>;
  }

  return (
    <header className="fixed w-full top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center text-sm py-2 sm:py-0 sm:h-10">
            {/* Mobil için yeniden düzenlenmiş servis ve satış numaraları */}
            <div className="flex justify-center sm:justify-start w-full sm:w-auto items-center gap-4 sm:gap-0 sm:divide-x divide-white/20 py-1 sm:py-0">
              <div className="flex items-center whitespace-nowrap sm:pr-3 md:pr-4">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-white/70 mr-1 md:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-white/70 text-xs md:text-sm">{t('header.service')}:</span>
                <a href="tel:+905334251321" className="ml-1 md:ml-2 text-white hover:text-white/90 transition-colors tracking-wider text-xs md:text-sm">
                  0533 425 13 21
                </a>
              </div>
              <div className="flex items-center whitespace-nowrap sm:pl-3 md:pl-4">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-white/70 mr-1 md:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium text-white/70 text-xs md:text-sm">{t('header.sales')}:</span>
                <a href="tel:+905304040778" className="ml-1 md:ml-2 text-white hover:text-white/90 transition-colors tracking-wider text-xs md:text-sm">
                  0530 404 07 78
                </a>
              </div>
            </div>

            {/* E-Katalog, Sosyal Medya ve Dil Seçimi */}
            <div className="flex items-center justify-center sm:ml-auto border-t border-white/20 sm:border-t-0 mt-1 pt-1 sm:mt-0 sm:pt-0">
              {/* Sosyal Medya (mobilde de gösteriliyor) */}
              <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 sm:pl-3 md:pl-6 sm:border-l sm:border-white/20">
                <a href="#" className="text-white hover:text-white p-1 md:p-1.5 hover:bg-primary-600/50 rounded-full transition-all">
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-white p-1 md:p-1.5 hover:bg-primary-600/50 rounded-full transition-all">
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-white p-1 md:p-1.5 hover:bg-primary-600/50 rounded-full transition-all">
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>

              {/* E-Katalog */}
              <div className="flex items-center space-x-3 md:space-x-6 pl-3 md:pl-6 border-l border-white/20">
                <Link 
                  href={isEnglish ? "/e-katalog?lang=en" : "/e-katalog"} 
                  className="flex items-center gap-1 text-xs md:text-sm text-white hover:text-white/90 transition-colors"
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>E-Katalog</span>
                </Link>
              </div>

              {/* Dil Seçimi */}
              <div className="flex items-center px-3 md:px-6">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ana Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-soft z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 w-[200px]">
              <Link href={isEnglish ? "/?lang=en" : "/"} className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Güvenal Makina Logo"
                  width={128}
                  height={40}
                  priority={true}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            
            {/* Mobil hamburger menü butonu */}
            <button
              className="md:hidden ml-auto flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
              <Link href={isEnglish ? "/kurumsal?lang=en" : "/kurumsal"} className="text-text hover:text-primary-500 px-3 py-2 text-[15px] font-medium rounded-lg hover:bg-primary-50 transition-all flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-sm font-medium">{t('header.corporate')}</span>
              </Link>
              
              {/* Ürünler Menüsü */}
              <div className="relative group">
                <button
                  onClick={() => {
                    window.location.href = isEnglish ? '/urunler?filter=urunler&lang=en' : '/urunler?filter=urunler';
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 text-[15px] font-medium hover:text-primary transition-colors ${
                    pathname === '/urunler' ? 'text-primary' : 'text-text'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{t('header.products')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                  <div className="p-2">
                    {mainMenuItems.map((item) => (
                      <a
                        key={item.slug}
                        href={isEnglish ? `${item.slug}&lang=en` : item.slug}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-text hover:text-primary transition-colors"
                      >
                        {item.icon}
                        <span className="text-[14px] font-medium">{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <Link href={isEnglish ? "/kariyer?lang=en" : "/kariyer"} className="text-text hover:text-primary-500 px-3 py-2 text-[15px] font-medium rounded-lg hover:bg-primary-50 transition-all flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">{t('header.career')}</span>
              </Link>

              <Link href={isEnglish ? "/guvenal-shop?lang=en" : "/guvenal-shop"} className="text-text hover:text-primary-500 px-3 py-2 text-[15px] font-medium rounded-lg hover:bg-primary-50 transition-all flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">{t('header.guvenaShop')}</span>
              </Link>
            </nav>

            {/* Bize Ulaşın ve Kampanyalar Butonları */}
            <div className="hidden md:flex w-[300px] items-center justify-end gap-3">
              <Link
                href={isEnglish ? "/iletisim" : "/iletisim"}
                className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-600 transition-colors text-[15px] font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{t('header.contactUs')}</span>
              </Link>
              <Link
                href="/urunler?filter=kampanya"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = isEnglish ? '/urunler?filter=kampanya&lang=en' : '/urunler?filter=kampanya';
                }}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors text-[15px] font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <span>{t('header.campaigns')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white/80 backdrop-blur-xl border-t border-gray-100`}>
        <div className="max-w-7xl mx-auto divide-y divide-gray-100">
          <div className="py-3 px-4 space-y-1">
            <Link href={isEnglish ? "/?lang=en" : "/"} className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-sm font-medium">{t('header.homePage')}</span>
            </Link>

            <Link href={isEnglish ? "/kurumsal?lang=en" : "/kurumsal"} className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-sm font-medium">{t('header.corporate')}</span>
            </Link>

            <Link href="/urunler" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = isEnglish ? '/urunler?filter=urunler&lang=en' : '/urunler?filter=urunler';
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{t('header.products')}</span>
            </Link>

            <Link href="/ikinci-el" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = isEnglish ? '/urunler?filter=ikinci-el&lang=en' : '/urunler?filter=ikinci-el';
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{t('header.secondHand')}</span>
            </Link>

            <Link href="/yedek-parca" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = isEnglish ? '/urunler?filter=yedek-parca&lang=en' : '/urunler?filter=yedek-parca';
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{t('header.spareParts')}</span>
            </Link>

            <Link href={isEnglish ? "/e-katalog?lang=en" : "/e-katalog"} className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-sm font-medium">{t('header.eCatalog')}</span>
            </Link>

            <Link href={isEnglish ? "/kariyer?lang=en" : "/kariyer"} className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{t('header.career')}</span>
            </Link>

            <Link href={isEnglish ? "/guvenal-shop?lang=en" : "/guvenal-shop"} className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{t('header.guvenaShop')}</span>
            </Link>

            <Link href={isEnglish ? "/iletisim" : "/iletisim"} className="flex items-center gap-2 p-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white transition-all">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{t('header.contactUs')}</span>
            </Link>

            <Link 
              href="/aksesuar"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = isEnglish ? '/urunler?filter=aksesuar&lang=en' : '/urunler?filter=aksesuar';
              }}
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{t('header.accessories')}</span>
            </Link>
            
            <Link 
              href="/kampanyalar"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = isEnglish ? '/urunler?filter=kampanya&lang=en' : '/urunler?filter=kampanya';
              }}
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <span className="text-sm font-medium">{t('header.campaigns')}</span>
            </Link>

            <Link href={isEnglish ? "/sertifikalar?lang=en" : "/sertifikalar"} className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Sertifikalar</span>
            </Link>

            <Link href={isEnglish ? "/cozum-ortaklari?lang=en" : "/cozum-ortaklari"} className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Çözüm Ortakları</span>
            </Link>
          </div>

          {/* Mobile Ürünler Accordion */}
          <div className="py-3 px-4">
            <div className="text-xs font-medium text-text-light mb-2 px-2">{t('header.productCategories')}</div>
            <div className="space-y-1">
              {productCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/urunler?category=${category.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium flex-1 text-left">{category.name}</span>
                  <svg className="w-4 h-4 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 