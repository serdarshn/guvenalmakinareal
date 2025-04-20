import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Güvenal Makina - Endüstriyel Çözümler",
  description: "Endüstriyel makina ve ekipman çözümleri sunan Güvenal Makina&apos;nın resmi web sitesi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-background min-h-screen font-sans">
        <main className="flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
