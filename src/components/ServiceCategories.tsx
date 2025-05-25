import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({
    "3d-printing": 0,
    "mould": 0,
    "custom-fabrication": 0,
    "engineering": 0,
    "prototyping": 0,
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories: ServiceCategory[] = [
    {
      id: "3d-printing",
      titleKey: "serviceCategories.3dPrinting.title",
      descriptionKey: "serviceCategories.3dPrinting.description",
      images: [
        "/main/3dprinting1.jpg",
        "/main/3dprinting2.jpg",
        "/main/3dprinting3.jpg",
      ],
      logoText: "3D Printing",
      buttonTextKey: "serviceCategories.3dPrinting.title",
      buttonLink: "/3d-printing",
      color: "bg-[#cb2026]",
    },
    {
      id: "mould",
      titleKey: "serviceCategories.mould.title",
      descriptionKey: "serviceCategories.mould.description",
      images: [
        "/main/spareparts1.webp",
        "/main/sparepart2.webp",
        "/main/molding1.jpg",
        "/main/molding2.jpg",
      ],
      logoText: "Moulding and Spare Parts",
      buttonTextKey: "serviceCategories.mould.title",
      buttonLink: "/mould",
      color: "bg-[#0e9a48]",
    },
    {
      id: "custom-fabrication",
      titleKey: "serviceCategories.customFabrication.title",
      descriptionKey: "serviceCategories.customFabrication.description",
      images: [
        "/main/prototyping1.webp",
        "/fablab/13.jpg",
        "/fablab/1.jpg",
        "/fablab/11.jpg"
      ],
      logoText: "Custom Fabrication",
      buttonTextKey: "serviceCategories.customFabrication.title",
      buttonLink: "/custom-fabrication",
      color: "bg-[#35469d]",
    },
    {
      id: "engineering",
      titleKey: "serviceCategories.engineering.title",
      descriptionKey: "serviceCategories.engineering.description",
      images: [
        "/fablab/13.jpg",
        "/fablab/1.jpg",
        "/fablab/11.jpg",
        "/fablab/12.jpg"
      ],
      logoText: "Engineering",
      buttonTextKey: "serviceCategories.engineering.title",
      buttonLink: "/engineering",
      color: "bg-[#8a2be2]",
    },
    {
      id: "prototyping",
      titleKey: "serviceCategories.prototyping.title",
      descriptionKey: "serviceCategories.prototyping.description",
      images: [
        "/prototyping/Design.jpeg",
        "/prototyping/Prototype.webp",
        "/prototyping/Manufacture.webp",
        "/prototyping/Design.jpeg"
      ],
      logoText: "Prototyping",
      buttonTextKey: "serviceCategories.prototyping.title",
      buttonLink: "/prototyping",
      color: "bg-[#ff6b6b]",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleScrollLeft = () => {
    if (isTransitioning || currentSlide === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleScrollRight = () => {
    if (isTransitioning || currentSlide >= categories.length - 3) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section 
      ref={sectionRef} 
      id="service-categories" 
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-100 relative overflow-hidden"
      aria-label="Our Services"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {t('serviceCategories.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            {t('serviceCategories.subtitle')}
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="block sm:hidden space-y-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`w-full transition-all duration-500 ease-in-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-[4/3] mb-6 overflow-hidden group bg-white">
                {category.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out ${
                      currentImageIndex[category.id] === imgIndex 
                        ? 'opacity-100 scale-100 group-hover:scale-110' 
                        : 'opacity-0 scale-105'
                    }`}
                    style={{ backgroundImage: `url(${image})` }}
                    role="img"
                    aria-label={`${t(category.titleKey)} - Image ${imgIndex + 1}`}
                  />
                ))}
                
                <div className={`absolute bottom-0 left-0 right-0 ${category.color} py-2 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6`}>
                  <p className="text-white font-medium text-sm sm:text-base md:text-lg lg:text-xl">
                    {t(category.titleKey)}
                  </p>
                </div>
              </div>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-5 md:mb-6 px-2 sm:px-3 md:px-4">
                {t(category.descriptionKey)}
              </p>

              <Link 
                to={category.buttonLink}
                className={`inline-flex items-center ${category.color} text-white py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 rounded-sm hover:opacity-90 transition-all duration-300 text-sm sm:text-base md:text-lg mx-2 sm:mx-3 md:mx-4`}
                aria-label={`Learn more about ${t(category.titleKey)}`}
              >
                <span>{`${t('serviceCategories.explorePrefix')} ${t(category.buttonTextKey)}`}</span>
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:block relative">
          <div className="flex items-center justify-center">
            {currentSlide > 0 && (
              <button
                onClick={handleScrollLeft}
                className="absolute left-0 z-10 bg-black p-2 rounded-sm shadow-lg transition-all duration-300 -translate-x-1/2 top-1/2 -translate-y-1/2"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}
            
            <div className="relative w-full max-w-[1600px] mx-auto px-12 overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ 
                  transform: `translateX(calc(-33.333% * ${currentSlide}))`
                }}
              >
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    className={`group transition-all duration-700 transform flex-shrink-0 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ 
                      transitionDelay: `${index * 150}ms`,
                      flex: '0 0 33.333%',
                      padding: '0 1rem'
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Image container with hover effect */}
                    <div className="relative aspect-[16/12] mb-0 overflow-hidden transition-all duration-500 group bg-white">
                      {category.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out ${
                            currentImageIndex[category.id] === imgIndex 
                              ? 'opacity-100 scale-100 group-hover:scale-110 z-10' 
                              : 'opacity-0 scale-105 z-0'
                          }`}
                          style={{ backgroundImage: `url(${image})` }}
                          role="img"
                          aria-label={`${t(category.titleKey)} - Image ${imgIndex + 1}`}
                        />
                      ))}
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                      {/* Optional: logo/text overlay on hover */}
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
                        <span className="text-white text-3xl font-bold drop-shadow-lg text-center px-4 select-none">
                          {t(category.titleKey)}
                        </span>
                      </div>
                    </div>
                    {/* Card content below image */}
                    <div
                      className="bg-white transition-all duration-300 p-8 pt-6 pb-16 h-[270px] flex flex-col items-start justify-between relative overflow-hidden shadow-sm"
                      style={{ backgroundColor: hoveredIndex === index ? '#0e9a48' : '#fff' }}
                    >
                      <div>
                        <span className="block text-gray-500 text-base mb-2 transition-colors duration-300">
                          {t(category.logoText) || t(category.titleKey)}
                        </span>
                        <h3 className="text-2xl font-bold mb-2 transition-colors duration-300">
                          {t(category.titleKey)}
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-base transition-colors duration-300">
                          {t(category.descriptionKey)}
                        </p>
                      </div>
                      <Link 
                        to={category.buttonLink}
                        className="flex items-center absolute left-8 bottom-[-64px] group-hover:bottom-8 bg-black text-white py-3 px-8 rounded-sm hover:opacity-90 transition-all duration-300 text-lg pointer-events-none group-hover:pointer-events-auto min-w-[180px]"
                        aria-label={`Learn more about ${t(category.titleKey)}`}
                      >
                        <span>Learn More</span>
                        <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {currentSlide < categories.length - 3 && (
              <button
                onClick={handleScrollRight}
                className="absolute right-0 z-10 bg-black p-2 rounded-sm shadow-lg transition-all duration-300 translate-x-1/2 top-1/2 -translate-y-1/2"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories; 