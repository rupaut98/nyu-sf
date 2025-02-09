'use client';

import styles from './AnimatedAvatar.module.css';

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
        <div className={styles.center}>
          <div className={styles.iconWrapper}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 