// src/app/components/AnimatedAvatar.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo } from 'react';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

export function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  // Pre-calculate particle positions
  const particlePositions = useMemo(() => {
    return Array.from({ length: 12 }).map((_, index) => ({
      x: Math.cos((index * 30 * Math.PI) / 180) * 80,
      y: Math.sin((index * 30 * Math.PI) / 180) * 80,
    }));
  }, []);

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
      {/* Wave effect */}
      {isSpeaking && (
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              key={`wave-${index}`}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                border: '2px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '50%',
              }}
              animate={{
                scale: [1, 1.5],
                opacity: [0.3, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.4,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Particle field */}
      {isSpeaking && (
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          {particlePositions.map((position, index) => (
            <motion.div
              key={`particle-${index}`}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                backgroundColor: 'rgb(59, 130, 246)',
                borderRadius: '50%',
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, position.x],
                y: [0, position.y],
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Rotating orbs */}
      {isSpeaking && (
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={`orb-${index}`}
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #60A5FA, #3B82F6)',
                top: '50%',
                left: '50%',
                transform: `rotate(${index * 60}deg) translateX(90px) translateY(-50%)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Avatar container */}
      <motion.div 
        style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          overflow: 'hidden',
          zIndex: 10,
          border: '4px solid white',
          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
        }}
        animate={{
          scale: isSpeaking ? [1, 1.05, 1] : 1,
          rotate: isSpeaking ? [0, -2, 2, 0] : 0,
        }}
        transition={{
          duration: isSpeaking ? 2 : 0.3,
          repeat: isSpeaking ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/recruiter-avatar.jpg"
          alt="AI Recruiter"
          width={200}
          height={200}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
          }}
          priority
        />
      </motion.div>
    </motion.div>
  );
} 