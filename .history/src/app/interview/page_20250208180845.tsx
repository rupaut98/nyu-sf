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

  const startInterview = (role) => {
    setSelectedRole(role);
    setIsInterviewStarted(true);
  };

  const handleStartConversation = useCallback(async () => {
    console.log('Starting conversation...');
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsConversationActive(true);
      console.log('Conversation activated');
    } catch (error) {
      console.error('Failed to get microphone permission:', error);
      alert('Please allow microphone access to start the interview');
    }
  }, []);

  const handleEndConversation = useCallback(() => {
    setIsConversationActive(false);
    setIsSpeaking(false);
  }, []);

  if (isInterviewStarted) {
    return (
      <div className="p-8 min-h-screen bg-black text-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Interview for {selectedRole.title}</h2>
          <button 
            onClick={() => {
              setIsInterviewStarted(false);
              setIsConversationActive(false);
              setIsSpeaking(false);
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Roles
          </button>
        </div>
        <div className="flex flex-col items-center gap-8">
          <AnimatedAvatar isSpeaking={isSpeaking} />
          
          <div className="flex flex-col items-center gap-4">
            {!isConversationActive ? (
              <button
                onClick={handleStartConversation}
                className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <MicrophoneIcon />
                Start Conversation
              </button>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className={`px-6 py-3 rounded-full ${isSpeaking ? 'bg-green-500' : 'bg-blue-500'} flex items-center gap-2`}>
                  {isSpeaking ? (
                    <>
                      <WaveformIcon />
                      <span>AI is speaking...</span>
                    </>
                  ) : (
                    <>
                      <MicrophoneIcon />
                      <span>Listening...</span>
                    </>
                  )}
                </div>
                <button
                  onClick={handleEndConversation}
                  className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  End Conversation
                </button>
              </div>
            )}
          </div>

          {isConversationActive && (
            <Conversation 
              onSpeakingStateChange={setIsSpeaking}
              isActive={isConversationActive}
            />
          )}
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

// Icon components
const MicrophoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
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
