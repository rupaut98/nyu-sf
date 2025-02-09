'use client';

import styles from './AnimatedAvatar.module.css';

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

export function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  return (
    <div className={styles.avatarContainer}>
      <div className={styles.glowingRing}>
        <div className={`${styles.pulseRing} ${isSpeaking ? styles.speaking : ''}`}>
          <div className={styles.circleGradient}>
            <div className={styles.innerRings}>
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className={`${styles.ring} ${isSpeaking ? styles.animateRing : ''}`} 
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    opacity: 1 - (i * 0.2)
                  }} 
                />
              ))}
            </div>
            {isSpeaking && (
              <div className={styles.waveContainer}>
                <div className={styles.waveform}>
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className={styles.wave} 
                      style={{ 
                        animationDelay: `${i * 0.05}s`,
                        left: `${i * 5}%`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 