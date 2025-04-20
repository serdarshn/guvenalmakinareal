import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ürün Detayı | Güvenal Makina',
  description: 'Güvenal Makina ürün detay sayfası',
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 