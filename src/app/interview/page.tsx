"use client";

import FeedNavbar from '../components/FeedNavbar';
import { useState, useCallback, useRef } from "react";
import { useConversation } from '@11labs/react';
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
  const [selectedRole, setSelectedRole] = useState(null);
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
    onMessage: (message) => {
      console.log('Received message:', message);
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      conversationStarted.current = false;
      setIsConversationActive(false);
    },
  });

  const startInterview = (role) => {
    setSelectedRole(role);
    setIsInterviewStarted(true);
  };

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

      console.log('Conversation started successfully');
      conversationStarted.current = true;

      await conversation.setVolume({ volume: 0.8 });

    } catch (error) {
      console.error('Failed to start conversation:', error);
      alert('Please allow microphone access to start the interview');
      conversationStarted.current = false;
    }
  }, [conversation]);

  const handleEndConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      setIsConversationActive(false);
      conversationStarted.current = false;
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  }, [conversation]);

  if (isInterviewStarted) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <FeedNavbar />
        <div className="max-w-7xl mx-auto px-6 py-12 flex-grow pt-20">
          <div className="mb-12 flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2 leading-tight tracking-tight">
                Interview for {selectedRole.title}
              </h2>
              <p className="text-lg text-gray-600">Department: {selectedRole.department}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24 items-center">
              <div className="flex justify-center">
                <AnimatedAvatar isSpeaking={conversation.isSpeaking} className="w-48 h-48 md:w-64 md:h-64" />
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
                    <StatusDisplay state={conversation.isSpeaking ? 'speaking' : 'listening'} />
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
          <div className="mt-12 flex justify-center"> {/* Back to Roles at bottom */}
            <button
              onClick={() => {
                handleEndConversation();
                setIsInterviewStarted(false);
              }}
              className="px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-medium flex items-center gap-2 shadow-lg"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Roles
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <FeedNavbar />
      <div className="max-w-5xl mx-auto pt-20">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Your Matches!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {AVAILABLE_ROLES.map((role) => (
            <div
              key={role.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-gray-800"
            >
              <h2 className="text-2xl font-semibold mb-3">{role.title}</h2>
              <p className="text-gray-600 mb-3">Department: {role.department}</p>
              <p className="text-gray-600 mb-4">{role.description}</p>
              <button
                onClick={() => startInterview(role)}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
              >
                Start Interview
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}