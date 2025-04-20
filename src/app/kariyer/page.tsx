'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useClientTranslation } from '@/lib/i18n';

// Captcha kodu üretme fonksiyonu
function generateCaptchaCode() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function CareerPage() {
  const { locale, initialized } = useClientTranslation(['common']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    cv: null as File | null,
    note: '',
    captcha: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [captchaCode, setCaptchaCode] = useState(() => generateCaptchaCode());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Captcha canvas'ını çizme fonksiyonu
  const drawCaptcha = useCallback((canvas: HTMLCanvasElement, code: string) => {
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
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Captcha kodunu çiz
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(code, canvas.width / 2, canvas.height / 2);
  }, []);

  // useEffect ile DOM yüklendikten sonra çiz
  useEffect(() => {
    if (canvasRef.current) {
      drawCaptcha(canvasRef.current, captchaCode);
    }
  }, [captchaCode, drawCaptcha]);

  // Captcha'yı yenile
  const refreshCaptcha = () => {
    const newCode = generateCaptchaCode();
    setCaptchaCode(newCode);
    if (canvasRef.current) {
      drawCaptcha(canvasRef.current, newCode);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Captcha kontrolü
    if (formData.captcha.toLowerCase() !== captchaCode.toLowerCase()) {
      toast.error(locale === 'en' ? 'Security code is incorrect. Please try again.' : 'Güvenlik kodu hatalı. Lütfen tekrar deneyin.');
      refreshCaptcha();
      setFormData(prev => ({ ...prev, captcha: '' }));
      return;
    }

    setIsLoading(true);

    try {
      // Form verilerini hazırla
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) submitData.append(key, value);
      });

      // API'ye gönder
      const response = await fetch('/api/career', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        toast.success(locale === 'en' ? 'Your application has been successfully submitted.' : 'Başvurunuz başarıyla gönderildi.');
        // Formu temizle
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          cv: null,
          note: '',
          captcha: ''
        });
        refreshCaptcha();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(locale === 'en' ? 'An error occurred while sending your application. Please try again.' : 'Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Form gönderme hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
                <h1 className="text-6xl font-bold text-white mb-4">
                  {locale === 'en' ? 'Career' : 'Kariyer'}
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  {locale === 'en' 
                    ? 'Join the Güvenal Machinery family, let\'s build the future together'
                    : 'Güvenal Makina ailesine katılın, geleceği birlikte inşa edelim'}
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
        <div className="absolute top-16 left-8 w-3 h-3 bg-white/20 rounded-full z-0"></div>
        <div className="absolute bottom-16 right-16 w-4 h-4 bg-white/20 rounded-full z-0"></div>
        <div className="absolute top-32 right-32 w-2 h-2 bg-white/20 rounded-full z-0"></div>
      </section>

      {/* İK Politikası Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="career-policy-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#career-policy-grid)"/>
            </svg>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full z-0"></div>
        <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full z-0"></div>
        <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Sol Taraf - İK Politikası */}
              <div className="space-y-8 relative z-10">
                <div>
                  <h2 className="text-3xl font-bold text-text mb-6">
                    {locale === 'en' ? 'Human Resources Policy' : 'İnsan Kaynakları Politikası'}
                  </h2>
                  <p className="text-text-light leading-relaxed">
                    {locale === 'en' 
                      ? 'The mission of Human Resources is to increase the contribution and development of individuals, teams, and organizations, and to develop and maintain an environment where Güvenal Machinery employees will be satisfied and proud of their company.'
                      : 'İnsan Kaynakları\'nın misyonu bireylerin, ekiplerin ve organizasyonların katkısını ve gelişimini artıracak ve diğer yandan Güvenal Makina\'nın çalışanlarının hoşnut olacakları ve şirketleriyle gurur duyacakları bir ortamın geliştirilmesi ve korunmasıdır.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-text mb-4">
                    {locale === 'en' ? 'Güvenal Machinery\'s Human Resources Principles' : 'Güvenal Makina\'nın İnsan Kaynakları İlkeleri'}
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold">1</span>
                      </div>
                      <p className="text-text-light">
                        {locale === 'en' 
                          ? 'Respect for the dignity and value of individuals. This should encourage the highest levels of performance from employees in an objective, cooperative, and team-working environment.'
                          : 'Bireylerin onuruna ve değerine saygı gösterilmelidir. Bunun için objektif, işbirliği ve ekip çalışma ortamında çalışanların en yüksek performans düzeylerini teşvik etmelidir.'}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold">2</span>
                      </div>
                      <p className="text-text-light">
                        {locale === 'en' 
                          ? 'Encourage each employee to take initiative. Do this by both setting direction and giving freedom for creative work to emerge.'
                          : 'Her bir çalışanın inisiyatif almasını teşvik etmek. Bunu yaratıcı çalışmalar ortaya konması için hem yön çizerek hem de özgürlük vererek yapmak.'}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold">3</span>
                      </div>
                      <p className="text-text-light">
                        {locale === 'en' 
                          ? 'Encourage the development of individual talents. Do this through healthy placement, guidance, and development activities.'
                          : 'Bireysel yeteneklerin geliştirilmesini teşvik etmek. Bunu sağlıklı yerleştirme, yönlendirme ve geliştirme çalışmaları ile yapmak.'}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold">4</span>
                      </div>
                      <p className="text-text-light">
                        {locale === 'en' 
                          ? 'Provide equal opportunity for employees to develop themselves and objectively reward good performance.'
                          : 'Çalışanların kendilerini geliştirmeleri için eşit fırsat vermek ve iyi performansı objektif bir şekilde ödüllendirmek.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sağ Taraf - Başvuru Formu */}
              <div className="relative z-10">
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-text mb-6">
                    {locale === 'en' ? 'Application Form' : 'Başvuru Formu'}
                  </h3>
                  <p className="text-gray-600 mb-8">
                    {locale === 'en' 
                      ? 'Get information about career opportunities and open positions at Güvenal Machinery. Submit your application to join our team.'
                      : 'Güvenal Makina\'da kariyer fırsatları ve açık pozisyonlar hakkında bilgi alın. Ekibimize katılmak için başvurunuzu yapın.'}
                  </p>
                  <p className="text-gray-600 mb-8">
                    {locale === 'en' 
                      ? 'The success of Güvenal Machinery is the success of its employees.'
                      : 'Güvenal Makina\'nın başarısı, çalışanlarının başarısıdır.'}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                        {locale === 'en' ? 'Full Name' : 'Ad, Soyad'}
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                        {locale === 'en' ? 'Email' : 'E-Posta'}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                        {locale === 'en' ? 'Phone' : 'Telefon'}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                        pattern="[0-9]{10,11}"
                        title={locale === 'en' ? 'Please enter a valid phone number' : 'Lütfen geçerli bir telefon numarası girin'}
                      />
                    </div>

                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-text mb-2">
                        {locale === 'en' ? 'Position' : 'Pozisyon'}
                      </label>
                      <input
                        type="text"
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="cv" className="block text-sm font-medium text-text mb-2">
                        {locale === 'en' ? 'Upload CV' : 'CV Yükle'}
                      </label>
                      <input
                        type="file"
                        id="cv"
                        onChange={(e) => setFormData({...formData, cv: e.target.files?.[0] || null})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        accept=".pdf,.doc,.docx"
                        required
                        disabled={isLoading}
                      />
                      <p className="mt-1 text-sm text-text-light">
                        {locale === 'en' 
                          ? 'Maximum file size: 5MB. Accepted formats: PDF, DOC, DOCX'
                          : 'Maksimum dosya boyutu: 5MB. Kabul edilen formatlar: PDF, DOC, DOCX'}
                      </p>
                    </div>

                    <div>
                      <label htmlFor="note" className="block text-sm font-medium text-text mb-2">
                        {locale === 'en' ? 'Your Note' : 'Notunuz'}
                      </label>
                      <textarea
                        id="note"
                        value={formData.note}
                        onChange={(e) => setFormData({...formData, note: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        rows={4}
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        {locale === 'en' ? 'Enter Code' : 'Kodu girin'}
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
                          id="captcha"
                          value={formData.captcha}
                          onChange={(e) => setFormData({...formData, captcha: e.target.value})}
                          className="w-full h-[42px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-primary hover:bg-primary-600 text-white font-medium py-3 rounded-lg transition-colors relative z-20 ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <span className="opacity-0">{locale === 'en' ? 'Apply Now' : 'Başvuru Yap'}</span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        </>
                      ) : (
                        locale === 'en' ? 'Apply Now' : 'Başvuru Yap'
                      )}
                    </button>

                    {submitSuccess && (
                      <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg relative z-20">
                        {locale === 'en' 
                          ? 'Your application has been successfully submitted. We will contact you as soon as possible.'
                          : 'Başvurunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.'}
                      </div>
                    )}
                  </form>
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