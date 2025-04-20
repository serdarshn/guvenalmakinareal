export interface SecondHandProduct {
  id: string;
  name: string;
  slug: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  description: string;
  condition: string; // Ürünün durumu (İyi, Çok İyi, Mükemmel vb.)
  year: string; // Üretim yılı
  workingHours?: string; // Çalışma saati
  images: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  price?: string; // Fiyat (opsiyonel)
  location: string; // Bulunduğu şehir/konum
  status: 'available' | 'sold' | 'reserved'; // Ürün durumu (satılık, satıldı, rezerve)
}

// Admin paneli için ikinci el kategorisi
export const SECOND_HAND_CATEGORY = {
  id: 'second-hand',
  name: 'İkinci El Ürünler',
  slug: 'ikinci-el',
  isHidden: true // Admin panelinde görünmesi için flag
};

// Örnek ikinci el ürün verileri
export const secondHandProducts: SecondHandProduct[] = [
  {
    id: "used-king-sz-a8-v",
    name: "KİNG SZ A8 V (2019)",
    slug: "used-king-sz-a8-v",
    category: SECOND_HAND_CATEGORY,
    description: "2019 model, bakımlı ve sorunsuz çalışan KİNG SZ A8 V Kalıpçı Freze Tezgahı. Düzenli bakımları yapılmış, tüm fonksiyonları sorunsuz çalışmaktadır.",
    condition: "Çok İyi",
    year: "2019",
    workingHours: "3200 saat",
    images: [
      '/images/secondhand/king-sz-a8-v-1.jpg',
      '/images/secondhand/king-sz-a8-v-2.jpg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG SZ A8 V' },
      { label: 'Tabla Boyutu', value: '800 x 400 mm' },
      { label: 'Üretim Yılı', value: '2019' },
      { label: 'Çalışma Saati', value: '3200 saat' }
    ],
    location: "İstanbul",
    status: "available"
  },
  {
    id: "used-pnc-500",
    name: "PNC 500 Dalma Erozyon (2020)",
    slug: "used-pnc-500",
    category: SECOND_HAND_CATEGORY,
    description: "2020 model PNC 500 Dalma Erozyon Tezgahı. Temiz kullanılmış, bakımlı ve sorunsuz çalışmaktadır.",
    condition: "Mükemmel",
    year: "2020",
    workingHours: "2500 saat",
    images: [
      '/images/secondhand/pnc-500-1.jpg',
      '/images/secondhand/pnc-500-2.jpg'
    ],
    specifications: [
      { label: 'Model', value: 'PNC 500' },
      { label: 'X Eksen Hareketi', value: '500 mm' },
      { label: 'Üretim Yılı', value: '2020' },
      { label: 'Çalışma Saati', value: '2500 saat' }
    ],
    location: "Ankara",
    status: "available"
  }
];

// Yardımcı fonksiyonlar
export const getAllSecondHandProducts = () => {
  // Sadece ikinci el kategorisindeki ürünleri döndür
  return secondHandProducts.filter(product => product.category.id === SECOND_HAND_CATEGORY.id);
};

export const getSecondHandProductBySlug = (slug: string) => {
  // Sadece ikinci el kategorisindeki ürünler arasından ara
  return secondHandProducts.find(product => 
    product.category.id === SECOND_HAND_CATEGORY.id && product.slug === slug
  );
}; 