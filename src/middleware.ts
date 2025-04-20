import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// JWT secret key'i Buffer'a çevir
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'guvenal-secret-key');

// Middleware fonksiyonunu default export olarak tanımla
export default async function middleware(request: NextRequest) {
  // Admin sayfalarını kontrol et
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Login sayfasına erişime izin ver
    if (request.nextUrl.pathname === '/admin/login') {
      // Eğer zaten giriş yapmışsa panel'e yönlendir
      const token = request.cookies.get('admin_token')?.value;
      if (token) {
        try {
          const verified = await jwtVerify(token, secret);
          if (verified.payload.role === 'admin') {
            return NextResponse.redirect(new URL('/admin/panel', request.url));
          }
        } catch {
          // Token geçersizse devam et
          return NextResponse.next();
        }
      }
      return NextResponse.next();
    }

    // Token'ı kontrol et
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      console.log('Token bulunamadı, login sayfasına yönlendiriliyor');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Token'ı doğrula
      const verified = await jwtVerify(token, secret);
      if (verified.payload.role === 'admin') {
        console.log('Token doğrulandı, devam ediliyor');
        return NextResponse.next();
      }
      console.log('Geçersiz rol, login sayfasına yönlendiriliyor');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    } catch (err) {
      console.log('Token doğrulama hatası:', err);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 