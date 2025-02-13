// jobseeker/feed/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti';
import { useRouter } from 'next/navigation';
import { jobPosts } from '@/src/app/data/mockData';

export default function JobSeekerFeed() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showMatchMessage, setShowMatchMessage] = useState(false);

  const currentJob = jobPosts[currentIndex] || jobPosts[0];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);

    // If the user swipes right and the job is a match, show the match message.
    if (direction === 'right' && currentJob.isMatch) {
      setShowMatchMessage(true);
      // Hide the match message after 2 seconds.
      setTimeout(() => {
        setShowMatchMessage(false);
      }, 2000);
    }

    // Update the current index.
    setCurrentIndex((prev) =>
      direction === 'right'
        ? Math.min(prev + 1, jobPosts.length - 1)
        : Math.max(prev + 1, 0)
    );
  };

  const handleStartInterview = () => {
    router.push(`/jobseeker/interview/${currentJob.id}`);
  };

  const cardVariants = {
    initial: { opacity: 0, x: 100, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: (direction: 'left' | 'right') => ({
      opacity: 0,
      x: direction === 'right' ? 200 : -200,
      scale: 0.8,
    }),
  };

  const cardTransition = {
    type: "tween",
    duration: 0,
    ease: "easeInOut",

  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 relative">
      {/* Match Message */}
      <AnimatePresence>
        {showMatchMessage && (
          <motion.div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            You have a new match!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="flex-1 relative p-8 hidden md:block">
          {/* Background Image */}
          <Image
            src="/background.svg"
            alt="Background Graphic"
            width={450}
            height={450}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain mt-10 ml-[-2rem]"
          />
          {/* Text Content */}
          <div className="relative z-10 text-left mt-[5rem] ml-10">
            <h1 className="text-5xl font-bold text-indigo-600">
              Every swipe takes you closer to your dream job
            </h1>
            <p className="mt-2 text-lg text-gray-700">
              Get matched up for a job and do mock interview easily
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="relative flex flex-col items-center justify-center w-full max-w-md">
            <AnimatePresence custom={swipeDirection}>
              {currentJob && (
                <motion.div
                  key={currentJob.id}
                  className="relative bg-white border border-gray-200 rounded-2xl shadow-lg w-full h-[640px] overflow-hidden"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit={swipeDirection ? cardVariants.exit(swipeDirection) : undefined}
                  transition={cardTransition}
                >
                  <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={currentJob.companyLogo || '/google.gif'}
                        alt={`${currentJob.company} Logo`}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-2">
                      {currentJob.title}
                    </h2>
                    <p className="text-xl text-gray-700">{currentJob.company}</p>
                    <p className="text-lg text-gray-600 mt-1">{currentJob.location}</p>
                    <p className="text-xl font-semibold text-gray-800 mt-2">{currentJob.salary}</p>
                    <p className="text-gray-700 mt-4 leading-relaxed">{currentJob.description}</p>
                    <ul className="mt-4 space-y-2">
                      {currentJob.requirements && currentJob.requirements.length > 0 ? (
                        currentJob.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <span className="mr-2 text-indigo-500">•</span>
                            {requirement}
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-700">No requirements listed.</p>
                      )}
                    </ul>
                  </div>

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                    <button
                      onClick={() => handleSwipe('left')}
                      className="bg-red-500 z-50 text-white w-12 h-12 rounded-full shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                    >
                      <TiThumbsDown className="w-6 h-6" />
                    </button>
                   
                    <button
                      onClick={() => handleSwipe('right')}
                      className="bg-green-500 z-50 text-white w-12 h-12 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                      <TiThumbsUp className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
