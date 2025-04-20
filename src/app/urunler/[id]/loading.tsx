import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-[104px]">
        <div className="h-96 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 