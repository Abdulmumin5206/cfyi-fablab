import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IndustryCategory {
  id: string;
  titleKey: string;
  iconPath: string;
  descriptionKey: string;
  capabilitiesKey: string;
  caseStudiesKey: string;
}

interface CaseStudy {
  title: string;
  description: string;
}

const AboutSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isSingleLine, setIsSingleLine] = useState(false);

  // Function to handle contact button click
  const handleContactClick = (industryId: string) => {
    // Close popup
    closePopup();
    
    // Find the contact section element
    const contactSection = document.getElementById('contact-section');
    
    // If found, scroll to it
    if (contactSection) {
      // Add industry to URL query parameters
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('inquiry', `${t(`industries.${industryId}.title`)} Projects`);
      
      // Update URL without reloading page
      const newUrl = `${window.location.pathname}?${searchParams.toString()}${window.location.hash}`;
      window.history.pushState({ path: newUrl }, '', newUrl);

      // Scroll to contact section after a short delay to ensure URL is updated
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // If contact section not found on current page, navigate to contact page with query parameter
      window.location.href = '/#contact-section?inquiry=' + encodeURIComponent(`${t(`industries.${industryId}.title`)} Projects`);
    }
  };

  const industries: IndustryCategory[] = [
    {
      id: "engineering",
      titleKey: "industries.engineering.title",
      iconPath: "/main/engineeringsvg.webp",
      descriptionKey: "industries.engineering.description",
      capabilitiesKey: "industries.engineering.capabilities",
      caseStudiesKey: "industries.engineering.caseStudies"
    },
    {
      id: "textile",
      titleKey: "industries.textile.title",
      iconPath: "/main/textilesvg.png",
      descriptionKey: "industries.textile.description",
      capabilitiesKey: "industries.textile.capabilities",
      caseStudiesKey: "industries.textile.caseStudies"
    },
    {
      id: "medical",
      titleKey: "industries.medical.title",
      iconPath: "/main/medicalsvg.webp",
      descriptionKey: "industries.medical.description",
      capabilitiesKey: "industries.medical.capabilities",
      caseStudiesKey: "industries.medical.caseStudies"
    },
    {
      id: "furniture",
      titleKey: "industries.furniture.title",
      iconPath: "/main/furnituresvg.png",
      descriptionKey: "industries.furniture.description",
      capabilitiesKey: "industries.furniture.capabilities",
      caseStudiesKey: "industries.furniture.caseStudies"
    },
    {
      id: "automotive",
      titleKey: "industries.automotive.title",
      iconPath: "/main/automotivesvg.webp",
      descriptionKey: "industries.automotive.description",
      capabilitiesKey: "industries.automotive.capabilities",
      caseStudiesKey: "industries.automotive.caseStudies"
    },
    {
      id: "education",
      titleKey: "industries.education.title",
      iconPath: "/main/educationsvg.webp",
      descriptionKey: "industries.education.description",
      capabilitiesKey: "industries.education.capabilities",
      caseStudiesKey: "industries.education.caseStudies"
    },
    {
      id: "manufacturing",
      titleKey: "industries.manufacturing.title",
      iconPath: "/main/manufacturingsvg.webp",
      descriptionKey: "industries.manufacturing.description",
      capabilitiesKey: "industries.manufacturing.capabilities",
      caseStudiesKey: "industries.manufacturing.caseStudies"
    },
    {
      id: "jewelry",
      titleKey: "industries.jewelry.title",
      iconPath: "/main/jewelrysvg.webp",
      descriptionKey: "industries.jewelry.description",
      capabilitiesKey: "industries.jewelry.capabilities",
      caseStudiesKey: "industries.jewelry.caseStudies"
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
    
    const checkLayout = () => {
      setIsSingleLine(checkIfItemsFitInOneLine());
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      checkLayout();
      
      window.addEventListener('resize', checkLayout);
    }
    
    return () => {
      if (container) container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkLayout);
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

  // Helper function to get capabilities array from translations
  const getCapabilities = (key: string): string[] => {
    const capabilities = t(key, { returnObjects: true });
    return Array.isArray(capabilities) ? capabilities : [];
  };

  // Helper function to get case studies array from translations
  const getCaseStudies = (key: string): CaseStudy[] => {
    const caseStudies = t(key, { returnObjects: true });
    return Array.isArray(caseStudies) ? caseStudies : [];
  };

  // Update the checkIfItemsFitInOneLine function to be more precise
  const checkIfItemsFitInOneLine = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      // Calculate if 8 items of 160px each (including gap) can fit
      const totalWidthNeeded = (160 + 16) * 8; // 160px card + 16px gap
      return totalWidthNeeded <= containerWidth;
    }
    return false;
  };

  const renderIndustryCard = (industry: IndustryCategory, index: number) => (
    <div
      onClick={() => openPopup(industry.id)}
      onMouseEnter={() => {
        const img = new Image();
        img.src = `/main/popups/${industry.id}.${industry.id === 'manufacturing' ? 'png' : (industry.id === 'education' || industry.id === 'medical' || industry.id === 'engineering' ? 'webp' : 'jpg')}`;
      }}
      className={`flex flex-col items-center justify-center bg-white text-gray-800 border border-gray-200 shadow-md rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
      style={{ 
        aspectRatio: '1/1', 
        width: '100%', 
        minWidth: '150px',
        maxWidth: '160px',
        transitionDelay: `${index * 100}ms`,
        margin: '0 auto'
      }}
    >
      <div className="w-28 h-28 mb-3 flex items-center justify-center p-2">
        <img 
          src={getIconUrl(industry.iconPath)} 
          alt={`${t(industry.titleKey)} icon`} 
          className="w-full h-full object-contain transition-all duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/200x200/333/white?text=${t(industry.titleKey)}`;
          }}
        />
      </div>
      <h3 className="text-center text-sm font-semibold transition-all duration-300 px-4">{t(industry.titleKey)}</h3>
    </div>
  );

  return (
    <section 
      ref={sectionRef} 
      id="about-section" 
      className="py-16 sm:py-20 bg-white"
      aria-label="About Section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {t('industries.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            {t('industries.subtitle')}
          </p>
        </div>

        {/* Mobile scrollable layout with visual indicators and arrows */}
        <div className="md:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide pl-4 gap-2 items-stretch" 
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none' 
            }}
          >
            {industries.map((industry, index) => (
              <div 
                key={industry.id} 
                className="flex-none snap-start"
                style={{ minWidth: '170px', maxWidth: '190px', marginRight: index === industries.length - 1 ? 0 : '8px' }}
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
                      minWidth: '150px',
                      maxWidth: '170px',
                      transition: 'min-width 0.3s, max-width 0.3s',
                      margin: '0 auto',
                    }}
                  >
                    <div className="w-28 h-28 mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <img 
                        src={getIconUrl(industry.iconPath)} 
                        alt={`${t(industry.titleKey)} icon`} 
                        className="w-full h-full object-contain transition-all duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://placehold.co/200x200/333/white?text=${t(industry.titleKey)}`;
                        }}
                      />
                    </div>
                    <h3 className="text-center text-sm font-semibold transition-all duration-300 group-hover:text-brand-yellow mt-1 px-2">{t(industry.titleKey)}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet/Desktop layout */}
        <div className="relative hidden md:block">
          {/* Left Arrow - only show in single line mode */}
          {isSingleLine && canScrollLeft && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full shadow p-1.5 transition-all duration-300 hover:scale-110"
              style={{ marginLeft: -10 }}
              onClick={() => scrollByAmount(-160)}
              aria-label="Scroll left"
            >
              <ChevronLeft size={22} className="text-gray-700" />
            </button>
          )}
          
          <div 
            ref={scrollContainerRef}
            className={`${isSingleLine ? 'flex overflow-x-auto' : 'grid grid-cols-4'} gap-4 max-w-[1600px] mx-auto items-center justify-center`}
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              ...(isSingleLine && {
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              })
            }}
          >
            {industries.map((industry, index) => (
              <div 
                key={industry.id} 
                className={`flex justify-center items-center ${isSingleLine ? 'flex-none snap-start' : ''}`}
                style={isSingleLine ? { marginRight: index === industries.length - 1 ? 0 : '16px' } : {}}
              >
                {renderIndustryCard(industry, index)}
              </div>
            ))}
          </div>

          {/* Right Arrow - only show in single line mode */}
          {isSingleLine && canScrollRight && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full shadow p-1.5 transition-all duration-300 hover:scale-110"
              style={{ marginRight: -10 }}
              onClick={() => scrollByAmount(160)}
              aria-label="Scroll right"
            >
              <ChevronRight size={22} className="text-gray-700" />
            </button>
          )}
        </div>
      </div>

      {/* Industry Popup */}
      {activeIndustry && activeIndustryData && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={closePopup}
        >
          <div 
            className="bg-white w-full max-w-[95vw] md:max-w-2xl lg:max-w-4xl xl:max-w-[80vw] rounded-md flex flex-col shadow-xl overflow-hidden"
            style={{ maxHeight: '98vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white z-10 flex justify-between items-center border-b p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mr-3">
                  <img 
                    src={getIconUrl(activeIndustryData.iconPath)} 
                    alt={`${t(activeIndustryData.titleKey)} icon`} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/200x200/333/white?text=${t(activeIndustryData.titleKey)}`;
                    }}
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{t(activeIndustryData.titleKey)}</h3>
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

            <div className="flex flex-col md:flex-row gap-6 flex-grow p-4 min-h-[60vh] md:h-[70vh] overflow-y-auto overflow-x-hidden max-h-[70vh]">
              <div className="md:w-1/2 h-full space-y-6 flex-shrink-0">
                <p className="text-base">{t(activeIndustryData.descriptionKey)}</p>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{t('industries.capabilities')}</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {getCapabilities(activeIndustryData.capabilitiesKey).map((capability, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 mr-2 text-brand-yellow flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{t('industries.caseStudies')}</h4>
                  <div className="space-y-3">
                    {getCaseStudies(activeIndustryData.caseStudiesKey).map((caseStudy, index) => (
                      <div key={index} className="border p-3 rounded-md">
                        <h5 className="font-medium mb-1">{caseStudy.title}</h5>
                        <p className="text-gray-700 text-sm">{caseStudy.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Industry showcase image */}
              <div className="md:w-1/2 w-full h-full flex p-0 m-0 items-stretch flex-shrink-0 md:p-6">
                <img 
                  src={`/main/popups/${activeIndustryData.id}.${activeIndustryData.id === 'manufacturing' ? 'png' : (activeIndustryData.id === 'education' || activeIndustryData.id === 'medical' || activeIndustryData.id === 'engineering' || activeIndustryData.id === 'furniture' ? 'webp' : 'jpg')}`}
                  alt={`${t(activeIndustryData.titleKey)} showcase`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/800x450/333/white?text=${t(activeIndustryData.titleKey)}`;
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
