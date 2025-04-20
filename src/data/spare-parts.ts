// Yedek parça kategorisi
export const SPARE_PARTS_CATEGORY = {
  id: 'spare-parts',
  name: 'Yedek Parçalar',
  slug: 'yedek-parca',
  isHidden: false
};

// Yedek parça durumu için tip tanımı
export type SparePartStatus = 'in-stock' | 'low-stock' | 'out-of-stock';
export type SparePartCondition = 'new' | 'refurbished';

// Yedek parça için tip tanımı
export interface SparePart {
  id: string;
  name: string;
  slug: string;
  category: typeof SPARE_PARTS_CATEGORY;
  description: string;
  compatibility: string[];
  brand: string;
  partNumber: string;
  condition: SparePartCondition;
  images: string[];
  specifications: Array<{
    label: string;
    value: string;
  }>;
  stock: number;
  status: SparePartStatus;
}

// Örnek yedek parça verileri
export const spareParts: SparePart[] = [
  {
    id: 'servo-motor-fanuc',
    name: 'Fanuc αi Serisi Servo Motor',
    slug: 'fanuc-ai-servo-motor',
    category: SPARE_PARTS_CATEGORY,
    description: 'Fanuc αi serisi CNC tezgahlar için yüksek performanslı servo motor. Hassas pozisyonlama ve yüksek tork kapasitesi ile öne çıkar.',
    compatibility: [
      'Fanuc Robodrill α-D21MiA5',
      'Fanuc Robodrill α-D21LiA5',
      'Fanuc Robocut α-C400iB'
    ],
    brand: 'Fanuc',
    partNumber: 'A06B-6117-H203',
    condition: 'new',
    images: [
      '/images/spare-parts/servo-motor-1.jpg',
      '/images/spare-parts/servo-motor-2.jpg',
      '/images/spare-parts/servo-motor-3.jpg'
    ],
    specifications: [
      { label: 'Nominal Tork', value: '11.0 N·m' },
      { label: 'Maksimum Hız', value: '4000 rpm' },
      { label: 'Nominal Güç', value: '2.2 kW' },
      { label: 'Enkoder Tipi', value: 'Mutlak' },
      { label: 'Koruma Sınıfı', value: 'IP67' },
      { label: 'Ağırlık', value: '12 kg' }
    ],
    stock: 5,
    status: 'in-stock'
  },
  {
    id: 'cnc-spindle',
    name: 'CNC Tezgah Spindle Ünitesi',
    slug: 'cnc-spindle-unitesi',
    category: SPARE_PARTS_CATEGORY,
    description: 'Yüksek hızlı ve hassas işleme için tasarlanmış CNC tezgah spindle ünitesi. Uzun ömürlü rulmanlar ve dengeli çalışma özelliği ile maksimum performans sağlar.',
    compatibility: [
      'VMC-850 Dik İşleme Merkezi',
      'VMC-1050 Dik İşleme Merkezi',
      'HMC-630 Yatay İşleme Merkezi'
    ],
    brand: 'NSK',
    partNumber: 'SP-15000-BT40',
    condition: 'new',
    images: [
      '/images/spare-parts/spindle-1.jpg',
      '/images/spare-parts/spindle-2.jpg',
      '/images/spare-parts/spindle-3.jpg'
    ],
    specifications: [
      { label: 'Maksimum Hız', value: '15000 rpm' },
      { label: 'Güç', value: '18.5 kW' },
      { label: 'Takım Tutucu', value: 'BT40' },
      { label: 'Soğutma', value: 'Sıvı Soğutmalı' },
      { label: 'Rulman Tipi', value: 'Seramik' },
      { label: 'Ağırlık', value: '85 kg' }
    ],
    stock: 2,
    status: 'low-stock'
  },
  {
    id: 'ballscrew',
    name: 'Hassas Vidalı Mil',
    slug: 'hassas-vidali-mil',
    category: SPARE_PARTS_CATEGORY,
    description: 'Yüksek hassasiyetli CNC tezgahlar için C3 sınıfı vidalı mil. Düşük sürtünme ve yüksek pozisyonlama hassasiyeti sağlar.',
    compatibility: [
      'VMC Serisi Dik İşleme Merkezleri',
      'HMC Serisi Yatay İşleme Merkezleri',
      'CNC Torna Tezgahları'
    ],
    brand: 'THK',
    partNumber: 'DIK4010-600L-C3',
    condition: 'new',
    images: [
      '/images/spare-parts/ballscrew-1.jpg',
      '/images/spare-parts/ballscrew-2.jpg',
      '/images/spare-parts/ballscrew-3.jpg'
    ],
    specifications: [
      { label: 'Çap', value: '40 mm' },
      { label: 'Uzunluk', value: '600 mm' },
      { label: 'Hatve', value: '10 mm' },
      { label: 'Hassasiyet Sınıfı', value: 'C3' },
      { label: 'Malzeme', value: 'SCM440' },
      { label: 'Yüzey İşlemi', value: 'Sertleştirilmiş ve Taşlanmış' }
    ],
    stock: 0,
    status: 'out-of-stock'
  }
];

// Yardımcı fonksiyonlar
export const getAllSpareParts = () => {
  return spareParts;
};

export const getSparePartBySlug = (slug: string) => {
  return spareParts.find(part => part.slug === slug);
}; 