import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-black mb-6">
          Where Talent Meets Opportunity
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          SwipedIn revolutionizes job matching with an intuitive swipe interface. 
          Connect with your next career move or find the perfect candidate.
        </p>
        <Link
          href="/selection"
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors text-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
} 