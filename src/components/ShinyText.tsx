import React from 'react';
import './ShinyText.css';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  disabled = false, 
  speed = 3, // Default to 3s instead of 5s
  className = '' 
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      data-text={text}
      style={{ 
        '--animation-duration': animationDuration
      } as React.CSSProperties}
    >
      {text}
    </span>
  );
};

export default ShinyText; 