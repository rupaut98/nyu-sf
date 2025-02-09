// src/app/interview/page.tsx
"use client";

import { useState, useCallback, useRef } from "react";
import { useConversation } from '@11labs/react';
import { AnimatedAvatar } from "@/src/components/AnimatedAvatar";
import { StatusDisplay } from "@/components/StatusDisplay";
import { ArrowLeftIcon, MicrophoneIcon, StopIcon } from "@/components/Icons";
import { useRouter } from 'next/navigation';

// Updated to include more job details
const AVAILABLE_ROLES = [
  {
    id: 1,
    title: "Machine Learning Engineer Intern",
    company: "TechCorp AI",
    department: "AI/ML",
    description: "Summer internship position focusing on ML models development.",
    requirements: [
      "Strong Python programming skills",
      "Experience with ML frameworks",
      "Understanding of deep learning concepts"
    ],
    salary: "$8000/month",
    location: "San Francisco, CA"
  },
  {
    id: 2,
    title: "Software Engineer Intern",
    company: "InnovateX",
    department: "Engineering",
    description: "Full-stack development internship position.",
    requirements: [
      "JavaScript/TypeScript proficiency",
      "React.js experience",
      "Basic understanding of backend development"
    ],
    salary: "$7500/month",
    location: "New York, NY"
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "DataViz Corp",
    department: "Analytics",
    description: "Data analysis and visualization internship.",
    requirements: [
      "SQL proficiency",
      "Experience with data visualization tools",
      "Statistical analysis skills"
    ],
    salary: "$7000/month",
    location: "Boston, MA"
  }
];

export default function InterviewPage() {
  const router = useRouter();
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
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12 flex-grow pt-20">
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedRole.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-lg text-gray-600">Company: {selectedRole.company}</p>
                  <p className="text-lg text-gray-600">Department: {selectedRole.department}</p>
                  <p className="text-lg text-gray-600">Location: {selectedRole.location}</p>
                  <p className="text-lg text-gray-600">Salary: {selectedRole.salary}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Requirements:</h3>
                  <ul className="list-disc pl-5">
                    {selectedRole.requirements.map((req, index) => (
                      <li key={index} className="text-gray-600">{req}</li>
                    ))}
                  </ul>
                </div>
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
          </div>
          
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => {
                handleEndConversation();
                setIsInterviewStarted(false);
              }}
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12 pt-20">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Your Interview Matches</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {AVAILABLE_ROLES.map((role) => (
            <div
              key={role.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">{role.title}</h2>
              <p className="text-gray-600 mb-2">Company: {role.company}</p>
              <p className="text-gray-600 mb-2">Department: {role.department}</p>
              <p className="text-gray-600 mb-2">Location: {role.location}</p>
              <p className="text-gray-600 mb-4">Salary: {role.salary}</p>
              <p className="text-gray-700 mb-4">{role.description}</p>
              <button
                onClick={() => startInterview(role)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 font-medium"
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
