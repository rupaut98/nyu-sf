// src/app/components/AnimatedAvatar.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

export function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  return (
    <motion.div
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Animated rings */}
      {isSpeaking && (
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '50%',
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Orbiting dots */}
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={`dot-${index}`}
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                backgroundColor: 'rgb(59, 130, 246)',
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transformOrigin: '100px 0',
                transform: `rotate(${index * 45}deg) translateX(100px) translateY(-50%)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Avatar image */}
      <motion.div 
        style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          overflow: 'hidden',
          zIndex: 10,
          border: '4px solid white',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        }}
        animate={{
          scale: isSpeaking ? 1.05 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/recruiter-avatar.jpg"
          alt="AI Recruiter"
          width={200}
          height={200}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          priority
        />
      </motion.div>
    </motion.div>
  );
} 