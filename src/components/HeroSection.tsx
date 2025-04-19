import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface HeroSlide {
  id: number;
  background: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    background: "bg-[url('/fablab/1.jpg')]",
    title: "Welcome to FabLab",
    subtitle: "Your creative space for innovation and making",
    buttonText: "Explore Our Space",
    buttonLink: "/",
  },
  {
    id: 2,
    background: "bg-[url('/fablab/3.jpg')]",
    title: "State-of-the-Art Equipment",
    subtitle: "Access to cutting-edge tools and technology",
    buttonText: "View Equipment",
    buttonLink: "/",
  },
  {
    id: 3,
    background: "bg-[url('/fablab/11.jpg')]",
    title: "Creative Community",
    subtitle: "Join a community of makers and innovators",
    buttonText: "Join Us",
    buttonLink: "/",
  },
  {
    id: 4,
    background: "bg-[url('/fablab/13.jpg')]",
    title: "Workshop Space",
    subtitle: "Perfect environment for bringing ideas to life",
    buttonText: "Book a Session",
    buttonLink: "/",
  },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-8">
              <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 max-w-3xl">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
                {slide.subtitle}
              </p>
              <a
                href={slide.buttonLink}
                className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 font-medium"
              >
                <span>{slide.buttonText}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > activeIndex ? "right" : "left");
              setActiveIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
