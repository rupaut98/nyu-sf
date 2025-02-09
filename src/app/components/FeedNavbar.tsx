import Link from 'next/link';
import { Home, MessageCircle, Settings, User } from 'lucide-react';

export default function FeedNavbar() {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-black">
            SwipedIn
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/feed/jobseeker" className="text-gray-600 hover:text-black">
              <Home className="w-6 h-6" />
            </Link>
            <Link href="/interview" className="text-gray-600 hover:text-black">
              <MessageCircle className="w-6 h-6" />
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-black">
              <User className="w-6 h-6" />
            </Link>
            <Link href="/settings" className="text-gray-600 hover:text-black">
              <Settings className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
