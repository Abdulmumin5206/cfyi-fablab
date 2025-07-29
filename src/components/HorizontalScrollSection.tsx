import { useRef, useEffect, useState } from "react";
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

  // Content for the horizontal scrolling section with real FabLab content
  const aboutFabLabContent = [
    {
      title: "Our Mission",
      description: "To equip and empower the youth of the Republic of Uzbekistan with the most advanced world technologies which contribute to the development of the society as a whole and enable to solve practical problems of the real sector of the economy, while ensuring equal participation of female youth.",
      image: "/main/fablearn.webp",
      highlights: [
        "Democratize access to advanced fabrication tools",
        "Foster innovation and inventive creativity",
        "Ensure inclusive participation regardless of gender or background"
      ]
    },
    {
      title: "Our Vision",
      description: "To create a makerspace for the youth to learn, create, and innovate, and to contribute to the sustainable development of the Republic of Uzbekistan. We aim to be a beacon of innovation and inventive creativity within Uzbekistan's burgeoning technological landscape.",
      image: "/main/cfyi.webp",
      highlights: [
        "Become a leading hub for innovation in Central Asia",
        "Foster a community of makers, creators, and innovators",
        "Contribute to sustainable development through technology"
      ]
    },
    {
      title: "Advanced Equipment",
      description: "Our FabLab is equipped with some of the most advanced technologies from Canada, Denmark, Japan, Czech Republic and China. It includes 3D printers and scanners, laser cutters and fraser CNC machines, vinyl cutters and various hand tools, which enable users to bring their digital designs into the physical realm.",
      image: "/main/3dprinting1.webp",
      highlights: [
        "3D printers and scanners",
        "Laser cutters and CNC machines",
        "Design software and powerful workstations"
      ]
    },
    {
      title: "Education Through Experience",
      description: "Education is a cornerstone of the FabLab's mission. By introducing students and the community to STEM through hands-on experience, the lab nurtures interest in these critical fields. Workshops and courses range from basic introductions to technology to advanced classes in computer aided design, virtual prototyping, reverse engineering, robotics, programming, and material science.",
      image: "/main/scrolling2.webp",
      highlights: [
        "Hands-on STEM education",
        "Workshops and courses for all skill levels",
        "MIT-developed Fab Academy curriculum"
      ]
    }
  ];

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
          style={{ transition: "transform 0.05s ease-out", gap: "calc(30vw)" }}
        >
          {/* What is FabLab? - standalone text element */}
          <div className="flex-shrink-0 w-[100vw]">
            <div className="flex flex-col md:flex-row h-full items-center px-4 md:px-8 lg:px-12">
              {/* Text content and logos - left side */}
              <div className="p-4 md:p-6 lg:p-8 flex flex-col md:w-1/2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-[#329db7]">
                  What is FabLab?
                </h2>
                
                <div className="text-gray-800 text-lg md:text-xl lg:text-2xl leading-relaxed space-y-6">
                  <p>
                    FabLab is a fabrication laboratory that represents a global movement to democratize access to tools for personal and community invention.
                  </p>
                  <p>
                    Our FabLab at the Center for Youth Initiatives is the first in Uzbekistan to join MIT's global network of over 2,000 laboratories in 120+ countries. We provide cutting-edge equipment, training, and resources for digital fabrication, prototyping, and innovation.
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

          {aboutFabLabContent.map((item, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[90vw] max-w-[1000px] bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Text content - left side on desktop, top on mobile */}
                <div className="p-4 md:p-6 lg:p-8 flex flex-col md:w-1/2 order-2 md:order-1">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#329db7]">{item.title}</h2>
                  <p className="text-gray-700 mb-6">{item.description}</p>
                  
                  {/* Highlights */}
                  <div className="mt-auto">
                    <h3 className="font-semibold text-gray-900 mb-2">Key Points:</h3>
                    <ul className="space-y-2">
                      {item.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <div className="mr-2 mt-1 text-[#329db7]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Image - right side on desktop, bottom on mobile */}
                <div className="md:w-1/2 h-[180px] md:h-auto overflow-hidden relative order-1 md:order-2">
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

        {/* Remove progress indicator */}
      </div>
    </section>
  );
};

export default HorizontalScrollSection; 
