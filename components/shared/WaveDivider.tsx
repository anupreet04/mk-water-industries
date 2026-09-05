'use client';

interface WaveDividerProps {
  topColor?: string;
  bottomColor?: string;
  flip?: boolean;
  className?: string;
}

export default function WaveDivider({
  topColor = '#ffffff',
  bottomColor = '#EFF6FF',
  flip = false,
  className = '',
}: WaveDividerProps) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height: '80px' }}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        className={`absolute w-full h-full ${flip ? 'scale-y-[-1]' : ''}`}
        preserveAspectRatio="none"
        style={{ background: topColor }}
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
