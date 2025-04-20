import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'guvenal2024';
const JWT_SECRET = process.env.JWT_SECRET || 'guvenal-secret-key';

// OPTIONS metodu için handler
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// POST metodu için handler
export async function POST(request: Request) {
  try {
    if (request.method !== 'POST') {
      return NextResponse.json(
        { success: false, message: 'Method not allowed' },
        { status: 405 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı adı ve şifre gerekli' },
        { status: 400 }
      );
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // JWT token oluştur
      const token = sign(
        { username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Token'ı cookie olarak ayarla
      const response = NextResponse.json(
        { success: true, message: 'Giriş başarılı' },
        { status: 200 }
      );

      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400 // 1 gün
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Geçersiz kullanıcı adı veya şifre' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
} 