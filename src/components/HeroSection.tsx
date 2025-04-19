
import { useState, useEffect } from "react";
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
    background: "bg-[url('/lovable-uploads/9fd14d6a-64e3-4870-af51-ba49f43b43bb.png')]",
    title: "The UK's Leading Manufacturer",
    subtitle: "of Cutting Edge PU Foam Replacements & Non-Wovens",
    buttonText: "Explore Non-Wovens",
    buttonLink: "/",
  },
  {
    id: 2,
    background: "bg-[url('/lovable-uploads/b11b2cda-3b7e-4f95-ad44-74d79b047116.png')]",
    title: "Fibres, Fillings & Non-Wovens",
    subtitle: "Innovative solutions for a sustainable future",
    buttonText: "Explore Products",
    buttonLink: "/",
  },
  {
    id: 3,
    background: "bg-[url('/lovable-uploads/50e8b7ee-dd25-40cf-947d-92a5363c39e4.png')]",
    title: "Pioneering Textile Expertise",
    subtitle: "In engineering, fibre cusion fillings & fabric inspection",
    buttonText: "Explore Engineering",
    buttonLink: "/",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              slide.background
            } ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        ))}
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-1000 ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10 pointer-events-none absolute"
              }`}
            >
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
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
