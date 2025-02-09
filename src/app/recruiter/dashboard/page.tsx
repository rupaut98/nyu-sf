'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

// Mock data for matches
const MATCHES = [
  {
    id: 1,
    candidateName: "Rupak Raut",
    position: "Machine Learning Engineer",
    matchDate: "2024-03-15",
    status: "AI Screened",
    score: 93,
    hasAiInterview: true,
  },
  {
    id: 2,
    candidateName: "Jane Smith",
    position: "Machine Learning Engineer",
    matchDate: "2024-03-14",
    status: "Pending Screening",
    score: 85,
    hasAiInterview: false,
  },
  // Add more matches as needed
];

// Add mock data for job posts
const JOB_POSTS = [
  {
    id: 1,
    title: "Senior Machine Learning Engineer",
    company: "TechCorp Inc.",
    location: "New York, NY",
    type: "Full-time",
    postedDate: "2024-03-01",
    applicants: 45,
    status: "Active",
    description: "Looking for an experienced ML engineer to lead our AI initiatives...",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "DataDrive Solutions",
    location: "Remote",
    type: "Full-time",
    postedDate: "2024-03-10",
    applicants: 28,
    status: "Active",
    description: "Seeking a data scientist to work on challenging problems in fintech...",
  },
  {
    id: 3,
    title: "AI Research Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    postedDate: "2024-02-28",
    applicants: 32,
    status: "Paused",
    description: "Join our research team to push the boundaries of AI technology...",
  },
];

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState<'posts' | 'matches'>('matches');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <Link
              href="/recruiter/posts/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Post New Job
            </Link>
          </div>

          <div className="border-b border-gray-300">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-4 px-1 border-b-4 font-medium text-lg transition-all ${
                  activeTab === 'posts'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-400'
                }`}
              >
                My Posts
              </button>
              <button
                onClick={() => setActiveTab('matches')}
                className={`py-4 px-1 border-b-4 font-medium text-lg transition-all ${
                  activeTab === 'matches'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-400'
                }`}
              >
                Matches
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'matches' && (
          <div className="bg-white shadow-lg overflow-hidden rounded-lg">
            <ul className="divide-y divide-gray-200">
              {MATCHES.map((match) => (
                <li key={match.id} className="hover:bg-gray-50 transition-all">
                  <div className="px-6 py-4 sm:px-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{match.candidateName}</p>
                        <p className="text-sm text-gray-600">{match.position}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            match.score >= 90
                              ? 'bg-green-100 text-green-800'
                              : match.score >= 80
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          Score: {match.score}%
                        </span>
                        <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                          {match.status}
                        </span>
                        {match.hasAiInterview && (
                          <Link
                            href={`/recruiter/matches/${match.id}/conversation`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            View AI Interview <FiExternalLink className="ml-2" />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-gray-600">
                      <p>Matched on {match.matchDate}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="space-y-4">
            {JOB_POSTS.map((post) => (
              <div key={post.id} className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-gray-600">{post.company} • {post.location}</p>
                    <p className="text-sm text-gray-500 mt-1">{post.type}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      post.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <p className="mt-4 text-gray-600">{post.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Posted on {post.postedDate} • {post.applicants} applicants
                  </div>
                  <div className="space-x-3">
                    <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                      Edit
                    </button>
                    <button className="px-4 py-2 text-sm text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
