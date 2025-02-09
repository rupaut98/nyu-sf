'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useEffect, useRef } from 'react';

interface ConversationProps {
  onSpeakingStateChange: (isSpeaking: boolean) => void;
  isActive: boolean; // New prop to control conversation state
}

export function Conversation({ onSpeakingStateChange, isActive }: ConversationProps) {
  const conversationStarted = useRef(false);

  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => {
      console.log('Message:', message);
      // Update speaking state when AI starts/stops talking
      const isSpeaking = message.type === 'start-speaking';
      onSpeakingStateChange?.(isSpeaking);
    },
    onError: (error) => console.error('Error:', error),
  });

  const startConversation = useCallback(async () => {
    if (conversationStarted.current) return;
    
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_AGENT_ID!,
      });
      conversationStarted.current = true;
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  useEffect(() => {
    if (isActive && !conversationStarted.current) {
      startConversation();
    }
  }, [isActive, startConversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Start Conversation
        </button>
        <button
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>

      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
      </div>
    </div>
  );
}
