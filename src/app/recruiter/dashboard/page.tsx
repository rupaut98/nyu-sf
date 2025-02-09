'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON!
);

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary: string | null;
  requirements: string[];
  createdAt: string;
}

// Mock data for jobs and matches
const SAMPLE_JOBS = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Exciting opportunity to work on cutting-edge projects.',
    salary: '$120,000 - $150,000',
    requirements: ['React', 'TypeScript', 'CSS'],
    createdAt: '2025-02-01',
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'CodeWave',
    location: 'Austin, TX',
    type: 'Contract',
    description: 'Build scalable APIs for our new platform.',
    salary: '$90,000 - $110,000',
    requirements: ['Node.js', 'Express', 'MongoDB'],
    createdAt: '2025-01-25',
  },
];

const MOCK_MATCHES = [
  {
    id: 1,
    name: 'John Doe',
    title: 'Senior Software Engineer',
    jobTitle: 'Frontend Developer',
    aiScreened: true,
    aiScore: 92,
    matchPercentage: 95,
    skills: ['React', 'Node.js', 'TypeScript'],
    experience: '8 years',
    hasAiInterview: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'Full Stack Developer',
    jobTitle: 'Full Stack Engineer',
    aiScreened: false,
    matchPercentage: 87,
    skills: ['Python', 'Django', 'AWS'],
    experience: '5 years',
    hasAiInterview: false,
  },
];

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'matches' | 'feed'>('jobs');
  const [jobs, setJobs] = useState<Job[]>(SAMPLE_JOBS);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-black">Dashboard</h1>
            {activeTab === 'jobs' && (
              <Link
                href="/recruiter/job-posting"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700"
              >
                Post New Job
              </Link>
            )}
          </div>

          <div className="border-b border-gray-300">
            <nav className="flex space-x-8">
              {['jobs', 'matches', 'feed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'jobs' | 'matches' | 'feed')}
                  className={`py-4 px-1 border-b-4 font-medium text-lg transition-colors ${
                    activeTab === tab
                      ? 'border-indigo-600 text-black'
                      : 'border-transparent text-gray-500 hover:text-black hover:border-gray-400'
                  }`}
                >
                  {tab === 'jobs'
                    ? 'My Job Postings'
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === 'jobs' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-black">No jobs posted yet.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <h2 className="text-2xl font-bold text-black mb-2">{job.title}</h2>
                  <p className="text-black">{job.company}</p>
                  <p className="text-black text-sm mb-4">
                    {job.location} • {job.type}
                  </p>
                  <p className="text-black text-sm mb-4">{job.description}</p>
                  {job.salary && (
                    <p className="text-indigo-600 text-sm font-semibold mb-4">
                      {job.salary}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-black text-sm">
                      Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Matches</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {MOCK_MATCHES.map((match) => (
                  <div
                    key={match.id}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-black">{match.name}</h3>
                        <p className="text-black text-sm">{match.title}</p>
                        <p className="text-black text-sm">For: {match.jobTitle}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded block mb-1">
                          {match.matchPercentage}% Match
                        </span>
                        {match.aiScreened && (
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                            AI Score: {match.aiScore}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {match.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-100 px-2 py-1 rounded text-xs text-black"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {match.aiScreened && (
                        <button className="flex-1 bg-gray-100 text-black py-2 rounded-lg hover:bg-gray-200">
                          View AI Report
                        </button>
                      )}
                      <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                        {match.aiScreened ? 'Contact' : 'Schedule Interview'}
                      </button>
                    </div>
                    {match.hasAiInterview && (
                      <Link 
                        href={`/recruiter/matches/${match.id}/conversation`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      >
                        View AI Interview <FiExternalLink className="ml-2" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
