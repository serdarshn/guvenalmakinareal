import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Token bulunamadı' }, { status: 401 });
    }

    const isValid = await verifyJwtToken(token);
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Geçersiz token' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: 'Sunucu hatası' }, { status: 500 });
  }
} 