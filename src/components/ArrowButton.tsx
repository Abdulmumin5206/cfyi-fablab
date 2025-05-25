import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ArrowButtonProps {
  onClick?: () => void;
  className?: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center w-10 h-10 bg-black hover:bg-black/90 transition-all duration-300 ${className}`}
      aria-label="Learn More"
    >
      <ArrowRight className="w-5 h-5 text-white" />
    </button>
  );
};

export default ArrowButton;
