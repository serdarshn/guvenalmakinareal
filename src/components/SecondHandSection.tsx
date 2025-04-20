import Link from 'next/link';
import Image from 'next/image';
import { useClientTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export default function SecondHandSection() {
  const { locale } = useClientTranslation(['common']);
  const [isEnglish, setIsEnglish] = useState(false);
  
  useEffect(() => {
    setIsEnglish(locale === 'en');
  }, [locale]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.pexels.com/photos/3822927/pexels-photo-3822927.jpeg"
          alt={isEnglish ? "Second Hand Machines" : "İkinci El Makineler"}
          fill
          className="object-cover brightness-[0.2]"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left side - Content */}
            <div className="flex-1 text-white">
              <div className="inline-block bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                {isEnglish ? "Second Hand Machines" : "İkinci El Makineler"}
              </div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                {isEnglish ? (
                  <>
                    Quality and Well-Maintained<br />
                    <span className="text-primary">Second Hand</span> Machines
                  </>
                ) : (
                  <>
                    Kaliteli ve Bakımlı<br />
                    <span className="text-primary">İkinci El</span> Makineler
                  </>
                )}
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                {isEnglish 
                  ? "Visit our second-hand products page for pre-owned industrial machines that have been maintained and tested with Güvenal Machinery's guarantee."
                  : "Güvenal Makina garantisi ile bakımı yapılmış ve test edilmiş ikinci el endüstriyel makineler için ikinci el ürünler sayfamızı ziyaret edin."}
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  href="/products?filter=second-hand"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary/25"
                >
                  {isEnglish ? "Browse Second Hand Products" : "İkinci El Ürünlere Göz At"}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm"
                >
                  {isEnglish ? "Contact Us" : "Bizimle İletişime Geçin"}
                </Link>
              </div>
            </div>

            {/* Right side - Statistics */}
            <div className="grid grid-cols-2 gap-6 md:w-[400px]">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-white/80">{isEnglish ? "Years of Experience" : "Yıllık Deneyim"}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-white/80">{isEnglish ? "Satisfied Customers" : "Memnun Müşteri"}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-white/80">{isEnglish ? "Completed Projects" : "Tamamlanan Proje"}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-white/80">{isEnglish ? "Customer Satisfaction" : "Müşteri Memnuniyeti"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 