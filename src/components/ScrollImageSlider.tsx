import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollImageSlider = () => {
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
      title: "Innovation Lab",
      achievement: "500+ Projects Completed",
      text: "Our state-of-the-art facility is equipped with the latest technology for digital fabrication and prototyping. Empowering creators to launch their ideas."
    },
    {
      title: "Creative Workspace",
      achievement: "1000+ Active Makers",
      text: "A thriving community of innovators. Where ideas transform into reality through collaboration, experimentation, and cutting-edge tools."
    },
    {
      title: "Future Development",
      achievement: "99.9% Precision Rate",
      text: "Industry-leading accuracy in every project. Building tomorrow's solutions with advanced manufacturing techniques and innovative approaches."
    }
  ];

  // Use Framer Motion's scroll utilities
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to image index - adjusted to ensure last image stays visible longer
  const imageIndexProgress = useTransform(scrollYProgress, [0, 0.9], [0, images.length - 1]);
  
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
          height: "300vh", // Three times viewport height for scroll space
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
            <div className="absolute left-0 top-0 bottom-0 w-1/2 hidden md:flex items-center justify-center z-50 px-8 md:px-12 lg:px-16">
              <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-relaxed">
                Empowering innovation through accessible fabrication technology. We provide the tools, space, and expertise to turn ideas into reality.
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
                // First image starts visible and fades out gradually
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [0, 0.5, 1],
                  [1, 0.85, 0]
                );
              } else if (isLastImage) {
                // Last image fades in and stays visible longer
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [index - 1, index - 0.5, index],
                  [0, 0.85, 1]
                );
              } else {
                // Middle images fade in and out with larger overlap
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [index - 1, index - 0.5, index, index + 0.5, index + 1],
                  [0, 0.85, 1, 0.85, 0]
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
                    alt={`Showcase image ${index + 1}`}
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
                      opacity: 0.4 // Adjust this value to make it darker or lighter
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
          <div className="absolute inset-0 pointer-events-none">
            {quotes.map((quote, index) => {
              // Calculate vertical movement based on scroll progress
              const yOffsetInput = [index - 1.1, index - 0.4, index, index + 0.4, index + 1.1];
              const yOffsetOutput = [100, 20, 0, -20, -100];
              
              const yOffset = useTransform(
                imageIndexProgress,
                yOffsetInput,
                yOffsetOutput
              );
              
              // Calculate opacity based on scroll progress with wider transitions
              let opacityTransform;
              if (index === 0) {
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [0, 0.3, 0.8],
                  [1, 1, 0]
                );
              } else if (index === quotes.length - 1) {
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [index - 0.8, index - 0.3, index],
                  [0, 1, 1]
                );
              } else {
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [index - 0.8, index - 0.3, index, index + 0.3, index + 0.8],
                  [0, 1, 1, 1, 0]
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
                  className="absolute left-0 right-0 px-8 flex justify-end items-center pr-16 md:pr-24 will-change-[opacity,transform]"
                  style={{
                    opacity: opacityTransform,
                    height: viewportHeight, // Use dynamic height
                    zIndex: (index + 1) * 10, // Higher z-index than images
                    transition: "opacity 0.5s ease-out" // Smooth CSS transitions as backup
                  }}
                >
                  <motion.div 
                    className="bg-white p-8 flex flex-col justify-center text-gray-800 border border-gray-200 shadow-lg will-change-transform transition-transform duration-700 ease-out w-[350px] h-[400px] sm:w-[400px] sm:h-[450px] md:w-[450px] md:h-[500px] lg:w-[500px] lg:h-[550px] text-left"
                    style={{
                      transform: cssYValue
                    }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-left">{quote.title}</h3>
                    <div className="mb-4">
                      <span className="block text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">{quote.achievement}</span>
                    </div>
                    <p className="text-lg sm:text-xl text-gray-600 text-left">{quote.text}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Scroll hint - only visible at the beginning */}
          <motion.div 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-gray-800"
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
          >
            <ChevronDown size={24} />
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