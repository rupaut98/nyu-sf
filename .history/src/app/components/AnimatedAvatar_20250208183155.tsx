'use client';

import styles from './AnimatedAvatar.module.css';
import Image from 'next/image';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

export function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  return (
    <div className={styles.avatarContainer}>
      <div className={`${styles.radialGradient} ${isSpeaking ? styles.speaking : ''}`}>
        <div className={styles.segments}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i} 
              className={styles.segment}
              style={{ 
                transform: `rotate(${i * 45}deg)`,
                opacity: 0.7 + (i % 2) * 0.3
              }}
            />
          ))}
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/recruiter-avatar.jpg" // You'll need to add this image to your public folder
            alt="AI Recruiter"
            width={200}
            height={200}
            className={styles.avatarImage}
          />
        </div>
      </div>
    </div>
  );
} 