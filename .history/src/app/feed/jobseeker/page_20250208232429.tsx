'use client';
import { useState } from 'react';
import FeedNavbar from '../../components/FeedNavbar';
import { jobPosts } from '@/app/data/mockData';

export default function JobSeekerFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    setCurrentIndex((prev) => Math.min(prev + 1, jobPosts.length - 1));
  };

  const sampleJob = {
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    description:
      'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences. Proficiency in React, Next.js, and TypeScript is required, with a strong focus on UI/UX skills.',
    skills: ['React/Next.js expertise', '5+ years of experience', 'TypeScript proficiency', 'Strong UI/UX skills'],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <FeedNavbar />
      <div className="relative flex flex-col items-center justify-center pt-16">
        {/* Phone-Sized Screen Area */}
        <div className="relative bg-white border border-gray-200 rounded-2xl shadow-md w-80 h-[640px] overflow-hidden flex flex-col items-center">
          {/* Image Section */}
          <div className="w-full h-40 bg-gray-200">
            <img
              src="/sample.jpg"
              alt="Job Visual"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Job Details Section */}
          <div className="flex-1 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold text-black">{sampleJob.title}</h2>
            <p className="text-gray-700 mt-2">{sampleJob.company}</p>
            <p className="text-gray-700">{sampleJob.location}</p>
            <p className="text-gray-700 mt-2">{sampleJob.salary}</p>
            <p className="text-gray-700 mt-4">{sampleJob.description}</p>
            <ul className="mt-4 list-disc list-inside text-gray-700">
              {sampleJob.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Buttons */}
        <div className="absolute top-1/2 transform -translate-y-1/2 -translate-x-[150%] left-12 flex flex-col items-center">
          {/* Pass Button */}
          <button
            onClick={() => handleSwipe('left')}
            className="bg-red-500 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <p className="mt-2 text-lg text-gray-600">Pass</p>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 translate-x-[150%] right-12 flex flex-col items-center">
          {/* Apply Button */}
          <button
            onClick={() => handleSwipe('right')}
            className="bg-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
          <p className="mt-2 text-lg text-gray-600">Apply</p>
        </div>
      </div>
    </div>
  );
}
