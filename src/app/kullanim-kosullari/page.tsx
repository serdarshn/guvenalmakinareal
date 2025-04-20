'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useClientTranslation } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export default function TermsOfUsePage() {
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
                  {isEnglish ? 'Terms of Use' : 'Kullanım Koşulları'}
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  {isEnglish 
                    ? 'Terms and conditions regarding the use of our website'
                    : 'Web sitemizin kullanımına ilişkin şartlar ve koşullar'}
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
          <div className="max-w-4xl mx-auto prose prose-lg prose-strong:text-black prose-h2:text-black prose-p:text-black">
            <h2 className="text-black font-bold">{isEnglish ? 'Welcome' : 'Hoş Geldiniz'}</h2>
            <p className="font-semibold text-black">
              {isEnglish 
                ? 'Welcome to guvenalmakina.com.tr. By visiting our website, you are deemed to have accepted the following terms of use. Please read these terms carefully before using our site.'
                : 'guvenalmakina.com.tr web sitesine hoş geldiniz. Web sitemizi ziyaret ederek aşağıdaki kullanım koşullarını kabul etmiş sayılmaktasınız. Sitemizi kullanmadan önce lütfen bu koşulları dikkatlice okuyunuz.'}
            </p>

            <h2 className="text-black font-bold">{isEnglish ? 'Contact and Applications' : 'İletişim ve Başvurular'}</h2>
            <p className="font-semibold text-black">
              {isEnglish
                ? 'All communications and applications you make through our website will be evaluated during business hours.'
                : 'Web sitemiz üzerinden yapacağınız tüm iletişim ve başvurular mesai saatleri içerisinde değerlendirilecektir.'}
            </p>

            <h2 className="text-black font-bold">{isEnglish ? 'Membership' : 'Üyelik'}</h2>
            <p className="font-semibold text-black">
              {isEnglish
                ? 'Membership may be required to benefit from some services offered on our website. Membership is free and completely optional.'
                : 'Web sitemizde sunulan bazı hizmetlerden faydalanmak için üyelik gerekebilir. Üyelik ücretsizdir ve tamamen isteğe bağlıdır.'}
            </p>

            <h2 className="text-black font-bold">{isEnglish ? 'Personal Information and Privacy' : 'Kişisel Bilgiler ve Gizlilik'}</h2>
            <p className="font-semibold text-black">
              {isEnglish
                ? 'Your personal information is protected in accordance with our privacy policy. For detailed information, you can review our privacy statement.'
                : 'Kişisel bilgileriniz, gizlilik politikamız doğrultusunda korunmaktadır. Detaylı bilgi için gizlilik bildirimimizi inceleyebilirsiniz.'}
            </p>

            <h2 className="text-black font-bold">{isEnglish ? 'Right to Change' : 'Değişiklik Hakkı'}</h2>
            <p className="font-semibold text-black">
              {isEnglish
                ? 'Güvenal Machinery reserves the right to change any information and content, products and services on the website without prior notice.'
                : 'Güvenal Makina, web sitesinde yer alan her türlü bilgi ve içeriği, ürün ve hizmetleri önceden bildirimde bulunmaksızın değiştirme hakkını saklı tutar.'}
            </p>

            <div className="bg-primary/5 p-6 rounded-xl mt-8">
              <p className="text-sm text-text mb-0">
                {isEnglish
                  ? 'By continuing to use our website, you are deemed to have accepted all the terms stated above. Thank you.'
                  : 'Web sitemizi kullanmaya devam ederek yukarıda belirtilen tüm koşulları kabul etmiş sayılırsınız. Teşekkür ederiz.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 