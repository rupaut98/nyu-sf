// src/app/interview/page.tsx
"use client";

import { useState, useCallback } from "react";
import { Conversation } from "../components/conversation";
import { AnimatedAvatar } from "../components/AnimatedAvatar";
import { StatusDisplay } from "../components/StatusDisplay";
import { ArrowLeftIcon, MicrophoneIcon, StopIcon } from "../components/Icons";

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
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [conversationState, setConversationState] = useState<'idle' | 'speaking' | 'listening'>('idle');

  const startInterview = (role: any) => {
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

  if (isInterviewStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto p-8">
          {/* Header */}
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

          {/* Main content */}
          <div className="flex flex-col items-center gap-16">
            {/* Animated Avatar */}
            <div className="flex justify-center">
              <AnimatedAvatar isSpeaking={isSpeaking} />
            </div>

            {/* Status Display and Controls */}
            <div className="flex flex-col items-center gap-6">
              {isConversationActive ? (
                <>
                  {/* Status Display is now rendered below the avatar */}
                  <StatusDisplay conversationState={conversationState} />

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
                </>
              ) : (
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
              )}
            </div>

            {/* Conversation component */}
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

  // Roles list view
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
