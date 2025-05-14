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
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({
    "3d-printing": 0,
    "mould": 0,
    "custom-fabrication": 0,
  });

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
      logoText: "Think: 3D Printing",
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
      logoText: "Think: Moulding and Spare Parts",
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
      logoText: "Think: Custom Fabrication",
      buttonTextKey: "serviceCategories.customFabrication.title",
      buttonLink: "/custom-fabrication",
      color: "bg-[#35469d]",
    },
  ];

  // Auto-scroll effect for image sliders
  useEffect(() => {
    if (!isVisible) return;
    
    const intervalIds = categories.map(category => {
      return setInterval(() => {
        setCurrentImageIndex(prev => ({
          ...prev,
          [category.id]: (prev[category.id] + 1) % category.images.length
        }));
      }, 4000 + Math.random() * 1000); // Increased interval for better UX
    });
    
    return () => {
      intervalIds.forEach(id => clearInterval(id));
    };
  }, [isVisible]);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length);
  };

  return (
    <section 
      ref={sectionRef} 
      id="service-categories" 
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative"
      aria-label="Our Services"
    >
      {/* Subtle background pattern with improved opacity */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
      
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
              <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg shadow-lg">
                {category.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
                      currentImageIndex[category.id] === imgIndex 
                        ? 'opacity-100 scale-100' 
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
        <div className="hidden sm:flex flex-row justify-center gap-8 sm:gap-10 lg:gap-12 max-w-[1600px] mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group transition-all duration-700 transform w-[300px] sm:w-[400px] lg:w-[500px] xl:w-[600px] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-[16/9] sm:aspect-[16/10] lg:aspect-[16/11] xl:aspect-[16/12] mb-6 sm:mb-8 lg:mb-10 xl:mb-12 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                {category.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
                      currentImageIndex[category.id] === imgIndex 
                        ? 'opacity-100 scale-100 z-10' 
                        : 'opacity-0 scale-105 z-0'
                    }`}
                    style={{ backgroundImage: `url(${image})` }}
                    role="img"
                    aria-label={`${t(category.titleKey)} - Image ${imgIndex + 1}`}
                  />
                ))}
                
                <div className={`absolute bottom-0 left-0 right-0 ${category.color} py-1.5 sm:py-2 lg:py-2.5 xl:py-3 px-2 sm:px-3 lg:px-4 xl:px-5 z-20 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-full`}>
                  <p className="text-white font-medium text-sm sm:text-base lg:text-lg xl:text-xl">
                    {t(category.titleKey)}
                  </p>
                </div>
              </div>
              
              <p className="text-sm sm:text-base lg:text-lg xl:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4 lg:mb-5 xl:mb-6">
                {t(category.descriptionKey)}
              </p>

              <Link 
                to={category.buttonLink}
                className={`inline-flex items-center ${category.color} text-white py-1.5 sm:py-2 lg:py-2.5 xl:py-3 px-3 sm:px-4 lg:px-5 xl:px-6 rounded-sm hover:opacity-90 transition-all duration-300 text-sm sm:text-base lg:text-lg xl:text-lg group-hover:translate-x-1`}
                aria-label={`Learn more about ${t(category.titleKey)}`}
              >
                <span>{`${t('serviceCategories.explorePrefix')} ${t(category.buttonTextKey)}`}</span>
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories; 