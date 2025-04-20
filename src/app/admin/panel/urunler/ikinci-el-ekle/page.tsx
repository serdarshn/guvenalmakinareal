'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface Specification {
  label: string;
  value: string;
}

export default function AddUsedProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    condition: '',
    year: '',
    images: [] as File[],
    specifications: [] as Specification[],
    slug: ''
  });

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
      specifications: [...prev.specifications, { label: '', value: '' }]
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

  const handleSpecificationRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ /g, '-') // Boşlukları tire ile değiştir
      .replace(/[^\w-]+/g, ''); // Geçersiz karakterleri kaldır
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const slug = generateSlug(formData.name);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('type', 'used');
      formDataToSend.append('slug', slug);
      formDataToSend.append('data', JSON.stringify({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        condition: formData.condition,
        year: formData.year,
        specifications: formData.specifications.filter(spec => spec.label && spec.value)
      }));

      // Görselleri ekle
      formData.images.forEach((image, index) => {
        formDataToSend.append(`image${index}`, image);
      });

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include'
      });

      const data = await response.json();
      console.log('API Yanıtı:', data); // API yanıtını konsola yazdırıyorum

      if (data.success) {
        toast.success('İkinci el ürün başarıyla eklendi!');
        router.push('/admin/panel/urunler');
      } else {
        throw new Error(data.message || 'Ürün eklenirken bir hata oluştu');
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
          İkinci El Ürün Ekle
        </h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Temel Bilgiler */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Temel Bilgiler</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ürün Adı
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fiyat
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Opsiyonel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Üretim Yılı
                </label>
                <input
                  type="number"
                  required
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Örn: 2015"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Görseller */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ürün Görselleri</h2>
            <div className="space-y-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary hover:file:bg-primary-100"
              />
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {Array.from(formData.images).map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Ürün görseli ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={200}
                        height={200}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Özellikler */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Teknik Özellikler</h2>
              <button
                type="button"
                onClick={handleSpecificationAdd}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full text-primary bg-primary-50 hover:bg-primary-100"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Özellik Ekle
              </button>
            </div>
            <div className="space-y-4">
              {formData.specifications.map((spec, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="grid grid-cols-2 gap-4 flex-grow">
                    <input
                      type="text"
                      value={spec.label}
                      onChange={(e) => handleSpecificationChange(index, 'label', e.target.value)}
                      placeholder="Özellik (örn: Motor Gücü)"
                      className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                      placeholder="Değer (örn: 7.5 kW)"
                      className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSpecificationRemove(index)}
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

          {/* Kategori */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategori</h2>
            <p className="text-sm text-gray-500">Tüm İkinci El Ürünler</p>
          </div>

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
                  Ekleniyor...
                </>
              ) : (
                'Ürünü Ekle'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 