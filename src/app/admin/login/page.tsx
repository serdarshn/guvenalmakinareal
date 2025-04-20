'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sayfa yüklendiğinde debug loglarını kontrol et
  useEffect(() => {
    const logs = localStorage.getItem('debug_logs');
    if (logs) {
      console.log('🔍 Önceki işlem logları:', JSON.parse(logs));
      localStorage.removeItem('debug_logs');
    }
  }, []);

  const saveLog = (log: string) => {
    const logs = JSON.parse(localStorage.getItem('debug_logs') || '[]');
    logs.push({ time: new Date().toISOString(), message: log });
    localStorage.setItem('debug_logs', JSON.stringify(logs));
    console.log(log);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) {
      saveLog('🔄 Zaten bir giriş denemesi devam ediyor...');
      return;
    }
    
    saveLog('🚀 Giriş işlemi başlatılıyor...');
    saveLog(`📝 Girilen bilgiler: ${username}`);
    
    setError('');
    setLoading(true);

    try {
      saveLog('📡 API isteği gönderiliyor...');
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
        cache: 'no-store'
      });

      saveLog(`📨 API yanıtı alındı: ${response.status} ${response.statusText}`);

      const data = await response.json();
      saveLog(`📄 API yanıt detayları: ${JSON.stringify(data)}`);

      if (response.ok && data.success) {
        saveLog('✅ Giriş başarılı! Yönlendirme başlatılıyor...');
        
        // Cookie'lerin ayarlanması için bekle
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        saveLog('🔄 Panel sayfasına yönlendirme yapılıyor...');
        
        // Yönlendirme öncesi son log
        localStorage.setItem('login_success', 'true');
        
        // Farklı yönlendirme yöntemlerini dene
        try {
          window.location.assign('/admin/panel');
        } catch (e) {
          saveLog(`⚠️ İlk yönlendirme başarısız: ${e}`);
          try {
            window.location.href = '/admin/panel';
          } catch (e2) {
            saveLog(`⚠️ İkinci yönlendirme başarısız: ${e2}`);
            window.location.replace('/admin/panel');
          }
        }
        return;
      } else {
        saveLog(`❌ Giriş başarısız: ${data.message}`);
        setError(data.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      saveLog(`🚨 Giriş hatası: ${err}`);
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Güvenal Makina"
            width={200}
            height={51}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Admin Paneli
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Lütfen giriş yapmak için bilgilerinizi girin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Kullanıcı Adı
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                Giriş Yapılıyor...
              </div>
            ) : (
              'Giriş Yap'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 