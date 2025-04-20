import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(new URL('/admin/giris', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
  
  // Token'ı sil
  response.cookies.delete('admin-token');
  
  return response;
} 