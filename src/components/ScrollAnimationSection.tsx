import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface MarketCategory {
  id: string;
  title: string;
  image: string;
}

const marketCategories: MarketCategory[] = [
  {
    id: "toys",
    title: "Toys",
    image: "/fablab/1.jpg",
  },
  {
    id: "outdoor-living",
    title: "Outdoor\nLiving",
    image: "/fablab/3.jpg",
  },
  {
    id: "filtration",
    title: "Filtration",
    image: "/fablab/11.jpg",
  },
  {
    id: "transport",
    title: "Transport",
    image: "/fablab/13.jpg",
  },
  {
    id: "automotive",
    title: "Automotive",
    image: "/fablab/14.jpg",
  }
];

const ScrollAnimationSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollBy({ left: mobileScrollRef.current.offsetWidth * 0.85, behavior: 'smooth' });
    }
    setCurrentIndex((prevIndex) => 
      prevIndex === marketCategories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollBy({ left: -mobileScrollRef.current.offsetWidth * 0.85, behavior: 'smooth' });
    }
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? marketCategories.length - 1 : prevIndex - 1
    );
  };

  const visibleCategories = [
    marketCategories[currentIndex],
    marketCategories[(currentIndex + 1) % marketCategories.length],
    marketCategories[(currentIndex + 2) % marketCategories.length],
    marketCategories[(currentIndex + 3) % marketCategories.length],
    marketCategories[(currentIndex + 4) % marketCategories.length]
  ];

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16">
          Innovating Markets
        </h2>

        {/* Mobile Layout */}
        <div className="lg:hidden relative">
          <div 
            ref={mobileScrollRef}
            className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {marketCategories.map((category, index) => (
              <div
                key={`${category.id}-${index}-mobile`}
                className="flex-none w-[85%] mr-4 sm:mr-6"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative h-[250px] sm:h-[300px] md:h-[350px]">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 whitespace-pre-line">{category.title}</h3>
                    <button className="border border-white text-white px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 text-sm sm:text-base">
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-1.5 sm:p-2 rounded-full z-10"
            aria-label="Previous slide"
          >
            <ArrowLeft size={14} className="text-black" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1.5 sm:p-2 rounded-full z-10"
            aria-label="Next slide"
          >
            <ArrowRight size={14} className="text-black" />
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mr-16 lg:mr-24">
            {visibleCategories.slice(0, 4).map((category, index) => (
              <div
                key={`${category.id}-${index}`}
                className="relative group"
              >
                <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 whitespace-pre-line">{category.title}</h3>
                    <button className="border border-white text-white px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 text-sm sm:text-base">
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Peek of next image - Desktop only */}
          <div className="block absolute top-0 -right-6 w-16 sm:w-20 md:w-24 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] opacity-60">
            <img
              src={visibleCategories[4].image}
              alt={visibleCategories[4].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>

          {/* Navigation Buttons - Desktop */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 md:p-4 rounded-full z-10"
            aria-label="Previous slide"
          >
            <ArrowLeft size={16} className="text-black sm:hidden" />
            <ArrowLeft size={20} className="text-black hidden sm:block md:hidden" />
            <ArrowLeft size={24} className="text-black hidden md:block" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 md:p-4 rounded-full z-10"
            aria-label="Next slide"
          >
            <ArrowRight size={16} className="text-black sm:hidden" />
            <ArrowRight size={20} className="text-black hidden sm:block md:hidden" />
            <ArrowRight size={24} className="text-black hidden md:block" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ScrollAnimationSection;
