// src/app/components/conversation.tsx
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
    onConnect: () => {
      console.log('Connected to conversation service');
    },
    onDisconnect: () => {
      console.log('Disconnected from conversation service');
      conversationStarted.current = false;
      onSpeakingStateChange(false);
    },
    onMessage: (message) => {
      console.log('Received message:', message);
      if (message.type === 'start-speaking') {
        console.log('AI started speaking');
        onSpeakingStateChange(true);
      } else if (message.type === 'end-speaking') {
        console.log('AI stopped speaking');
        onSpeakingStateChange(false);
      }
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      conversationStarted.current = false;
      onSpeakingStateChange(false);
    },
  });

  const startConversation = useCallback(async () => {
    if (conversationStarted.current) {
      console.log('Conversation already started');
      return;
    }
    
    try {
      console.log('Starting conversation session...');
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_AGENT_ID!,
      });
      console.log('Conversation session started successfully');
      conversationStarted.current = true;
    } catch (error) {
      console.error('Failed to start conversation:', error);
      conversationStarted.current = false;
    }
  }, [conversation]);

  useEffect(() => {
    console.log('Conversation component mounted, isActive:', isActive);
    if (isActive && !conversationStarted.current) {
      startConversation();
    }
  }, [isActive, startConversation]);

  return null;
}
