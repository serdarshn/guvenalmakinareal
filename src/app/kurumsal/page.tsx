'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useClientTranslation } from '@/lib/i18n';
import Link from 'next/link';

export default function CorporatePage() {
  const [activeTab, setActiveTab] = useState('brands');
  const [selectedImage, setSelectedImage] = useState('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { locale, initialized } = useClientTranslation(['common']);
  const [, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      dragFree: false,
      containScroll: 'trimSnaps',
      slidesToScroll: 1,
      duration: 50
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      })
    ]
  );

  // Autoplay functionality
  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000); // Scroll every 3 seconds

      return () => clearInterval(autoplay);
    }
  }, [emblaApi]);

  if (!initialized) return null;

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
                  {locale === 'en' ? 'Corporate' : 'Kurumsal'}
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  {locale === 'en' 
                    ? 'Pioneering solutions in the industrial machinery sector since 1983'
                    : '1983\'ten beri endüstriyel makina sektöründe öncü çözümler'}
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

      {/* About Us Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="about-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#about-grid)"/>
            </svg>
          </div>
        </div>

        {/* Floating Dots */}
        <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
        <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
                {locale === 'en' ? 'About Us' : 'Hakkımızda'}
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-text mb-6">
                {locale === 'en' ? 'Güvenal Machinery' : 'Güvenal Makina'} <br />
                <span className="text-primary">
                  {locale === 'en' 
                    ? 'The Strong Brand of Güvenal Group' 
                    : 'Güvenal Group\'un Güçlü Markası'}
                </span>
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left side - Photo and Statistics */}
              <div className="lg:col-span-5 space-y-8">
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/Hakkimizda/hakkimizdafoto2.jpg"
                      alt={locale === 'en' ? 'Güvenal Machinery Production' : 'Güvenal Makina Üretim'}
                      fill
                      className="object-contain rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
                  </div>
                  
                  {/* Floating Stats */}
                  <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-xl shadow-xl">
                    <div className="text-3xl font-bold text-primary">40+</div>
                    <div className="text-sm text-text-light">
                      {locale === 'en' ? 'Years of Experience' : 'Yıllık Deneyim'}
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -left-4 bg-white p-6 rounded-xl shadow-xl">
                    <div className="text-3xl font-bold text-primary">150+</div>
                    <div className="text-sm text-text-light">
                      {locale === 'en' ? 'Expert Staff' : 'Uzman Personel'}
                    </div>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white rounded-xl p-6 shadow-soft border border-primary/10 transform hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-primary">22</div>
                    <div className="text-sm text-text-light">
                      {locale === 'en' ? 'Years of CNC Experience' : 'Yıllık CNC Deneyimi'}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-soft border border-primary/10 transform hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-lg font-bold text-primary">{locale === 'en' ? '24/7' : '7/24'}</div>
                    <div className="text-sm text-text-light">
                      {locale === 'en' ? 'Technical Support' : 'Teknik Destek'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="lg:col-span-7 space-y-8">
                <div className="prose prose-lg">
                  <div className="space-y-8">
                    <div className="bg-white rounded-2xl p-8 shadow-soft border border-primary/10">
                      <p className="text-xl font-medium text-text leading-relaxed mb-6">
                        {locale === 'en' 
                          ? 'Güvenal Machinery is a brand operating under Güvenal Group that provides pioneering solutions in the machine tools sector. With our experience of more than 40 years and our expert team of 150 people, we offer high quality, innovative technology and efficient solutions to industrial production.'
                          : 'Güvenal Makina, Güvenal Group bünyesinde faaliyet gösteren ve takım tezgahları sektöründe öncü çözümler sunan bir markadır. 40 yılı aşkın deneyimimiz ve 150 kişilik uzman ekibimizle, sanayi üretimine yüksek kalite, yenilikçi teknoloji ve verimli çözümler sunuyoruz.'}
                      </p>
                      
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/10 to-transparent my-6"></div>
                      
                      <p className="text-text-light">
                        {locale === 'en'
                          ? "For 22 years, we have been increasing our customers' production power by selling universal machine tools and CNC machines. We provide uninterrupted service to our customers not only during the sales process, but also with 24/7 technical service support and original spare parts supply."
                          : '22 yıldır üniversal takım tezgahları ve CNC makinaları satışıyla müşterilerimizin üretim gücünü artırıyoruz. Müşterilerimize yalnızca satış sürecinde değil, 7/24 teknik servis desteği ve orijinal yedek parça tedariki ile de kesintisiz hizmet sunuyoruz.'}
                      </p>
                    </div>

                    {/* Featured Characteristics */}
                    <div className="grid grid-cols-1 gap-6">
                      <div className="bg-white rounded-xl p-6 shadow-soft border border-primary/10 transform hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-text mb-2">
                              {locale === 'en' ? 'Expert Team of 150 People' : '150 Kişilik Uzman Kadro'}
                            </h3>
                            <p className="text-text-light">
                              {locale === 'en' 
                                ? 'We are always at your side with our strong production capacity and experienced team'
                                : 'Güçlü üretim kapasitesi ve deneyimli ekibimizle her zaman yanınızdayız'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-soft border border-primary/10 transform hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-text mb-2">
                              {locale === 'en' ? 'Continuous Technical Support' : 'Kesintisiz Teknik Destek'}
                            </h3>
                            <p className="text-text-light">
                              {locale === 'en'
                                ? 'We are by your side with 24/7 technical service support and original spare parts supply'
                                : '7/24 teknik servis desteği ve orijinal yedek parça tedariki ile yanınızdayız'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                      <p className="text-xl font-semibold text-primary mb-4">
                        {locale === 'en'
                          ? 'Power up your production with Güvenal Machinery, move forward to the future with confidence!'
                          : 'Güvenal Makina ile üretiminize güç katın, geleceğe güvenle ilerleyin!'}
                      </p>
                      <Link 
                        href={locale === 'en' ? "/iletisim?lang=en" : "/iletisim"} 
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors"
                      >
                        {locale === 'en' ? 'Contact Us' : 'Bizimle İletişime Geçin'}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="vision-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#vision-grid)"/>
            </svg>
          </div>
        </div>

        {/* Floating Dots */}
        <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
        <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
                {locale === 'en' ? 'Vision & Mission' : 'Vizyon & Misyon'}
              </div>
              <h2 className="text-4xl font-bold text-text mb-6">
                {locale === 'en' ? 'Goals That Shape the Future' : 'Geleceğe Yön Veren Hedefler'}
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Vision */}
              <div className="bg-white p-10 rounded-2xl shadow-soft border border-gray-100 relative">
                {/* Decorative Icon */}
                <div className="absolute -top-8 left-10">
                  <div className="w-16 h-16 bg-primary text-white rounded-2xl shadow-lg flex items-center justify-center transform -rotate-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-text mb-6">
                    {locale === 'en' ? 'Our Vision' : 'Vizyonumuz'}
                  </h3>
                  <p className="text-text-light text-lg leading-relaxed">
                    {locale === 'en' 
                      ? 'To become the leading company in our sector with the product quality, service, and added value we provide.'
                      : 'Sunduğumuz ürün kalitesi, hizmet ve katma değer ile sektörümüzün öncü firması haline gelmek.'}
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="bg-white p-10 rounded-2xl shadow-soft border border-gray-100 relative">
                {/* Decorative Icon */}
                <div className="absolute -top-8 left-10">
                  <div className="w-16 h-16 bg-primary text-white rounded-2xl shadow-lg flex items-center justify-center transform rotate-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-text mb-6">
                    {locale === 'en' ? 'Our Mission' : 'Misyonumuz'}
                  </h3>
                  <p className="text-text-light text-lg leading-relaxed">
                    {locale === 'en'
                      ? "In today's rapidly advancing technology, our priority is to closely follow technology worldwide and ensure that our industrialists continue their services with confident steps by using machines that will minimize costs and increase efficiency."
                      : 'Teknolojinin hızla ilerlediği günümüzde, dünya çapında teknolojiyi yakından takip ederek, sanayicilerimizin maliyetlerini en aza indirerek verimi arttıracak makinalarla hizmetlerine emin adımlarla devam etmesini sağlamak önceliğimizdir.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Branches Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="branches-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#branches-grid)"/>
            </svg>
          </div>
        </div>

        {/* Floating Dots */}
        <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
        <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
                {locale === 'en' ? 'Our Branches' : 'Şubelerimiz'}
              </div>
              <h2 className="text-4xl font-bold text-text mb-6">
                {locale === 'en' ? 'Our Branch Nearest to You' : 'Size En Yakın Şubemiz'}
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </div>

            {/* Branches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ikitelli Store */}
              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">
                      {locale === 'en' ? 'Ikitelli Store' : 'İkitelli Mağaza'}
                    </h3>
                    <p className="text-text-light mt-2">
                      İkitelli OSB Demirciler Küçük San. Sit. B1 Blok No: 34 K2 Başakşehir - 
                      {locale === 'en' ? 'Istanbul / TURKEY' : 'İstanbul / TÜRKİYE'}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-text-light">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:02126710910" className="hover:text-primary transition-colors">0212 671 09 10 pbx</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:ikitelli@guvenalmakina.com.tr" className="hover:text-primary transition-colors">ikitelli@guvenalmakina.com.tr</a>
                  </div>
                </div>
              </div>

              {/* Bayrampaşa Store */}
              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">
                      {locale === 'en' ? 'Bayrampaşa Store' : 'Bayrampaşa Mağaza'}
                    </h3>
                    <p className="text-text-light mt-2">
                      İsmet Paşa Mah. Abdi İpekçi Cad. No: 113 / 2 Bayrampaşa - 
                      {locale === 'en' ? 'Istanbul / TURKEY' : 'İstanbul / TÜRKİYE'}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-text-light">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:02125673887" className="hover:text-primary transition-colors">0212 567 38 87</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:bayrampasa@guvenalmakina.com.tr" className="hover:text-primary transition-colors">bayrampasa@guvenalmakina.com.tr</a>
                  </div>
                </div>
              </div>

              {/* Kıraç Store */}
              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">
                      {locale === 'en' ? 'Kıraç Store (Hardware)' : 'Kıraç Şube (Hırdavat)'}
                    </h3>
                    <p className="text-text-light mt-2">
                      Çakmaklı Mh. Akçaburgaz Mevkii ALKOP Sanayi Sitesi A11 Blok No: 17 Kıraç - Hadımköy - Büyükçekmece - İSTANBUL - 
                      {locale === 'en' ? 'TURKEY' : 'TÜRKİYE'}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-text-light">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:02128580081" className="hover:text-primary transition-colors">0212 858 00 81</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@guvenalmakina.com.tr" className="hover:text-primary transition-colors">info@guvenalmakina.com.tr</a>
                  </div>
                </div>
              </div>

              {/* Topçular */}
              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">
                      {locale === 'en' ? 'Topçular (Hardware)' : 'Topçular (Hırdavat)'}
                    </h3>
                    <p className="text-text-light mt-2">
                      Rami Kışla Cd. Emintaş 3 San. Sit. No:56-57-58 Topçular - Eyüp İSTANBUL - 
                      {locale === 'en' ? 'TURKEY' : 'TÜRKİYE'}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-text-light">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:02125015381" className="hover:text-primary transition-colors">0212 501 53 81</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@guvenalmakina.com.tr" className="hover:text-primary transition-colors">info@guvenalmakina.com.tr</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Brands and Solution Partners Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="partners-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#partners-grid)"/>
            </svg>
          </div>
        </div>

        {/* Floating Dots */}
        <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
        <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
                {locale === 'en' ? 'Our Business Partners' : 'İş Ortaklarımız'}
              </div>
              <h2 className="text-4xl font-bold text-text mb-6">
                {locale === 'en' ? 'Our Strong Collaborations' : 'Güçlü İş Birliklerimiz'}
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>

              {/* Tab Buttons */}
              <div className="flex justify-center gap-4 mb-12">
                <button 
                  onClick={() => setActiveTab('brands')}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'brands' 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-gray-100 text-text hover:bg-gray-200'
                  }`}
                >
                  {locale === 'en' ? 'Our Brands' : 'Markalarımız'}
                </button>
                <button 
                  onClick={() => setActiveTab('partners')}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'partners' 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-gray-100 text-text hover:bg-gray-200'
                  }`}
                >
                  {locale === 'en' ? 'Solution Partners' : 'Çözüm Ortaklarımız'}
                </button>
              </div>
            </div>

            {/* Brands Slider */}
            <div className={`transition-all duration-500 ${activeTab === 'brands' ? 'block' : 'hidden'}`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                {[
                  '/images/Markalar/marka1.jpg',
                  '/images/Markalar/marka2.jpg',
                  '/images/Markalar/marka3.jpg',
                  '/images/Markalar/marka4.png',
                  '/images/Markalar/marka5.png',
                  '/images/Markalar/marka6.jpg',
                  '/images/Markalar/marka7.jpg',
                  '/images/Markalar/marka8.jpg',
                  '/images/Markalar/marka9.jpg',
                  '/images/Markalar/marka10.png',
                  '/images/Markalar/marka11.png',
                  '/images/Markalar/marka12.jpg',
                  '/images/Markalar/marka13.jpg',
                  '/images/Markalar/marka14.jpg',
                  '/images/Markalar/marka15.jpg',
                  '/images/Markalar/marka16.jpg',
                  '/images/Markalar/marka17.jpg',
                  '/images/Markalar/marka18.jpg',
                  '/images/Markalar/marka19.jpg',
                  '/images/Markalar/marka20.jpg',
                  '/images/Markalar/marka21.jpg',
                  '/images/Markalar/marka22.jpg'
                ].map((brand, index) => (
                  <div key={index} className="group relative">
                    <div className="relative h-24 bg-white rounded-xl shadow-soft border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg">
                      <Image
                        src={brand}
                        alt={`Brand ${index + 1}`}
                        fill
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 p-4"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partners Grid */}
            <div className={`transition-all duration-500 ${activeTab === 'partners' ? 'block' : 'hidden'}`}>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
                {[
                  '/images/CozumOrtaklari/cozumortagi1.jpg',
                  '/images/CozumOrtaklari/cozumortagi2.jpg',
                  '/images/CozumOrtaklari/cozumortagi3.jpg',
                  '/images/CozumOrtaklari/cozumortagi4.jpg',
                  '/images/CozumOrtaklari/cozumortagi5.jpg'
                ].map((partner, index) => (
                  <div key={index} className="group relative">
                    <div className="relative h-24 bg-white rounded-xl shadow-soft border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg">
                      <Image
                        src={partner}
                        alt={`Solution Partner ${index + 1}`}
                        fill
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 p-4"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Certificates Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="certificates-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#certificates-grid)"/>
            </svg>
          </div>
        </div>

        {/* Floating Dots */}
        <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
        <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
                {locale === 'en' ? "Our Certificates" : "Sertifikalarımız"}
              </div>
              <h2 className="text-4xl font-bold text-text mb-6">
                {locale === 'en' ? "Quality and Reliability" : "Kalite ve Güvenilirlik"}
              </h2>
              <p className="max-w-3xl mx-auto text-text-light">
                {locale === 'en' 
                  ? "We maintain our position as your reliable business partner with our quality certificates that prove our industry standards and reliability."
                  : "Sektör standartlarımızı ve güvenilirliğimizi kanıtlayan kalite sertifikalarımız ile güvenilir iş ortağınız olma konumumuzu sürdürüyoruz."}
              </p>
              <div className="h-1 w-20 bg-primary mx-auto mt-12"></div>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  image: '/images/Sertifikalar/sertifika1.jpg',
                  title: locale === 'en' ? 'Trademark Registration Certificate' : 'Marka Tescil Belgesi',
                  description: locale === 'en' ? 'Turkish Patent and Trademark Office' : 'Türk Patent ve Marka Kurumu'
                },
                {
                  image: '/images/Sertifikalar/sertifika2.jpg',
                  title: locale === 'en' ? 'Trademark Registration Certificate' : 'Marka Tescil Belgesi',
                  description: locale === 'en' ? 'International Trademark Registration' : 'Uluslararası Marka Tescili'
                },
                {
                  image: '/images/Sertifikalar/sertifika3.jpg',
                  title: locale === 'en' ? 'Trademark Registration Certificate' : 'Marka Tescil Belgesi',
                  description: locale === 'en' ? 'Industrial Design Registration' : 'Endüstriyel Tasarım Tescili'
                },
                {
                  image: '/images/Sertifikalar/sertifika4.jpg',
                  title: locale === 'en' ? 'Service Qualification Certificate' : 'Servis Yeterlilik Sertifikası',
                  description: locale === 'en' ? 'Technical Service and Service Qualification' : 'Teknik Servis ve Hizmet Yeterliliği'
                }
              ].map((certificate, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-soft border border-gray-100 transition-all duration-300 hover:shadow-lg">
                    <div 
                      className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                      onClick={() => {
                        setSelectedImage(certificate.image);
                        setIsLightboxOpen(true);
                      }}
                    >
                      <Image
                        src={certificate.image}
                        alt={certificate.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-lg font-bold text-white mb-2">{certificate.title}</h3>
                        <p className="text-sm text-white/80">{certificate.description}</p>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-light">
                          {locale === 'en' ? 'Certificate Date' : 'Sertifika Tarihi'}: {[
                          '21/11/2006',
                          '23/05/2008',
                          '18/08/2006',
                          '18/05/2015'
                        ][index]}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(certificate.image);
                            setIsLightboxOpen(true);
                          }}
                          className="text-primary hover:text-primary-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage}
                alt={locale === 'en' ? "Certificate Detail" : "Sertifika Detayı"}
                fill
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
} 