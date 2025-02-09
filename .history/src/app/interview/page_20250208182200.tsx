/
"use client";

import { useState, useCallback } from "react";
import { Conversation } from "../components/conversation";
import { AnimatedAvatar } from '../components/AnimatedAvatar';

const AVAILABLE_ROLES = [
  {
    id: 1,
    title: "Machine Learning Engineer Intern",
    department: "AI/ML",
    description: "Summer internship position focusing on ML models development."
  },
  {
    id: 2,
    title: "Software Engineer Intern",
    department: "Engineering",
    description: "Full-stack development internship position."
  },
  {
    id: 3,
    title: "Data Science Intern",
    department: "Analytics",
    description: "Data analysis and visualization internship."
  }
];

export default function InterviewPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [conversationState, setConversationState] = useState<'idle' | 'speaking' | 'listening'>('idle');

  const startInterview = (role) => {
    setSelectedRole(role);
    setIsInterviewStarted(true);
  };

  const handleSpeakingStateChange = (speaking: boolean) => {
    setIsSpeaking(speaking);
    setConversationState(speaking ? 'speaking' : 'listening');
  };

  const handleStartConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsConversationActive(true);
      setConversationState('listening');
    } catch (error) {
      console.error('Failed to get microphone permission:', error);
      alert('Please allow microphone access to start the interview');
    }
  }, []);

  const handleEndConversation = useCallback(() => {
    setIsConversationActive(false);
    setIsSpeaking(false);
    setConversationState('idle');
  }, []);

  const getStatusDisplay = () => {
    switch (conversationState) {
      case 'speaking':
        return {
          icon: <WaveformIcon />,
          text: 'AI is speaking...',
          bgColor: 'bg-green-500'
        };
      case 'listening':
        return {
          icon: <MicrophoneIcon />,
          text: 'Listening to you...',
          bgColor: 'bg-blue-500'
        };
      default:
        return {
          icon: <MicrophoneIcon />,
          text: 'Start Conversation',
          bgColor: 'bg-blue-500'
        };
    }
  };

  if (isInterviewStarted) {
    const status = getStatusDisplay();

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto p-8">
          <div className="mb-12 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Interview for {selectedRole.title}
              </h2>
              <p className="text-gray-600">Department: {selectedRole.department}</p>
            </div>
            <button 
              onClick={() => {
                setIsInterviewStarted(false);
                setIsConversationActive(false);
                setIsSpeaking(false);
              }}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <ArrowLeftIcon />
              Back to Roles
            </button>
          </div>

          <div className="grid grid-cols-1 gap-16">
            <div className="flex justify-center">
              <AnimatedAvatar isSpeaking={isSpeaking} />
            </div>

            <div className="flex justify-center">
              {!isConversationActive ? (
                <button
                  onClick={handleStartConversation}
                  className="px-8 py-4 bg-gradient-to-r from-[#4ECDC4] to-[#45B7D1] text-white 
                           rounded-full hover:from-[#45B7D1] hover:to-[#4ECDC4] 
                           transition-all duration-300 shadow-lg hover:shadow-xl 
                           flex items-center gap-3 text-lg font-medium
                           hover:scale-105 transform"
                >
                  <MicrophoneIcon />
                  Start Conversation
                </button>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  <div className={`
                    px-8 py-4 rounded-full shadow-lg
                    ${isSpeaking 
                      ? 'bg-gradient-to-r from-[#FF3366] to-[#FF6B6B]' 
                      : 'bg-gradient-to-r from-[#4ECDC4] to-[#45B7D1]'}
                    flex items-center gap-3 text-white font-medium text-lg
                    animate-pulse-subtle
                  `}>
                    {status.icon}
                    <span>{status.text}</span>
                  </div>

                  <button
                    onClick={handleEndConversation}
                    className="px-8 py-4 bg-transparent border-2 border-red-400
                             text-red-500 rounded-full hover:bg-red-50
                             transition-all duration-300 flex items-center gap-3
                             text-lg font-medium hover:scale-105 transform"
                  >
                    <StopIcon />
                    End Conversation
                  </button>
                </div>
              )}
            </div>

            {isConversationActive && (
              <div className="w-full">
                <Conversation 
                  onSpeakingStateChange={handleSpeakingStateChange}
                  isActive={isConversationActive}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Available Positions</h1>
      <div className="grid gap-6">
        {AVAILABLE_ROLES.map((role) => (
          <div 
            key={role.id} 
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{role.title}</h2>
            <p className="text-gray-300 mb-2">Department: {role.department}</p>
            <p className="text-gray-300 mb-4">{role.description}</p>
            <button
              onClick={() => startInterview(role)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Start Interview
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

// Icon components
const MicrophoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const StopIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" />
  </svg>
);

const WaveformIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="10" width="2" height="4" className="animate-pulse" />
    <rect x="8" y="8" width="2" height="8" className="animate-pulse delay-100" />
    <rect x="12" y="6" width="2" height="12" className="animate-pulse delay-200" />
    <rect x="16" y="8" width="2" height="8" className="animate-pulse delay-300" />
    <rect x="20" y="10" width="2" height="4" className="animate-pulse delay-400" />
  </svg>
);
