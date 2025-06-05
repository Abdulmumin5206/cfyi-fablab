import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const ScrollImageSlider = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Optimized scroll handler with smoother transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const activeIndex = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 0.75],
    [0, 1, 2, 2],
    { clamp: false }
  );

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen">
        {/* Background images with smooth transitions */}
        {images.map((src, i) => {
          let opacity;

          if (i === 0) {
            opacity = useTransform(
              scrollYProgress,
              [0, 0.33],
              [1, 0],
              { clamp: false }
            );
          } else if (i === 1) {
            opacity = useTransform(
              scrollYProgress,
              [0, 0.33, 0.66],
              [0, 1, 0],
              { clamp: false }
            );
          } else {
            opacity = useTransform(
              scrollYProgress,
              [0.33, 0.66],
              [0, 1],
              { clamp: false }
            );
          }

          return (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{
                opacity,
                zIndex: i + 1,
                willChange: 'opacity',
                transform: 'translateZ(0)'
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <img
                src={src}
                alt={t(`slider.image${i}`)}
                className="w-full h-full object-cover"
                loading="eager"
                width={1920}
                height={1080}
                style={{ transform: 'translateZ(0)' }}
              />
              <div className="absolute inset-0 bg-black/25" />
            </motion.div>
          );
        })}

        {/* Main message */}
        <div className="absolute left-0 top-0 bottom-0 w-full md:w-1/2 hidden lg:flex items-center justify-center z-50 px-12">
          <p className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-relaxed" style={{ transform: 'translateZ(0)' }}>
            {t("slider.mainMessage")}
          </p>
        </div>

        {/* Quotes with smooth animations */}
        <div className="absolute inset-0">
          {quotes.map((quote, i) => {
            const yPosition = useTransform(
              activeIndex,
              [i - 1, i, i + 1],
              [1000, 0, -1000],
              { clamp: false }
            );

            const opacity = useTransform(
              activeIndex,
              [i - 0.5, i, i + 0.5],
              [0, 1, 0],
              { clamp: false }
            );

            return (
              <motion.div
                key={`quote-${i}`}
                className="absolute inset-0 flex justify-center lg:justify-end items-center px-8 lg:pr-16"
                style={{
                  opacity,
                  zIndex: 20 + i,
                  willChange: 'opacity, transform',
                  transform: 'translateZ(0)'
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.div
                  className="bg-white p-6 lg:p-8 xl:p-10 flex flex-col text-gray-800 border border-gray-200 shadow-lg w-full max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] h-[380px] lg:h-[420px] xl:h-[500px] text-left"
                  style={{
                    y: yPosition,
                    willChange: 'transform',
                    transform: 'translateZ(0)'
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
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
            opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0], { clamp: false }),
            willChange: 'opacity, transform',
            transform: 'translateZ(0)'
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