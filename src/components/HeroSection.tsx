import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HeroSlide {
  id: number;
  background: string;
  titleKey: string;
  subtitleKey: string;
  buttonTextKey: string;
  buttonLink: string;
}

const HeroSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const slides: HeroSlide[] = [
    {
      id: 1,
      background: "bg-[url('/fablab/1.jpg')]",
      titleKey: "hero.slide1.title",
      subtitleKey: "hero.slide1.subtitle",
      buttonTextKey: "hero.slide1.buttonText",
      buttonLink: "#service-categories",
    },
    {
      id: 2,
      background: "bg-[url('/fablab/3.jpg')]",
      titleKey: "hero.slide2.title",
      subtitleKey: "hero.slide2.subtitle",
      buttonTextKey: "hero.slide2.buttonText",
      buttonLink: "#about-section",
    },
    {
      id: 3,
      background: "bg-[url('/fablab/11.jpg')]",
      titleKey: "hero.slide3.title",
      subtitleKey: "hero.slide3.subtitle",
      buttonTextKey: "hero.slide3.buttonText",
      buttonLink: "#contact-section",
    },
    {
      id: 4,
      background: "bg-[url('/fablab/13.jpg')]",
      titleKey: "hero.slide4.title",
      subtitleKey: "hero.slide4.subtitle",
      buttonTextKey: "hero.slide4.buttonText",
      buttonLink: "https://t.me/+998770884977",
    },
  ];

  // Helper function to get visual position of slides
  const getSlidePosition = (index: number) => {
    // Get normalized index for the original slide array
    const normalizedIndex = ((index % slides.length) + slides.length) % slides.length;
    
    // Get visual positions based on active index
    if (normalizedIndex === activeIndex) return "center";
    
    // For infinite loop effect, we need to calculate whether a slide is 
    // visually before or after the active slide
    const slidesBefore = direction === "right" ? 
      (activeIndex + slides.length - normalizedIndex) % slides.length :
      (normalizedIndex + slides.length - activeIndex) % slides.length;
      
    const slidesAfter = direction === "right" ? 
      (normalizedIndex + slides.length - activeIndex) % slides.length :
      (activeIndex + slides.length - normalizedIndex) % slides.length;
    
    return slidesBefore <= slidesAfter ? "before" : "after";
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) { // Minimum drag distance to trigger slide change
      if (diff > 0) {
        // Dragged left, go to next slide
        setDirection("right");
        setActiveIndex((prev) => (prev + 1) % slides.length);
      } else {
        // Dragged right, go to previous slide
        setDirection("left");
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
    
    setIsDragging(false);
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();
  const handleMouseLeave = () => handleEnd();

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleEnd();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setDirection("right");
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isDragging]);

  // Create a clone of slides with appropriate indices for rendering
  const renderSlides = () => {
    const currentIndex = activeIndex;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    const nextIndex = (currentIndex + 1) % slides.length;
    
    return [
      { ...slides[prevIndex], position: "before" },
      { ...slides[currentIndex], position: "center" },
      { ...slides[nextIndex], position: "after" }
    ];
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden bg-black"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {renderSlides().map((slide) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            slide.position === "center"
              ? "translate-x-0 z-20"
              : slide.position === "before"
              ? "-translate-x-full z-10"
              : "translate-x-full z-10"
          }`}
        >
          {/* Background image */}
          <div className={`absolute inset-0 bg-cover bg-center ${slide.background}`} />
          
          {/* Gradient overlay - added for better text visibility while maintaining image quality */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50 z-10"></div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-16 sm:mt-20 md:mt-24">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-2 sm:mb-4 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl">
                {t(slide.titleKey)}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl">
                {t(slide.subtitleKey)}
              </p>
              <a
                href={slide.buttonLink}
                onClick={(e) => slide.buttonLink.startsWith('#') ? handleScrollToSection(e, slide.buttonLink.substring(1)) : undefined}
                className="inline-flex items-center space-x-1 sm:space-x-2 bg-white text-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors duration-300"
                {...(slide.buttonLink.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span>{t(slide.buttonTextKey)}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center space-x-1 sm:space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > activeIndex ? "right" : "left");
              setActiveIndex(index);
            }}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
