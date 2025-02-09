// src/app/components/StatusDisplay.tsx
'use client';

interface StatusDisplayProps {
  conversationState: 'idle' | 'speaking' | 'listening';
}

import { MicrophoneIcon, WaveformIcon } from 'src/app/components/StatusDisplay.tsx';

export function StatusDisplay({ conversationState }: StatusDisplayProps) {
  let icon, text, bgColor;

  switch (conversationState) {
    case 'speaking':
      icon = <WaveformIcon />;
      text = 'AI is speaking...';
      bgColor = 'bg-green-500';
      break;
    case 'listening':
      icon = <MicrophoneIcon />;
      text = 'Listening to you...';
      bgColor = 'bg-blue-500';
      break;
    default:
      icon = <MicrophoneIcon />;
      text = 'Start Conversation';
      bgColor = 'bg-blue-500';
      break;
  }

  return (
    <div
      className={`px-8 py-4 rounded-full shadow-lg ${bgColor} flex items-center gap-3 text-white font-medium text-lg`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
