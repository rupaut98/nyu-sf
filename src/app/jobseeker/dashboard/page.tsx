'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON!
);

// Mock data for posts and matches
const MOCK_POSTS = [
  {
    id: 1,
    content: "Excited to share that I've completed my Machine Learning certification! Open to new opportunities in AI/ML. #MachineLearning #AI #OpenToWork",
    likes: 24,
    comments: 5,
    createdAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 2,
    content: "Just wrapped up an amazing internship at OmniSynkAI where I worked on BERT-based LLM models. Looking forward to new challenges! #SoftwareEngineering #ML",
    likes: 42,
    comments: 8,
    createdAt: '2024-03-10T15:30:00Z'
  }
];

const MOCK_MATCHES = [
  {
    id: 1,
    company: "TechCorp Inc.",
    position: "Senior Software Engineer",
    matchPercentage: 95,
    status: "Application Viewed",
    salary: "$120k - $150k",
    location: "San Francisco, CA",
    requirements: ["React", "Node.js", "AWS"],
    postedAt: "2 days ago"
  },
  {
    id: 2,
    company: "AI Solutions Ltd",
    position: "Machine Learning Engineer",
    matchPercentage: 92,
    status: "Interview Scheduled",
    salary: "$130k - $160k",
    location: "Remote",
    requirements: ["Python", "TensorFlow", "AWS"],
    postedAt: "1 week ago"
  }
];

export default function JobSeekerDashboard() {
  const [activeTab, setActiveTab] = useState<'posts' | 'matches'>('posts');
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [matches, setMatches] = useState(MOCK_MATCHES);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      content: newPost,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString()
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-6">Dashboard</h1>
          
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'posts'
                    ? 'border-indigo-600 text-black'
                    : 'border-transparent text-black hover:text-black hover:border-gray-300'
                }`}
              >
                My Posts
              </button>
              <button
                onClick={() => setActiveTab('matches')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'matches'
                    ? 'border-indigo-600 text-black'
                    : 'border-transparent text-black hover:text-black hover:border-gray-300'
                }`}
              >
                Job Matches
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'posts' ? (
          <div className="space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <form onSubmit={handlePostSubmit}>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your thoughts, achievements, or job search status..."
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  rows={3}
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>

            {/* Posts List */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
                <p className="text-black text-lg mb-4">{post.content}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex space-x-6">
                    <button className="flex items-center space-x-2 text-black hover:text-indigo-600">
                      <span>👍</span>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-black hover:text-indigo-600">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <span className="text-black">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map((match) => (
              <div key={match.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-black">{match.position}</h3>
                    <p className="text-black">{match.company}</p>
                    <p className="text-black text-sm mt-1">{match.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-black">
                      {match.matchPercentage}% Match
                    </span>
                    <p className="text-black font-medium mt-2">{match.salary}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-black mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {match.requirements.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-black"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-black">
                    {match.status}
                  </span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-black">
                      Posted {match.postedAt}
                    </span>
                    <button className="text-sm text-black hover:text-black">
                      View Details
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      Apply Now
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
