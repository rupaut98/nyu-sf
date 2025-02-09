'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

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

// Mock data for matches
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
  },
];

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'matches' | 'feed'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user found');

        const response = await fetch(`/api/recruiter/jobs/${user.id}`);
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            {activeTab === 'jobs' && (
              <Link
                href="/recruiter/job-posting"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Post New Job
              </Link>
            )}
          </div>

          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'jobs'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Job Postings
              </button>
              <button
                onClick={() => setActiveTab('matches')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'matches'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Matches
              </button>
              <Link
                href="/feed/recruiter"
                className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Feed
              </Link>
            </nav>
          </div>
        </div>

        {activeTab === 'jobs' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No jobs posted yet.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span>{job.location}</span>
                    <span className="mx-2">•</span>
                    <span>{job.type}</span>
                  </div>
                  {job.salary && (
                    <p className="text-gray-600 text-sm mb-4">{job.salary}</p>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-400 text-sm">
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Initial Matches Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Initial Matches</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {MOCK_MATCHES.filter(match => !match.aiScreened).map((match) => (
                  <div
                    key={match.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{match.name}</h3>
                        <p className="text-gray-600 text-sm">{match.title}</p>
                        <p className="text-gray-500 text-sm">For: {match.jobTitle}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {match.matchPercentage}% Match
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {match.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-100 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                      Schedule Interview
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Screened Matches Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">AI Screened Matches</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {MOCK_MATCHES.filter(match => match.aiScreened).map((match) => (
                  <div
                    key={match.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{match.name}</h3>
                        <p className="text-gray-600 text-sm">{match.title}</p>
                        <p className="text-gray-500 text-sm">For: {match.jobTitle}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded block mb-1">
                          {match.matchPercentage}% Match
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded block">
                          AI Score: {match.aiScore}%
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {match.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-100 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200">
                        View AI Report
                      </button>
                      <button className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800">
                        Contact
                      </button>
                    </div>
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