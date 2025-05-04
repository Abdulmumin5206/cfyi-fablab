import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollImageSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasCompletedScroll, setHasCompletedScroll] = useState(false);
  
  // Image paths - using images from the public folder
  const images = [
    "/fablab/1.jpg",
    "/fablab/3.jpg",
    "/fablab/11.jpg"
  ];

  // Use Framer Motion's scroll utilities
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to image index - adjusted to ensure last image stays visible
  const imageIndexProgress = useTransform(scrollYProgress, [0, 0.8], [0, images.length - 1]);
  
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
    <section className="relative bg-black">
      <div 
        ref={containerRef}
        className="relative"
        style={{ 
          height: "300vh", // Three times viewport height for scroll space
        }}
      >
        <div
          ref={sectionRef}
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black"
        >
          {/* Image container - full viewport size with all images visible */}
          <div className="absolute inset-0 w-full h-full">
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
                  [0, 0.4, 0.9],
                  [1, 0.9, 0]
                );
              } else if (isLastImage) {
                // Last image fades in and stays visible
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [index - 0.9, index - 0.4, index],
                  [0, 0.9, 1]
                );
              } else {
                // Middle images fade in and out with larger overlap
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [index - 0.9, index - 0.4, index, index + 0.4, index + 0.9],
                  [0, 0.9, 1, 0.9, 0]
                );
              }
              
              return (
                <motion.div
                  key={index}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    opacity: opacityTransform,
                    zIndex: index + 1 // Ensure proper stacking
                  }}
                >
                  <img 
                    src={src} 
                    alt={`Showcase image ${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{
                      width: "100vw",
                      height: "100vh",
                      maxWidth: "100%",
                      maxHeight: "100%"
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
          
          {/* Progress indicator - hidden after last image is fully visible */}
          <motion.div 
            className="absolute bottom-8 left-0 right-0 z-10"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0])
            }}
          >
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <div className="w-full max-w-md mx-auto">
                  <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-white rounded-full"
                      style={{ 
                        width: useTransform(
                          scrollYProgress, 
                          [0, 0.8], 
                          ["0%", "100%"]
                        )
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    {images.map((_, index) => (
                      <motion.div
                        key={index}
                        className="h-2 w-2 rounded-full bg-white"
                        style={{
                          opacity: useTransform(
                            imageIndexProgress,
                            [index - 0.3, index, index + 0.3],
                            [0.3, 1, 0.3]
                          )
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Scroll hint - only visible at the beginning */}
          <motion.div 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white"
            style={{
              opacity: useTransform(
                scrollYProgress, 
                [0, 0.1], 
                [1, 0]
              )
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScrollImageSlider; 