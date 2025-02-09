// src/app/components/AnimatedAvatar.tsx
'use client';

import { motion } from 'framer-motion';
import styles from './AnimatedAvatar.module.css';
import Image from 'next/image';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

export function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  return (
    <div className={styles.avatarContainer}>
      {/* Animated rings */}
      {isSpeaking && (
        <div className={styles.animationLayer}>
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className={styles.ring}
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
          <div className={styles.orbitContainer}>
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={`dot-${index}`}
                className={styles.orbitDot}
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
                style={{
                  rotate: `${index * 45}deg`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Avatar image */}
      <motion.div 
        className={styles.imageWrapper}
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
          className={styles.avatarImage}
          priority
        />
      </motion.div>
    </div>
  );
} 