import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GradientText from "./GradientText";

interface ServiceCategory {
  id: string;
  titleKey: string;
  descriptionKey: string;
  images: string[];
  logoText: string;
  buttonTextKey: string;
  buttonLink: string;
  color: string;
}

const ServiceCategories = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({
    "3d-printing": 0,
    "molding": 0,
    "digital-fabrication": 0,
    "precision-manufacturing": 0,
    "3d-scanning": 0,
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories: ServiceCategory[] = [
    {
      id: "3d-printing",
      titleKey: "serviceCategories.3dPrinting.title",
      descriptionKey: "serviceCategories.3dPrinting.description",
      images: [
        "/main/3dprinting1.webp",
      ],
      logoText: "3D Printing",
      buttonTextKey: "serviceCategories.3dPrinting.title",
      buttonLink: "/3d-printing",
      color: "bg-[#cb2026]",
    },
    {
      id: "molding",
      titleKey: "serviceCategories.molding.title",
      descriptionKey: "serviceCategories.molding.description",
      images: [
        "/main/spareparts1.jpg",

      ],
      logoText: "Molding & Production",
      buttonTextKey: "serviceCategories.molding.title",
      buttonLink: "/mould",
      color: "bg-[#0e9a48]",
    },
    {
      id: "digital-fabrication",
      titleKey: "serviceCategories.digitalFabrication.title",
      descriptionKey: "serviceCategories.digitalFabrication.description",
      images: [
        "/main/prototyping1.webp",

      ],
      logoText: "Digital Fabrication",
      buttonTextKey: "serviceCategories.digitalFabrication.title",
      buttonLink: "/digital-fabrication",
      color: "bg-[#35469d]",
    },
    {
      id: "precision-manufacturing",
      titleKey: "serviceCategories.precisionManufacturing.title",
      descriptionKey: "serviceCategories.precisionManufacturing.description",
      images: [
        "/main/scrolling2.webp",

      ],
      logoText: "Precision Manufacturing",
      buttonTextKey: "serviceCategories.precisionManufacturing.title",
      buttonLink: "/digital-fabrication#precision-manufacturing",
      color: "bg-[#8a2be2]",
    },
    {
      id: "3d-scanning",
      titleKey: "serviceCategories.3dScanning.title",
      descriptionKey: "serviceCategories.3dScanning.description",
      images: [
        "/main/scanner.webp",

      ],
      logoText: "3D Scanning",
      buttonTextKey: "serviceCategories.3dScanning.title",
      buttonLink: "/3d-scanning",
      color: "bg-[#ff6b6b]",
    },
  ];



  const handleScrollLeft = () => {
    if (isTransitioning || currentSlide === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
    setTimeout(() => setIsTransitioning(false), 300); // Back to 300ms
  };

  const handleScrollRight = () => {
    if (isTransitioning || currentSlide >= categories.length - 3) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
    setTimeout(() => setIsTransitioning(false), 300); // Back to 300ms
  };

  return (
    <section
      ref={sectionRef}
      id="service-categories"
      className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-[#f5f5f7] relative overflow-hidden"
      aria-label="Our Services"
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px] relative z-10">
        <div className="text-left mb-3 sm:mb-4 md:mb-6 lg:mb-8">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={4}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 font-['Magistral']"
          >
            {t('serviceCategories.title')}
          </GradientText>
          <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 font-['Magistral']">
            {t('serviceCategories.subtitle')}
          </p>
        </div>

        {/* Mobile Layout (< 640px) */}
        <div className="sm:hidden space-y-6 md:space-y-8 lg:space-y-10">
          {categories.map((category, index) => (
            <Link
              to={category.buttonLink}
              key={category.id}
              className="block w-full transition-all duration-300 ease-in-out cursor-pointer hover:transform hover:scale-[1.02] opacity-100 translate-y-0"
            >
              <div className="relative aspect-[16/12] mb-4 overflow-hidden group bg-white shadow-sm">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${category.images[0]})`,
                    transform: 'translateZ(0)'
                  }}
                  role="img"
                  aria-label={t(category.titleKey)}
                />

                {/* Add overlay with hover effect */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10"></div>

                {/* Add scaling wrapper for consistent scale effect */}
                <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110 overflow-hidden"
                  style={{ transformOrigin: 'center', willChange: 'transform' }}></div>

                <div className={`absolute bottom-0 left-0 right-0 ${category.color} py-3 px-4`}>
                  <h3 className="font-medium text-base font-['Magistral'] text-white">
                    {t(category.titleKey)}
                  </h3>
                </div>
              </div>

              <div className="px-4">
                <p className="text-sm leading-relaxed mb-4 text-gray-700 font-['Magistral']">
                  {t(category.descriptionKey)}
                </p>

                <div className={`inline-flex items-center ${category.color} text-white py-2 px-4 font-['Magistral']`}>
                  <span className="text-sm">{`${t('serviceCategories.explorePrefix')} ${t(category.buttonTextKey)}`}</span>
                  <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tablet and Desktop Layout (≥ 640px) */}
        <div className="hidden sm:block relative">
          <div className="flex items-center justify-center">
            <button
              onClick={handleScrollLeft}
              className={`absolute left-1 sm:left-2 md:left-4 lg:left-6 z-10 bg-black p-2 sm:p-3 shadow-lg transition-all duration-300 hover:bg-gray-800 top-[40%] -translate-y-1/2 ${currentSlide === 0 ? 'hidden' : 'opacity-100 cursor-pointer'
                }`}
              aria-label="Scroll left"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(calc(-${100 / 3}% * ${currentSlide}))`,
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  perspective: '1000px',
                  WebkitPerspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {categories.map((category, index) => (
                  <Link
                    to={category.buttonLink}
                    key={category.id}
                    className="group transition-all duration-300 flex-shrink-0 cursor-pointer opacity-100 translate-y-0"
                    style={{
                      flex: '0 0 28%',
                      marginRight: '2%',
                      transform: 'translateZ(0)'
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="relative aspect-[16/12] mb-0 overflow-hidden transition-all duration-300 group bg-white shadow-sm">
                      <div className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-110 z-0"
                        style={{ transformOrigin: 'center', willChange: 'transform' }}>
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${category.images[0]})`,
                            transform: 'translateZ(0)',
                            transformOrigin: 'center',
                            height: '100%',
                            width: '100%'
                          }}
                          role="img"
                          aria-label={t(category.titleKey)}
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10" />
                      {/* Removing the text overlay */}
                    </div>

                    <div
                      className="bg-white transition-all duration-300 p-4 sm:p-6 lg:p-8 pt-4 sm:pt-5 lg:pt-6 pb-16 h-[240px] sm:h-[260px] lg:h-[280px] flex flex-col items-start justify-between relative overflow-hidden shadow-sm"
                      style={{
                        backgroundColor: hoveredIndex === index ? '#329db7' : '#fff',
                        willChange: 'background-color'
                      }}
                    >
                      <div>
                        <h3 className={`font-bold mb-2 transition-colors duration-300 font-['Magistral'] text-gray-800 ${i18n.language === 'en'
                            ? 'text-lg sm:text-xl lg:text-2xl'
                            : 'text-base sm:text-lg lg:text-xl'
                            }`}>
                          {t(category.titleKey)}
                        </h3>
                        <p className={`text-gray-700 leading-relaxed transition-colors duration-300 font-['Magistral'] ${i18n.language === 'en'
                          ? 'text-sm sm:text-base'
                          : 'text-xs sm:text-sm'
                          }`}>
                          {t(category.descriptionKey)}
                        </p>
                      </div>
                      <div className={`flex items-center absolute left-4 sm:left-6 lg:left-8 bottom-[-64px] group-hover:bottom-6 lg:group-hover:bottom-8 bg-black text-white py-2 sm:py-3 px-6 sm:px-8 transition-all duration-300 font-['Magistral'] ${i18n.language === 'en'
                        ? 'text-base lg:text-lg'
                        : 'text-sm lg:text-base'
                        }`}
                        style={{ willChange: 'transform' }}
                      >
                        <span>{t('common.learnMore')}</span>
                        <ArrowRight size={i18n.language === 'en' ? 18 : 16} className="ml-2" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={handleScrollRight}
              className={`absolute right-1 sm:right-2 md:right-4 lg:right-6 z-10 bg-black p-2 sm:p-3 shadow-lg transition-all duration-300 hover:bg-gray-800 top-[40%] -translate-y-1/2 ${currentSlide >= categories.length - 3 ? 'hidden' : 'opacity-100 cursor-pointer'
                }`}
              aria-label="Scroll right"
              disabled={currentSlide >= categories.length - 3}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories; 