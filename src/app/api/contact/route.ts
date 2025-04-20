import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// SMTP Transporter oluşturma
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Form tipine göre konu oluştur
    let subject = '';
    switch (data.formType) {
      case 'contact':
        subject = 'Yeni İletişim Formu';
        break;
      case 'reference':
        subject = 'Yeni Referans Talebi';
        break;
      case 'product':
        subject = 'Yeni Ürün Talebi';
        break;
      case 'service':
        subject = 'Yeni Servis Talebi';
        break;
      default:
        subject = 'Yeni Form Gönderimi';
    }

    // Mail içeriği oluştur
    const mailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          ${subject}
        </h2>
        
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;">
            <strong style="color: #374151;">Ad Soyad:</strong> 
            <span style="color: #6B7280;">${data.name}</span>
          </p>
          
          <p style="margin: 10px 0;">
            <strong style="color: #374151;">E-posta:</strong> 
            <span style="color: #6B7280;">${data.email}</span>
          </p>
          
          <p style="margin: 10px 0;">
            <strong style="color: #374151;">Telefon:</strong> 
            <span style="color: #6B7280;">${data.phone}</span>
          </p>

          ${data.company ? `
          <p style="margin: 10px 0;">
            <strong style="color: #374151;">Şirket:</strong> 
            <span style="color: #6B7280;">${data.company}</span>
          </p>
          ` : ''}

          ${data.product ? `
          <p style="margin: 10px 0;">
            <strong style="color: #374151;">Ürün:</strong> 
            <span style="color: #6B7280;">${data.product}</span>
          </p>
          ` : ''}

          <p style="margin: 10px 0;">
            <strong style="color: #374151;">Konu:</strong> 
            <span style="color: #6B7280;">${data.subject}</span>
          </p>
        </div>

        <div style="margin: 20px 0; padding: 15px; background-color: #F3F4F6; border-radius: 8px;">
          <strong style="color: #374151;">Mesaj:</strong>
          <p style="color: #6B7280; margin-top: 10px;">
            ${data.message.replace(/\n/g, '<br>')}
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #9CA3AF;">
          Bu e-posta Güvenal Makina web sitesi üzerinden gönderilmiştir.
        </div>
      </div>
    `;

    // Mail gönderme
    await transporter.sendMail({
      from: `"Güvenal Makina Web" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: `${subject} - ${data.name}`,
      html: mailContent
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Mesajınız başarıyla gönderildi.' 
    });

  } catch (error) {
    console.error('Mail gönderme hatası:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Mesaj gönderilirken bir hata oluştu.' 
    }, { status: 500 });
  }
} 