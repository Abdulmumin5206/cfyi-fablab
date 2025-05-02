import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({
    "3d-printing": 0,
    "mould": 0,
    "engineering": 0,
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
      logoText: "Think: Mould",
      buttonTextKey: "serviceCategories.mould.title",
      buttonLink: "/mould",
      color: "bg-[#0e9a48]",
    },
    {
      id: "engineering",
      titleKey: "header.engineering",
      descriptionKey: "serviceCategories.prototyping.description",
      images: [
        "/fablab/13.jpg",
        "/fablab/1.jpg",
        "/fablab/11.jpg",
      ],
      logoText: "Think: Engineering",
      buttonTextKey: "header.engineering",
      buttonLink: "/engineering",
      color: "bg-[#35469d]",
    },
  ];

  // Auto-scroll effect for image sliders
  useEffect(() => {
    // Only start auto-scroll when section is visible
    if (!isVisible) return;
    
    const intervalIds = categories.map(category => {
      return setInterval(() => {
        setCurrentImageIndex(prev => ({
          ...prev,
          [category.id]: (prev[category.id] + 1) % category.images.length
        }));
      }, 3000 + Math.random() * 1000); // Slightly different interval for each slider to make them look less synchronized
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

  return (
    <section ref={sectionRef} className="py-16 bg-white relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px] relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            {t('serviceCategories.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('serviceCategories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-[1600px] mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`transition-all duration-700 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Auto-scrolling Image Slider */}
              <div className="relative aspect-square mb-10 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* Images with auto-transition */}
                {category.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                      currentImageIndex[category.id] === imgIndex 
                        ? 'opacity-100 z-10' 
                        : 'opacity-0 z-0'
                    }`}
                    style={{ backgroundImage: `url(${image})` }}
                  />
                ))}
                
                {/* Category Label */}
                <div className={`absolute bottom-0 left-0 ${category.color} py-2 px-4 z-20`}>
                  <p className="text-white font-medium">
                    {t(category.titleKey)}
                  </p>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm mb-5 text-gray-700 leading-relaxed">{t(category.descriptionKey)}</p>

              {/* Button */}
              <a
                href={category.buttonLink}
                className={`inline-flex items-center ${category.color} text-white py-1.5 px-3 hover:opacity-90 transition-opacity text-sm`}
              >
                <span>{t(`Explore ${t(category.buttonTextKey)}`)}</span>
                <ArrowRight size={14} className="ml-1.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories; 