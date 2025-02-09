// src/app/feed/jobseeker/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';

// Mock data for jobs
const MOCK_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences. Proficiency in React, Next.js, and TypeScript is required, with a strong focus on UI/UX skills.',
    image: '/images/job1.jpg'
  },
  // Add more mock jobs as needed
];

export default function JobSeekerFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const currentJob = MOCK_JOBS[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setDirection(direction);
    if (currentIndex < MOCK_JOBS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first job
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Feed</h1>
        <p className="mt-2 text-gray-600">Swipe right on jobs you're interested in</p>
      </div>

      <div className="relative h-[600px] w-full max-w-md mx-auto">
        <AnimatePresence>
          {currentJob && (
            <motion.div
              key={currentJob.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full h-full bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-1/2 bg-gray-200">
                <Image
                  src={currentJob.image}
                  alt={currentJob.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentJob.title}
                </h2>
                <div className="mb-4">
                  <p className="text-gray-700 font-medium">{currentJob.company}</p>
                  <p className="text-gray-600">{currentJob.location}</p>
                  <p className="text-gray-600">{currentJob.salary}</p>
                </div>
                <p className="text-gray-600 line-clamp-3">{currentJob.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
          <button
            onClick={() => handleSwipe('left')}
            className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <TiThumbsDown className="w-8 h-8 text-red-500" />
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <TiThumbsUp className="w-8 h-8 text-green-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
