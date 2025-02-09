'use client';

import { useEffect, useRef } from 'react';
import styles from './AnimatedAvatar.module.css';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

export function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  return (
    <div className={styles.avatarContainer}>
      <div className={`${styles.pulseRing} ${isSpeaking ? styles.speaking : ''}`}>
        <div className={styles.circleGradient}>
          <button className={styles.callButton}>
            <span className={styles.iconWrapper}>
              {isSpeaking ? (
                <WaveformIcon />
              ) : (
                <MicrophoneIcon />
              )}
            </span>
            Call AI agent
          </button>
        </div>
      </div>
    </div>
  );
}

const WaveformIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="10" width="2" height="4" className={styles.wave} />
    <rect x="8" y="8" width="2" height="8" className={styles.wave} />
    <rect x="12" y="6" width="2" height="12" className={styles.wave} />
    <rect x="16" y="8" width="2" height="8" className={styles.wave} />
    <rect x="20" y="10" width="2" height="4" className={styles.wave} />
  </svg>
);

const MicrophoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
); 