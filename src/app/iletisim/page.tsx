'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
// import { products } from '@/data/products';
import { Product } from '@/data/products';
import { useClientTranslation } from '@/lib/i18n';

export default function ContactPage() {
  const { locale, initialized } = useClientTranslation(['common']);
  const [activeTab, setActiveTab] = useState('contact');
  const [activeLocationTab, setActiveLocationTab] = useState('merkez');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    captcha: '',
    product: '',
    service: '',
    formType: 'contact'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [captchaCode, setCaptchaCode] = useState(() => {
    return generateCaptchaCode();
  });
  
  // Captcha kodu oluşturma fonksiyonu
  function generateCaptchaCode() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Captcha canvas'ını çizme fonksiyonu
  const drawCaptcha = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Arkaplan
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Karıştırıcı çizgiler
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(37, 99, 235, ${Math.random() * 0.2 + 0.1})`;
      ctx.stroke();
    }

    // Metni çiz
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#2563eb';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Her karakteri ayrı ayrı çiz ve hafifçe döndür
    for (let i = 0; i < captchaCode.length; i++) {
      const x = (canvas.width / captchaCode.length) * (i + 0.5);
      const y = canvas.height / 2;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(captchaCode[i], 0, 0);
      ctx.restore();
    }

    // Noktalar ekle
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        1,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(37, 99, 235, ${Math.random() * 0.2 + 0.1})`;
      ctx.fill();
    }
  }, [captchaCode]);

  // Ürün arama için state'ler
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const productDropdownRef = useRef<HTMLDivElement>(null);

  // Ürünleri API'den çek
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          // Sadece normal ürünleri filtrele
          const normalProducts = data.products.filter((p: Product) => p.type === 'products' && !p.campaign);
          setAllProducts(normalProducts);
          setFilteredProducts(normalProducts);
        }
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
      }
    }

    fetchProducts();
  }, []);

  // Ürün arama fonksiyonu
  useEffect(() => {
    if (productSearchQuery) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(productSearchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [productSearchQuery, allProducts]);

  // Dropdown dışına tıklandığında kapanması için
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target as Node)) {
        setIsProductDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // İlk yükleme ve yenileme durumlarında captcha'yı oluştur
  useEffect(() => {
    const timer = setTimeout(() => {
      drawCaptcha();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [drawCaptcha]);

  // useEffect ile DOM yüklendikten sonra tekrar çiz
  useEffect(() => {
    const timer = setTimeout(() => {
      drawCaptcha();
    }, 800);
    
    const secondTimer = setTimeout(() => {
      drawCaptcha();
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
    };
  }, [initialized, drawCaptcha]);

  // Yeni CAPTCHA kodu oluştur
  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptchaCode());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Captcha kontrolü
    if (formData.captcha.toLowerCase() !== captchaCode.toLowerCase()) {
      toast.error(locale === 'en' ? 'Security code is incorrect. Please try again.' : 'Güvenlik kodu hatalı. Lütfen tekrar deneyin.');
      setCaptchaCode(generateCaptchaCode());
      return;
    }

    setIsLoading(true);

    try {
      // Form verilerini hazırla
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: activeTab
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(locale === 'en' ? 'Your message has been sent successfully.' : 'Mesajınız başarıyla gönderildi.');
        // Formu temizle
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          captcha: '',
          product: '',
          service: '',
          formType: activeTab
        });
        setCaptchaCode(generateCaptchaCode());
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(locale === 'en' ? 'An error occurred while sending your message. Please try again.' : 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Form gönderme hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Form render fonksiyonu
  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* İsim Alanı */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
              {locale === 'en' ? 'Full Name' : 'Ad Soyad'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Email Alanı */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
              {locale === 'en' ? 'Email' : 'E-posta'} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Telefon Alanı */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
              {locale === 'en' ? 'Phone' : 'Telefon'} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Şirket Alanı */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-text mb-1">
              {locale === 'en' ? 'Company Name' : 'Şirket Adı'}
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Ürün/Servis Seçimi */}
          {(activeTab === 'product' || activeTab === 'service' || activeTab === 'reference') && (
            <div className="md:col-span-2">
              <label htmlFor="product" className="block text-sm font-medium text-text mb-1">
                {locale === 'en' ? 'Product' : 'Ürün'} <span className="text-red-500">*</span>
              </label>
              <div className="relative" ref={productDropdownRef}>
                <input
                  type="text"
                  id="product"
                  value={formData.product}
                  onClick={() => setIsProductDropdownOpen(true)}
                  onChange={(e) => {
                    setFormData({...formData, product: e.target.value});
                    setProductSearchQuery(e.target.value);
                    setIsProductDropdownOpen(true);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  placeholder={locale === 'en' ? 'Select or search for a product' : 'Ürün seçiniz veya aramak için yazın'}
                />
                {isProductDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredProducts.map((product, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-text"
                        onClick={() => {
                          setFormData({...formData, product: product.name});
                          setIsProductDropdownOpen(false);
                        }}
                      >
                        {product.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Konu Alanı */}
          <div className="md:col-span-2">
            <label htmlFor="subject" className="block text-sm font-medium text-text mb-1">
              {locale === 'en' ? 'Subject' : 'Konu'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Mesaj Alanı */}
          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
              {locale === 'en' ? 'Message' : 'Mesaj'} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            ></textarea>
          </div>

          {/* Captcha Alanı */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text mb-2">
              {locale === 'en' ? 'Security Code' : 'Güvenlik Kodu'} <span className="text-red-500">*</span>
            </label>
            <div className="space-y-4">
              <div>
                <canvas
                  ref={canvasRef}
                  width={140}
                  height={42}
                  className="w-[140px] h-[42px] bg-white rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="mt-1 text-xs text-primary hover:text-primary-600 transition-colors"
                >
                  {locale === 'en' ? 'New Code' : 'Yeni Kod'}
                </button>
              </div>
              <input
                type="text"
                required
                value={formData.captcha}
                onChange={(e) => setFormData({...formData, captcha: e.target.value})}
                className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={locale === 'en' ? 'Enter security code' : 'Güvenlik kodunu giriniz'}
              />
            </div>
          </div>
        </div>

        {/* Gönder Butonu */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {locale === 'en' ? 'Sending...' : 'Gönderiliyor...'}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {locale === 'en' ? 'Send' : 'Gönder'}
              </>
            )}
          </button>
        </div>
      </form>
    );
  };

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
                  {locale === 'en' ? 'Contact' : 'İletişim'}
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  {locale === 'en' ? 'Contact us for your questions and requests' : 'Sorularınız ve talepleriniz için bizimle iletişime geçebilirsiniz'}
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

      {/* Forms Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="contact-form-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#contact-form-grid)"/>
            </svg>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
        <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Form Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => {
                  setActiveTab('contact');
                  setFormData({...formData, formType: 'contact', product: '', service: ''});
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'contact'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text hover:bg-gray-200'
                }`}
              >
                {locale === 'en' ? 'Contact Form' : 'İletişim Formu'}
              </button>
              <button
                onClick={() => {
                  setActiveTab('reference');
                  setFormData({...formData, formType: 'reference', product: '', service: ''});
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'reference'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text hover:bg-gray-200'
                }`}
              >
                {locale === 'en' ? 'Reference Request' : 'Referans Talebi'}
              </button>
              <button
                onClick={() => {
                  setActiveTab('product');
                  setFormData({...formData, formType: 'product', service: ''});
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'product'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text hover:bg-gray-200'
                }`}
              >
                {locale === 'en' ? 'Product Request Form' : 'Ürün Talep Formu'}
              </button>
              <button
                onClick={() => {
                  setActiveTab('service');
                  setFormData({...formData, formType: 'service', product: ''});
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'service'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text hover:bg-gray-200'
                }`}
              >
                {locale === 'en' ? 'Service Request Form' : 'Servis Talep Formu'}
              </button>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-text mb-6">
                {activeTab === 'contact' && (locale === 'en' ? 'Contact Form' : 'İletişim Formu')}
                {activeTab === 'reference' && (locale === 'en' ? 'Reference Request' : 'Referans Talebi')}
                {activeTab === 'product' && (locale === 'en' ? 'Product Request Form' : 'Ürün Talep Formu')}
                {activeTab === 'service' && (locale === 'en' ? 'Service Request Form' : 'Servis Talep Formu')}
              </h2>
              {renderForm()}
            </div>
          </div>
        </div>
      </section>

      {/* İletişim Bilgileri Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="contact-info-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#contact-info-grid)"/>
            </svg>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
        <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
        <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-text mb-4">
                {locale === 'en' ? 'Contact Information' : 'İletişim Bilgileri'}
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                {locale === 'en' ? 'You can contact our nearest location' : 'Size en yakın lokasyonumuz ile iletişime geçebilirsiniz'}
              </p>
            </div>

            {/* Location Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <button
                onClick={() => setActiveLocationTab('merkez')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeLocationTab === 'merkez'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-text hover:bg-primary/5'
                }`}
              >
                {locale === 'en' ? 'Headquarters' : 'Merkez Lokasyonlar'}
              </button>
              <button
                onClick={() => setActiveLocationTab('subeler')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeLocationTab === 'subeler'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-text hover:bg-primary/5'
                }`}
              >
                {locale === 'en' ? 'Branches' : 'Şubeler'}
              </button>
              <button
                onClick={() => setActiveLocationTab('temsilcilikler')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeLocationTab === 'temsilcilikler'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-text hover:bg-primary/5'
                }`}
              >
                {locale === 'en' ? 'Regional Offices' : 'Bölge Temsilcilikleri'}
              </button>
            </div>

            {/* Merkez Lokasyonlar */}
            {activeLocationTab === 'merkez' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Merkez */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">
                      {locale === 'en' ? 'Headquarters' : 'Merkez'}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-text-light text-sm leading-relaxed">
                      {locale === 'en' 
                        ? 'İkitelli OSB Demirciler Küçük San. Sit. B1 Blok No: 34 K2 Başakşehir - Istanbul'
                        : 'İkitelli OSB Demirciler Küçük San. Sit. B1 Blok No: 34 K2 Başakşehir - İstanbul'}
                    </p>
                    <div className="pt-2 space-y-2">
                      <a href="tel:02125673887" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0212 567 38 87</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:info@guvenalmakina.com.tr" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          info@guvenalmakina.com.tr
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">{locale === 'en' ? 'Fax: 0212 567 42 59' : 'Faks: 0212 567 42 59'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mağaza */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">
                      {locale === 'en' ? 'Store' : 'Mağaza'}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-text-light text-sm leading-relaxed">
                      {locale === 'en' 
                        ? 'İsmet Paşa Mah. Abdi İpekçi Cad. No: 113/2 Bayrampaşa - Istanbul'
                        : 'İsmet Paşa Mah. Abdi İpekçi Cad. No: 113/2 Bayrampaşa - İstanbul'}
                    </p>
                    <div className="pt-2 space-y-2">
                      <a href="tel:02125673887" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0212 567 38 87</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:info@guvenalmakina.com.tr" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          info@guvenalmakina.com.tr
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">{locale === 'en' ? 'Fax: 0212 567 42 59' : 'Faks: 0212 567 42 59'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Topçular */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">
                      {locale === 'en' ? 'Topçular Office' : 'Topçular'}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-text-light text-sm leading-relaxed">
                      {locale === 'en' 
                        ? 'Rami Kışla Cd. Emintaş 3 San. Sit. No:56-57-58 Topçular - Eyüp - Istanbul'
                        : 'Rami Kışla Cd. Emintaş 3 San. Sit. No:56-57-58 Topçular - Eyüp - İstanbul'}
                    </p>
                    <div className="pt-2 space-y-2">
                      <a href="tel:02125015381" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0212 501 53 81</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:guvenal@guvenal.net" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          guvenal@guvenal.net
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">{locale === 'en' ? 'Fax: 0212 577 37 43' : 'Faks: 0212 577 37 43'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Şubeler */}
            {activeLocationTab === 'subeler' && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Esenyurt Şube */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">
                      {locale === 'en' ? 'Esenyurt Branch' : 'Esenyurt Şube'}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-text-light text-sm leading-relaxed">
                      {locale === 'en' 
                        ? 'Çakmaklı Mh. Akçaburgaz Mevkii ALKOP Sanayi Sitesi A11 Blok No: 17 Kıraç - Hadımköy'
                        : 'Çakmaklı Mh. Akçaburgaz Mevkii ALKOP Sanayi Sitesi A11 Blok No: 17 Kıraç - Hadımköy'}
                    </p>
                    <div className="pt-2 space-y-2">
                      <a href="tel:02128580081" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0212 858 00 81</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:info@guvenalmakina.com.tr" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          info@guvenalmakina.com.tr
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">{locale === 'en' ? 'Fax: 0212 858 05 02' : 'Faks: 0212 858 05 02'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bursa Ofis */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">
                      {locale === 'en' ? 'Bursa Office' : 'Bursa Ofis'}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-text-light text-sm leading-relaxed">
                      {locale === 'en' 
                        ? 'Beşevler Mah. Aktaş Sk. Güleçler İş Merkezi No: 3 Floor: 4 Office: 17 Nilüfer / Bursa'
                        : 'Beşevler Mah. Aktaş Sk. Güleçler İş Merkezi No: 3 Kat: 4 D: 17 Nilüfer / Bursa'}
                    </p>
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center gap-2 text-text-light mb-2">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm">{locale === 'en' ? 'Representative: Murat YALÇINAR' : 'Temsilci: Murat YALÇINAR'}</span>
                      </div>
                      <a href="tel:02244419838" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0224 441 98 38</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:bursa1@guvenal.net" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          bursa1@guvenal.net
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">{locale === 'en' ? 'Fax: 0224 441 98 39' : 'Faks: 0224 441 98 39'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bölge Temsilcilikleri placeholder */}
            {activeLocationTab === 'temsilcilikler' && (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Ankara Bölge */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">
                      {locale === 'en' ? 'Ankara Region' : 'Ankara Bölge'}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-text-light mb-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm">{locale === 'en' ? 'Representative: Ahmet YILMAZ' : 'Temsilci: Ahmet YILMAZ'}</span>
                    </div>
                    <div className="pt-2 space-y-2">
                      <a href="tel:05321234567" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0532 123 45 67</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:ankara@guvenal.net" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          ankara@guvenal.net
                        </a>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Ege Bölge */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">
                      {locale === 'en' ? 'Aegean Region' : 'Ege Bölge'}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-text-light mb-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm">{locale === 'en' ? 'Representative: Mehmet DEMİR' : 'Temsilci: Mehmet DEMİR'}</span>
                    </div>
                    <div className="pt-2 space-y-2">
                      <a href="tel:05331234567" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0533 123 45 67</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:ege@guvenal.net" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          ege@guvenal.net
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trakya Bölge */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">
                      {locale === 'en' ? 'Thrace Region' : 'Trakya Bölge'}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-text-light mb-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm">{locale === 'en' ? 'Representative: Ali KAYA' : 'Temsilci: Ali KAYA'}</span>
                    </div>
                    <div className="pt-2 space-y-2">
                      <a href="tel:05341234567" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0534 123 45 67</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:trakya@guvenal.net" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          trakya@guvenal.net
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 