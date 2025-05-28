import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const ScrollImageSlider = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const requestRef = useRef<number>();

  // Image and quote data
  const images = useMemo(() => [
    "/main/scrolling1.webp",
    "/main/scrolling2.jpg",
    "/main/scrolling3.webp"
  ], []);

  const quotes = useMemo(() => [
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
  ], [t]);

  // Device detection and resize handler
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    const resizeHandler = () => {
      cancelAnimationFrame(requestRef.current!);
      requestRef.current = requestAnimationFrame(checkMobile);
    };

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = images.length;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };

    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
    });

    return () => {
      images.forEach(src => {
        const img = new Image();
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [images]);

  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const activeImageIndex = useTransform(
    scrollYProgress,
    [0, 0.95],
    [0, images.length - 1]
  );

  return (
    <section className="relative bg-white">
      <div 
        ref={containerRef}
        className="relative"
        style={{ 
          height: "500vh",
          opacity: imagesLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in"
        }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
          {/* Background images */}
          <div className="absolute inset-0">
            {images.map((src, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                style={{
                  opacity: useTransform(
                    activeImageIndex,
                    [index - 0.5, index, index + 0.5],
                    [0, 1, 0]
                  ),
                  zIndex: index + 1,
                  visibility: imagesLoaded ? 'visible' : 'hidden'
                }}
              >
                <img
                  src={src}
                  alt={t("slider.showcaseImage", { number: index + 1 })}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black opacity-25" />
              </motion.div>
            ))}
          </div>

          {/* Main message (desktop only) */}
          <div className="absolute left-0 top-0 bottom-0 w-full md:w-1/2 hidden lg:flex items-center justify-center z-50 px-12">
            <p className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-relaxed">
              {t("slider.mainMessage")}
            </p>
          </div>

          {/* Quotes */}
          <div className="absolute inset-0">
            {quotes.map((quote, index) => {
              const yPosition = useTransform(
                activeImageIndex,
                [index - 1, index, index + 1],
                index === 0 
                  ? [800, 0, -800]
                  : index === 1 
                    ? [800, 0, -800]
                    : [800, 0, -800]
              );

              const opacity = useTransform(
                activeImageIndex,
                [index - 0.5, index, index + 0.5],
                [0, 1, 0]
              );

              return (
                <motion.div
                  key={`quote-${index}`}
                  className="absolute inset-0 flex justify-center lg:justify-end items-center px-8 lg:pr-16"
                  style={{
                    opacity,
                    zIndex: 20 + index
                  }}
                >
                  <motion.div
                    className="bg-white p-6 lg:p-8 xl:p-10 flex flex-col text-gray-800 border border-gray-200 shadow-lg w-full max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] h-[380px] lg:h-[420px] xl:h-[500px] text-left"
                    style={{ 
                      y: yPosition,
                      transition: "transform 0.2s ease-out"
                    }}
                  >
                    <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-4 lg:mb-6">
                      {quote.title}
                    </h3>
                    <div className="mb-4 lg:mb-6">
                      <span className="block text-2xl lg:text-3xl xl:text-4xl font-extrabold leading-tight text-gray-900">
                        {quote.achievement}
                      </span>
                    </div>
                    <p className="text-sm lg:text-base xl:text-lg text-gray-600 line-clamp-5 lg:line-clamp-6">
                      {quote.text}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0])
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <ChevronDown size={isMobile ? 20 : 24} className="text-white" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScrollImageSlider;