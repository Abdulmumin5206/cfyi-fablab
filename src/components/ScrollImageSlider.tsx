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
  
  // Quote content for each image
  const quotes = [
    {
      title: "Innovation Lab",
      text: "Our state-of-the-art facility equipped with the latest technology for digital fabrication and prototyping."
    },
    {
      title: "Creative Workspace",
      text: "Where ideas transform into reality through collaboration, experimentation, and cutting-edge tools."
    },
    {
      title: "Future Development",
      text: "Building tomorrow's solutions with advanced manufacturing techniques and innovative approaches."
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
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white"
          style={{
            zIndex: 10 // Ensure this section appears above other content
          }}
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
                // Last image fades in and stays visible longer
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
                      width: "100%",
                      height: "100%"
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
              const yTransform = useTransform(
                imageIndexProgress,
                [index - 0.9, index - 0.3, index, index + 0.3],
                ['100vh', '20vh', '0vh', '-20vh']
              );
              
              // Calculate opacity based on scroll progress
              let opacityTransform;
              if (index === 0) {
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [0, 0.3, 0.7],
                  [1, 1, 0]
                );
              } else if (index === quotes.length - 1) {
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [index - 0.7, index - 0.3, index],
                  [0, 1, 1]
                );
              } else {
                opacityTransform = useTransform(
                  imageIndexProgress,
                  [index - 0.7, index - 0.3, index, index + 0.3, index + 0.7],
                  [0, 1, 1, 1, 0]
                );
              }
              
              return (
                <motion.div
                  key={`quote-${index}`}
                  className="absolute left-0 right-0 px-8 flex justify-end items-center pr-16 md:pr-24"
                  style={{
                    y: yTransform,
                    opacity: opacityTransform,
                    zIndex: (index + 1) * 10, // Higher z-index than images
                    height: '100vh' // Full height for positioning
                  }}
                >
                  <motion.div 
                    className="bg-white p-8 flex flex-col justify-center text-gray-800 border border-gray-200 shadow-lg w-[350px] h-[400px] sm:w-[400px] sm:h-[450px] md:w-[450px] md:h-[500px] lg:w-[500px] lg:h-[550px]"
                    style={{
                      opacity: useTransform(
                        imageIndexProgress,
                        [index - 0.5, index - 0.2, index, index + 0.2, index + 0.5],
                        [0.7, 0.9, 1, 0.9, 0.7]
                      )
                    }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">{quote.title}</h3>
                    <p className="text-lg sm:text-xl">{quote.text}</p>
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
            transition={{ repeat: Infinity, duration: 2 }}
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