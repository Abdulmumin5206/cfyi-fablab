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
      className={`bg-white text-gray-800 p-6 rounded-sm shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group ${
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
        <div className="w-36 h-36 md:w-28 md:h-28 mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
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
        <h3 className="text-center text-xl font-medium transition-all duration-300 group-hover:text-brand-yellow">{industry.title}</h3>
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

        {/* Mobile scrollable layout with visual indicators */}
        <div className="md:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide pl-4" 
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none' 
            }}
          >
            {industries.map((industry, index) => (
              <div 
                key={industry.id} 
                className="flex-none w-[75%] snap-start mr-4"
                style={{ minWidth: '240px' }}
              >
                <div className="pb-2 flex justify-center">
                  {renderIndustryCard(industry, index)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Visual indicator for scrolling */}
          <div className="absolute right-0 top-0 bottom-8 w-20 bg-gradient-to-l from-brand-gray to-transparent pointer-events-none"></div>
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
            className="bg-white w-full max-w-5xl rounded-md flex flex-col"
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

            <div className="flex flex-col md:flex-row p-4 gap-6 flex-grow">
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
              <div className="md:w-1/2 rounded-md overflow-hidden h-auto">
                <img 
                  src={`/main/popups/${activeIndustryData.id}.${activeIndustryData.id === 'manufacturing' ? 'png' : (activeIndustryData.id === 'education' || activeIndustryData.id === 'medical' || activeIndustryData.id === 'engineering' ? 'webp' : 'jpg')}`}
                  alt={`${activeIndustryData.title} showcase`}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '16/9' }}
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
