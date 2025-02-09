'use client';
import { CONVERSATION_HISTORY } from '@/src/app/recruiter/matches/[candidateId]/conversation/constants';
import { useParams } from 'next/navigation';

export default function ConversationPage() {
  const params = useParams();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Interview Conversation</h1>
      
      <div className="space-y-8">
        {CONVERSATION_HISTORY.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {section.section}
            </h2>
            
            <div className="space-y-4">
              {section.messages.map((message, msgIndex) => {
                const isRecruiter = message.speaker.includes('Bipul');
                return (
                  <div
                    key={msgIndex}
                    className={`flex ${isRecruiter ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 shadow-sm transition-colors duration-200 ${
                        isRecruiter
                          ? 'bg-indigo-100 text-gray-800'
                          : 'bg-green-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm font-semibold mb-1">
                        {message.speaker}
                      </p>
                      <p className="text-base whitespace-pre-wrap">
                        {message.message}
                      </p>
                      <p className="text-xs mt-2 text-gray-500">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 