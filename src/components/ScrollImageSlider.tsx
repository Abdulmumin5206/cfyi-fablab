import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import GradientText from "./GradientText";

const ScrollImageSlider = () => {
  const { t, i18n } = useTranslation('homepage');
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  // Add state to detect if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  // Add state for touch scrolling
  const [isTouching, setIsTouching] = useState(false);
  
  // Check if current language is Russian to apply smaller font size
  const isRussian = i18n.language === 'ru';

  // Pre-scaled images (WebP format)
  const images = [
    "/main/fablabroom.webp",
    "/main/fablearn.webp",
    "/main/cfyi.webp"
  ];

  const quotes = [
    {
      title: t("slider.fablabRoom.title"),
      achievement: t("slider.fablabRoom.achievement"),
      text: t("slider.fablabRoom.text")
    },
    {
      title: t("slider.fabLearn.title"),
      achievement: t("slider.fabLearn.achievement"),
      text: t("slider.fabLearn.text")
    },
    {
      title: t("slider.cfyi.title"),
      achievement: t("slider.cfyi.achievement"),
      text: t("slider.cfyi.text")
    }
  ];

  // Check if we're on mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      const mobileBreakpoint = 768; // md breakpoint
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Optimized scroll handler with direct response (no momentum)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false // Use useEffect instead of layoutEffect for better mobile performance
  });
  
  // For mobile, we use scrollYProgress directly with enhanced responsiveness
  // For desktop, we use a very stiff spring with minimal smoothing (almost direct)
  const springProgress = useSpring(scrollYProgress, { 
    damping: 50,     // Higher damping = less oscillation
    stiffness: 500,  // Higher stiffness = more immediate response
    mass: 0.1        // Lower mass = faster reaction
  });
  
  // Use the appropriate progress value based on isMobile
  const effectiveProgress = isMobile ? scrollYProgress : springProgress;
  
  // Enhanced mobile scroll mapping for more responsive feel
  const activeIndex = useTransform(
    effectiveProgress,
    isMobile ? [0, 0.25, 0.6, 1] : [0, 0.33, 0.66, 1], // More responsive mapping on mobile
    [0, 1, 2, 2]
  );

  // Optimized transforms for images - simplified on mobile
  const imageOpacities = isMobile ? [
    // Simplified mobile opacity transitions for better performance
    useTransform(effectiveProgress, [0, 0.2, 0.3], [1, 0.7, 0]),
    useTransform(effectiveProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]),
    useTransform(effectiveProgress, [0.5, 0.6, 1], [0, 1, 1])
  ] : [
    useTransform(effectiveProgress, [0, 0.25, 0.33], [1, 0.5, 0]),
    useTransform(effectiveProgress, [0.25, 0.33, 0.58, 0.66], [0, 1, 1, 0]),
    useTransform(effectiveProgress, [0.58, 0.66, 1], [0, 1, 1])
  ];

  // Enhanced mobile transforms with bigger, more responsive movements
  const quoteTransforms = quotes.map((_, i) => ({
    yPosition: useTransform(
      activeIndex,
      isMobile ? [i - 0.4, i - 0.05, i, i + 0.05, i + 0.4] : [i - 0.6, i - 0.1, i, i + 0.1, i + 0.6], // Tighter, more responsive range on mobile
      isMobile ? [400, 50, 0, -50, -400] : [600, 100, 0, -100, -600] // Bigger movements on mobile for more control
    ),
    opacity: useTransform(
      activeIndex,
      isMobile ? [i - 0.3, i - 0.1, i, i + 0.1, i + 0.3] : [i - 0.5, i - 0.2, i, i + 0.2, i + 0.5], // Faster opacity transitions on mobile
      isMobile ? [0, 0.5, 1, 0.5, 0] : [0, 0.3, 1, 0.3, 0] // Smoother opacity curve on mobile
    )
  }));

  // Direct scroll indicator opacity
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Add direct wheel event handling for desktop
  useEffect(() => {
    if (isMobile || !containerRef.current) return;
    
    const handleWheel = (e: WheelEvent) => {
      // Only handle wheel events when the section is in view
      const rect = containerRef.current!.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= 0;
      
      if (!isInView) return;
      
      // Optional: Add your own direct scroll control here if needed
      // This could override the default scroll behavior for more control
    };
    
    window.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isMobile]);

  // Optimized touch events for mobile - lighter and more responsive
  useEffect(() => {
    if (!containerRef.current || !isMobile) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      setIsTouching(true);
    };
    
    const handleTouchEnd = () => {
      setIsTouching(false);
    };
    
    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  // Preload critical images to prevent layout shifts
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = images.length;

    // Create an array to track which images have loaded
    const imageLoadStatus = Array(totalImages).fill(false);

    const imageLoaders = images.map((src, index) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          imageLoadStatus[index] = true;

          // Only set as loaded when first image is ready (for critical path)
          if (index === 0 || loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };

        img.onerror = () => {
          // Continue even if image fails to load
          loadedCount++;
          resolve();
        };

        // Add sizes attribute for better resource prioritization
        img.sizes = "(max-width: 1200px) 100vw, 1200px";

        // Actually start loading the image
        img.src = src;
      });
    });

    // Start loading all images in parallel but don't block render
    Promise.all(imageLoaders).catch(err => {
      console.error('Error preloading images:', err);
      // Ensure UI is still usable even if images fail
      setImagesLoaded(true);
    });
  }, [images]);

  // Define gradient text class based on language
  const gradientTextClass = isRussian
    ? "block text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold leading-tight"
    : "block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight";

  return (
    <section 
      ref={containerRef} 
      className="relative h-[400vh] bg-[#f5f5f7] section-spacing-lg"
      style={isMobile ? { 
        transform: 'translateZ(0)', // Force hardware acceleration on mobile
        willChange: 'transform' // Hint browser for optimization
      } : {}}
    >
      <div className="sticky top-0 h-screen">
        {/* Background images with optimized transitions */}
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: imageOpacities[i],
              zIndex: i + 1,
              ...(isMobile && { 
                transform: 'translateZ(0)', // Force hardware acceleration
                backfaceVisibility: 'hidden' // Prevent flickering
              })
            }}
          >
            <img
              src={src}
              alt={t(`slider.image${i}`)}
              className="w-full h-full object-cover object-center"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              width={1920}
              height={1080}
              decoding="async"
              sizes="100vw"
              style={isMobile ? { transform: 'translateZ(0)' } : {}}
            />
            <div className="absolute inset-0 bg-black/25" />
          </motion.div>
        ))}

        {/* Main message */}
        <div className="absolute inset-0 flex items-center justify-start hidden xl:flex">
          <div className="relative z-10 pl-8 sm:pl-12 md:pl-16 lg:pl-24 xl:pl-32">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white leading-relaxed max-w-md text-left">
              {t("slider.mainMessage")}
            </p>
          </div>
        </div>

        {/* Quotes with optimized animations */}
        {imagesLoaded && (
          <div className="absolute inset-0">
            {quotes.map((quote, i) => (
              <motion.div
                key={`quote-${i}`}
                className="absolute inset-0 flex justify-center lg:justify-end items-center px-3 sm:px-4 lg:px-32 xl:px-24"
                style={{
                  opacity: quoteTransforms[i].opacity,
                  zIndex: 20 + i,
                  ...(isMobile && { 
                    transform: 'translateZ(0)',
                    willChange: 'transform, opacity'
                  })
                }}
              >
                <motion.div
                  className="bg-white p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center text-gray-800 border border-gray-200 shadow-lg w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[480px] xl:max-w-[500px] h-[340px] sm:h-[400px] lg:h-[480px] xl:h-[480px] text-left relative"
                  style={{
                    y: quoteTransforms[i].yPosition,
                    ...(isMobile && { 
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    })
                  }}
                >
                  <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#329db7] z-10" style={{ marginTop: "-1px", marginRight: "-1px" }}></div>
                  <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4">
                    {quote.title}
                  </h3>
                  <div className="mb-2 sm:mb-3 lg:mb-4">
                    <GradientText
                      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                      animationSpeed={4}
                      className={gradientTextClass}
                    >
                      {quote.achievement}
                    </GradientText>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 line-clamp-3 sm:line-clamp-4 lg:line-clamp-5">
                    {quote.text}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Scroll indicator - optimized for mobile */}
        <motion.div
          className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          style={{
            opacity: scrollIndicatorOpacity,
            ...(isMobile && { transform: 'translateZ(0)' })
          }}
          animate={{ y: [0, 5, 0] }}
          transition={{
            repeat: Infinity,
            duration: isMobile ? 2 : 1.5,
            ease: "linear"
          }}
        >
          <ChevronDown size={18} className="text-white" />
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollImageSlider;