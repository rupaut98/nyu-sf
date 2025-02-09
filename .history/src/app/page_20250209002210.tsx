import Navbar from '@/src/app/components/Navbar';
import HeroSection from '@/src/app/components/HeroSection';

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
