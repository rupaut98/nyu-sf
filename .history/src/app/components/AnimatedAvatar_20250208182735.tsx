'use client';

import styles from './AnimatedAvatar.module.css';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

export function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  return (
    <div className={styles.avatarContainer}>
      <div className={styles.avatar}>
        <div className={`${styles.circle} ${isSpeaking ? styles.speaking : ''}`}>
          <div className={styles.waves}>
            {isSpeaking && Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i} 
                className={styles.wave} 
                style={{ animationDelay: `${i * 0.1}s` }} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 