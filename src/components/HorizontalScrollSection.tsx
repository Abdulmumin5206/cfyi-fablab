import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import GradientText from "./GradientText";

const HorizontalScrollSection = () => {
  const { t, i18n } = useTranslation('horizontalscroll');
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  
  // Only essential mobile detection
  const [isMobile, setIsMobile] = useState(false);

  // Check if current language is Russian to apply smaller font size
  const isRussian = i18n.language === 'ru';
  
  // Dynamic classes for Russian language
  const titleClasses = isRussian 
    ? "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-8"
    : "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-8";
    
  const textClasses = isRussian
    ? "text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed space-y-4 sm:space-y-6"
    : "text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed space-y-4 sm:space-y-6";

  // Ultra-simple progress update - no states, no checks
  const updateProgress = useCallback((newProgress: number) => {
    if (!contentRef.current) return;
    
    const clampedProgress = Math.max(0, Math.min(1, newProgress));
    const translateX = clampedProgress * contentWidth;
    contentRef.current.style.transform = `translate3d(-${translateX}px, 0, 0)`;
  }, [contentWidth]);

  // Calculate dimensions only
  useEffect(() => {
    if (!contentRef.current || !containerRef.current || !sectionRef.current) return;

    const calculateDimensions = () => {
      if (!contentRef.current || !sectionRef.current) return;
      
      const mobileBreakpoint = 768;
      const isMobileView = window.innerWidth < mobileBreakpoint;
      setIsMobile(isMobileView);
      
      if (isMobileView) {
        const containerWidth = window.innerWidth;
        const totalContentWidth = contentRef.current!.scrollWidth;
        const scrollableDistance = totalContentWidth - containerWidth;
        
        setContentWidth(scrollableDistance);
        // Increase height to ensure full horizontal scroll completes
        sectionRef.current!.style.height = `${scrollableDistance + window.innerHeight * 1.5}px`;
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

    // Initial calculation
    calculateDimensions();
    
    // Recalculate after a short delay to ensure content is rendered
    const timeoutId = setTimeout(calculateDimensions, 100);
    
    // Recalculate after images load
    const images = contentRef.current!.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;
    
    const handleImageLoad = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        // All images loaded, recalculate dimensions
        setTimeout(calculateDimensions, 50);
      }
    };
    
    images.forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
        img.addEventListener('error', handleImageLoad); // Count errors as loaded too
      }
    });
    
    // Also recalculate on resize
    window.addEventListener('resize', calculateDimensions);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateDimensions);
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, []);

  // Ultra-simple scroll handling
  useEffect(() => {
    if (!isMobile) {
      // Desktop handling - keep original logic
      let animationFrameId: number;
      let horizontalScrollActive = false;
      let hasReachedEnd = false;
      let hasReachedStart = true;
      let isScrolling = false;
      let scrollTimeout: NodeJS.Timeout | null = null;
      
      const handleScroll = () => {
        isScrolling = true;
        
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
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
          hasReachedStart = true;
          hasReachedEnd = false;
          updateProgress(0);
        } else if (rawProgress > endThreshold) {
          hasReachedEnd = true;
          hasReachedStart = false;
          updateProgress(1);
        } else {
          const progress = (rawProgress - startThreshold) / (endThreshold - startThreshold);
          const clampedProgress = Math.max(0, Math.min(1, progress));
          hasReachedStart = false;
          hasReachedEnd = false;
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
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    } else {
      // ULTRA-SIMPLE mobile scroll - just direct mapping
      const handleMobileScroll = () => {
        if (!sectionRef.current) return;
        
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const viewportHeight = window.innerHeight;
        
        const maxScroll = sectionHeight - viewportHeight;
        const currentScroll = Math.max(0, -sectionTop);
        
        // Direct 1:1 mapping - no thresholds, no states, no checks
        const progress = Math.max(0, Math.min(1, currentScroll / maxScroll));
        updateProgress(progress);
      };

      window.addEventListener('scroll', handleMobileScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleMobileScroll);
      };
    }
  }, [contentWidth, isMobile, updateProgress]);

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
            WebkitOverflowScrolling: "touch",
            // Mobile-specific optimizations - simplified
            transform: 'translate3d(0, 0, 0)',
            ...(isMobile && {
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
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