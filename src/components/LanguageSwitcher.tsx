'use client';

import { useClientTranslation } from '@/lib/i18n';
import { useCallback } from 'react';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { locale, changeLanguage } = useClientTranslation();
  
  // Türkçe ve İngilizce butonları için durumları belirle
  const isTurkish = locale === 'tr';
  const isEnglish = locale === 'en';
  
  // Butona tıklandığında dil değiştir
  const switchLanguage = useCallback((language: string) => {
    if (locale === language) return; // Zaten aktif dile tıklandıysa işlem yapma
    changeLanguage(language);
  }, [locale, changeLanguage]);
  
  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={() => switchLanguage('tr')}
        className={`text-sm font-medium transition-colors ${
          isTurkish ? 'text-white font-medium' : 'text-white/80 hover:text-white'
        }`}
        aria-label="Türkçe'ye geç"
      >
        TR
      </button>
      <span className="mx-2 text-white/30">|</span>
      <button
        onClick={() => switchLanguage('en')}
        className={`text-sm font-medium transition-colors ${
          isEnglish ? 'text-white font-medium' : 'text-white/80 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
} 