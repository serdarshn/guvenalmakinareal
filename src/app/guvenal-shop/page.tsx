'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useClientTranslation } from '@/lib/i18n';

export default function GuvenalShopPage() {
  const { locale, initialized } = useClientTranslation(['common']);
  
  if (!initialized) return null;
  
  return (
    <main>
      <Header />
      
      {/* Banner Section */}
      <section className="pt-[104px] relative bg-background-dark overflow-hidden">
        {/* Diagonal Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 transform -skew-y-6 origin-top-left scale-110 z-0"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[200px]">
              {/* Left Side - Text */}
              <div className="relative z-10 py-12">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                  {locale === 'en' ? 'Shopping at Güvenal' : 'Güvenal\'da Alışveriş'}
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  {locale === 'en' 
                    ? 'Online shopping platform for industrial machinery spare parts and accessories'
                    : 'Endüstriyel makina yedek parçaları ve aksesuarları için online alışveriş platformu'}
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

      {/* Tanıtım Bölümü */}
      <section className="py-16 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="shop-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#shop-grid)"/>
            </svg>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full z-0"></div>
        <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full z-0"></div>
        <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Öne Çıkan Özellikler */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {locale === 'en' ? 'Fast Delivery' : 'Hızlı Teslimat'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'en' 
                    ? 'Delivery to shipping within 24 hours and fast delivery options.'
                    : '24 saat içinde kargoya teslim ve hızlı teslimat imkanı.'}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {locale === 'en' ? 'Original Products' : 'Orijinal Ürünler'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'en'
                    ? '100% original product guarantee and secure shopping.'
                    : '%100 orijinal ürün garantisi ve güvenli alışveriş.'}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {locale === 'en' ? 'Easy Shopping' : 'Kolay Alışveriş'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'en'
                    ? 'Easy and fast shopping experience with a user-friendly interface.'
                    : 'Kullanıcı dostu arayüz ile kolay ve hızlı alışveriş deneyimi.'}
                </p>
              </motion.div>
            </div>

            {/* Ana İçerik */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {locale === 'en' 
                    ? 'Reliable Source for Industrial Spare Parts and Accessories'
                    : 'Endüstriyel Yedek Parça ve Aksesuarlar İçin Güvenilir Adres'}
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    {locale === 'en'
                      ? 'Güvenal Shop is an online shopping platform operating under Güvenal Group. It offers a reliable and fast shopping experience for industrial machinery spare parts and accessories.'
                      : 'Güvenal Shop, Güvenal Group bünyesinde faaliyet gösteren online alışveriş platformudur. Endüstriyel makina yedek parçaları ve aksesuarları için güvenilir ve hızlı alışveriş deneyimi sunar.'}
                  </p>
                  <p>
                    {locale === 'en'
                      ? 'With our experience of over 40 years and our wide product range, we offer our customers the highest quality products at the most affordable prices.'
                      : '40 yılı aşkın tecrübemiz ve geniş ürün yelpazemiz ile müşterilerimize en kaliteli ürünleri en uygun fiyatlarla sunuyoruz.'}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {locale === 'en' ? 'Wide product range' : 'Geniş ürün yelpazesi'}
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {locale === 'en' ? 'Technical support and consulting' : 'Teknik destek ve danışmanlık'}
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {locale === 'en' ? 'Fast delivery' : 'Hızlı teslimat'}
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {locale === 'en' ? 'Best price guarantee' : 'Uygun fiyat garantisi'}
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Link 
                    href="https://www.guvenalshop.com.tr/" 
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors relative z-20"
                  >
                    {locale === 'en' ? 'Visit Güvenal Shop' : 'Güvenal Shop\'u Ziyaret Et'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                  <Image
                    src="/images/Hakkimizda/hakkimizdafoto2.jpg"
                    alt="Güvenal Shop"
                    fill
                    className="object-contain rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl z-20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{locale === 'en' ? 'Affordable Price' : 'Uygun Fiyat'}</div>
                      <div className="text-lg font-semibold text-gray-900">{locale === 'en' ? '100% Guarantee' : '%100 Garanti'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kategoriler */}
            <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {locale === 'en' ? 'Product Categories' : 'Ürün Kategorileri'}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {locale === 'en' 
                      ? 'We offer a wide range of products to meet your industrial needs. Explore our categories to find the right products for your business.'
                      : 'Endüstriyel ihtiyaçlarınızı karşılamak için geniş bir ürün yelpazesi sunuyoruz. İşletmeniz için doğru ürünleri bulmak için kategorilerimizi keşfedin.'}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Yedek Parça */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group relative z-10">
                    <div className="p-6">
                      <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.79 14.93C17.73 16.98 14.78 17.61 12.19 16.8L7.48001 21.5C7.14001 21.85 6.47001 22.06 5.99001 21.99L3.81001 21.69C3.09001 21.59 2.42001 20.91 2.31001 20.19L2.01001 18.01C1.94001 17.53 2.17001 16.86 2.50001 16.52L7.20001 11.82C6.40001 9.22 7.02001 6.27 9.08001 4.22C12.03 1.27 16.82 1.27 19.78 4.22C22.74 7.17 22.74 11.98 19.79 14.93Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6.89001 17.49L9.19001 19.79" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14.5 11C15.3284 11 16 10.3284 16 9.5C16 8.67157 15.3284 8 14.5 8C13.6716 8 13 8.67157 13 9.5C13 10.3284 13.6716 11 14.5 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {locale === 'en' ? 'Spare Parts' : 'Yedek Parça'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {locale === 'en'
                          ? 'Quality spare parts for industrial machinery and equipment.'
                          : 'Endüstriyel makine ve ekipmanlar için kaliteli yedek parçalar.'}
                      </p>
                      
                      <Link 
                        href="https://www.guvenalshop.com.tr/kategori/yedek-parca" 
                        target="_blank"
                        className="inline-flex items-center text-primary hover:text-primary-600 font-medium relative z-20"
                      >
                        {locale === 'en' ? 'View Products' : 'Ürünleri Görüntüle'}
                        <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none">
                          <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Aksesuar */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group relative z-10">
                    <div className="p-6">
                      <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 14H13C14.1 14 15 13.1 15 12V2H6C4.5 2 3.19001 2.82999 2.51001 4.04999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 8H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 11H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 14H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {locale === 'en' ? 'Accessories' : 'Aksesuar'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {locale === 'en'
                          ? 'Complementary accessories for industrial equipment and machinery.'
                          : 'Endüstriyel ekipman ve makineler için tamamlayıcı aksesuarlar.'}
                      </p>
                      
                      <Link 
                        href="https://www.guvenalshop.com.tr/kategori/aksesuar" 
                        target="_blank"
                        className="inline-flex items-center text-primary hover:text-primary-600 font-medium relative z-20"
                      >
                        {locale === 'en' ? 'View Products' : 'Ürünleri Görüntüle'}
                        <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none">
                          <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Elektrik Malzemeleri */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group relative z-10">
                    <div className="p-6">
                      <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2.67999 18.95L7.59999 15.64C8.38999 15.09 9.52999 15.13 10.24 15.73L10.57 16.01C11.35 16.67 12.61 16.67 13.39 16.01L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {locale === 'en' ? 'Electrical Materials' : 'Elektrik Malzemeleri'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {locale === 'en'
                          ? 'High quality electrical components for industrial use.'
                          : 'Endüstriyel kullanım için yüksek kaliteli elektrik bileşenleri.'}
                      </p>
                      
                      <Link 
                        href="https://www.guvenalshop.com.tr/kategori/elektrik-malzemeleri" 
                        target="_blank"
                        className="inline-flex items-center text-primary hover:text-primary-600 font-medium relative z-20"
                      >
                        {locale === 'en' ? 'View Products' : 'Ürünleri Görüntüle'}
                        <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none">
                          <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Sarf Malzemeleri */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group relative z-10">
                    <div className="p-6">
                      <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {locale === 'en' ? 'Consumables' : 'Sarf Malzemeleri'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {locale === 'en'
                          ? 'Essential consumable supplies for industrial operations.'
                          : 'Endüstriyel operasyonlar için gerekli sarf malzemeleri.'}
                      </p>
                      
                      <Link 
                        href="https://www.guvenalshop.com.tr/kategori/sarf-malzemeleri" 
                        target="_blank"
                        className="inline-flex items-center text-primary hover:text-primary-600 font-medium relative z-20"
                      >
                        {locale === 'en' ? 'View Products' : 'Ürünleri Görüntüle'}
                        <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none">
                          <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
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

      <Footer />
    </main>
  );
} 