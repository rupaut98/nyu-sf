'use client';

import styles from './AnimatedAvatar.module.css';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

export function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  return (
    <div className={styles.avatarContainer}>
      <div className={`${styles.pulseRing} ${isSpeaking ? styles.speaking : ''}`}>
        <div className={styles.circleGradient} />
      </div>
    </div>
  );
} 