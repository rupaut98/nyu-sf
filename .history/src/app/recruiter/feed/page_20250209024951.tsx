'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';

// Mock data for candidates
const MOCK_CANDIDATES = [
  {
    id: 1,
    name: 'John Doe',
    title: 'Senior Software Engineer',
    experience: '8 years',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    bio: 'Experienced software engineer with a strong background in full-stack development. Passionate about building scalable applications and mentoring junior developers.',
    image: '/images/profile1.jpg'
  },
  // Add more mock candidates as needed
];

export default function RecruiterFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const currentCandidate = MOCK_CANDIDATES[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setDirection(direction);
    if (currentIndex < MOCK_CANDIDATES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Candidate Feed</h1>
        <p className="mt-2 text-gray-600">Swipe right on candidates you're interested in</p>
      </div>

      <div className="relative h-[600px] w-full max-w-md mx-auto">
        <AnimatePresence>
          {currentCandidate && (
            <motion.div
              key={currentCandidate.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full h-full bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-1/2 bg-gray-200">
                <Image
                  src={currentCandidate.image}
                  alt={currentCandidate.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentCandidate.name}
                </h2>
                <div className="mb-4">
                  <p className="text-gray-700 font-medium">{currentCandidate.title}</p>
                  <p className="text-gray-600">{currentCandidate.experience} experience</p>
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {currentCandidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 line-clamp-3">{currentCandidate.bio}</p>
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