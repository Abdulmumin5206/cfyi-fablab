import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { ArrowLeft, ArrowRight, Info, ChevronDown, ChevronUp } from "lucide-react";
import styles from "@/styles/Slider.module.css";
import "@/styles/Carousel.css"; // Import the carousel CSS
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import SEOHelmet from "@/components/SEOHelmet";

interface Features {
  capabilities: string[];
}

const MouldPage = () => {
  const { t, i18n } = useTranslation('mould');
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const marketsRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  
  // Image comparison slider references and state
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderKnobRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Define JSON-LD schema for Mould page
  const mouldSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Molding & Production Services",
    "provider": {
      "@type": "Organization",
      "name": "FabLab CFYI",
      "url": "https://fablab-cfyi.uz"
    },
    "serviceType": "Manufacturing",
    "description": "Professional molding and production services including injection molding, silicone molding, and mass production capabilities for industrial applications.",
    "offers": {
      "@type": "Offer",
      "description": "Injection molding, silicone molding, production services"
    }
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    console.log("Mould page mounted");
  }, []);

  useEffect(() => {
    // Force reload translations if they're not loaded
    if (!i18n.hasResourceBundle(i18n.language, 'mould')) {
      i18n.reloadResources();
    }
  }, [i18n]);

  // Initialize image comparison slider
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const newPosition = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
        const clampedPosition = Math.max(0, Math.min(100, newPosition));
        setSliderPosition(clampedPosition);
      }
    };
    
    const handleTouchStart = () => {
      setIsDragging(true);
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && sliderRef.current) {
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const newPosition = ((e.touches[0].clientX - sliderRect.left) / sliderRect.width) * 100;
        const clampedPosition = Math.max(0, Math.min(100, newPosition));
        setSliderPosition(clampedPosition);
      }
    };
    
    // Add event listeners
    if (sliderKnobRef.current) {
      sliderKnobRef.current.addEventListener('mousedown', handleMouseDown);
      sliderKnobRef.current.addEventListener('touchstart', handleTouchStart);
    }
    
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      // Remove event listeners on cleanup
      if (sliderKnobRef.current) {
        sliderKnobRef.current.removeEventListener('mousedown', handleMouseDown);
        sliderKnobRef.current.removeEventListener('touchstart', handleTouchStart);
      }
      
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Video failed to load", e);
    console.log("Video source path:", videoRef.current?.querySelector('source')?.getAttribute('src'));
    setIsVideoLoading(false);
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setIsVideoLoading(false);
  };

  const scrollMarketLeft = () => {
    if (marketsRef.current) {
      marketsRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollMarketRight = () => {
    if (marketsRef.current) {
      marketsRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleMaterialsClick = () => {
    navigate('/3d-printing');
    // Wait for the page to load before scrolling
    setTimeout(() => {
      const materialsSection = document.getElementById('materials-section');
      if (materialsSection) {
        materialsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
      <SEOHelmet
        title="Molding & Production Services"
        description="Professional molding and production services in Uzbekistan. Injection molding, silicone molding, and mass production capabilities for industrial applications."
        keywords="литье пластмасс Ташкент, plastmassa quyish Toshkent, силиконовое литье, silikon quyish, производство деталей Узбекистан, detal ishlab chiqarish, промышленное литье, sanoat quyish, массовое производство, ommaviy ishlab chiqarish, изготовление форм, qolip tayyorlash"
        image="/mould/hero.webp"
        schema={mouldSchema}
        canonicalPath="/mould"
      />
      <Header />
      
      <main className="flex-grow bg-[#f5f5f7]">
        {/* Hero section */}
        <section className="relative w-full h-screen">
          {isVideoLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
              <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
          >
            <source src="/mould/clearcast_loop_240903_720p_1mbps_h264.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1350px]">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-['Magistral']">
                  {t('hero.title')}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 font-['Magistral']">
                  {t('hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://t.me/+998770884977"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-[#329db7] text-white px-6 py-3 text-base sm:text-lg font-medium hover:bg-[#2b86a0] transition-colors duration-300"
                  >
                    <span>{t('hero.buttons.consultation')}</span>
                    <ArrowRight size={20} />
                  </a>
                  <button 
                    onClick={handleMaterialsClick}
                    className="inline-flex items-center space-x-2 bg-transparent text-white px-6 py-3 text-base sm:text-lg font-medium border border-white hover:bg-white/10 transition-colors duration-300"
                  >
                    <span>{t('hero.buttons.materials')}</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Down Icon */}
          <div className="absolute bottom-8 left-0 right-0 z-20 animate-bounce flex justify-center">
            <a href="#premium-quality" className="flex flex-col items-center text-white">
              <span className="mb-2 text-sm sm:text-base">{t('hero.scrollDown')}</span>
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </a>
          </div>
        </section>
        
        {/* Our Professions Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
            <div className="text-left mb-16">
              <div className="flex items-baseline gap-2 mb-4 justify-center sm:justify-start">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t('professions.title')}
                </GradientText>
                <span className="hidden sm:block text-black text-lg sm:text-xl lg:text-2xl font-['Magistral'] ml-2">
                  {t('professions.subtitle')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Engineering */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/mould/popups/engineering.webp" 
                    alt={t('professions.categories.engineering.title')} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">{t('professions.categories.engineering.title')}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{t('professions.categories.engineering.description')}</p>
                  <ul className="mt-1 space-y-1">
                    {(t('industries.engineering.capabilities', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-xs sm:text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Textile */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/mould/popups/textile.webp" 
                    alt={t('professions.categories.textile.title')} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">{t('professions.categories.textile.title')}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{t('professions.categories.textile.description')}</p>
                  <ul className="mt-1 space-y-1">
                    {(t('industries.textile.capabilities', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-xs sm:text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Medical */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/mould/popups/medical.webp" 
                    alt={t('professions.categories.medical.title')} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">{t('professions.categories.medical.title')}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{t('professions.categories.medical.description')}</p>
                  <ul className="mt-1 space-y-1">
                    {(t('industries.medical.capabilities', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-xs sm:text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Furniture */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/mould/popups/furniture.webp" 
                    alt={t('professions.categories.furniture.title')} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">{t('professions.categories.furniture.title')}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{t('professions.categories.furniture.description')}</p>
                  <ul className="mt-1 space-y-1">
                    {(t('industries.furniture.capabilities', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-xs sm:text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Automotive */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/mould/popups/automotive.jpg" 
                    alt={t('professions.categories.automotive.title')} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">{t('professions.categories.automotive.title')}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{t('professions.categories.automotive.description')}</p>
                  <ul className="mt-1 space-y-1">
                    {(t('industries.automotive.capabilities', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-xs sm:text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/mould/popups/education.webp" 
                    alt={t('professions.categories.education.title')} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">{t('professions.categories.education.title')}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{t('professions.categories.education.description')}</p>
                  <ul className="mt-1 space-y-1">
                    {(t('industries.education.capabilities', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-xs sm:text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Manufacturing */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/mould/popups/manufacturing.png" 
                    alt={t('professions.categories.manufacturing.title')} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">{t('professions.categories.manufacturing.title')}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{t('professions.categories.manufacturing.description')}</p>
                  <ul className="mt-1 space-y-1">
                    {(t('industries.manufacturing.capabilities', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-xs sm:text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Jewelry */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/mould/popups/jewelry.jpg" 
                    alt={t('professions.categories.jewelry.title')} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">{t('professions.categories.jewelry.title')}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{t('professions.categories.jewelry.description')}</p>
                  <ul className="mt-1 space-y-1">
                    {(t('industries.jewelry.capabilities', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-xs sm:text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-[#329db7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Premium Quality Section */}
        <section id="premium-quality" className="bg-[#f5f5f7] py-8 sm:py-12 md:py-16 lg:py-20 overflow-visible">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="mx-auto text-left lg:text-left flex flex-col items-start lg:items-start">
                  <div className="mb-8">
                    <GradientText
                      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                      animationSpeed={4}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                    >
                      {t('precisionMoulding.title')}
                    </GradientText>
                  </div>
                  
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-8 font-['Magistral']">
                    {t('precisionMoulding.description')}
                  </p>

                  <a 
                    href="https://t.me/+998770884977"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {t('precisionMoulding.requestQuote')}
                  </a>
                </div>
              </div>

              {/* Right side with two image containers */}
              <div className="w-full lg:w-1/2 relative pt-16">
                {/* First image container - larger and in front */}
                <div className="relative z-30 w-[55%] ml-auto transform translate-y-2 transition-transform hover:-translate-y-1">
                  <div className="aspect-[5/6] relative overflow-hidden shadow-2xl rounded-xl bg-white hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-300">
                    <img 
                      src="/mould/imhero.webp" 
                      alt="Professional Moulding Equipment" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Second image container - smaller and behind */}
                <div className="absolute top-4 left-0 w-[50%] z-10 transition-transform hover:-translate-y-1">
                  <div className="aspect-[7/8] relative overflow-hidden shadow-xl rounded-xl bg-white hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-300">
                    <img 
                      src="/mould/imhero2.webp" 
                      alt="Moulding Solutions" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Plastic Moulding Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f5f7]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t('whyChoosePlasticMoulding.title')}
                </GradientText>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-8">
              {/* Benefit 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                  <img src="/mould/lower_costs.webp" alt={t('whyChoosePlasticMoulding.benefits.lowerCosts.title')} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 font-['Magistral']">
                  {t('whyChoosePlasticMoulding.benefits.lowerCosts.title')}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 font-['Magistral']">
                  {t('whyChoosePlasticMoulding.benefits.lowerCosts.description')}
                </p>
              </div>
              
              {/* Benefit 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                  <img src="/mould/faster_time.webp" alt={t('whyChoosePlasticMoulding.benefits.fasterTime.title')} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 font-['Magistral']">
                  {t('whyChoosePlasticMoulding.benefits.fasterTime.title')}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 font-['Magistral']">
                  {t('whyChoosePlasticMoulding.benefits.fasterTime.description')}
                </p>
              </div>
              
              {/* Benefit 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                  <img src="/mould/clean_workflow.webp" alt={t('whyChoosePlasticMoulding.benefits.designFreedom.title')} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 font-['Magistral']">
                  {t('whyChoosePlasticMoulding.benefits.designFreedom.title')}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 font-['Magistral']">
                  {t('whyChoosePlasticMoulding.benefits.designFreedom.description')}
                </p>
              </div>
            </div>

            {/* Video Section */}
            <div className="mb-12">
              <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                <video
                  className="w-full aspect-video object-cover"
                  autoPlay
                  muted
                  playsInline
                >
                  <source 
                    src="/mould/im21_multiplus_webheader-compressed.mp4" 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 hidden md:block">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {t('whyChoosePlasticMoulding.video.title')}
                  </h3>
                  <p className="text-white/90 text-lg">
                    {t('whyChoosePlasticMoulding.video.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Formlabs Solutions */}
            <div className="mt-12">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6">
                {t('whyChoosePlasticMoulding.formlabsSolutions.title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Case Study 1 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                  <div className="md:w-2/5 h-40 sm:h-48 md:h-auto overflow-hidden">
                    <img 
                      src="/mould/Screenshot_7.jpg" 
                      alt={t('whyChoosePlasticMoulding.formlabsSolutions.caseStudy1.title')}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-4 sm:p-6">
                    <div className="text-[#329db7] text-xs sm:text-sm font-semibold mb-2">
                      {t('whyChoosePlasticMoulding.formlabsSolutions.caseStudy1.category')}
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">
                      {t('whyChoosePlasticMoulding.formlabsSolutions.caseStudy1.title')}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4">
                      {t('whyChoosePlasticMoulding.formlabsSolutions.caseStudy1.description')}
                    </p>
                    <a href="https://formlabs.com/global/blog/low-volume-injection-molding/" target="_blank" rel="noopener noreferrer" className="text-[#329db7] flex items-center gap-2 font-medium hover:text-[#2b86a0] transition-colors text-sm sm:text-base">
                      {t('whyChoosePlasticMoulding.formlabsSolutions.caseStudy1.learnMore')}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Case Study 2 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                  <div className="md:w-2/5 h-40 sm:h-48 md:h-auto overflow-hidden">
                    <img 
                      src="/mould/optimized_for_web_jpeg-07202023_rigid_10k_sample_card_2_189d-sh-standard-square.webp" 
                      alt={t('whyChoosePlasticMoulding.formlabsSolutions.caseStudy2.title')}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-4 sm:p-6">
                    <div className="text-[#329db7] text-xs sm:text-sm font-semibold mb-2">
                      {t('whyChoosePlasticMoulding.formlabsSolutions.caseStudy2.category')}
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">
                      {t('whyChoosePlasticMoulding.formlabsSolutions.caseStudy2.title')}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4">
                      {t('whyChoosePlasticMoulding.formlabsSolutions.caseStudy2.description')}
                    </p>
                    <a href="https://formlabs.com/global/applications/injection-molding/" target="_blank" rel="noopener noreferrer" className="text-[#329db7] flex items-center gap-2 font-medium hover:text-[#2b86a0] transition-colors text-sm sm:text-base">
                      {t('whyChoosePlasticMoulding.formlabsSolutions.caseStudy2.learnMore')}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Spare Parts Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f5f7] text-gray-900">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-10">
                <div className="mb-6">
                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={4}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                  >
                    {t('spareParts.title')}
                  </GradientText>
                </div>
                <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-6 font-['Magistral']">
                  {t('spareParts.description')}
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg font-['Magistral']">
                      {t('spareParts.features.replication')}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg font-['Magistral']">
                      {t('spareParts.features.customParts')}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg font-['Magistral']">
                      {t('spareParts.features.rapidPrototyping')}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://t.me/+998770884977"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-[#329db7] text-white font-medium rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {t('spareParts.cta')}
                  </a>
                </div>
              </div>
              
              {/* Right side image */}
              <div className="w-full lg:w-1/2">
                <div className="relative w-full">
                  <img
                    src="/mould/spare1.webp"
                    alt="Spare Parts and Custom Components"
                    className="w-full aspect-[4/3] object-cover h-auto max-h-[650px] rounded-md shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f5f7] text-gray-900">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
            <div className="text-left mb-8">
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t('sparePartProjects.title')}
                </GradientText>
                <span className="hidden sm:block text-black text-lg sm:text-xl lg:text-2xl font-['Magistral'] ml-2">
                  {t('sparePartProjects.subtitle')}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Blog Post */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/blog_images/blog1.webp" 
                    alt={t('sparePartProjects.blogPost.imageAlt')} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="text-[#329db7] text-xs sm:text-sm font-semibold mb-2 font-['Magistral']">{t('sparePartProjects.blogPost.category')}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4 font-['Magistral']">{t('sparePartProjects.blogPost.title')}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 font-['Magistral']">{t('sparePartProjects.blogPost.description')}</p>
                  <a href="/projects/3d-printing-innovations" className="text-[#329db7] flex items-center gap-2 font-medium hover:text-[#2b86a0] transition-colors font-['Magistral']">
                    {t('sparePartProjects.blogPost.readMore')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f5f7]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex justify-center">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={4}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Magistral']"
                >
                  {t('faq.title')}
                </GradientText>
              </div>
            </div>
            <div className="max-w-2xl mx-auto space-y-4">
              {/* FAQ Item 1 */}
              <div 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                onClick={() => setExpandedFaq(expandedFaq === 0 ? null : 0)}
              >
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold">{t('faq.questions.spareParts.question')}</h3>
                  {expandedFaq === 0 ? (
                    <ChevronUp className="w-6 h-6 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0" />
                  )}
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedFaq === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{t('faq.questions.spareParts.answer')}</p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
              >
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold">{t('faq.questions.slaComparison.question')}</h3>
                  {expandedFaq === 1 ? (
                    <ChevronUp className="w-6 h-6 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0" />
                  )}
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedFaq === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{t('faq.questions.slaComparison.answer')}</p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
              >
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold">{t('faq.questions.productionTime.question')}</h3>
                  {expandedFaq === 2 ? (
                    <ChevronUp className="w-6 h-6 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0" />
                  )}
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedFaq === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{t('faq.questions.productionTime.answer')}</p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
              >
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold">{t('faq.questions.limitations.question')}</h3>
                  {expandedFaq === 3 ? (
                    <ChevronUp className="w-6 h-6 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0" />
                  )}
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedFaq === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{t('faq.questions.limitations.answer')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MouldPage; 