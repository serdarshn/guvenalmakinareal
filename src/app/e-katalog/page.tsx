'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useClientTranslation } from '@/lib/i18n';
import { useEffect } from 'react';

// PDF görüntüleyiciyi dinamik olarak import ediyoruz
const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-text font-medium">PDF Görüntüleyici Yükleniyor...</span>
      </div>
    </div>
  ),
});

const PDFThumbnail = dynamic(() => import('@/components/PDFThumbnail'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

const catalogData = {
  'CNC İşleme Merkezleri': [
    { title: 'KİNG CNC DİK İŞLEME', file: 'KİNG CNC DİK İŞLEME.pdf' },
    { title: 'KİNG MV-1160 CNC', file: 'KİNG MV-1160 CNC.pdf' },
    { title: 'KİNG DOUBLE KOLON CNC', file: 'KİNG DOUBLE KOLON CNC.pdf' },
    { title: 'KİNG DOUBLE KOLON TEKNİK TABLO', file: 'KİNG DOUBLE KOLON TEKNİK TABLO.pdf' },
    { title: 'KİNG CNC MV SERİSİ', file: 'KİNG CNC MV SERİSİ.pdf' },
  ],
  'Erezyon Tezgahları': [
    { title: 'KİNG EDM ZNC-PNC-CNC', file: 'KİNG EDM ZNC-PNC-CNC.pdf' },
    { title: 'KİNG EDM CNC L-TİPİ EREZYON', file: 'KİNG EDM CNC L-TİPİ EREZYON.pdf' },
    { title: 'BEST CNC-PNC-ZNC EREZYON', file: 'BEST CNC-PNC-ZNC EREZYON.pdf' },
    { title: 'BEST C TİPİ BÜYÜK HAVUZ EREZYON', file: 'BEST C TİPİ BÜYÜK HAVUZ EREZYON.pdf' },
  ],
  'Torna Tezgahları': [
    { title: 'CM 6241 X 1000 MM', file: 'CM 6241 X 1000 MM.pdf' },
    { title: 'JETCO JML 1M SERİSİ', file: 'JETCO JML 1M SERİSİ.pdf' },
    { title: 'CS-6266 -2 M - 3 M', file: 'CS-6266 -2 M - 3 M.pdf' },
    { title: 'CS-6250 1.5M-2M', file: 'CS-6250 1.5M-2M.pdf' },
    { title: 'KİNG YSM 26 SHB - CHB', file: 'KİNG YSM 26 SHB - CHB.pdf' },
    { title: 'KİNG SZ A8 V - VS', file: 'KİNG SZ A8 V - VS.pdf' },
    { title: 'KİNG SZ 2200 HVD - HVSD', file: 'KİNG SZ 2200 HVD - HVSD.pdf' },
    { title: 'KİNG SZ 1820 V - VS', file: 'KİNG SZ 1820 V - VS.pdf' },
  ],
  'Freze Tezgahları': [
    { title: 'KG SUPER XL6436CLW KOÇ KAFA', file: 'KG SUPER XL6436CLW KOÇ KAFA.pdf' },
    { title: 'KG SUPER X6325W', file: 'KG SUPER X6325W.pdf' },
    { title: 'KG SUPER KG3-KG4', file: 'KG SUPER KG3-KG4.pdf' },
    { title: 'JETCO 4A - 6', file: 'JETCO 4A - 6.pdf' },
    { title: 'JETCO 2 - 3Q', file: 'JETCO 2 - 3Q.pdf' },
  ],
  'Diğer Tezgahlar': [
    { title: 'ŞERİT TESTERE', file: 'ŞERİT TESTERE.pdf' },
    { title: 'ŞANZUMANLI - SÜTUNLU MATKAP', file: 'ŞANZUMANLI - SÜTUNLU MATKAP.pdf' },
    { title: 'KİNG GRİNDER TAŞLAMA', file: 'KİNG GRİNDER TAŞLAMA.pdf' },
    { title: 'JETCO RADYAL MATKAP', file: 'JETCO RADYAL MATKAP.pdf' },
    { title: 'KG SUPER Z 3040 RADYAL', file: 'KG SUPER Z 3040 RADYAL.pdf' },
  ],
};

const catalogDataEn = {
  'CNC Machining Centers': [
    { title: 'KING CNC VERTICAL MACHINING', file: 'KİNG CNC DİK İŞLEME.pdf' },
    { title: 'KING MV-1160 CNC', file: 'KİNG MV-1160 CNC.pdf' },
    { title: 'KING DOUBLE COLUMN CNC', file: 'KİNG DOUBLE KOLON CNC.pdf' },
    { title: 'KING DOUBLE COLUMN TECHNICAL TABLE', file: 'KİNG DOUBLE KOLON TEKNİK TABLO.pdf' },
    { title: 'KING CNC MV SERIES', file: 'KİNG CNC MV SERİSİ.pdf' },
  ],
  'EDM Machines': [
    { title: 'KING EDM ZNC-PNC-CNC', file: 'KİNG EDM ZNC-PNC-CNC.pdf' },
    { title: 'KING EDM CNC L-TYPE EROSION', file: 'KİNG EDM CNC L-TİPİ EREZYON.pdf' },
    { title: 'BEST CNC-PNC-ZNC EROSION', file: 'BEST CNC-PNC-ZNC EREZYON.pdf' },
    { title: 'BEST C TYPE LARGE POOL EROSION', file: 'BEST C TİPİ BÜYÜK HAVUZ EREZYON.pdf' },
  ],
  'Lathe Machines': [
    { title: 'CM 6241 X 1000 MM', file: 'CM 6241 X 1000 MM.pdf' },
    { title: 'JETCO JML 1M SERIES', file: 'JETCO JML 1M SERİSİ.pdf' },
    { title: 'CS-6266 -2 M - 3 M', file: 'CS-6266 -2 M - 3 M.pdf' },
    { title: 'CS-6250 1.5M-2M', file: 'CS-6250 1.5M-2M.pdf' },
    { title: 'KING YSM 26 SHB - CHB', file: 'KİNG YSM 26 SHB - CHB.pdf' },
    { title: 'KING SZ A8 V - VS', file: 'KİNG SZ A8 V - VS.pdf' },
    { title: 'KING SZ 2200 HVD - HVSD', file: 'KİNG SZ 2200 HVD - HVSD.pdf' },
    { title: 'KING SZ 1820 V - VS', file: 'KİNG SZ 1820 V - VS.pdf' },
  ],
  'Milling Machines': [
    { title: 'KG SUPER XL6436CLW RAM TYPE', file: 'KG SUPER XL6436CLW KOÇ KAFA.pdf' },
    { title: 'KG SUPER X6325W', file: 'KG SUPER X6325W.pdf' },
    { title: 'KG SUPER KG3-KG4', file: 'KG SUPER KG3-KG4.pdf' },
    { title: 'JETCO 4A - 6', file: 'JETCO 4A - 6.pdf' },
    { title: 'JETCO 2 - 3Q', file: 'JETCO 2 - 3Q.pdf' },
  ],
  'Other Machines': [
    { title: 'BAND SAW', file: 'ŞERİT TESTERE.pdf' },
    { title: 'GEARED - COLUMN DRILL', file: 'ŞANZUMANLI - SÜTUNLU MATKAP.pdf' },
    { title: 'KING GRINDER', file: 'KİNG GRİNDER TAŞLAMA.pdf' },
    { title: 'JETCO RADIAL DRILL', file: 'JETCO RADYAL MATKAP.pdf' },
    { title: 'KG SUPER Z 3040 RADIAL', file: 'KG SUPER Z 3040 RADYAL.pdf' },
  ],
};

export default function CatalogPage() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { locale } = useClientTranslation(['common']);
  const [isEnglish, setIsEnglish] = useState(false);
  
  useEffect(() => {
    setIsEnglish(locale === 'en');
  }, [locale]);

  const catalogToUse = isEnglish ? catalogDataEn : catalogData;

  function handlePdfClick(pdfFile: string) {
    setSelectedPdf(`/catalogs/${pdfFile}`);
    setIsLightboxOpen(true);
  }

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
                  E-Catalog
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  {isEnglish 
                    ? 'You can download or view our product catalog online'
                    : 'Ürün kataloğumuzu indirebilir veya online görüntüleyebilirsiniz'}
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

      {/* Catalog Content Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {Object.entries(catalogToUse).map(([category, items]) => (
              <div key={category} className="mb-12">
                <h2 className="text-3xl font-bold text-text mb-8">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="p-6">
                        <div className="aspect-[4/3] relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
                          <PDFThumbnail pdfUrl={`/catalogs/${item.file}`} />
                        </div>
                        <h3 className="text-xl font-semibold text-text mb-4">{item.title}</h3>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handlePdfClick(item.file)}
                            className="flex-1 bg-primary hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {isEnglish ? 'View' : 'Görüntüle'}
                          </button>
                          <a
                            href={`/catalogs/${item.file}`}
                            download
                            className="bg-gray-100 hover:bg-gray-200 text-text font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Viewer Lightbox */}
      {isLightboxOpen && selectedPdf && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative w-full h-full bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-11 right-4 z-10 bg-orange-500 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsLightboxOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <PDFViewer pdfUrl={selectedPdf} />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
} 