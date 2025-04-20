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
    const formData = await req.formData();
    
    // CV dosyasını al
    const cvFile = formData.get('cv') as File;
    const cvBuffer = await cvFile.arrayBuffer();

    // Mail içeriği oluştur
    const mailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          Yeni İş Başvurusu
        </h2>
        
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;">
            <strong style="color: #374151;">Ad Soyad:</strong> 
            <span style="color: #6B7280;">${formData.get('name')}</span>
          </p>
          
          <p style="margin: 10px 0;">
            <strong style="color: #374151;">E-posta:</strong> 
            <span style="color: #6B7280;">${formData.get('email')}</span>
          </p>
          
          <p style="margin: 10px 0;">
            <strong style="color: #374151;">Telefon:</strong> 
            <span style="color: #6B7280;">${formData.get('phone')}</span>
          </p>
          
          <p style="margin: 10px 0;">
            <strong style="color: #374151;">Pozisyon:</strong> 
            <span style="color: #6B7280;">${formData.get('position')}</span>
          </p>
        </div>

        <div style="margin: 20px 0; padding: 15px; background-color: #F3F4F6; border-radius: 8px;">
          <strong style="color: #374151;">Başvuru Notu:</strong>
          <p style="color: #6B7280; margin-top: 10px;">${formData.get('note') || 'Not belirtilmemiş.'}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #9CA3AF;">
          Bu e-posta Güvenal Makina kariyer formu üzerinden gönderilmiştir.
        </div>
      </div>
    `;

    // Mail gönderme
    await transporter.sendMail({
      from: `"Güvenal Makina Kariyer" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: `Yeni İş Başvurusu - ${formData.get('name')}`,
      html: mailContent,
      attachments: [
        {
          filename: cvFile.name,
          content: Buffer.from(cvBuffer)
        }
      ]
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Başvurunuz başarıyla gönderildi.' 
    });

  } catch (error) {
    console.error('Mail gönderme hatası:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Başvuru gönderilirken bir hata oluştu.' 
    }, { status: 500 });
  }
} 