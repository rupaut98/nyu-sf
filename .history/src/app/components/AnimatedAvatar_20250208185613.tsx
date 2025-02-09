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
      {/* Multiple animated rings with different sizes and timings */}
      {isSpeaking && (
        <>
          {/* Inner ring */}
          <motion.div
            className="absolute w-[250px] h-[250px] rounded-full border-4 border-cyan-500/50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Middle ring */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full border-4 border-blue-400/40"
            animate={{
              scale: [1.1, 1.3, 1.1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
          
          {/* Outer ring */}
          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full border-4 border-indigo-400/30"
            animate={{
              scale: [1.2, 1.4, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4
            }}
          />

          {/* Rotating dots */}
          <motion.div
            className="absolute w-[280px] h-[280px]"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-cyan-500 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translateX(140px) translateY(-50%)`
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </>
      )}

      {/* Avatar container with glow effect */}
      <motion.div
        className="relative z-10 w-[200px] h-[200px] rounded-full overflow-hidden"
        animate={isSpeaking ? {
          boxShadow: [
            "0 0 25px rgba(34, 211, 238, 0.4)",
            "0 0 45px rgba(34, 211, 238, 0.6)",
            "0 0 25px rgba(34, 211, 238, 0.4)"
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