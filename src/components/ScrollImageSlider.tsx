import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const ScrollImageSlider = () => {
  const { t } = useTranslation('homepage');
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

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

  // Optimized scroll handler with ultra-smooth transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smoother transform mapping with more granular control
  const activeIndex = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0, 1, 2, 2]
  );

  // Pre-compute transforms for images with smoother transitions
  const imageOpacities = [
    useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 0.5, 0]),
    useTransform(scrollYProgress, [0.25, 0.33, 0.58, 0.66], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0.58, 0.66, 1], [0, 1, 1])
  ];

  // Pre-compute transforms for quotes with ultra-smooth easing
  const quoteTransforms = quotes.map((_, i) => ({
    yPosition: useTransform(
      activeIndex,
      [i - 0.6, i - 0.1, i, i + 0.1, i + 0.6],
      [600, 100, 0, -100, -600]
    ),
    opacity: useTransform(
      activeIndex,
      [i - 0.5, i - 0.2, i, i + 0.2, i + 0.5],
      [0, 0.3, 1, 0.3, 0]
    )
  }));

  // Scroll indicator opacity - simplified
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

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

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen">
        {/* Background images with ultra-smooth transitions */}
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: imageOpacities[i],
              zIndex: i + 1,
              willChange: 'opacity',
              transform: 'translateZ(0)' // Force hardware acceleration
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

        {/* Quotes with ultra-smooth animations - Only render when images are loaded to prioritize rendering */}
        {imagesLoaded && (
          <div className="absolute inset-0">
            {quotes.map((quote, i) => (
              <motion.div
                key={`quote-${i}`}
                className="absolute inset-0 flex justify-center lg:justify-end items-center px-3 sm:px-4 lg:px-32 xl:px-24"
                style={{
                  opacity: quoteTransforms[i].opacity,
                  zIndex: 20 + i,
                  willChange: 'opacity',
                  transform: 'translateZ(0)' // Hardware acceleration
                }}
              >
                <motion.div
                  className="bg-white p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center text-gray-800 border border-gray-200 shadow-lg w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[480px] xl:max-w-[500px] h-[340px] sm:h-[400px] lg:h-[480px] xl:h-[480px] text-left relative"
                  style={{
                    y: quoteTransforms[i].yPosition,
                    willChange: 'transform',
                    transform: 'translateZ(0)', // Hardware acceleration
                    backfaceVisibility: 'hidden' // Prevent flickering
                  }}
                >
                  <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-yellow-400 z-10"></div>
                  <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4">
                    {quote.title}
                  </h3>
                  <div className="mb-2 sm:mb-3 lg:mb-4">
                    <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight text-gray-900">
                      {quote.achievement}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 line-clamp-3 sm:line-clamp-4 lg:line-clamp-5">
                    {quote.text}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Scroll indicator - simplified animation */}
        <motion.div
          className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          style={{
            opacity: scrollIndicatorOpacity,
            transform: 'translateZ(0)'
          }}
          animate={{ y: [0, 5, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
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