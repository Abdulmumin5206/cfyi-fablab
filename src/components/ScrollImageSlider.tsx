import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const ScrollImageSlider = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Pre-scaled images (WebP format)
  const images = [
    "/main/scrolling1.webp",
    "/main/scrolling2.jpg", // Changed back to jpg since webp might not be available
    "/main/scrolling3.webp"
  ];

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

  // Optimized scroll handler
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const activeIndex = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0, 1, 2, 2] // Clamp to last image
  );

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen">
        {/* Background images */}
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: useTransform(
                activeIndex,
                [i - 0.5, i, i + 0.5],
                [0, 1, 0]
              ),
              zIndex: i + 1
            }}
          >
            <img
              src={src}
              alt={t(`slider.image${i}`)}
              className="w-full h-full object-cover"
              loading="eager"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-black/25" />
          </motion.div>
        ))}

        {/* Main message */}
        <div className="absolute left-0 top-0 bottom-0 w-full md:w-1/2 hidden lg:flex items-center justify-center z-50 px-12">
          <p className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-relaxed">
            {t("slider.mainMessage")}
          </p>
        </div>

        {/* Quotes */}
        <div className="absolute inset-0">
          {quotes.map((quote, i) => {
            const yPosition = useTransform(
              activeIndex,
              [i - 1, i, i + 1],
              [800, 0, -800]
            );

            const opacity = useTransform(
              activeIndex,
              [i - 0.5, i, i + 0.5],
              [0, 1, 0]
            );

            return (
              <motion.div
                key={`quote-${i}`}
                className="absolute inset-0 flex justify-center lg:justify-end items-center px-8 lg:pr-16"
                style={{
                  opacity,
                  zIndex: 20 + i
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
          <ChevronDown size={24} className="text-white" />
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollImageSlider;