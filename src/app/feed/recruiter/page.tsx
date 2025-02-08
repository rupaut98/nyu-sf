'use client';
import { useState } from 'react';
import SwipeCard from '@/components/SwipeCard';
import FeedNavbar from '../../../components/FeedNavbar';
import { userProfiles } from '@/data/mockData';

export default function RecruiterFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    // Handle swipe logic here
    setCurrentIndex(prev => Math.min(prev + 1, userProfiles.length - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FeedNavbar />
      <div className="pt-20 p-4">
        <div className="max-w-md mx-auto">
          {currentIndex < userProfiles.length && (
            <SwipeCard data={userProfiles[currentIndex]} type="profile" />
          )}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => handleSwipe('left')}
              className="bg-red-500 text-white px-6 py-2 rounded-full"
            >
              Pass
            </button>
            <button
              onClick={() => handleSwipe('right')}
              className="bg-green-500 text-white px-6 py-2 rounded-full"
            >
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 