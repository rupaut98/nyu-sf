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

  const handleSpeakingStateChange = useCallback((speaking: boolean) => {
    console.log('Speaking state changed:', speaking); // Debug log
    setIsSpeaking(speaking);
    setConversationState(speaking ? 'speaking' : 'listening');
  }, []);

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
          <div className="grid grid-cols-1 gap-16">
            {/* Avatar Section - Now with proper speaking state */}
            <div className="flex justify-center">
              <AnimatedAvatar isSpeaking={isSpeaking} />
            </div>

            {/* Controls Section */}
            <div className="flex justify-center">
              {!isConversationActive ? (
                <button 
                  onClick={handleStartConversation}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <MicrophoneIcon className="w-5 h-5" />
                  Start Interview
                </button>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <StatusDisplay state={conversationState} />
                  <button 
                    onClick={handleEndConversation}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg"
                  >
                    <StopIcon className="w-5 h-5" />
                    End Interview
                  </button>
                </div>
              )}
            </div>

            {/* Conversation Component - Now with proper speaking handler */}
            {isConversationActive && (
              <Conversation 
                onSpeakingStateChange={handleSpeakingStateChange}
                isActive={isConversationActive}
              />
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
