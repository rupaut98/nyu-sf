'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

// Hardcoded Matches data.
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
  // Add more matches as needed.
];

// Hardcoded Job Postings data (using same details as in job-posting page).
const JOB_POSTINGS = [
  {
    id: 1,
    title: 'Machine Learning Engineer',
    company: 'InnovateAI Solutions',
    location: 'Remote',
    type: 'Full-time',
    description: `InnovateAI Solutions is a fast-growing startup focused on AI for e-commerce.

Core Responsibilities:
- Develop and deploy machine learning models (especially NLP).
- Fine-tune LLMs.
- Work with large datasets.
- Use cloud platforms (AWS, Azure, GCP).
- Collaborate with a team.`,
    salary: '',
    requirements: [
      'Python programming',
      'Experience with ML frameworks (TensorFlow, PyTorch, scikit-learn)',
      'NLP experience',
      'Cloud experience (AWS, Azure, GCP)',
      'Version control (Git)',
      'RESTful APIs',
      'LLM fine-tuning experience (bonus)',
      'Docker/Kubernetes (bonus)',
      'React/Next.js experience (bonus)',
      'Open-source contributions (bonus)',
    ],
    postDate: "2024-03-16",
  },
];

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState<'posts' | 'matches'>('matches');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posts'
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
          </nav>
        </div>
      </div>

      {activeTab === 'matches' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {MATCHES.map((match) => (
              <li key={match.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-900">
                        {match.candidateName}
                      </p>
                      <p className="text-sm text-gray-500">{match.position}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${match.score >= 90 ? 'bg-green-100 text-green-800' : 
                          match.score >= 80 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}
                      >
                        Score: {match.score}%
                      </span>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {match.status}
                      </span>
                      {match.hasAiInterview && (
                        <Link 
                          href={`/recruiter/matches/${match.id}/conversation`}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                          View AI Interview <FiExternalLink className="ml-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Matched on {match.matchDate}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {JOB_POSTINGS.map((job) => (
              <li key={job.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-700">{job.company}</p>
                      <p className="text-sm text-gray-500">
                        {job.location} • {job.type}
                      </p>
                      <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Link 
                        href={`/recruiter/postings/${job.id}`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      >
                        View Details <FiExternalLink className="ml-2" />
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Posted on {job.postDate}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
