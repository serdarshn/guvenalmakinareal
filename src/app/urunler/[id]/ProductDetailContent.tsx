'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';

interface Props {
  product: Product;
  lang?: 'tr' | 'en';
}

type TabType = 'overview' | 'technical' | 'accessories' | 'contact';

export default function ProductDetailContent({ product, lang = 'tr' }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formattedEndDate, setFormattedEndDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (product.campaign?.endDate) {
      setFormattedEndDate(new Date(product.campaign.endDate).toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR'));
    }
  }, [product.campaign?.endDate, lang]);

  // Debug için çeviri durumunu kontrol et
  console.log('Current language:', lang);
  console.log('Product translations:', product.translations);
  console.log('Has EN translation:', Boolean(product.translations?.en));

  // Dile göre içeriği seç
  const content = lang === 'en' && product.translations?.en ? {
    name: product.translations.en.name,
    description: product.translations.en.description,
    specs: product.translations.en.specs || [],
    standardAccessories: product.translations.en.standardAccessories || [],
    optionalAccessories: product.translations.en.optionalAccessories || []
  } : {
    name: product.name,
    description: product.description,
    specs: product.specs || [],
    standardAccessories: product.standardAccessories || [],
    optionalAccessories: product.optionalAccessories || []
  };

  // Debug için seçilen içeriği kontrol et
  console.log('Selected content:', content);

  // Dile göre tab başlıkları
  const tabLabels = {
    overview: lang === 'en' ? 'Overview' : 'Genel Bakış',
    technical: lang === 'en' ? 'Technical' : 'Teknik',
    accessories: lang === 'en' ? 'Accessories' : 'Aksesuarlar',
    contact: lang === 'en' ? 'Contact' : 'İletişim'
  };

  // Dile göre ürün tipleri
  const productTypes = {
    products: lang === 'en' ? 'Products' : 'Ürünler',
    used: lang === 'en' ? 'Used' : 'İkinci El',
    spare: lang === 'en' ? 'Spare Parts' : 'Yedek Parça',
    accessories: lang === 'en' ? 'Accessories' : 'Aksesuar',
    campaign: lang === 'en' ? 'Campaign' : 'Kampanya'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        {/* Banner Section */}
        <section className="relative bg-background-dark overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 transform -skew-y-6 origin-top-left scale-110"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-7xl mx-auto py-16 lg:py-24">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">{content.name}</h1>
              <div className="mt-4">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  product.type === 'products' ? 'bg-white/10 text-white' :
                  product.type === 'used' ? 'bg-amber-500/90 text-white' :
                  product.type === 'spare' ? 'bg-blue-500/90 text-white' :
                  'bg-green-500/90 text-white'
                }`}>
                  {productTypes[product.type]}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
              {/* Sol Taraf - Ürün Görseli */}
              <div className="space-y-6">
                <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={product.images?.[activeImageIndex] || product.image}
                    alt={content.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Küçük Resimler */}
                {product.images && product.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-all ${
                          activeImageIndex === index ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${content.name} - ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Teklif İste Butonu */}
                <Link
                  href={`/iletisim?lang=${lang}`}
                  className="w-full bg-primary hover:bg-primary-600 text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {lang === 'en' ? 'Request Quote' : 'Teklif İste'}
                </Link>
              </div>

              {/* Sağ Taraf - Ürün Detayları */}
              <div>
                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-lg mb-6">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'overview', label: tabLabels.overview },
                      { id: 'technical', label: tabLabels.technical },
                      { id: 'accessories', label: tabLabels.accessories },
                      { id: 'contact', label: tabLabels.contact },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        className={`px-4 py-3 rounded-lg font-medium transition-all ${
                          activeTab === tab.id ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Fiyat ve Kampanya Bilgileri */}
                      <div className="space-y-4">
                        {(product.type === 'campaign' || product.campaign) ? (
                          <>
                            <div className="space-y-2">
                              {product.oldPrice && (
                                <div className="text-gray-500 line-through text-lg">
                                  {product.oldPrice.toLocaleString(lang === 'en' ? 'en-US' : 'tr-TR')} {lang === 'en' ? 'USD' : '₺'}
                                </div>
                              )}
                              <div className="text-4xl font-bold text-primary">
                                {product.price?.toLocaleString(lang === 'en' ? 'en-US' : 'tr-TR')} {lang === 'en' ? 'USD' : '₺'}
                              </div>
                              {isClient && product.campaign?.endDate && (
                                <div className="text-sm text-gray-600 mt-2">
                                  {lang === 'en' ? 'Campaign Ends: ' : 'Kampanya Bitiş: '}{formattedEndDate}
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          product.price && (
                            <div className="text-4xl font-bold text-primary">
                              {product.price.toLocaleString(lang === 'en' ? 'en-US' : 'tr-TR')} {lang === 'en' ? 'USD' : '₺'}
                            </div>
                          )
                        )}
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{content.name}</h1>
                        <p className="text-gray-600 mb-8 whitespace-pre-line">{content.description}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'technical' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {lang === 'en' ? 'Technical Specifications' : 'Teknik Özellikler'}
                      </h2>
                      <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-4">
                        {content.specs && content.specs.length > 0 ? (
                          content.specs.map((spec, index) => (
                            <div key={index} className="bg-gray-100 rounded-lg p-2 shadow-md hover:bg-[#FFA500] group transition-colors relative">
                              <div className="grid grid-cols-2 items-center">
                                <span className="text-gray-600 text-sm group-hover:text-white pl-4">{spec.label}</span>
                                <span className="font-medium text-gray-900 text-sm group-hover:text-white pl-8">{spec.value}</span>
                              </div>
                              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-[1px] h-4/5 bg-gray-300 group-hover:bg-white"></div>
                            </div>
                          ))
                        ) : (
                          <p className="text-primary italic">
                            {lang === 'en' ? 'No Technical Specifications Found' : 'Teknik Özellik Bulunamadı'}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'accessories' && (
                    <div className="space-y-8 grid grid-cols-1 gap-8">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex flex-col w-full md:w-1/2">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {lang === 'en' ? 'Standard Accessories' : 'Standart Aksesuarlar'}
                          </h3>
                          <div className="grid grid-cols-1 gap-4">
                            {content.standardAccessories && content.standardAccessories.length > 0 ? (
                              content.standardAccessories.map((accessory, index) => (
                                <div key={index} className="bg-gray-100 rounded-lg p-2 shadow-md hover:bg-[#FFA500] group transition-colors">
                                  <p className="text-gray-600 text-sm font-medium p-1 rounded-md group-hover:text-white">{accessory}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-primary italic">
                                {lang === 'en' ? 'No Standard Accessories Found' : 'Standart aksesuar bulunamadı'}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col w-full md:w-1/2">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {lang === 'en' ? 'Optional Accessories' : 'Opsiyonel Aksesuarlar'}
                          </h3>
                          <div className="grid grid-cols-1 gap-4">
                            {content.optionalAccessories && content.optionalAccessories.length > 0 ? (
                              content.optionalAccessories.map((accessory, index) => (
                                <div key={index} className="bg-gray-100 rounded-lg p-2 shadow-md hover:bg-[#FFA500] group transition-colors">
                                  <p className="text-gray-600 text-sm font-medium p-1 rounded-md group-hover:text-white">{accessory}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-primary italic">
                                {lang === 'en' ? 'No Optional Accessories Found' : 'Opsiyonel aksesuar bulunamadı'}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'contact' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {lang === 'en' ? 'Contact' : 'İletişim'}
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {lang === 'en' ? 'For Detailed Information and Quote' : 'Detaylı Bilgi ve Teklif İçin'}
                            </h3>
                            <p className="text-gray-600">
                              {lang === 'en' ? 'Our expert team will be happy to help you' : 'Uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır'}
                            </p>
                          </div>
                        </div>
                        <div className="grid gap-4">
                          <Link
                            href="tel:+902122222222"
                            className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-lg hover:bg-primary-600 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {lang === 'en' ? 'Call Us' : 'Bizi Arayın'}
                          </Link>
                          <Link
                            href="https://wa.me/902122222222"
                            className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-4 rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.89-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                            WhatsApp
                          </Link>
                          <Link
                            href={`/iletisim?lang=${lang}`}
                            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-6 py-4 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {lang === 'en' ? 'Send Email' : 'E-posta Gönderin'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 