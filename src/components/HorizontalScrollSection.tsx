import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import GradientText from "./GradientText";

const HorizontalScrollSection = () => {
  const { t, i18n } = useTranslation('horizontalscroll');
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [horizontalScrollActive, setHorizontalScrollActive] = useState(false);
  const [horizontalProgress, setHorizontalProgress] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [hasReachedStart, setHasReachedStart] = useState(true);
  const [contentWidth, setContentWidth] = useState(0);
  
  // Mobile-specific optimizations
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafIdRef = useRef<number>(0);
  const lastProgressRef = useRef(0);
  
  // Mobile-only: Direct transform without React state updates during scroll
  const currentTransformRef = useRef(0);
  
  // Touch handling refs
  const touchDataRef = useRef({
    startX: 0,
    startY: 0,
    currentX: 0,
    isHorizontal: false,
    velocity: 0,
    lastTime: 0,
    momentum: 0
  });

  // Check if current language is Russian to apply smaller font size
  const isRussian = i18n.language === 'ru';
  
  // Dynamic classes for Russian language
  const titleClasses = isRussian 
    ? "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-8"
    : "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-8";
    
  const textClasses = isRussian
    ? "text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed space-y-4 sm:space-y-6"
    : "text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed space-y-4 sm:space-y-6";

  // Optimized progress update function with mobile-specific improvements
  const updateProgress = useCallback((newProgress: number) => {
    const roundedProgress = Math.round(newProgress * 1000) / 1000;
    
    if (isMobile) {
      // Mobile: Direct DOM manipulation only, no React state updates during active scrolling
      if (contentRef.current) {
        const translateX = roundedProgress * contentWidth;
        currentTransformRef.current = translateX;
        
        // Use transform3d for hardware acceleration
        contentRef.current.style.transform = `translate3d(-${translateX}px, 0, 0)`;
        
        // Update React state only when scrolling stops (reduces renders dramatically)
        if (!isScrolling) {
          lastProgressRef.current = roundedProgress;
          setHorizontalProgress(roundedProgress);
        }
      }
    } else {
      // Desktop: Keep original logic
      if (Math.abs(roundedProgress - lastProgressRef.current) < 0.001) return;
      
      lastProgressRef.current = roundedProgress;
      
      if (contentRef.current) {
        const translateX = roundedProgress * contentWidth;
        contentRef.current.style.transform = `translate3d(-${translateX}px, 0, 0)`;
        
        if (!isScrolling) {
          setHorizontalProgress(roundedProgress);
        }
      }
    }
  }, [contentWidth, isMobile, isScrolling]);

  // Calculate the content width and set up the section
  useEffect(() => {
    if (!contentRef.current || !containerRef.current || !sectionRef.current) return;

    const calculateDimensions = () => {
      if (!contentRef.current || !sectionRef.current) return;
      
      // Check if we're on mobile
      const mobileBreakpoint = 768;
      const isMobileView = window.innerWidth < mobileBreakpoint;
      setIsMobile(isMobileView);
      
      if (isMobileView) {
        // Mobile-specific optimizations
        const containerWidth = window.innerWidth;
        const totalContentWidth = contentRef.current!.scrollWidth;
        const initialPadding = 8;
        const scrollableDistance = totalContentWidth - containerWidth + initialPadding;
        
        setContentWidth(scrollableDistance);
        
        // Optimized height calculation for mobile
        const heightMultiplier = 0.8;
        sectionRef.current!.style.height = `${scrollableDistance + window.innerHeight * heightMultiplier}px`;
        
        // Enhanced hardware acceleration for mobile
        const content = contentRef.current!;
        content.style.transform = 'translate3d(0, 0, 0)';
        content.style.willChange = 'transform';
        content.style.backfaceVisibility = 'hidden';
        content.style.perspective = '1000px';
        
      } else {
        // Desktop logic (unchanged)
        const containerWidth = window.innerWidth;
        const totalContentWidth = contentRef.current!.scrollWidth;
        const initialPadding = 16;
        const scrollableDistance = totalContentWidth - containerWidth + initialPadding;
        
        setContentWidth(scrollableDistance);
        sectionRef.current!.style.height = `${scrollableDistance + window.innerHeight * 0.6}px`;
      }
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    return () => {
      window.removeEventListener('resize', calculateDimensions);
    };
  }, []);

  // Handle the intersection observer to detect when section is in view
  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      threshold: [0.1, 0.3, 0.7, 0.9],
      rootMargin: "-5% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      
      if (entry.intersectionRatio > 0.3 && entry.intersectionRatio < 0.7) {
        setHorizontalScrollActive(true);
      } else {
        setHorizontalScrollActive(false);
      }
    }, options);

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Scroll handling with mobile-specific optimizations
  useEffect(() => {
    if (!isMobile) {
      // Desktop scroll handling (unchanged from original)
      let animationFrameId: number;
      let lastScrollY = window.scrollY;
      
      const handleScroll = () => {
        lastScrollY = window.scrollY;
        
        setIsScrolling(true);
        
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 100);
        
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(updateScrollPosition);
        }
      };
      
      const updateScrollPosition = () => {
        animationFrameId = 0;
        
        if (!sectionRef.current || !containerRef.current || !contentRef.current) return;

        const sectionRect = sectionRef.current.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const viewportHeight = window.innerHeight;
        
        const maxScroll = sectionHeight - viewportHeight;
        const currentScroll = Math.max(0, -sectionTop);
        
        let rawProgress = Math.min(1, currentScroll / maxScroll);
        
        const startThreshold = 0.03;
        const endThreshold = 0.92;
        
        if (rawProgress < startThreshold) {
          setHasReachedStart(true);
          setHasReachedEnd(false);
          updateProgress(0);
        } else if (rawProgress > endThreshold) {
          setHasReachedEnd(true);
          setHasReachedStart(false);
          updateProgress(1);
        } else {
          const progress = (rawProgress - startThreshold) / (endThreshold - startThreshold);
          const clampedProgress = Math.max(0, Math.min(1, progress));
          setHasReachedStart(false);
          setHasReachedEnd(false);
          updateProgress(clampedProgress);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      updateScrollPosition();

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    } else {
      // Mobile-optimized scroll handling - ultra lightweight
      let ticking = false;
      
      const handleMobileScroll = () => {
        if (!ticking && sectionRef.current && containerRef.current) {
          requestAnimationFrame(() => {
            const sectionRect = sectionRef.current!.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionHeight = sectionRect.height;
            const viewportHeight = window.innerHeight;
            
            const maxScroll = sectionHeight - viewportHeight;
            const currentScroll = Math.max(0, -sectionTop);
            
            let rawProgress = Math.min(1, currentScroll / maxScroll);
            
            // Mobile-optimized thresholds - smoother entry/exit
            const startThreshold = 0.05;
            const endThreshold = 0.95;
            
            if (rawProgress < startThreshold) {
              setHasReachedStart(true);
              setHasReachedEnd(false);
              updateProgress(0);
            } else if (rawProgress > endThreshold) {
              setHasReachedEnd(true);
              setHasReachedStart(false);
              updateProgress(1);
            } else {
              const progress = (rawProgress - startThreshold) / (endThreshold - startThreshold);
              const clampedProgress = Math.max(0, Math.min(1, progress));
              setHasReachedStart(false);
              setHasReachedEnd(false);
              updateProgress(clampedProgress);
            }
            
            ticking = false;
          });
          ticking = true;
        }
      };

      // Throttled scroll event for mobile
      let scrollTimeout: NodeJS.Timeout;
      const throttledScroll = () => {
        setIsScrolling(true);
        handleMobileScroll();
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
          // Final state update when scrolling stops
          if (contentRef.current) {
            setHorizontalProgress(currentTransformRef.current / contentWidth);
          }
        }, 150);
      };

      window.addEventListener('scroll', throttledScroll, { passive: true });
      handleMobileScroll(); // Initial call

      return () => {
        window.removeEventListener('scroll', throttledScroll);
        clearTimeout(scrollTimeout);
      };
    }
  }, [contentWidth, isMobile, updateProgress]);

  // Prevent default scroll behavior when in horizontal scroll mode
  useEffect(() => {
    if (!horizontalScrollActive || isMobile) return; // Skip for mobile

    const preventDefaultScroll = (e: WheelEvent) => {
      if (horizontalScrollActive && !hasReachedStart && !hasReachedEnd) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventDefaultScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventDefaultScroll);
    };
  }, [horizontalScrollActive, hasReachedStart, hasReachedEnd, isMobile]);

  // Ultra-optimized touch handling for mobile
  useEffect(() => {
    if (!containerRef.current || !horizontalScrollActive || !isMobile) return;
    
    let touchStartTime = 0;
    let lastTouchProgress = horizontalProgress;
    
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartTime = Date.now();
      lastTouchProgress = horizontalProgress;
      
      touchDataRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        isHorizontal: false,
        velocity: 0,
        lastTime: touchStartTime,
        momentum: 0
      };
      
      setIsScrolling(true);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!horizontalScrollActive) return;
      
      const touch = e.touches[0];
      const touchData = touchDataRef.current;
      
      const diffX = touchData.startX - touch.clientX;
      const diffY = touchData.startY - touch.clientY;
      
      // Determine scroll direction with better threshold
      if (!touchData.isHorizontal && Math.abs(diffX) > Math.abs(diffY) * 1.5 && Math.abs(diffX) > 15) {
        touchData.isHorizontal = true;
      }
      
      if (touchData.isHorizontal && !hasReachedStart && !hasReachedEnd) {
        e.preventDefault();
        
        // Direct calculation without RAF for immediate response
        const touchSensitivity = 0.001;
        const progressChange = diffX * touchSensitivity;
        const newProgress = Math.max(0, Math.min(1, lastTouchProgress + progressChange));
        
        // Direct DOM update for immediate feedback
        if (contentRef.current) {
          const translateX = newProgress * contentWidth;
          contentRef.current.style.transform = `translate3d(-${translateX}px, 0, 0)`;
          currentTransformRef.current = translateX;
        }
      }
    };
    
    const handleTouchEnd = () => {
      setIsScrolling(false);
      
      // Update final state
      setTimeout(() => {
        if (contentRef.current) {
          setHorizontalProgress(currentTransformRef.current / contentWidth);
        }
      }, 100);
    };
    
    const container = containerRef.current;
    
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [horizontalScrollActive, hasReachedStart, hasReachedEnd, horizontalProgress, contentWidth, isMobile]);

  return (
    <section 
      ref={sectionRef} 
      id="horizontal-scroll-section"
      className="relative w-full section-spacing-lg"
      style={{ minHeight: "100vh" }}
    >
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#f5f5f7]"
      >
        {/* Horizontally scrolling content */}
        <div 
          ref={contentRef}
          className="flex items-stretch pl-2 md:pl-4 lg:pl-6"
          style={{ 
            gap: isMobile ? "0" : "3vw",
            touchAction: isMobile ? "pan-y" : "auto",
            // Mobile-specific optimizations - enhanced
            ...(isMobile && {
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              perspective: '1000px',
              WebkitPerspective: '1000px',
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
            })
          }}
        >
          {/* What is FabLab? - standalone text element */}
          <div className="flex-shrink-0 w-[100vw]">
            <div className="flex flex-col md:flex-row h-full items-center px-4 md:px-12 lg:px-16">
              {/* Text content and logos - left side */}
              <div className="p-3 md:p-6 lg:p-8 flex flex-col md:w-1/2 mt-4 md:mt-12 w-full">
                <GradientText className={titleClasses}>
                  {t('whatIsFabLab.title')}
                </GradientText>
                
                <div className={textClasses}>
                  <p>
                    {t('whatIsFabLab.description1')}
                  </p>
                  <p>
                    {t('whatIsFabLab.description2')}
                  </p>
                </div>
                
                {/* All logos in a single row - scrollable on mobile */}
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8 w-full overflow-x-auto pb-2 md:overflow-visible md:justify-between">
                  <div className="flex-shrink-0">
                    <img 
                      src="/main/About US/cfyi.svg" 
                      alt="CFYI Logo" 
                      className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/fablab/logo.webp" 
                      alt="FabLab Logo" 
                      className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/mit-seeklogo.png" 
                      alt="MIT Logo" 
                      className="h-6 md:h-8 lg:h-10 object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/main/About US/both.png" 
                      alt="Both Logo" 
                      className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain"
                    />
                  </div>
                </div>
              </div>
              
              {/* FabLab image - right side, wider and panoramic */}
              <div className="md:w-3/5 h-[250px] md:h-[420px] lg:h-[480px] overflow-visible relative ml-0 md:ml-12 mt-4 md:mt-0 w-full px-4 md:px-0">
                <div className="w-full md:w-[150%] h-full relative overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src="/main/fablabroom.webp" 
                    alt="FabLab workspace" 
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: "left center",
                      objectFit: "cover"
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/fablab/logo.webp";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Our Mission - standalone text element similar to What is FabLab? */}
          <div className="flex-shrink-0 w-[100vw]" style={{ marginLeft: isMobile ? "0" : "-21vw" }}>
            <div className="flex flex-col-reverse md:flex-row h-full items-center px-4 md:px-8 lg:px-12">
              {/* Image container - visible on mobile, hidden on desktop */}
              <div className="w-full md:hidden h-[250px] overflow-visible relative mt-4">
                <img 
                  src="/main/mission.webp" 
                  alt={t('mission.title')}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/main/cfyi.webp";
                  }}
                />
              </div>
              
              {/* Empty left side to avoid overlap with previous image - hidden on mobile */}
              <div className="hidden md:block md:w-2/5 h-[350px] md:h-[420px] lg:h-[480px] overflow-visible relative">
                {/* No content here to avoid overlap */}
              </div>
              
              {/* Text content - full width on mobile, right side on desktop */}
              <div className="p-3 md:p-6 lg:p-8 flex flex-col w-full md:w-3/5 ml-0 md:ml-8 mb-2 md:mb-0">
                <GradientText className={titleClasses}>
                  {t('mission.title')}
                </GradientText>
                
                <div className={`${textClasses} max-w-md`}>
                  <p>
                    {t('mission.description1')}
                  </p>
                  <p>
                    {t('mission.description2')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Equipment - standalone text element with exact same structure */}
          <div className="flex-shrink-0 w-[100vw]" style={{ marginLeft: isMobile ? "0" : "-21vw" }}>
            <div className="flex flex-col-reverse md:flex-row h-full items-center px-4 md:px-8 lg:px-12">
              {/* Image on top for mobile, left for desktop */}
              <div className="w-full md:w-2/5 h-[250px] md:h-[420px] lg:h-[480px] overflow-visible relative mt-4 md:mt-0">
                <img 
                  src="/main/tour/3dprinting.webp"
                  alt={t('equipment.title')}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/fablab/logo.webp";
                  }}
                />
              </div>
              
              {/* Text content on bottom for mobile, right for desktop */}
              <div className="p-3 md:p-6 lg:p-8 flex flex-col w-full md:w-3/5 ml-0 md:ml-8 mb-2 md:mb-0">
                <GradientText className={titleClasses}>
                  {t('equipment.title')}
                </GradientText>
                
                <div className={`${textClasses} max-w-md`}>
                  <p>
                    {t('equipment.description1')}
                  </p>
                  <p>
                    {t('equipment.description2')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section - exact same structure as Advanced Equipment */}
          <div className="flex-shrink-0 w-[100vw]" style={{ marginLeft: isMobile ? "0" : "-21vw" }}>
            <div className="flex flex-col-reverse md:flex-row h-full items-center px-4 md:px-8 lg:px-12">
              {/* Image on top for mobile, left for desktop */}
              <div className="w-full md:w-2/5 h-[250px] md:h-[420px] lg:h-[480px] overflow-visible relative mt-4 md:mt-0">
                <img 
                  src={isMobile ? "/main/tour/3.webp" : "/main/scrolling1.webp"}
                  alt={t('vision.title')}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/main/cfyi.webp";
                  }}
                />
              </div>
              
              {/* Text content on bottom for mobile, right for desktop */}
              <div className="p-3 md:p-6 lg:p-8 flex flex-col w-full md:w-3/5 ml-0 md:ml-8 mb-2 md:mb-0">
                <GradientText className={titleClasses}>
                  {t('vision.title')}
                </GradientText>
                
                <div className={`${textClasses} max-w-md`}>
                  <p>
                    {t('vision.description1')}
                  </p>
                  <p>
                    {t('vision.description2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;