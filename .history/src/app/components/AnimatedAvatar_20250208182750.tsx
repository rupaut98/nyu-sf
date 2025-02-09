'use client';

import { Mic } from 'lucide-react';
import styles from './AnimatedAvatar.module.css';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

export function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  return (
    <div className={styles.avatarContainer}>
      <div className={`${styles.avatar} ${isSpeaking ? styles.speaking : ''}`}>
        <Mic 
          size={48} 
          className={`${styles.icon} ${isSpeaking ? styles.speakingIcon : ''}`}
        />
      </div>
    </div>
  );
} 