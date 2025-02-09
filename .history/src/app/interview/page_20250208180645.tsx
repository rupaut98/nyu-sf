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
      // First request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsConversationActive(true);
      console.log('Conversation activated');
    } catch (error) {
      console.error('Failed to get microphone permission:', error);
      alert('Please allow microphone access to start the interview');
    }
  }, []);

  const handleEndConversation = useCallback(() => {
    console.log('Ending conversation...');
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
        <div className="flex gap-8 items-center justify-center">
          <div className="w-1/3">
            <AnimatedAvatar 
              isSpeaking={isSpeaking}
              onStartConversation={handleStartConversation}
              onEndConversation={handleEndConversation}
              isConversationActive={isConversationActive}
            />
          </div>
          {isConversationActive && (
            <div className="w-2/3">
              <Conversation 
                onSpeakingStateChange={setIsSpeaking}
                isActive={isConversationActive}
              />
            </div>
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
