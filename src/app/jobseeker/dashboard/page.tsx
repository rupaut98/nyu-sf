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
  const [activeTab, setActiveTab] = useState<'posts' | 'matches' | 'feed'>('posts');
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-black">Dashboard</h1>
          </div>

          <div className="border-b border-gray-300">
            <nav className="flex space-x-8">
              {['posts', 'matches', 'feed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'posts' | 'matches' | 'feed')}
                  className={`py-4 px-1 border-b-4 font-medium text-lg ${
                    activeTab === tab
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {tab === 'posts'
                    ? 'My Posts'
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
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
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
                  rows={3}
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>

            {/* Posts List */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
                <p className="text-black mb-4">{post.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 hover:text-black">
                      <span>👍</span>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-black">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map((match) => (
              <div key={match.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-black">{match.position}</h3>
                    <p className="text-black">{match.company}</p>
                    <p className="text-black text-sm">{match.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                      {match.matchPercentage}% Match
                    </span>
                    <p className="text-black mt-2">{match.salary}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-black mb-2">Required Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {match.requirements.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm text-black"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-600 font-medium">
                    {match.status}
                  </span>
                  <span className="text-sm text-black">
                    Posted {match.postedAt}
                  </span>
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <button className="text-sm text-black hover:text-indigo-600">
                    View Details
                  </button>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 text-sm">
                    DM Recruiter
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
