// src/app/components/AnimatedAvatar.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

export function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      {/* Animated rings */}
      {isSpeaking && (
        <>
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full border-4 border-cyan-400/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full border-4 border-blue-400/20"
            animate={{
              scale: [1.1, 1.3, 1.1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
        </>
      )}

      {/* Avatar container with glow effect */}
      <motion.div
        className="relative z-10 w-[200px] h-[200px] rounded-full overflow-hidden"
        animate={isSpeaking ? {
          boxShadow: [
            "0 0 20px rgba(78, 205, 196, 0.3)",
            "0 0 40px rgba(78, 205, 196, 0.5)",
            "0 0 20px rgba(78, 205, 196, 0.3)"
          ]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image
          src="/recruiter-avatar.jpg"
          alt="AI Recruiter"
          width={200}
          height={200}
          className="object-cover"
          priority
        />
      </motion.div>
    </div>
  );
} 