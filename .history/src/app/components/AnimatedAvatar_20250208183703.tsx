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
        {/* Circular rings that appear when speaking */}
        {isSpeaking && Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i} 
            className={styles.ring}
            style={{ 
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        
        {/* Subtle background shapes */}
        <div className={styles.backgroundShapes}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i} 
              className={styles.shape}
              style={{ 
                transform: `rotate(${i * 90}deg)`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Centered recruiter image */}
      <div className={styles.imageWrapper}>
        <Image
          src="/recruiter-avatar.jpg" // Add your image to the public folder
          alt="AI Recruiter"
          width={200}
          height={200}
          className={styles.avatarImage}
        />
      </div>
    </div>
  );
} 