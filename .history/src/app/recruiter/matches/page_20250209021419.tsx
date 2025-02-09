'use client';
import { useState } from 'react';

// Mock data for demonstration
const MOCK_MATCHES = [
  {
    id: 1,
    name: 'John Doe',
    title: 'Senior Software Engineer',
    aiScore: 92,
    status: 'Passed AI Interview',
    matchPercentage: 95,
    skills: ['React', 'Node.js', 'TypeScript'],
    experience: '8 years',
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'Full Stack Developer',
    aiScore: 88,
    status: 'Pending Human Review',
    matchPercentage: 87,
    skills: ['Python', 'Django', 'AWS'],
    experience: '5 years',
  },
  // Add more mock candidates as needed
];

export default function RecruiterMatches() {
  const [activeTab, setActiveTab] = useState<'matches' | 'screened'>('matches');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Candidate Matches</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'matches'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('matches')}
              >
                Matches
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'screened'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('screened')}
              >
                AI Screened
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="grid gap-6">
              {MOCK_MATCHES.map((candidate) => (
                <div
                  key={candidate.id}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{candidate.name}</h3>
                      <p className="text-gray-600">{candidate.title}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">
                        {candidate.matchPercentage}% Match
                      </div>
                      <div className="text-sm text-gray-500">
                        AI Score: {candidate.aiScore}%
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Experience: {candidate.experience}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      {candidate.status}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    <button className="text-sm text-gray-600 hover:text-gray-900">
                      View Profile
                    </button>
                    <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm">
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 