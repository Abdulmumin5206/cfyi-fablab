import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const ScrollImageSlider = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasCompletedScroll, setHasCompletedScroll] = useState(false);
  const [viewportHeight, setViewportHeight] = useState("100vh");
  
  // Update viewport height to handle mobile browsers with variable UI elements
  useEffect(() => {
    const updateViewportHeight = () => {
      // This ensures we get the true viewport height even on mobile browsers
      const vh = window.innerHeight;
      setViewportHeight(`${vh}px`);
    };
    
    // Set initial height
    updateViewportHeight();
    
    // Update on resize
    window.addEventListener('resize', updateViewportHeight);
    
    // Also update on orientation change which is common on mobile
    window.addEventListener('orientationchange', updateViewportHeight);
    
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, []);
  
  // Image paths - using images from the public folder
  const images = [
    "/main/scrolling1.jpeg",
    "/main/scrolling2.webp",
    "/main/scrolling3.webp"
  ];
  
  // Quote content for each image
  const quotes = [
    {
      title: t("slider.innovationLab.title"),
      achievement: t("slider.innovationLab.achievement"),
      text: t("slider.innovationLab.text")
    },
    {
      title: t("slider.creativeWorkspace.title"),
      achievement: t("slider.creativeWorkspace.achievement"),
      text: t("slider.creativeWorkspace.text")
    },
    {
      title: t("slider.futureDevelopment.title"),
      achievement: t("slider.futureDevelopment.achievement"),
      text: t("slider.futureDevelopment.text")
    }
  ];

  // Use Framer Motion's scroll utilities
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to image index - adjusted to ensure last image stays visible longer
  const imageIndexProgress = useTransform(scrollYProgress, [0, 0.85], [0, images.length - 1]);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.98) {
        setHasCompletedScroll(true);
      } else if (latest <= 0.02) {
        setHasCompletedScroll(false);
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section className="relative bg-white">
      <div 
        ref={containerRef}
        className="relative"
        style={{ 
          height: "300vh", // Reduced from 400vh to 300vh for more control
        }}
      >
        <div
          ref={sectionRef}
          className="sticky top-0 w-full overflow-hidden flex items-center justify-center bg-white"
          style={{
            height: viewportHeight, // Use dynamic viewport height
            zIndex: 10 // Ensure this section appears above other content
          }}
        >
          {/* Image container - full viewport size with all images visible */}
          <div className="absolute inset-0 w-full h-full">
            {/* Fixed Mission Quote */}
            <div className="absolute left-0 top-0 bottom-0 w-full md:w-1/2 hidden lg:flex items-center justify-center z-50 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-relaxed">
                {t("slider.mainMessage")}
              </p>
            </div>

            {/* Then overlay the transitioning images with improved transitions */}
            {images.map((src, index) => {
              // Special handling for transitions
              const isFirstImage = index === 0;
              const isLastImage = index === images.length - 1;
              
              // Wider overlap for smoother transitions
              let opacityTransform;
              
              if (isFirstImage) {
                // First image starts visible and fades out more dramatically
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [0, 0.2, 0.5, 0.8],
                  [1, 0.7, 0.3, 0]
                );
              } else if (isLastImage) {
                // Last image fades in more dramatically
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [index - 1, index - 0.8, index - 0.5, index - 0.2, index],
                  [0, 0.3, 0.7, 0.9, 1]
                );
              } else {
                // Middle images fade in and out with more dramatic transitions
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [index - 1, index - 0.8, index - 0.5, index - 0.2, index, index + 0.2, index + 0.5, index + 0.8, index + 1],
                  [0, 0.3, 0.7, 0.9, 1, 0.9, 0.7, 0.3, 0]
                );
              }
              
              return (
                <motion.div
                  key={index}
                  className="absolute inset-0 w-full h-full will-change-[opacity,transform] transition-[opacity,transform] duration-500 ease-in-out"
                  style={{
                    opacity: opacityTransform,
                    zIndex: index + 1 // Ensure proper stacking
                  }}
                >
                  <img 
                    src={src} 
                    alt={t("slider.showcaseImage", {number: index + 1})}
                    className="w-full h-full object-cover will-change-transform"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      margin: 0,
                      padding: 0,
                      display: "block",
                      minHeight: "100%",
                      transform: "translateZ(0)" // Force GPU acceleration
                    }}
                  />
                  {/* Dark overlay */}
                  <div 
                    className="absolute inset-0 bg-black" 
                    style={{ 
                      zIndex: 1,
                      opacity: 0.25 // Reduced from 0.4 to make images more visible
                    }} 
                  />
                  {/* Add a solid color backdrop to ensure no content shows through */}
                  <div 
                    className="absolute inset-0 bg-white" 
                    style={{ 
                      zIndex: -1,
                      opacity: 1
                    }} 
                  />
                </motion.div>
              );
            })}
          </div>
          
          {/* Quote containers - one for each image */}
          <div className="absolute inset-0">
            {quotes.map((quote, index) => {
              // Calculate vertical movement based on scroll progress
              const yOffsetInput = [index - 1.3, index - 0.7, index - 0.3, index, index + 0.3, index + 0.7, index + 1.3];
              const yOffsetOutput = [250, 120, 50, 0, -50, -120, -250];
              
              const yOffset = useTransform(
                imageIndexProgress,
                yOffsetInput,
                yOffsetOutput
              );
              
              // Calculate opacity based on scroll progress with more dramatic transitions
              let opacityTransform;
              if (index === 0) {
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [0, 0.2, 0.5, 0.8],
                  [1, 0.7, 0.3, 0]
                );
              } else if (index === quotes.length - 1) {
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [index - 0.8, index - 0.5, index - 0.2, index],
                  [0, 0.3, 0.7, 1]
                );
              } else {
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [index - 0.8, index - 0.5, index - 0.2, index, index + 0.2, index + 0.5, index + 0.8],
                  [0, 0.3, 0.7, 1, 0.7, 0.3, 0]
                );
              }
              
              // Implement CSS variable based transform instead of direct y value
              const cssYValue = useTransform(
                yOffset,
                (value) => `translateY(${value}vh)`
              );
              
              return (
                <motion.div
                  key={`quote-${index}`}
                  className="absolute left-0 right-0 px-4 sm:px-6 md:px-8 flex justify-center lg:justify-end items-center pr-4 sm:pr-8 md:pr-12 lg:pr-16 will-change-[opacity,transform]"
                  style={{
                    opacity: opacityTransform,
                    height: viewportHeight,
                    zIndex: (index + 1) * 10,
                    transition: "opacity 0.5s ease-out"
                  }}
                >
                  <motion.div 
                    className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 flex flex-col justify-center text-gray-800 border border-gray-200 shadow-lg will-change-transform transition-transform duration-700 ease-out w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px] h-[300px] sm:h-[340px] md:h-[380px] lg:h-[420px] xl:h-[500px] 2xl:h-[600px] text-left"
                    style={{
                      transform: cssYValue
                    }}
                  >
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-left max-w-full break-words">{quote.title}</h3>
                    <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                      <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold leading-tight text-gray-900 max-w-full break-words">{quote.achievement}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-gray-600 text-left max-w-full break-words line-clamp-4 sm:line-clamp-5 md:line-clamp-6 lg:line-clamp-7 xl:line-clamp-8">{quote.text}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Scroll hint - only visible at the beginning */}
          <motion.div
            className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 text-gray-800"
            style={{
              opacity: useTransform(
                scrollYProgress, 
                [0, 0.1], 
                [1, 0]
              )
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
            aria-label={t("slider.scrollHint")}
          >
            <ChevronDown size={20} className="sm:hidden" />
            <ChevronDown size={24} className="hidden sm:block" />
          </motion.div>
        </div>
      </div>
      
      {/* Add a spacer div that ensures proper transition to next section */}
      <div 
        className="h-[50vh] bg-white -mt-[50vh] relative"
        style={{ zIndex: 5 }}
      />
    </section>
  );
};

export default ScrollImageSlider; 