'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useEffect, useRef } from 'react';

interface ConversationProps {
  onSpeakingStateChange: (isSpeaking: boolean) => void;
  isActive: boolean;
}

export function Conversation({ onSpeakingStateChange, isActive }: ConversationProps) {
  const conversationStarted = useRef(false);

  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => {
      console.log('Message:', message);
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

  return null;
}
