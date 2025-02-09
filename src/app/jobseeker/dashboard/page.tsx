'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useConversation } from '@11labs/react';
import { AnimatedAvatar } from '@/src/app/components/AnimatedAvatar';
import { StatusDisplay } from '@/src/app/components/StatusDisplay';
import { ArrowLeftIcon, MicrophoneIcon, StopIcon } from '@/src/app/components/Icons';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON!
);

// Mock data for posts and matches
const MOCK_POSTS = [
  {
    id: 1,
    content:
      "Excited to share that I've completed my Machine Learning certification! Open to new opportunities in AI/ML. #MachineLearning #AI #OpenToWork",
    likes: 24,
    comments: 5,
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 2,
    content:
      "Just wrapped up an amazing internship at OmniSynkAI where I worked on BERT-based LLM models. Looking forward to new challenges! #SoftwareEngineering #ML",
    likes: 42,
    comments: 8,
    createdAt: '2024-03-10T15:30:00Z',
  },
];

const MOCK_MATCHES = [
  {
    id: 1,
    company: 'Mongo',
    position: 'Machine Learning Engineer',
    matchPercentage: 95,
    status: 'Application Viewed',
    salary: '$110k - $140k',
    location: 'Boston, MA',
    requirements: ['Python', 'Machine Learning', 'Artificial Intelligence'],
    postedAt: '1 days ago',
  },
  {
    id: 2,
    company: 'AI Solutions Ltd',
    position: 'Machine Learning Engineer',
    matchPercentage: 92,
    status: 'Interview Scheduled',
    salary: '$130k - $160k',
    location: 'Remote',
    requirements: ['Python', 'TensorFlow', 'AWS'],
    postedAt: '1 week ago',
  },
];

export default function JobSeekerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'posts' | 'matches'>('posts');
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [matches, setMatches] = useState(MOCK_MATCHES);

  // -------------------------
  // Interview / Conversation State & Logic
  // -------------------------
  const [selectedMatch, setSelectedMatch] = useState<typeof MOCK_MATCHES[0] | null>(null);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const conversationStarted = useRef(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to conversation service');
      setIsConversationActive(true);
    },
    onDisconnect: () => {
      console.log('Disconnected from conversation service');
      conversationStarted.current = false;
      setIsConversationActive(false);
    },
    onMessage: (message: any) => {
      console.log('Received message:', message);
    },
    onError: (error: any) => {
      console.error('Conversation error:', error);
      conversationStarted.current = false;
      setIsConversationActive(false);
    },
  });

  const handleStartConversation = useCallback(async () => {
    if (!conversation) {
      console.error('Conversation not initialized');
      return;
    }
    if (conversationStarted.current) {
      console.log('Conversation already started');
      return;
    }
    try {
      console.log('Requesting microphone access...');
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Starting conversation session...');
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_AGENT_ID!,
      });
      conversationStarted.current = true;
      await conversation.setVolume({ volume: 0.8 });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      alert('Please allow microphone access to start the interview');
      conversationStarted.current = false;
    }
  }, [conversation]);

  const handleEndConversation = useCallback(async () => {
    if (!conversation) {
      console.error('Conversation not initialized');
      return;
    }
    try {
      await conversation.endSession();
      setIsConversationActive(false);
      conversationStarted.current = false;
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  }, [conversation]);

  const startInterview = (match: typeof MOCK_MATCHES[0]) => {
    setSelectedMatch(match);
    setIsInterviewStarted(true);
  };

  const endInterview = () => {
    handleEndConversation();
    setIsInterviewStarted(false);
    setSelectedMatch(null);
  };

  // -------------------------
  // Post submission
  // -------------------------
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      content: newPost,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  // -------------------------
  // Render
  // -------------------------
  // If the user is in the matches tab and has started an interview, show the interview view.
  if (activeTab === 'matches' && isInterviewStarted && selectedMatch) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12 flex-grow pt-20">
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className=" text-3xl font-bold mb-2 text-black">
                {selectedMatch.position}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-lg text-gray-600">
                    Company: {selectedMatch.company}
                  </p>
                  <p className="text-lg text-gray-600">
                    Location: {selectedMatch.location}
                  </p>
                  <p className="text-lg text-gray-600">
                    Salary: {selectedMatch.salary}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Required Skills:
                  </h3>
                  <ul className="list-disc pl-5">
                    {selectedMatch.requirements.map((req, index) => (
                      <li key={index} className="text-black">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24 items-center">
                <div className="flex justify-center">
                  <AnimatedAvatar
                    isSpeaking={conversation.isSpeaking}
                    className="w-48 h-48 md:w-64 md:h-64"
                  />
                </div>
                <div className="flex flex-col items-center">
                  {!isConversationActive ? (
                    <button
                      onClick={handleStartConversation}
                      className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg text-lg font-medium"
                    >
                      <MicrophoneIcon className="w-6 h-6" />
                      Start Interview
                    </button>
                  ) : (
                    <div className="flex flex-col items-center gap-6">
                      <StatusDisplay
                        state={conversation.isSpeaking ? 'speaking' : 'listening'}
                      />
                      <button
                        onClick={handleEndConversation}
                        className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg text-lg font-medium"
                      >
                        <StopIcon className="w-6 h-6" />
                        End Interview
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <button
              onClick={endInterview}
              className="px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-medium flex items-center gap-2 shadow-lg"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Matches
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render the main dashboard with two tabs:
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header and Tabs */}
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
              My Posts
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'matches'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Job Matches
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'posts' ? (
        // -------------------------
        // Posts Section
        // -------------------------
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handlePostSubmit}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your thoughts, achievements, or job search status..."
                className="w-full p-4 border rounded-lg focus:ring-black focus:border-black"
                rows={3}
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-800 mb-4">{post.content}</p>
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
        // -------------------------
        // Matches Section
        // -------------------------
        <div className="space-y-6">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{match.position}</h3>
                  <p className="text-gray-600">{match.company}</p>
                  <p className="text-gray-500 text-sm">{match.location}</p>
                </div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                    {match.matchPercentage}% Match
                  </span>
                  <p className="text-gray-600 mt-2">{match.salary}</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">Required Skills</div>
                <div className="flex flex-wrap gap-2">
                  {match.requirements.map((skill) => (
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
                <span className="text-sm text-blue-600 font-medium">
                  {match.status}
                </span>
                <span className="text-sm text-gray-500">
                  Posted {match.postedAt}
                </span>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  View Details
                </button>
                {/* Instead of “Apply Now”, we now offer a “Start Interview” button */}
                <button
                  onClick={() => startInterview(match)}
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all transform hover:scale-105 text-sm"
                >
                  Start Interview
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
