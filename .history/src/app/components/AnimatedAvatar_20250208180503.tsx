'use client';

import { useEffect, useRef } from 'react';
import styles from './AnimatedAvatar.module.css';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
  onStartConversation: () => void;
  onEndConversation: () => void;
  isConversationActive: boolean;
}

export function AnimatedAvatar({ 
  isSpeaking, 
  onStartConversation, 
  onEndConversation, 
  isConversationActive 
}: AnimatedAvatarProps) {
  return (
    <div className={styles.avatarContainer}>
      <div className={`${styles.pulseRing} ${isSpeaking ? styles.speaking : ''}`}>
        <div className={styles.circleGradient}>
          {!isConversationActive ? (
            <button 
              className={styles.callButton}
              onClick={onStartConversation}
            >
              <span className={styles.iconWrapper}>
                <MicrophoneIcon />
              </span>
              Start Interview
            </button>
          ) : (
            <div className={styles.statusContainer}>
              <div className={`${styles.status} ${isSpeaking ? styles.speaking : ''}`}>
                {isSpeaking ? (
                  <>
                    <WaveformIcon />
                    <span>Speaking...</span>
                  </>
                ) : (
                  <>
                    <ListeningIcon />
                    <span>Listening...</span>
                  </>
                )}
              </div>
              <button 
                className={styles.endButton}
                onClick={onEndConversation}
              >
                End Interview
              </button>
            </div>
          )}
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

const ListeningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
); 