import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import GradientText from "./GradientText";

const HorizontalScrollSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [horizontalScrollActive, setHorizontalScrollActive] = useState(false);
  const [horizontalProgress, setHorizontalProgress] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [hasReachedStart, setHasReachedStart] = useState(true);
  const [contentWidth, setContentWidth] = useState(0);

  // Content for the horizontal scrolling section
  const aboutFabLabContent = [
    {
      title: "Our Mission",
      description: "To democratize access to digital fabrication tools and empower individuals to turn their ideas into reality through innovation and technology.",
      icon: "/fablab/icons/mission.svg",
      image: "/main/fablabroom.webp" // Using existing image from the project
    },
    {
      title: "Our Vision",
      description: "To become the leading hub for innovation and digital fabrication in Central Asia, fostering a community of makers, creators, and innovators.",
      icon: "/fablab/icons/vision.svg",
      image: "/main/fablearn.webp" // Using existing image from the project
    },
    {
      title: "Our Values",
      description: "Innovation, collaboration, knowledge sharing, sustainability, and inclusivity form the foundation of everything we do at FabLab CFYI.",
      icon: "/fablab/icons/values.svg",
      image: "/main/cfyi.webp" // Using existing image from the project
    },
    {
      title: "Our Equipment",
      description: "We provide access to cutting-edge digital fabrication tools including 3D printers, laser cutters, CNC machines, and electronics workstations.",
      icon: "/fablab/icons/equipment.svg",
      image: "/main/3dprinting1.webp" // Using existing image from the project
    },
    {
      title: "Our Community",
      description: "Join a diverse community of students, professionals, entrepreneurs, and hobbyists who share a passion for making and innovation.",
      icon: "/fablab/icons/community.svg",
      image: "/main/scrolling2.webp" // Using existing image from the project
    }
  ];

  // Calculate the content width and set up the section
  useEffect(() => {
    if (!contentRef.current || !containerRef.current || !sectionRef.current) return;

    const calculateDimensions = () => {
      const containerWidth = window.innerWidth;
      const totalContentWidth = contentRef.current!.scrollWidth;
      const scrollableDistance = totalContentWidth - containerWidth;
      
      // Set the content width for other calculations
      setContentWidth(scrollableDistance);
      
      // Set the section height to create enough scroll space
      // The multiplier (3) determines how much vertical scrolling is needed
      // to complete the horizontal section
      sectionRef.current!.style.height = `${scrollableDistance * 3 + window.innerHeight}px`;
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
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-gray-100"
      >
        {/* Section title */}
        <div className="absolute top-8 left-8 z-30 md:top-12 md:left-12">
          <GradientText
            colors={["#329db7", "#f71301", "#6bb934", "#329db7", "#f71301", "#6bb934"]}
            animationSpeed={4}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
          >
            About FabLab
          </GradientText>
          <p className="text-gray-700 mt-2 max-w-md">
            Discover what makes FabLab CFYI a unique innovation hub in Uzbekistan
          </p>
        </div>

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
          className="flex items-center space-x-8 md:space-x-12 lg:space-x-16 pl-[100vw] will-change-transform"
          style={{ transition: "transform 0.05s ease-out" }}
        >
          {aboutFabLabContent.map((item, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[80vw] max-w-[500px] bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a default image if the specified one fails to load
                    (e.target as HTMLImageElement).src = "/fablab/logo.png";
                  }}
                />
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#329db7]"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 mr-4">
                    <img 
                      src={item.icon} 
                      alt="" 
                      className="w-full h-full"
                      onError={(e) => {
                        // Hide the icon container if the icon fails to load
                        (e.target as HTMLImageElement).parentElement!.style.display = "none";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicators - show different indicators based on device and scroll position */}
        <div className="absolute bottom-8 right-8 flex items-center space-x-2 text-sm text-gray-500">
          {hasReachedEnd ? (
            <>
              <span>Continue</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </>
          ) : (
            <>
              <span className="hidden md:inline">Scroll</span>
              <span className="md:hidden">Swipe</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </>
          )}
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-1">
          {[0, 0.25, 0.5, 0.75, 1].map((step) => (
            <div 
              key={step} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                horizontalProgress >= step ? 'bg-[#329db7] scale-125' : 'bg-gray-400'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection; 
