import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen = ({ onFinished }: SplashScreenProps) => {
  const [animationPhase, setAnimationPhase] = useState<
    'initial' | 'scale-up' | 'hold' | 'fade-out'
  >('initial');

  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      // Initial delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Scale up animation
      setAnimationPhase('scale-up');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Hold the logo
      setAnimationPhase('hold');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fade out
      setAnimationPhase('fade-out');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Finish
      onFinished();
    };

    sequence();

    return () => {
      // Cleanup if component unmounts
    };
  }, [onFinished]);

  // Get animation styles based on current phase
  const getContainerStyles = () => {
    switch (animationPhase) {
      case 'initial':
        return 'opacity-0 scale-90';
      case 'scale-up':
        return 'opacity-100 scale-100';
      case 'hold':
        return 'opacity-100 scale-100';
      case 'fade-out':
        return 'opacity-0 scale-110';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-white z-[9999] flex justify-center items-center p-5 box-border transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-50 opacity-70 mix-blend-multiply blur-xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-green-50 opacity-70 mix-blend-multiply blur-xl animate-float-delay"></div>
      </div>

      {/* Logo container */}
      <div className={`flex items-center justify-center transition-all duration-700 ease-out ${getContainerStyles()}`}>
        {/* Logo */}
        <div className="relative z-10">
          <img 
            src="/fablab/cfyi.svg" 
            alt="CFYI Logo"
            className="max-w-[min(300px,70vw)] h-auto block"
          />
          {/* Subtle shine effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 animate-shine"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;