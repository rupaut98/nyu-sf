'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SelectionPage() {
  const router = useRouter();

  const handleRecruiterSelect = () => {
    router.push('/recruiter/profile-setup');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12">Choose Your Path</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link 
              href="/feed/jobseeker"
              className="group"
            >
              <div className="border-2 border-black p-8 rounded-lg hover:bg-black hover:text-white transition-colors text-center">
                <h2 className="text-2xl font-bold mb-4">Job Seeker</h2>
                <p className="text-gray-600 group-hover:text-gray-200">
                  Find your next career opportunity by swiping through job listings
                </p>
              </div>
            </Link>
            <button 
              onClick={handleRecruiterSelect}
              className="group"
            >
              <div className="border-2 border-black p-8 rounded-lg hover:bg-black hover:text-white transition-colors text-center">
                <h2 className="text-2xl font-bold mb-4">Recruiter</h2>
                <p className="text-gray-600 group-hover:text-gray-200">
                  Find talented candidates by swiping through profiles
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 