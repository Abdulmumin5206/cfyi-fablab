import { useEffect, useState, useRef } from 'react';

interface SplashScreenProps {
  onFinished: () => void;
  loadingProgress?: number;
  isResourcesReady?: boolean;
}

const SplashScreen = ({ onFinished, loadingProgress = 0, isResourcesReady = false }: SplashScreenProps) => {
  const [animationPhase, setAnimationPhase] = useState<
    'initial' | 'scale-up' | 'hold' | 'fade-out'
  >('initial');
  const animationFrameRef = useRef<number | null>(null);

  // Initial animation sequence
  useEffect(() => {
    const startInitialDelay = () => {
      setTimeout(() => {
        animationFrameRef.current = requestAnimationFrame(() => {
          setAnimationPhase('scale-up');
          setTimeout(() => {
            setAnimationPhase('hold');
          }, 600);
        });
      }, 100);
    };

    startInitialDelay();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle completion when resources are ready
  useEffect(() => {
    if (isResourcesReady && loadingProgress >= 100 && animationPhase === 'hold') {
      // Wait a moment at 100% then fade out
      setTimeout(() => {
        setAnimationPhase('fade-out');
        setTimeout(() => {
          onFinished();
        }, 500);
      }, 800);
    }
  }, [isResourcesReady, loadingProgress, animationPhase, onFinished]);

  // Optimized style management with fewer re-renders
  const containerStyles = {
    opacity: animationPhase === 'initial' ? 0 : animationPhase === 'fade-out' ? 0 : 1,
    transform: `scale(${animationPhase === 'initial' ? 0.9 : animationPhase === 'fade-out' ? 1.1 : 1
      })`,
    transition: 'opacity 600ms cubic-bezier(0.25,0.1,0.25,1), transform 600ms cubic-bezier(0.25,0.1,0.25,1)',
    willChange: 'opacity, transform'
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-off-white z-[9999] flex flex-col justify-center items-center p-5 box-border overflow-hidden"
      style={{
        transition: 'opacity 800ms cubic-bezier(0.25,0.1,0.25,1)',
        willChange: 'opacity'
      }}
    >
      {/* Background elements - Reduced number of animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-50 opacity-70 mix-blend-multiply blur-xl"
          style={{
            transform: 'translateZ(0)', // Hardware acceleration
            animation: 'float 6s ease-in-out infinite',
            willChange: 'transform'
          }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-green-50 opacity-70 mix-blend-multiply blur-xl"
          style={{
            transform: 'translateZ(0)', // Hardware acceleration
            animation: 'float 8s ease-in-out 1s infinite',
            willChange: 'transform'
          }}
        ></div>
      </div>

      {/* Logo container - simplified animation */}
      <div className="flex items-center justify-center" style={containerStyles}>
        {/* Logo - preloaded image */}
        <div className="relative z-10">
          <img
            src="/fablab/cfyi.svg"
            alt="CFYI Logo"
            className="max-w-[min(300px,70vw)] h-auto block"
            style={{ transform: 'translateZ(0)' }} // Hardware acceleration
          />
          {/* Simplified shine effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0"
              style={{
                animation: 'shine 3s ease-in-out 1s infinite',
                willChange: 'transform, opacity',
                transform: 'translateZ(0)' // Hardware acceleration
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Loading indicator - shows REAL progress */}
      <div className="mt-8 w-[280px] max-w-[80vw]">
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600"
            style={{
              width: `${loadingProgress}%`,
              transition: 'width 300ms ease-out',
              willChange: 'width',
              transform: 'translateZ(0)' // Hardware acceleration
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;