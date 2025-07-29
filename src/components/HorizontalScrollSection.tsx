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

  // Check if current language is Russian to apply smaller font size
  const isRussian = i18n.language === 'ru';
  
  // Dynamic classes for Russian language
  const titleClasses = isRussian 
    ? "text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-[#329db7]"
    : "text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-[#329db7]";
    
  const textClasses = isRussian
    ? "text-gray-800 text-base md:text-lg lg:text-xl leading-relaxed space-y-6"
    : "text-gray-800 text-lg md:text-xl lg:text-2xl leading-relaxed space-y-6";

  // Calculate the content width and set up the section
  useEffect(() => {
    if (!contentRef.current || !containerRef.current || !sectionRef.current) return;

    const calculateDimensions = () => {
      if (!contentRef.current || !sectionRef.current) return;
      
      const containerWidth = window.innerWidth;
      const totalContentWidth = contentRef.current!.scrollWidth;
      // Since we now start with content visible (padding instead of 100vw offset),
      // we need to account for this in our scrollable distance calculation
      const initialPadding = 32; // Approximate padding (pl-8 = 32px on small screens)
      const scrollableDistance = totalContentWidth - containerWidth + initialPadding;
      
      // Set the content width for other calculations
      setContentWidth(scrollableDistance);
      
      // Set the section height to create enough scroll space
      // The multiplier (2) determines how much vertical scrolling is needed
      // to complete the horizontal section
      sectionRef.current!.style.height = `${scrollableDistance * 2 + window.innerHeight}px`;
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
      threshold: [0.1, 0.2, 0.8, 0.9],
      rootMargin: "-10% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      
      if (entry.intersectionRatio > 0.2 && entry.intersectionRatio < 0.8) {
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
    const handleScroll = () => {
      if (!sectionRef.current || !containerRef.current || !contentRef.current) return;

      // Get the section's position relative to the viewport
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate how far we've scrolled into the section
      const scrolledIntoSection = window.innerHeight - sectionRect.top;
      const sectionHeight = sectionRef.current.offsetHeight;
      
      // Calculate progress through the section (0 to 1)
      let progress = Math.max(0, Math.min(1, scrolledIntoSection / (sectionHeight - window.innerHeight)));
      
      // Adjust progress to account for the viewport height
      // This creates a "sticky" effect at the beginning and end
      if (progress < 0.1) {
        progress = 0;
        setHasReachedStart(true);
      } else if (progress > 0.9) {
        progress = 1;
        setHasReachedEnd(true);
      } else {
        // Normalize progress to 0-1 for the middle 80% of scrolling
        progress = (progress - 0.1) / 0.8;
        setHasReachedStart(false);
        setHasReachedEnd(false);
      }
      
      setHorizontalProgress(progress);
      
      // Apply the horizontal scroll based on progress
      if (contentRef.current) {
        const horizontalScroll = progress * contentWidth;
        contentRef.current.style.transform = `translateX(-${horizontalScroll}px)`;
      }
      
      // Apply parallax effect to background
      const backgroundElement = containerRef.current.querySelector('.background-pattern') as HTMLElement;
      if (backgroundElement) {
        backgroundElement.style.transform = `translateX(${progress * 20}%)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [contentWidth]);

  // Prevent default scroll behavior when in horizontal scroll mode
  useEffect(() => {
    if (!horizontalScrollActive) return;

    const preventDefaultScroll = (e: WheelEvent) => {
      // Only prevent default if horizontal scrolling is active
      // and we haven't reached the start or end
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
    
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      // Only prevent default if horizontal scrolling is active
      // and we haven't reached the start or end
      if (horizontalScrollActive && !hasReachedStart && !hasReachedEnd) {
        e.preventDefault();
      }
    };
    
    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [horizontalScrollActive, hasReachedStart, hasReachedEnd]);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full"
      style={{ minHeight: "100vh" }}
    >
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-white"
      >
        {/* Background pattern with parallax effect */}
        <div 
          className="absolute inset-0 opacity-10 background-pattern"
        >
          <div className="w-full h-full bg-repeat" style={{ 
            backgroundImage: "url('/fablab/pattern.svg')",
            backgroundSize: "200px"
          }}></div>
        </div>

        {/* Horizontally scrolling content */}
        <div 
          ref={contentRef}
          className="flex items-stretch pl-8 md:pl-16 lg:pl-24 will-change-transform"
          style={{ transition: "transform 0.05s ease-out", gap: "calc(22vw)" }}
        >
          {/* What is FabLab? - standalone text element */}
          <div className="flex-shrink-0 w-[100vw]">
            <div className="flex flex-col md:flex-row h-full items-center px-4 md:px-8 lg:px-12">
              {/* Text content and logos - left side */}
              <div className="p-4 md:p-6 lg:p-8 flex flex-col md:w-1/2">
                <h2 className={titleClasses}>
                  {t('whatIsFabLab.title')}
                </h2>
                
                <div className={textClasses}>
                  <p>
                    {t('whatIsFabLab.description1')}
                  </p>
                  <p>
                    {t('whatIsFabLab.description2')}
                  </p>
                </div>
                
                {/* All logos in a single row */}
                <div className="flex items-center justify-between gap-2 md:gap-4 mb-8 w-full">
                  <div className="flex-shrink-0">
                    <img 
                      src="/main/About US/cfyi.svg" 
                      alt="CFYI Logo" 
                      className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
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
                      className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/main/About US/GlobalFablab.svg" 
                      alt="Global FabLab Logo" 
                      className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                    />
                  </div>
                </div>
              </div>
              
              {/* FabLab image - right side, wider and panoramic */}
              <div className="md:w-3/5 h-[400px] md:h-[500px] lg:h-[600px] overflow-visible relative ml-0 md:ml-8 mt-8 md:mt-0">
                <div className="w-[150%] h-full relative overflow-hidden rounded-lg shadow-lg">
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
          <div className="flex-shrink-0 w-[100vw]">
            <div className="flex flex-col md:flex-row h-full items-center px-4 md:px-8 lg:px-12">
              {/* Text content - left side */}
              <div className="p-4 md:p-6 lg:p-8 flex flex-col md:w-1/2">
                <h2 className={titleClasses}>
                  {t('mission.title')}
                </h2>
                
                <div className={`${textClasses} max-w-xl`}>
                  <p>
                    {t('mission.description1')}
                  </p>
                  <p>
                    {t('mission.description2')}
                  </p>
                </div>
              </div>
              
              {/* Empty right side to maintain layout consistency */}
              <div className="md:w-3/5 h-[400px] md:h-[500px] lg:h-[600px] overflow-visible relative ml-0 md:ml-8 mt-8 md:mt-0">
                {/* No image here */}
              </div>
            </div>
          </div>

          {/* Advanced Equipment - standalone text element with exact same structure */}
          <div className="flex-shrink-0 w-[100vw]" style={{ marginLeft: "-78vw" }}>
            <div className="flex flex-col md:flex-row h-full items-center px-4 md:px-8 lg:px-12">
              {/* Image on left side */}
              <div className="md:w-2/5 h-[400px] md:h-[500px] lg:h-[600px] overflow-visible relative">
                <img 
                  src="/main/3dprinting1.webp"
                  alt={t('equipment.title')}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/fablab/logo.png";
                  }}
                />
              </div>
              
              {/* Text content on right side */}
              <div className="p-4 md:p-6 lg:p-8 flex flex-col md:w-3/5 ml-0 md:ml-8 mt-8 md:mt-0">
                <h2 className={titleClasses}>
                  {t('equipment.title')}
                </h2>
                
                <div className={`${textClasses} max-w-xl`}>
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

          {/* New Section - exact same structure as Advanced Equipment */}
          <div className="flex-shrink-0 w-[100vw]" style={{ marginLeft: "-40vw" }}>
            <div className="flex flex-col md:flex-row h-full items-center px-4 md:px-8 lg:px-12">
              {/* Image on left side - same as Advanced Equipment */}
              <div className="md:w-2/5 h-[400px] md:h-[500px] lg:h-[600px] overflow-visible relative">
                <img 
                  src="/main/scrolling1.webp"
                  alt={t('vision.title')}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/main/cfyi.webp";
                  }}
                />
              </div>
              
              {/* Text content on right side - same as Advanced Equipment */}
              <div className="p-4 md:p-6 lg:p-8 flex flex-col md:w-3/5 ml-0 md:ml-8 mt-8 md:mt-0">
                <h2 className={titleClasses}>
                  {t('vision.title')}
                </h2>
                
                <div className={`${textClasses} max-w-xl`}>
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

          {/* Remove the map through the remaining sections since it's a duplicate */}
        </div>

        {/* Remove progress indicator */}
      </div>
    </section>
  );
};

export default HorizontalScrollSection; 
