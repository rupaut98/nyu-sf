// src/app/components/StatusDisplay.tsx
'use client';

interface StatusDisplayProps {
  state: 'idle' | 'speaking' | 'listening';
}

import { MicrophoneIcon, WaveformIcon } from './Icons';

export function StatusDisplay({ state }: StatusDisplayProps) {
  const getStatusContent = () => {
    switch (state) {
      case 'speaking':
        return (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <span className="text-gray-700">AI is speaking...</span>
          </div>
        );
      case 'listening':
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-700">Listening to you...</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-2 bg-gray-100 rounded-full">
      {getStatusContent()}
    </div>
  );
}
