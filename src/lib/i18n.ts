import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { useEffect, useState, useCallback, useRef } from 'react';

// Sabit değerler
const SUPPORTED_LANGUAGES = ['tr', 'en'];
const DEFAULT_LANGUAGE = 'tr';

// Server tarafında çevirileri yükleme fonksiyonu
export async function initTranslations(locale: string, namespaces: string[]) {
  // Geçerli dil kontrolü
  const validLocale = SUPPORTED_LANGUAGES.includes(locale) ? locale : DEFAULT_LANGUAGE;
  
  // Kaynakları tutacak boş obje
  const resources: Record<string, Record<string, Record<string, string>>> = {};
  
  // Her bir namespace için çeviri dosyalarını içe aktar
  for (const ns of namespaces) {
    try {
      const translations = await import(`../../public/locales/${validLocale}/${ns}.json`);
      if (!resources[validLocale]) resources[validLocale] = {};
      resources[validLocale][ns] = translations.default || translations;
    } catch (error) {
      console.error(`Çeviri dosyası yüklenemedi: ${validLocale}/${ns}`, error);
    }
  }

  // i18n konfigürasyonu
  await i18n
    .use(initReactI18next)
    .init({
      lng: validLocale,
      fallbackLng: DEFAULT_LANGUAGE,
      resources,
      defaultNS: namespaces[0],
      interpolation: {
        escapeValue: false
      }
    });

  return {
    i18n,
    resources,
    t: i18n.t.bind(i18n)
  };
}

// Client tarafında kullanılacak çeviri hook'u
export function useClientTranslation(namespaces: string[] = ['common']) {
  const [initialized, setInitialized] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const namespacesRef = useRef(namespaces);
  const isLoadingRef = useRef(false);

  // Çevirileri yükle
  const loadTranslations = useCallback(async (language: string) => {
    if (isLoadingRef.current) return;
    
    try {
      isLoadingRef.current = true;
      const validLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
      await initTranslations(validLanguage, namespacesRef.current);
      setCurrentLanguage(validLanguage);
      setInitialized(true);
    } catch (error) {
      console.error('Çeviriler yüklenirken hata oluştu:', error);
    } finally {
      isLoadingRef.current = false;
    }
  }, []);

  // namespacesRef'i güncel tut
  useEffect(() => {
    namespacesRef.current = namespaces;
  }, [namespaces]);

  // İlk yükleme
  useEffect(() => {
    if (typeof window === 'undefined' || initialized) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    const langToUse = urlLang && SUPPORTED_LANGUAGES.includes(urlLang) 
      ? urlLang 
      : DEFAULT_LANGUAGE;
    
    loadTranslations(langToUse);
  }, [loadTranslations, initialized]);

  // Dil değiştirme fonksiyonu
  const changeLanguage = useCallback((newLanguage: string) => {
    if (!SUPPORTED_LANGUAGES.includes(newLanguage)) return;
    if (newLanguage === currentLanguage) return;

    if (i18n) {
      i18n.changeLanguage(newLanguage);
    }
    
    setCurrentLanguage(newLanguage);
    
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const urlParams = new URLSearchParams(window.location.search);
      
      if (newLanguage === DEFAULT_LANGUAGE) {
        urlParams.delete('lang');
      } else {
        urlParams.set('lang', newLanguage);
      }
      
      const queryString = urlParams.toString();
      const newUrl = queryString 
        ? `${currentPath}?${queryString}` 
        : currentPath;
      
      window.location.href = newUrl;
    }
  }, [currentLanguage]);

  return {
    t: initialized ? i18n.t.bind(i18n) : (key: string) => key,
    i18n: initialized ? i18n : null,
    locale: currentLanguage,
    changeLanguage,
    initialized
  };
} 