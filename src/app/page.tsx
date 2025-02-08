import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
      </main>
    </div>
  );
}
