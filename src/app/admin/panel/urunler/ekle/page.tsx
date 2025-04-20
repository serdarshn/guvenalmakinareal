'use client';

import { useState, useEffect, Suspense, Fragment } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

export const CATEGORIES = {
  products: [
    { id: 'cnc-double', name: 'CNC Double Kolon Dik İşleme Merkezi' },
    { 
      id: 'dalma-erozyon', 
      name: 'Dalma Erozyon Tezgahları',
      subcategories: [
        { 
          id: 'best-edm', 
          name: 'BEST EDM',
          subcategories: [
            { id: 'znc-serisi', name: 'ZNC Serisi' },
            { id: 'pnc-serisi', name: 'PNC Serisi' },
            { id: 'cnc-serisi', name: 'CNC Serisi' }
          ]
        },
        { id: 'cift-kafali-dalma-erezyon', name: 'ÇİFT KAFALI DALMA EREZYON' },
        { 
          id: 'king-edm', 
          name: 'KING EDM',
          subcategories: [
            { id: 'pnc-serisi-king', name: 'PNC SERİSİ' },
            { id: 'znc-serisi-king', name: 'ZNC SERİSİ' }
          ]
        }
      ]
    },
    { 
      id: 'kalipci-freze', 
      name: 'Kalıpçı Freze Tezgahları',
      subcategories: [
        { id: 'king', name: 'KİNG' },
        { id: 'jetco', name: 'JETCO' },
        { id: 'kg-super', name: 'KG SUPER' }
      ]
    },
    { 
      id: 'universal-kalipci-freze', 
      name: 'Üniversal Kalıpçı Freze Tezgahları',
      subcategories: [
        { id: 'king-universal', name: 'KİNG' },
        { id: 'king-ysm', name: 'KİNG YSM' },
        { id: 'kg-super-universal', name: 'KG SUPER' }
      ]
    },
    { id: 'koc-kafa-universal-freze', name: 'Koç Kafa Universal Freze' },
    { 
      id: 'taslama', 
      name: 'Taşlama Tezgahları',
      subcategories: [
        { id: 'king-grinder', name: 'KİNG GRINDER' }
      ]
    },
    { 
      id: 'universal-torna', 
      name: 'Torna Tezgahları',
      subcategories: [
        { id: 'king-torna', name: 'KING' },
        { id: 'jetco-torna', name: 'JETCO' },
        { id: 'tos', name: 'TOS' }
      ]
    },
    { id: 'masa-ustu-torna', name: 'Masaüstü Torna Tezgahları' },
    { 
      id: 'radyal-matkap', 
      name: 'Radyal Matkap Tezgahları',
      subcategories: [
        { id: 'tailift', name: 'TAILIFT' },
        { id: 'kg-super-matkap', name: 'KG SUPER' }
      ]
    },
    { 
      id: 'sutunlu-matkap', 
      name: 'Sütunlu Matkap Tezgahları',
      subcategories: [
        { id: 'king-matkap', name: 'KING' },
        { id: 'jetco-matkap', name: 'JETCO' },
        { id: 'sahin', name: 'ŞAHİN' },
        { id: 'boyka', name: 'BOYKA' }
      ]
    },
    { 
      id: 'testere', 
      name: 'Testere Tezgahları',
      subcategories: [
        { id: 'king-tyc', name: 'KING TYC' },
        { id: 'jetco-testere', name: 'JETCO' },
        { id: 'kesmak', name: 'KESMAK' }
      ]
    },
    { 
      id: 'kilavuz', 
      name: 'Kılavuz Çekme Tezgahları',
      subcategories: [
        { id: 'king-tapping', name: 'KING TAPPING' }
      ]
    }
  ],
  used: [
    { id: 'all', name: 'Tüm İkinci El Ürünler' },
  ],
  spare: [
    { id: 'all', name: 'Tüm Yedek Parçalar' },
  ],
  accessories: [
    { id: 'all', name: 'Tüm Aksesuarlar' },
  ],
  campaign: [
    { id: 'all-campaigns', name: 'Tüm Kampanyalar' },
  ]
};

