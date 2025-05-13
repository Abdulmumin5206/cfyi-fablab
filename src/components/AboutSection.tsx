import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IndustryCategory {
  id: string;
  title: string;
  iconPath: string;
  description: string;
  capabilities: string[];
  caseStudies: {
    title: string;
    description: string;
  }[];
}

const AboutSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Function to handle contact button click
  const handleContactClick = (industryTitle: string) => {
    // Close popup
    closePopup();
    
    // Find the contact section element
    const contactSection = document.getElementById('contact-section');
    
    // If found, scroll to it
    if (contactSection) {
      // Add industry to URL query parameters
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('inquiry', `${industryTitle} Projects`);
      
      // Update URL without reloading page
      const newUrl = `${window.location.pathname}?${searchParams.toString()}${window.location.hash}`;
      window.history.pushState({ path: newUrl }, '', newUrl);

      // Scroll to contact section after a short delay to ensure URL is updated
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // If contact section not found on current page, navigate to contact page with query parameter
      window.location.href = '/#contact-section?inquiry=' + encodeURIComponent(`${industryTitle} Projects`);
    }
  };

  const industries: IndustryCategory[] = [
    {
      id: "engineering",
      title: "Engineering",
      iconPath: "/main/engineeringsvg.webp",
      description: "Engineering solutions spanning prototyping, tooling, and production components for innovative projects.",
      capabilities: ["Functional prototypes", "Tooling and fixtures", "End-use parts", "Testing equipment"],
      caseStudies: [
        {
          title: "Rapid Prototype Development",
          description: "Accelerating engineering cycles with quick-turn prototypes for validation and testing."
        }
      ]
    },
    {
      id: "textile",
      title: "Textile",
      iconPath: "/main/textilesvg.png",
      description: "Innovative textile manufacturing solutions and fabric processing equipment for modern production needs.",
      capabilities: ["Fabric inspection", "Textile machinery", "Processing equipment", "Quality control"],
      caseStudies: [
        {
          title: "Advanced Fabric Processing",
          description: "State-of-the-art textile manufacturing solutions for enhanced production efficiency."
        }
      ]
    },
    {
      id: "medical",
      title: "Medical",
      iconPath: "/main/medicalsvg.webp",
      description: "Medical applications from surgical planning models to custom devices and equipment components.",
      capabilities: ["Patient-specific models", "Surgical planning tools", "Medical device prototypes", "Anatomical replicas"],
      caseStudies: [
        {
          title: "Surgical Planning Models",
          description: "Custom anatomical models that help surgeons plan and practice complex procedures before surgery."
        }
      ]
    },
    {
      id: "furniture",
      title: "Furniture",
      iconPath: "/main/furnituresvg.png",
      description: "Custom furniture design and manufacturing solutions for both residential and commercial applications.",
      capabilities: ["Custom designs", "Prototype development", "Production tooling", "Assembly solutions"],
      caseStudies: [
        {
          title: "Modern Furniture Collection",
          description: "Innovative furniture designs brought to life through advanced manufacturing techniques."
        }
      ]
    },
    {
      id: "automotive",
      title: "Automotive",
      iconPath: "/main/automotivesvg.webp",
      description: "Automotive solutions for prototype development, testing components, and custom parts.",
      capabilities: ["Concept models", "Functional prototypes", "Test fixtures", "Custom components"],
      caseStudies: [
        {
          title: "Automotive Testing Equipment",
          description: "Custom testing rigs for validating new automotive components and systems."
        }
      ]
    },
    {
      id: "education",
      title: "Education",
      iconPath: "/main/educationsvg.webp",
      description: "Educational tools and models for enhanced learning experiences and hands-on training.",
      capabilities: ["Anatomical models", "Teaching aids", "Interactive tools", "Educational kits"],
      caseStudies: [
        {
          title: "Educational Anatomy Models",
          description: "Detailed anatomical models that improve medical education and training."
        }
      ]
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      iconPath: "/main/manufacturingsvg.webp",
      description: "Manufacturing solutions for production needs, including moulding and spare parts, from jigs and fixtures to end-use components.",
      capabilities: ["Production tooling", "Assembly fixtures", "Custom components", "Short-run production", "Moulding and spare parts"],
      caseStudies: [
        {
          title: "Custom Manufacturing Fixtures",
          description: "Specialized fixtures that improve production efficiency and quality control."
        }
      ]
    },
    {
      id: "jewelry",
      title: "Jewelry",
      iconPath: "/main/jewelrysvg.webp",
      description: "Custom jewelry design, prototyping, and production solutions for unique and precision pieces.",
      capabilities: ["Detailed designs", "Casting patterns", "Custom settings", "Finished pieces"],
      caseStudies: [
        {
          title: "Custom Jewelry Collection",
          description: "Creating intricate, personalized jewelry pieces using advanced fabrication techniques."
        }
      ]
    }
  ];

  const closePopup = () => {
    setActiveIndustry(null);
    document.body.style.overflow = "auto";
  };

  const openPopup = (industryId: string) => {
    setActiveIndustry(industryId);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Check scrollability for arrows
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => {
      if (container) container.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scrollByAmount = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Create placeholder URLs for icons that might not exist yet
  const getIconUrl = (icon: string) => {
    return icon || "https://placehold.co/200x200/333/white?text=Industry";
  };

  const activeIndustryData = activeIndustry 
    ? industries.find(industry => industry.id === activeIndustry) 
    : null;

  const renderIndustryCard = (industry: IndustryCategory, index: number) => (
    <div
      key={industry.id}
      onClick={() => openPopup(industry.id)}
      onMouseEnter={() => {
        // Preload the popup image
        const img = new Image();
        img.src = `/main/popups/${industry.id}.${industry.id === 'manufacturing' ? 'png' : (industry.id === 'education' || industry.id === 'medical' || industry.id === 'engineering' ? 'webp' : 'jpg')}`;
      }}
      className={`bg-white text-gray-800 flex flex-col items-center justify-center border border-gray-200 shadow-md rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
      style={{ 
        aspectRatio: '1/1',
        width: '100%',
        minWidth: '120px',
        maxWidth: '150px',
        transition: 'min-width 0.3s, max-width 0.3s',
        margin: '0 auto',
      }}
    >
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="w-16 h-16 md:w-20 md:h-20 mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <img 
            src={getIconUrl(industry.iconPath)} 
            alt={`${industry.title} icon`} 
            className="w-full h-full object-contain transition-all duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://placehold.co/200x200/333/white?text=${industry.title}`;
            }}
          />
        </div>
        <h3 className="text-center text-base font-semibold transition-all duration-300 group-hover:text-brand-yellow mt-1">{industry.title}</h3>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="about-section" className="py-16 md:py-20 bg-brand-gray overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px] relative z-10">
        <div className="mb-10 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('about.title')}
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
            {t('about.subtitle', 'Discover how our services support various industries with specialized solutions')}
          </p>
        </div>

        {/* Mobile scrollable layout with visual indicators and arrows */}
        <div className="md:hidden relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full shadow p-1.5"
              style={{ marginLeft: 2 }}
              onClick={() => scrollByAmount(-140)}
              aria-label="Scroll left"
            >
              <ChevronLeft size={22} className="text-gray-700" />
            </button>
          )}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide pl-4 gap-3 items-stretch" 
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none' 
            }}
          >
            {industries.map((industry, index) => (
              <div 
                key={industry.id} 
                className="flex-none snap-start"
                style={{ minWidth: '140px', maxWidth: '170px', marginRight: index === industries.length - 1 ? 0 : '12px' }}
              >
                <div className="pb-2 flex justify-center h-full">
                  <div
                    onClick={() => openPopup(industry.id)}
                    onMouseEnter={() => {
                      const img = new Image();
                      img.src = `/main/popups/${industry.id}.${industry.id === 'manufacturing' ? 'png' : (industry.id === 'education' || industry.id === 'medical' || industry.id === 'engineering' ? 'webp' : 'jpg')}`;
                    }}
                    className={`flex flex-col items-center justify-center bg-white text-gray-800 border border-gray-200 shadow-md rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ 
                      aspectRatio: '1/1',
                      width: '100%',
                      minWidth: '120px',
                      maxWidth: '150px',
                      transition: 'min-width 0.3s, max-width 0.3s',
                      margin: '0 auto',
                    }}
                  >
                    <div className="flex flex-col items-center justify-center h-full w-full">
                      <div className="w-16 h-16 mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <img 
                          src={getIconUrl(industry.iconPath)} 
                          alt={`${industry.title} icon`} 
                          className="w-full h-full object-contain transition-all duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://placehold.co/200x200/333/white?text=${industry.title}`;
                          }}
                        />
                      </div>
                      <h3 className="text-center text-base font-semibold transition-all duration-300 group-hover:text-brand-yellow mt-1">{industry.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Right Arrow */}
          {canScrollRight && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full shadow p-1.5"
              style={{ marginRight: 2 }}
              onClick={() => scrollByAmount(140)}
              aria-label="Scroll right"
            >
              <ChevronRight size={22} className="text-gray-700" />
            </button>
          )}
        </div>

        {/* Tablet/Desktop grid layout */}
        <div className="hidden md:grid grid-cols-8 gap-4 max-w-[1200px] mx-auto items-center justify-center">
          {industries.map((industry, index) => (
            <div key={industry.id} className="flex justify-center items-center">
              {renderIndustryCard(industry, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Industry Popup */}
      {activeIndustry && activeIndustryData && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={closePopup}
        >
          <div 
            className="bg-white w-full max-w-3xl rounded-md flex flex-col shadow-xl overflow-hidden"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white z-10 flex justify-between items-center border-b p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mr-3">
                  <img 
                    src={getIconUrl(activeIndustryData.iconPath)} 
                    alt={`${activeIndustryData.title} icon`} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/200x200/333/white?text=${activeIndustryData.title}`;
                    }}
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{activeIndustryData.title}</h3>
              </div>
              <button 
                onClick={closePopup}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 flex-grow overflow-y-auto p-4" style={{ maxHeight: '80vh' }}>
              <div className="md:w-1/2 space-y-6">
                <p className="text-base">{activeIndustryData.description}</p>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Capabilities</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {activeIndustryData.capabilities.map((capability, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 mr-2 text-brand-yellow flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {activeIndustryData.caseStudies.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Case Studies</h4>
                    <div className="space-y-3">
                      {activeIndustryData.caseStudies.map((caseStudy, index) => (
                        <div key={index} className="border p-3 rounded-md">
                          <h5 className="font-medium mb-1">{caseStudy.title}</h5>
                          <p className="text-gray-700 text-sm">{caseStudy.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Industry showcase image */}
              <div className="md:w-1/2 rounded-md overflow-hidden h-auto flex items-center justify-center">
                <img 
                  src={`/main/popups/${activeIndustryData.id}.${activeIndustryData.id === 'manufacturing' ? 'png' : (activeIndustryData.id === 'education' || activeIndustryData.id === 'medical' || activeIndustryData.id === 'engineering' ? 'webp' : 'jpg')}`}
                  alt={`${activeIndustryData.title} showcase`}
                  className="w-full h-full object-contain max-h-48"
                  style={{ aspectRatio: '16/9' }}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/800x450/333/white?text=${activeIndustryData.title}`;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
