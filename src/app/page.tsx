import Navbar from '@/component/Navbar';
import HeroSection from '@/component/HeroSection';

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
