// src/app/components/Icons.tsx
export const ArrowLeftIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
  
  interface IconProps {
    className?: string;
  }

  export function MicrophoneIcon({ className }: IconProps) {
    return (
      <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    );
  }
  
  export function StopIcon({ className }: IconProps) {
    return (
      <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
      </svg>
    );
  }
  
  export const WaveformIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="10" width="2" height="4" className="animate-pulse" />
      <rect x="8" y="8" width="2" height="8" className="animate-pulse delay-100" />
      <rect x="12" y="6" width="2" height="12" className="animate-pulse delay-200" />
      <rect x="16" y="8" width="2" height="8" className="animate-pulse delay-300" />
      <rect x="20" y="10" width="2" height="4" className="animate-pulse delay-400" />
    </svg>
  );
  