interface Campaign {
  type: 'discount';
  endDate: string;
}

interface CategoryBase {
  id: string;
  name: string;
  subcategories?: CategoryBase[];
}

function AddProductContent() {
  const searchParams = useSearchParams();
  const productType = searchParams.get('type') || 'products';
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('tr'); // Dil tabı için state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    oldPrice: '',
    images: [] as File[],
    specifications: [{ id: 'spec-0', label: '', value: '' }],
    standardAccessories: [] as string[],
    optionalAccessories: [] as string[],
    type: productType,
    campaign: productType === 'campaign' ? {
      type: 'discount' as const,
      endDate: new Date().toISOString().split('T')[0]
    } : null,
    translations: {
      en: {
        name: '',
        description: '',
        specifications: [{ id: 'spec-0', label: '', value: '' }],
        standardAccessories: [] as string[],
        optionalAccessories: [] as string[]
      }
    }
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get('type');
    if (type) {
      // Her ürün tipi için varsayılan kategori
      let defaultCategory = '';
      switch(type) {
        case 'used':
          defaultCategory = 'all'; // İkinci El için varsayılan kategori
          break;
        case 'spare':
          defaultCategory = 'all'; // Yedek Parçalar için varsayılan kategori
          break;
        case 'accessories':
          defaultCategory = 'all'; // Aksesuarlar için varsayılan kategori
          break;
        case 'campaign':
          defaultCategory = 'all-campaigns'; // Kampanyalar için varsayılan kategori
          break;
      }

      setFormData(prev => ({
        ...prev,
        type: type,
        category: defaultCategory,
        campaign: type === 'campaign' ? {
          type: 'discount',
          endDate: new Date().toISOString().split('T')[0]
        } : null
      }));
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: [...Array.from(e.target.files || [])]
      }));
    }
  };

  const handleSpecificationAdd = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { 
        id: `spec-${prev.specifications.length}`, 
        label: '', 
        value: '' 
      }]
    }));
  };

  const handleStandardAccessoryAdd = () => {
    setFormData(prev => ({
      ...prev,
      standardAccessories: [...prev.standardAccessories, '']
    }));
  };

  const handleOptionalAccessoryAdd = () => {
    setFormData(prev => ({
      ...prev,
      optionalAccessories: [...prev.optionalAccessories, '']
    }));
  };

  const handleStandardAccessoryChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      standardAccessories: prev.standardAccessories.map((acc, i) => 
        i === index ? value : acc
      )
    }));
  };

  const handleOptionalAccessoryChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      optionalAccessories: prev.optionalAccessories.map((acc, i) => 
        i === index ? value : acc
      )
    }));
  };

  const handleStandardAccessoryRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      standardAccessories: prev.standardAccessories.filter((_, i) => i !== index)
    }));
  };

  const handleOptionalAccessoryRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      optionalAccessories: prev.optionalAccessories.filter((_, i) => i !== index)
    }));
  };

  const handleSpecificationChange = (index: number, field: 'label' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }));
  };

  const updateCampaign = (field: keyof Campaign, value: string) => {
    setFormData(prev => ({
      ...prev,
      campaign: {
        type: 'discount',
        endDate: field === 'endDate' ? value : prev.campaign?.endDate || ''
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category) {
      toast.error('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const formDataToSend = new FormData();
      formDataToSend.append('type', formData.type);
      
      console.log('Gönderilen form verileri:', {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        type: formData.type
      });
      
      // JSON verilerini ekle
      formDataToSend.append('data', JSON.stringify({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        oldPrice: formData.oldPrice,
        specifications: formData.specifications.map(spec => ({
          label: spec.label,
          value: spec.value
        })),
        standardAccessories: formData.standardAccessories,
        optionalAccessories: formData.optionalAccessories,
        campaign: formData.campaign,
        translations: {
          en: formData.translations.en.name || formData.translations.en.description ? {
            name: formData.translations.en.name,
            description: formData.translations.en.description,
            specifications: formData.translations.en.specifications.map(spec => ({
              label: spec.label,
              value: spec.value
            })),
            standardAccessories: formData.translations.en.standardAccessories,
            optionalAccessories: formData.translations.en.optionalAccessories
          } : undefined
        }
      }));

      // Görselleri ekle
      formData.images.forEach((image, index) => {
        formDataToSend.append(`image${index}`, image);
      });

      console.log('API isteği gönderiliyor...');
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include'
      });

      const data = await response.json();
      console.log('API yanıtı:', data);

      if (response.ok && data.success) {
        toast.success('Ürün başarıyla eklendi!');
        // Formu temizle
        setFormData({
          name: '',
          description: '',
          category: '',
          price: '',
          oldPrice: '',
          images: [],
          specifications: [{ id: 'spec-0', label: '', value: '' }],
          standardAccessories: [],
          optionalAccessories: [],
          type: productType,
          campaign: productType === 'campaign' ? {
            type: 'discount',
            endDate: new Date().toISOString().split('T')[0]
          } : null,
          translations: {
            en: {
              name: '',
              description: '',
              specifications: [{ id: 'spec-0', label: '', value: '' }],
              standardAccessories: [],
              optionalAccessories: []
            }
          }
        });
        // Ürünler sayfasına yönlendir
        router.push('/admin/panel/urunler');
      } else {
        throw new Error(data.error || 'Ürün eklenirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Ürün ekleme hatası:', error);
      setError('Ürün eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      toast.error('Ürün eklenirken bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {CATEGORIES[productType as keyof typeof CATEGORIES] ? `Yeni ${
            productType === 'products' ? 'Ürün' :
            productType === 'used' ? 'İkinci El Ürün' :
            productType === 'spare' ? 'Yedek Parça' :
            productType === 'accessories' ? 'Aksesuar' :
            'Kampanya'
          } Ekle` : 'Yeni Ürün Ekle'}
        </h1>

        {/* Dil Seçimi Tabları */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex space-x-4 border-b">
            <button
              type="button"
              onClick={() => setActiveTab('tr')}
              className={`px-4 py-2 font-medium rounded-t-lg ${
                activeTab === 'tr'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Türkçe
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`px-4 py-2 font-medium rounded-t-lg ${
                activeTab === 'en'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              İngilizce
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Temel Bilgiler */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              {activeTab === 'tr' ? 'Temel Bilgiler' : 'Basic Information'}
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  {activeTab === 'tr' ? 'Ürün Adı' : 'Product Name'}
                </label>
                <input
                  type="text"
                  required={activeTab === 'tr'}
                  value={activeTab === 'tr' ? formData.name : formData.translations.en.name}
                  onChange={(e) => {
                    if (activeTab === 'tr') {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        translations: {
                          ...prev.translations,
                          en: { ...prev.translations.en, name: e.target.value }
                        }
                      }));
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-text-light/60"
                  placeholder={activeTab === 'tr' ? 'Ürün adını girin' : 'Enter product name'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  {activeTab === 'tr' ? 'Açıklama' : 'Description'}
                </label>
                <textarea
                  required={activeTab === 'tr'}
                  value={activeTab === 'tr' ? formData.description : formData.translations.en.description}
                  onChange={(e) => {
                    if (activeTab === 'tr') {
                      setFormData(prev => ({ ...prev, description: e.target.value }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        translations: {
                          ...prev.translations,
                          en: { ...prev.translations.en, description: e.target.value }
                        }
                      }));
                    }
                  }}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-text-light/60"
                  placeholder={activeTab === 'tr' ? 'Ürün açıklamasını girin' : 'Enter product description'}
                />
              </div>

              {activeTab === 'tr' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Kategori
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text"
                      required
                    >
                      <option value="">Kategori Seçin</option>
                      {CATEGORIES[productType as keyof typeof CATEGORIES].map((category: CategoryBase) => (
                        <Fragment key={category.id}>
                          <option value={category.id}>{category.name}</option>
                          {category.subcategories?.map((subcat: CategoryBase) => (
                            <Fragment key={subcat.id}>
                              <option value={subcat.id}>&nbsp;&nbsp;{subcat.name}</option>
                              {subcat.subcategories?.map((subsubcat: CategoryBase) => (
                                <option key={subsubcat.id} value={subsubcat.id}>
                                  &nbsp;&nbsp;&nbsp;&nbsp;{subsubcat.name}
                                </option>
                              ))}
                            </Fragment>
                          ))}
                        </Fragment>
                      ))}
                    </select>
                  </div>

                  {productType !== 'campaign' && (
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Fiyat (TL)
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-text-light/60"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Görseller - Sadece Türkçe tabında göster */}
          {activeTab === 'tr' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-text mb-4">Ürün Görselleri</h2>
              <div className="space-y-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-text-light file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary hover:file:bg-primary-100"
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Ürün görseli ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Özellikler */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text">
                {activeTab === 'tr' ? 'Teknik Özellikler' : 'Technical Specifications'}
              </h2>
              <button
                type="button"
                onClick={activeTab === 'tr' ? handleSpecificationAdd : () => {
                  setFormData(prev => ({
                    ...prev,
                    translations: {
                      ...prev.translations,
                      en: {
                        ...prev.translations.en,
                        specifications: [
                          ...prev.translations.en.specifications,
                          { id: `spec-${prev.translations.en.specifications.length}`, label: '', value: '' }
                        ]
                      }
                    }
                  }));
                }}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full text-primary bg-primary-50 hover:bg-primary-100"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {activeTab === 'tr' ? 'Özellik Ekle' : 'Add Specification'}
              </button>
            </div>
            <div className="space-y-4">
              {(activeTab === 'tr' ? formData.specifications : formData.translations.en.specifications).map((spec, index) => (
                <div key={spec.id} className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => {
                      if (activeTab === 'tr') {
                        handleSpecificationChange(index, 'label', e.target.value);
                      } else {
                        const newSpecs = [...formData.translations.en.specifications];
                        newSpecs[index] = { ...newSpecs[index], label: e.target.value };
                        setFormData(prev => ({
                          ...prev,
                          translations: {
                            ...prev.translations,
                            en: { ...prev.translations.en, specifications: newSpecs }
                          }
                        }));
                      }
                    }}
                    placeholder={activeTab === 'tr' ? "Özellik (örn: Motor Gücü)" : "Feature (e.g.: Engine Power)"}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => {
                      if (activeTab === 'tr') {
                        handleSpecificationChange(index, 'value', e.target.value);
                      } else {
                        const newSpecs = [...formData.translations.en.specifications];
                        newSpecs[index] = { ...newSpecs[index], value: e.target.value };
                        setFormData(prev => ({
                          ...prev,
                          translations: {
                            ...prev.translations,
                            en: { ...prev.translations.en, specifications: newSpecs }
                          }
                        }));
                      }
                    }}
                    placeholder={activeTab === 'tr' ? "Değer (örn: 7.5 kW)" : "Value (e.g.: 7.5 kW)"}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Aksesuarlar */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-6">
              {/* Standart Aksesuarlar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text">
                    {activeTab === 'tr' ? 'Standart Aksesuarlar' : 'Standard Accessories'}
                  </h2>
                  <button
                    type="button"
                    onClick={activeTab === 'tr' ? handleStandardAccessoryAdd : () => {
                      setFormData(prev => ({
                        ...prev,
                        translations: {
                          ...prev.translations,
                          en: {
                            ...prev.translations.en,
                            standardAccessories: [...prev.translations.en.standardAccessories, '']
                          }
                        }
                      }));
                    }}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full text-primary bg-primary-50 hover:bg-primary-100"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {activeTab === 'tr' ? 'Aksesuar Ekle' : 'Add Accessory'}
                  </button>
                </div>
                <div className="space-y-4">
                  {(activeTab === 'tr' ? formData.standardAccessories : formData.translations.en.standardAccessories).map((accessory, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={accessory}
                        onChange={(e) => {
                          if (activeTab === 'tr') {
                            handleStandardAccessoryChange(index, e.target.value);
                          } else {
                            const newAccessories = [...formData.translations.en.standardAccessories];
                            newAccessories[index] = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              translations: {
                                ...prev.translations,
                                en: { ...prev.translations.en, standardAccessories: newAccessories }
                              }
                            }));
                          }
                        }}
                        placeholder={activeTab === 'tr' ? "Aksesuar adı" : "Accessory name"}
                        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (activeTab === 'tr') {
                            handleStandardAccessoryRemove(index);
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              translations: {
                                ...prev.translations,
                                en: {
                                  ...prev.translations.en,
                                  standardAccessories: prev.translations.en.standardAccessories.filter((_, i) => i !== index)
                                }
                              }
                            }));
                          }
                        }}
                        className="flex-shrink-0 text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opsiyonel Aksesuarlar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text">
                    {activeTab === 'tr' ? 'Opsiyonel Aksesuarlar' : 'Optional Accessories'}
                  </h2>
                  <button
                    type="button"
                    onClick={activeTab === 'tr' ? handleOptionalAccessoryAdd : () => {
                      setFormData(prev => ({
                        ...prev,
                        translations: {
                          ...prev.translations,
                          en: {
                            ...prev.translations.en,
                            optionalAccessories: [...prev.translations.en.optionalAccessories, '']
                          }
                        }
                      }));
                    }}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full text-primary bg-primary-50 hover:bg-primary-100"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {activeTab === 'tr' ? 'Aksesuar Ekle' : 'Add Accessory'}
                  </button>
                </div>
                <div className="space-y-4">
                  {(activeTab === 'tr' ? formData.optionalAccessories : formData.translations.en.optionalAccessories).map((accessory, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={accessory}
                        onChange={(e) => {
                          if (activeTab === 'tr') {
                            handleOptionalAccessoryChange(index, e.target.value);
                          } else {
                            const newAccessories = [...formData.translations.en.optionalAccessories];
                            newAccessories[index] = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              translations: {
                                ...prev.translations,
                                en: { ...prev.translations.en, optionalAccessories: newAccessories }
                              }
                            }));
                          }
                        }}
                        placeholder={activeTab === 'tr' ? "Aksesuar adı" : "Accessory name"}
                        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (activeTab === 'tr') {
                            handleOptionalAccessoryRemove(index);
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              translations: {
                                ...prev.translations,
                                en: {
                                  ...prev.translations.en,
                                  optionalAccessories: prev.translations.en.optionalAccessories.filter((_, i) => i !== index)
                                }
                              }
                            }));
                          }
                        }}
                        className="flex-shrink-0 text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Kampanya Bilgileri - Sadece Türkçe tabında göster */}
          {activeTab === 'tr' && productType === 'campaign' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-text mb-4">Kampanya Bilgileri</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Eski Fiyat (TL)
                    </label>
                    <input
                      type="number"
                      value={formData.oldPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, oldPrice: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Eski fiyat"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Yeni Fiyat (TL)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Yeni fiyat"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Kampanya Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    value={formData.campaign?.endDate || ''}
                    onChange={(e) => updateCampaign('endDate', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Kaydet Butonu */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {activeTab === 'tr' ? 'Ekleniyor...' : 'Adding...'}
                </>
              ) : (
                activeTab === 'tr' ? 'Ürünü Ekle' : 'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddProductPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <AddProductContent />
    </Suspense>
  );
} 