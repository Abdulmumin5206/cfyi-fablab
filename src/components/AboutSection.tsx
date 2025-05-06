import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

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
      id: "manufacturing",
      title: "Manufacturing",
      iconPath: "/main/manufacturingsvg.webp",
      description: "Manufacturing solutions for production needs, from jigs and fixtures to end-use components.",
      capabilities: ["Production tooling", "Assembly fixtures", "Custom components", "Short-run production"],
      caseStudies: [
        {
          title: "Custom Manufacturing Fixtures",
          description: "Specialized fixtures that improve production efficiency and quality control."
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
      id: "dental",
      title: "Dental",
      iconPath: "/main/dentalsvg.webp",
      description: "Advanced dental solutions for practitioners and laboratories, from surgical guides to custom prosthetics.",
      capabilities: ["Surgical guides", "Dental models", "Custom prosthetics", "Implant components"],
      caseStudies: [
        {
          title: "Custom Dental Implants",
          description: "Precision-engineered implants tailored to patient anatomy for improved comfort and results."
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
      className={`bg-white text-gray-800 p-6 rounded-sm shadow-sm cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
      style={{ 
        transitionDelay: `${index * 75}ms`,
        aspectRatio: '1/1',
        width: '100%', 
        minWidth: '200px',
        maxWidth: '260px'
      }}
    >
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-36 h-36 md:w-28 md:h-28 mb-5 flex items-center justify-center">
          <img 
            src={getIconUrl(industry.iconPath)} 
            alt={`${industry.title} icon`} 
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://placehold.co/200x200/333/white?text=${industry.title}`;
            }}
          />
        </div>
        <h3 className="text-center text-xl font-medium">{industry.title}</h3>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-brand-gray overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px] relative z-10">
        <div className="mb-10 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('about.title')}
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
            {t('about.subtitle', 'Discover how our services support various industries with specialized solutions')}
          </p>
        </div>

        {/* Mobile scrollable layout */}
        <div className="md:hidden">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide" 
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none' 
            }}
          >
            {industries.map((industry, index) => (
              <div 
                key={industry.id} 
                className="flex-none w-[90%] snap-start mr-4"
                style={{ minWidth: '260px' }}
              >
                <div className="pb-2 flex justify-center">
                  {renderIndustryCard(industry, index)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet/Desktop grid layout */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 max-w-[1600px] mx-auto">
          {industries.map((industry, index) => (
            <div key={industry.id} className="flex justify-center">
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
            className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b p-4 sm:p-6">
              <div className="flex items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mr-3 sm:mr-4">
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
                <h3 className="text-xl sm:text-3xl font-bold">{activeIndustryData.title}</h3>
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

            <div className="p-4 sm:p-8">
              <p className="text-base sm:text-xl mb-8">{activeIndustryData.description}</p>
              
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4">Capabilities</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeIndustryData.capabilities.map((capability, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 mr-3 text-brand-yellow flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeIndustryData.caseStudies.length > 0 && (
                <div>
                  <h4 className="text-xl font-semibold mb-4">Case Studies</h4>
                  <div className="space-y-4">
                    {activeIndustryData.caseStudies.map((caseStudy, index) => (
                      <div key={index} className="border p-5 rounded-md">
                        <h5 className="font-medium text-lg mb-2">{caseStudy.title}</h5>
                        <p className="text-gray-700">{caseStudy.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 flex justify-center">
                <button className="px-8 py-3 bg-brand-yellow text-black font-medium text-lg rounded-md hover:bg-opacity-90 transition-colors">
                  Contact Us About {activeIndustryData.title} Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
