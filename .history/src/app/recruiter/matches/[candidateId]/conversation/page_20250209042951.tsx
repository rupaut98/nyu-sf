'use client';
import { CONVERSATION_HISTORY } from '@/src/app/recruiter/matches/[candidateId]/conversation/constants';
import { useParams } from 'next/navigation';

export default function ConversationPage() {
  const params = useParams();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Interview Conversation</h1>
      
      <div className="space-y-8">
        {CONVERSATION_HISTORY.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {section.section}
            </h2>
            
            <div className="space-y-4">
              {section.messages.map((message, msgIndex) => (
                <div
                  key={msgIndex}
                  className={`flex flex-col ${
                    message.speaker.includes('Aria') ? 'items-start' : 'items-end'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.speaker.includes('Aria')
                        ? 'bg-gray-100'
                        : 'bg-blue-100'
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1">
                      {message.speaker}
                    </p>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {message.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 