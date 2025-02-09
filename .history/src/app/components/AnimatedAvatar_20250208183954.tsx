'use client';

import styles from './AnimatedAvatar.module.css';
import Image from 'next/image';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

export function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  return (
    <div className={styles.avatarContainer}>
      <div className={`${styles.animationLayer} ${isSpeaking ? styles.speaking : ''}`}>
        {/* Circular animation rings */}
        <div className={styles.rings}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i} 
              className={`${styles.ring} ${isSpeaking ? styles.animate : ''}`}
              style={{ 
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* Pulsing circles for speaking indication */}
        <div className={styles.pulseContainer}>
          {isSpeaking && Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className={styles.pulseCircle}
              style={{
                transform: `rotate(${i * 45}deg) translateX(100px)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Centered recruiter image */}
      <div className={styles.imageWrapper}>
        <Image
          src="/recruiter-avatar.jpg"
          alt="AI Recruiter"
          width={200}
          height={200}
          className={styles.avatarImage}
        />
      </div>
    </div>
  );
} 