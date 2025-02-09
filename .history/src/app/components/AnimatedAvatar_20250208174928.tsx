'use client';

import { useEffect, useRef } from 'react';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

export function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add animation logic here when isSpeaking changes
    if (isSpeaking && avatarRef.current) {
      // Add speaking animation class
      avatarRef.current.classList.add('speaking');
    } else if (avatarRef.current) {
      // Remove speaking animation class
      avatarRef.current.classList.remove('speaking');
    }
  }, [isSpeaking]);

  return (
    <div ref={avatarRef} className="avatar-container">
      <div className="avatar-image">
        <img 
          src="/recruiter-avatar.png"
          alt="AI Recruiter"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Add any animation overlays here */}
    </div>
  );
} 