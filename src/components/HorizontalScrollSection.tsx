import { useRef, useEffect, useState } from "react";
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
  // Add state for smoother transitions
  const [targetProgress, setTargetProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Add state to detect if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Check if current language is Russian to apply smaller font size
  const isRussian = i18n.language === 'ru';
  
  // Dynamic classes for Russian language
  const titleClasses = isRussian 
    ? "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-8"
    : "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-8";
    
  const textClasses = isRussian
    ? "text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed space-y-4 sm:space-y-6"
    : "text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed space-y-4 sm:space-y-6";

  // Calculate the content width and set up the section
  useEffect(() => {
    if (!contentRef.current || !containerRef.current || !sectionRef.current) return;

    const calculateDimensions = () => {
      if (!contentRef.current || !sectionRef.current) return;
      
      // Check if we're on mobile
      const mobileBreakpoint = 768; // md breakpoint
      const isMobileView = window.innerWidth < mobileBreakpoint;
      setIsMobile(isMobileView);
      
      const containerWidth = window.innerWidth;
      const totalContentWidth = contentRef.current!.scrollWidth;
      const initialPadding = isMobileView ? 8 : 16; // Less padding on mobile
      const scrollableDistance = totalContentWidth - containerWidth + initialPadding;
      
      setContentWidth(scrollableDistance);
      
      // Adjust section height based on device
      // Mobile gets more height to accommodate stacked content
      const heightMultiplier = isMobileView ? 0.8 : 0.6;
      sectionRef.current!.style.height = `${scrollableDistance + window.innerHeight * heightMultiplier}px`;
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
      
      // More restrictive conditions to prevent early activation
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

  // Handle the scroll event to control horizontal scrolling
  useEffect(() => {
    let animationFrameId: number;
    let lastScrollY = window.scrollY;
    let lastTimestamp = 0;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      // Set scrolling state to true
      setIsScrolling(true);
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set a timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
      
      // Use requestAnimationFrame for smoother scrolling
      if (!animationFrameId) {
        lastTimestamp = performance.now();
        animationFrameId = requestAnimationFrame(updateScrollPosition);
      }
    };
    
    const updateScrollPosition = (timestamp: number) => {
      animationFrameId = 0;
      
      if (!sectionRef.current || !containerRef.current || !contentRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the section has been scrolled through
      const maxScroll = sectionHeight - viewportHeight;
      const currentScroll = Math.max(0, -sectionTop);
      
      // Calculate raw progress (0 to 1)
      let rawProgress = Math.min(1, currentScroll / maxScroll);
      
      // Adjust thresholds for mobile
      const startThreshold = isMobile ? 0.02 : 0.03;
      const endThreshold = isMobile ? 0.95 : 0.92;
      
      if (rawProgress < startThreshold) {
        setHasReachedStart(true);
        setHasReachedEnd(false);
        setTargetProgress(0);
      } else if (rawProgress > endThreshold) {
        setHasReachedEnd(true);
        setHasReachedStart(false);
        setTargetProgress(1);
      } else {
        // Adjusted scrolling range to account for new thresholds
        const progress = (rawProgress - startThreshold) / (endThreshold - startThreshold);
        // Ensure progress stays between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, progress));
        setHasReachedStart(false);
        setHasReachedEnd(false);
        setTargetProgress(clampedProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    updateScrollPosition(performance.now());

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [contentWidth, isMobile]);

  // Separate effect for smooth animation
  useEffect(() => {
    let animationFrameId: number;
    
    const animate = () => {
      // Calculate the difference between current and target progress
      const diff = targetProgress - horizontalProgress;
      
      // If difference is very small, just set to target to avoid tiny oscillations
      if (Math.abs(diff) < 0.001) {
        setHorizontalProgress(targetProgress);
        return;
      }
      
      // Adjust easing based on whether user is actively scrolling
      // Faster easing during active scrolling, slower when scrolling stops
      // Use faster easing on mobile for more responsive feel
      const easing = isScrolling ? (isMobile ? 0.2 : 0.15) : (isMobile ? 0.12 : 0.08);
      
      // Apply easing to create smooth motion
      const newProgress = horizontalProgress + diff * easing;
      setHorizontalProgress(newProgress);
      
      // Apply the horizontal scroll based on progress
      if (contentRef.current) {
        const horizontalScroll = newProgress * contentWidth;
        contentRef.current.style.transform = `translateX(-${horizontalScroll}px)`;
      }
      
      // Apply parallax effect to background
      const backgroundElement = containerRef.current?.querySelector('.background-pattern') as HTMLElement;
      if (backgroundElement) {
        backgroundElement.style.transform = `translateX(${newProgress * 20}%)`;
      }
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [horizontalProgress, targetProgress, contentWidth, isScrolling, isMobile]);

  // Prevent default scroll behavior when in horizontal scroll mode
  useEffect(() => {
    if (!horizontalScrollActive) return;

    const preventDefaultScroll = (e: WheelEvent) => {
      // FIXED: More precise control over when to prevent scrolling
      if (horizontalScrollActive && !hasReachedStart && !hasReachedEnd) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventDefaultScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventDefaultScroll);
    };
  }, [horizontalScrollActive, hasReachedStart, hasReachedEnd]);

  // Handle touch events for mobile
  useEffect(() => {
    if (!containerRef.current || !horizontalScrollActive) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    let isHorizontalSwipe = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isHorizontalSwipe = false;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!horizontalScrollActive || hasReachedStart || hasReachedEnd) return;
      
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const diffX = touchStartX - touchX;
      const diffY = touchStartY - touchY;
      
      // Determine if this is primarily a horizontal swipe
      // Only on first detection of direction
      if (!isHorizontalSwipe && Math.abs(diffX) > Math.abs(diffY)) {
        isHorizontalSwipe = true;
      }
      
      // If it's a horizontal swipe and we're in the active scroll area
      if (isHorizontalSwipe && horizontalScrollActive && !hasReachedStart && !hasReachedEnd) {
        e.preventDefault();
        
        // Update progress based on swipe
        const swipeFactor = 0.003; // Adjust sensitivity
        const progressChange = diffX * swipeFactor;
        setTargetProgress(Math.max(0, Math.min(1, horizontalProgress + progressChange)));
      }
    };
    
    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [horizontalScrollActive, hasReachedStart, hasReachedEnd, horizontalProgress]);

  return (
    <section 
      ref={sectionRef} 
      id="horizontal-scroll-section"
      className="relative w-full"
      style={{ minHeight: "100vh" }}
    >
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#f5f5f7]"
      >
        {/* Horizontally scrolling content */}
        <div 
          ref={contentRef}
          className="flex items-stretch pl-2 md:pl-4 lg:pl-6 will-change-transform"
          style={{ gap: isMobile ? "0" : "3vw" }}
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
                      src="/fablab/logo.png" 
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
                      src="/main/About US/Mit.jpg" 
                      alt="MIT Logo" 
                      className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/main/About US/GlobalFablab.svg" 
                      alt="Global FabLab Logo" 
                      className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
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
                      (e.target as HTMLImageElement).src = "/fablab/logo.png";
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
                
                <div className={`${textClasses} max-w-lg`}>
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
                    (e.target as HTMLImageElement).src = "/fablab/logo.png";
                  }}
                />
              </div>
              
              {/* Text content on bottom for mobile, right for desktop */}
              <div className="p-3 md:p-6 lg:p-8 flex flex-col w-full md:w-3/5 ml-0 md:ml-8 mb-2 md:mb-0">
                <GradientText className={titleClasses}>
                  {t('equipment.title')}
                </GradientText>
                
                <div className={`${textClasses} max-w-lg`}>
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
                
                <div className={`${textClasses} max-w-lg`}>
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