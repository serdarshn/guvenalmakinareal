import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Giriş başarısız');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl p-8 shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Admin Paneli</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Yönetim paneline erişmek için giriş yapın</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Kullanıcı Adı</label>
              <input id="username" name="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Kullanıcı adı" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Şifre</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Şifre" />
            </div>
          </div>

          {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">{error}</div>}

          <div>
            <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : 'Giriş Yap'}</button>
          </div>
        </form>
      </div>
    </div>
  );
} 