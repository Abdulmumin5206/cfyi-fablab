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
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

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

  // Intersection Observer for video autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Lazy video play
  useEffect(() => {
    if (!isInView || !videoRef.current) return;
    videoRef.current.play().catch(console.error);
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full bg-black"
    >
      <div className="w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/fablab/1.jpg.webp"
          onLoadedData={() => {
            if (videoRef.current) {
              videoRef.current.play().catch(console.error);
            }
          }}
        >
          <source src="/video/FabLab video horizontal.mp4" type="video/mp4" />
          {t('video.fallbackText')}
        </video>
      </div>
      <div className="absolute inset-0 bg-black/50 z-10"></div>
    </section>
  );
};

export default HeroSection;
