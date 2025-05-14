import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Info, ChevronDown, ChevronUp } from "lucide-react";
import styles from "@/styles/Slider.module.css";
import "@/styles/Carousel.css"; // Import the carousel CSS
import { useTranslation } from "react-i18next";

const MouldPage = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const marketsRef = useRef<HTMLDivElement>(null);
  const equipmentContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const equipmentItems = 5; // Total number of equipment items
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const animationRef = useRef<number | null>(null);
  
  // Image comparison slider references and state
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderKnobRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // Start in the middle
  const [isDragging, setIsDragging] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0); // First FAQ item expanded by default

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = t('header.mould') + " | FabLab";
    
    console.log("Mould page mounted");
  }, [t]);

  // Add CSS animation control for the equipment carousel
  useEffect(() => {
    if (!equipmentContainerRef.current) return;
    
    const container = equipmentContainerRef.current;
    
    if (isPaused) {
      container.style.animationPlayState = 'paused';
    } else {
      container.style.animationPlayState = 'running';
    }
  }, [isPaused]);

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
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with Full-Width Video */}
        <section className="relative w-full h-screen">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
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
              <source 
                src="/video/clearcast_loop_240903_720p_1mbps_h264.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-16 sm:mt-20 md:mt-24">
              <div className="max-w-2xl">
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium mb-2 sm:mb-4">{t('mould.hero.subtitle')}</div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-2 sm:mb-4 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl">{t('mould.hero.title')}</h1>
                
                <div className="space-y-4 text-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl">{t('mould.hero.features.costEffective')}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl">{t('mould.hero.features.highPrecision')}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl">{t('mould.hero.features.specialized')}</p>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-flex items-center space-x-1 sm:space-x-2 bg-white text-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors duration-300">
                    <span>{t('mould.hero.buttons.consultation')}</span>
                    <ArrowRight size={16} />
                  </a>
                  <a href="/3d-printing#materials" className="inline-flex items-center space-x-1 sm:space-x-2 bg-transparent text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-medium border border-white hover:bg-white/10 transition-colors duration-300">
                    <span>{t('mould.hero.buttons.materials')}</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <a href="#premium-quality" className="flex flex-col items-center text-white">
              <span className="mb-2">{t('mould.hero.scrollDown')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>
        
        {/* Premium Quality Section */}
        <section id="premium-quality" className="relative bg-white text-gray-900">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col lg:flex-row items-center">
            {/* Left side content */}
            <div className="w-full lg:w-1/2 mb-8 sm:mb-12 lg:mb-0 pr-0 lg:pr-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                {t('mould.premiumQuality.title')} <span className="text-gray-600">{t('mould.premiumQuality.subtitle')}</span>
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm">
                  <span>{t('mould.premiumQuality.materials.rigid')}</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm">
                  <span>{t('mould.premiumQuality.materials.flexible')}</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm">
                  <span>{t('mould.premiumQuality.materials.transparent')}</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm">
                  <span>{t('mould.premiumQuality.materials.foodSafe')}</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm">
                  <span>{t('mould.premiumQuality.materials.highTemp')}</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm">
                  <span>{t('mould.premiumQuality.materials.multiColor')}</span>
                </button>
              </div>
              
              <a href="https://t.me/your_telegram_handle" target="_blank" rel="noopener noreferrer" className="inline-block bg-gray-800 hover:bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium text-sm sm:text-base">
                REQUEST A CONSULTATION
              </a>
            </div>
            
            {/* Right side image */}
            <div className="w-full lg:w-3/4 lg:pl-8">
              <div className="relative w-full">
                <img 
                  src="/mould/imhero.webp" 
                  alt="Premium Moulding Materials" 
                  className="w-full aspect-[4/3] object-cover h-auto max-h-[500px] sm:max-h-[650px]"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Go Digital Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 md:mb-16 text-center">{t('mould.whyDigital.title')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              {/* Benefit 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 sm:mb-6 w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                  <img src="/mould/lower_costs.webp" alt={t('mould.whyDigital.benefits.lowerCosts.title')} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t('mould.whyDigital.benefits.lowerCosts.title')}</h3>
                <p className="text-sm sm:text-base text-gray-600">{t('mould.whyDigital.benefits.lowerCosts.description')}</p>
              </div>
              
              {/* Benefit 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 sm:mb-6 w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                  <img src="/mould/faster_time.webp" alt={t('mould.whyDigital.benefits.fasterTime.title')} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t('mould.whyDigital.benefits.fasterTime.title')}</h3>
                <p className="text-sm sm:text-base text-gray-600">{t('mould.whyDigital.benefits.fasterTime.description')}</p>
              </div>
              
              {/* Benefit 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 sm:mb-6 w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                  <img src="/mould/clean_workflow.webp" alt={t('mould.whyDigital.benefits.designFreedom.title')} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t('mould.whyDigital.benefits.designFreedom.title')}</h3>
                <p className="text-sm sm:text-base text-gray-600">{t('mould.whyDigital.benefits.designFreedom.description')}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Case Studies Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Moulding Applications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Case Study 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-2/5 h-40 sm:h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/mould/Screenshot_7.jpg" 
                    alt="Product Design Prototype" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-4 sm:p-6">
                  <div className="text-blue-600 text-xs sm:text-sm font-semibold mb-2">PRODUCT DESIGN</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Creating High-Fidelity Prototypes with Silicone Moulds</h3>
                  <a href="#" className="text-blue-600 flex items-center gap-2 font-medium hover:text-blue-800 transition-colors text-sm sm:text-base">
                    Learn More
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
                    alt="Architectural Model" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-4 sm:p-6">
                  <div className="text-blue-600 text-xs sm:text-sm font-semibold mb-2">ARCHITECTURE</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Architectural Elements Casting for Model Making and Restoration</h3>
                  <a href="#" className="text-blue-600 flex items-center gap-2 font-medium hover:text-blue-800 transition-colors text-sm sm:text-base">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Equipment for Moulding & Spare Parts Section */}
        <section className="py-16 md:py-24 bg-gray-900 text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-white text-center">{t('mould.equipment.title')}</h1>
              
              {/* Equipment slider - CSS animation version */}
              <div className="w-full max-w-5xl mx-auto carousel-container">
                <div className="relative">
                  <div className="overflow-hidden mb-6">
                    <div 
                      ref={equipmentContainerRef}
                      className="carousel-track" 
                    >
                      {/* Equipment 1 */}
                      <div 
                        className="equipment-item relative transform transition-all duration-300"
                        onMouseEnter={() => {
                          setIsPaused(true);
                          setHoveredItem(0);
                        }}
                        onMouseLeave={() => {
                          setIsPaused(false);
                          setHoveredItem(null);
                        }}
                        style={{
                          transform: hoveredItem === 0 ? 'scale(1.05)' : 'scale(1)',
                          zIndex: hoveredItem === 0 ? 10 : 1
                        }}
                      >
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200 h-full shadow-lg transition-shadow duration-300" 
                          style={{
                            boxShadow: hoveredItem === 0 ? '0 10px 25px rgba(0, 0, 0, 0.2)' : ''
                          }}
                        >
                          <div className="h-64 mb-4 flex items-center justify-center overflow-hidden">
                            <img src="/mould/Equipments/formlabs-form3-01_2_1.webp" alt={t('mould.equipment.items.form3.title')} 
                              className="h-full object-contain transition-transform duration-700" 
                              style={{
                                transform: hoveredItem === 0 ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0)'
                              }}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{t('mould.equipment.items.form3.title')}</h3>
                          <div 
                            className="overflow-hidden transition-all duration-500"
                            style={{
                              maxHeight: hoveredItem === 0 ? '100px' : '0',
                              opacity: hoveredItem === 0 ? 1 : 0
                            }}
                          >
                            <p className="text-gray-600 text-sm text-center">{t('mould.equipment.items.form3.description')}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Equipment 2 */}
                      <div 
                        className="equipment-item relative transform transition-all duration-300"
                        onMouseEnter={() => {
                          setIsPaused(true);
                          setHoveredItem(1);
                        }}
                        onMouseLeave={() => {
                          setIsPaused(false);
                          setHoveredItem(null);
                        }}
                        style={{
                          transform: hoveredItem === 1 ? 'scale(1.05)' : 'scale(1)',
                          zIndex: hoveredItem === 1 ? 10 : 1
                        }}
                      >
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200 h-full shadow-lg transition-shadow duration-300"
                          style={{
                            boxShadow: hoveredItem === 1 ? '0 10px 25px rgba(0, 0, 0, 0.2)' : ''
                          }}
                        >
                          <div className="h-64 mb-4 flex items-center justify-center overflow-hidden">
                            <img src="/mould/Equipments/Phrozen.webp" alt={t('mould.equipment.items.phrozenMega.title')} 
                              className="h-full object-contain transition-transform duration-700"
                              style={{
                                transform: hoveredItem === 1 ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0)'
                              }}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{t('mould.equipment.items.phrozenMega.title')}</h3>
                          <div 
                            className="overflow-hidden transition-all duration-500"
                            style={{
                              maxHeight: hoveredItem === 1 ? '100px' : '0',
                              opacity: hoveredItem === 1 ? 1 : 0
                            }}
                          >
                            <p className="text-gray-600 text-sm text-center">{t('mould.equipment.items.phrozenMega.description')}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Equipment 3 */}
                      <div 
                        className="equipment-item relative transform transition-all duration-300"
                        onMouseEnter={() => {
                          setIsPaused(true);
                          setHoveredItem(2);
                        }}
                        onMouseLeave={() => {
                          setIsPaused(false);
                          setHoveredItem(null);
                        }}
                        style={{
                          transform: hoveredItem === 2 ? 'scale(1.05)' : 'scale(1)',
                          zIndex: hoveredItem === 2 ? 10 : 1
                        }}
                      >
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200 h-full shadow-lg transition-shadow duration-300"
                          style={{
                            boxShadow: hoveredItem === 2 ? '0 10px 25px rgba(0, 0, 0, 0.2)' : ''
                          }}
                        >
                          <div className="h-64 mb-4 flex items-center justify-center overflow-hidden">
                            <img src="/mould/Equipments/Raise.webp" alt={t('mould.equipment.items.raise3d.title')} 
                              className="h-full object-contain transition-transform duration-700"
                              style={{
                                transform: hoveredItem === 2 ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0)'
                              }}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{t('mould.equipment.items.raise3d.title')}</h3>
                          <div 
                            className="overflow-hidden transition-all duration-500"
                            style={{
                              maxHeight: hoveredItem === 2 ? '100px' : '0',
                              opacity: hoveredItem === 2 ? 1 : 0
                            }}
                          >
                            <p className="text-gray-600 text-sm text-center">{t('mould.equipment.items.raise3d.description')}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Equipment 4 */}
                      <div 
                        className="equipment-item relative transform transition-all duration-300"
                        onMouseEnter={() => {
                          setIsPaused(true);
                          setHoveredItem(3);
                        }}
                        onMouseLeave={() => {
                          setIsPaused(false);
                          setHoveredItem(null);
                        }}
                        style={{
                          transform: hoveredItem === 3 ? 'scale(1.05)' : 'scale(1)',
                          zIndex: hoveredItem === 3 ? 10 : 1
                        }}
                      >
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200 h-full shadow-lg transition-shadow duration-300"
                          style={{
                            boxShadow: hoveredItem === 3 ? '0 10px 25px rgba(0, 0, 0, 0.2)' : ''
                          }}
                        >
                          <div className="h-64 mb-4 flex items-center justify-center overflow-hidden">
                            <img src="/mould/Equipments/Phrozen mini.webp" alt={t('mould.equipment.items.phrozenMini.title')} 
                              className="h-full object-contain transition-transform duration-700"
                              style={{
                                transform: hoveredItem === 3 ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0)'
                              }}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{t('mould.equipment.items.phrozenMini.title')}</h3>
                          <div 
                            className="overflow-hidden transition-all duration-500"
                            style={{
                              maxHeight: hoveredItem === 3 ? '100px' : '0',
                              opacity: hoveredItem === 3 ? 1 : 0
                            }}
                          >
                            <p className="text-gray-600 text-sm text-center">{t('mould.equipment.items.phrozenMini.description')}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Equipment 5 */}
                      <div 
                        className="equipment-item relative transform transition-all duration-300"
                        onMouseEnter={() => {
                          setIsPaused(true);
                          setHoveredItem(4);
                        }}
                        onMouseLeave={() => {
                          setIsPaused(false);
                          setHoveredItem(null);
                        }}
                        style={{
                          transform: hoveredItem === 4 ? 'scale(1.05)' : 'scale(1)',
                          zIndex: hoveredItem === 4 ? 10 : 1
                        }}
                      >
                        <div className="bg-white rounded-lg overflow-hidden p-4 border border-gray-200 h-full shadow-lg transition-shadow duration-300"
                          style={{
                            boxShadow: hoveredItem === 4 ? '0 10px 25px rgba(0, 0, 0, 0.2)' : ''
                          }}
                        >
                          <div className="h-64 mb-4 flex items-center justify-center overflow-hidden">
                            <img src="/mould/Equipments/Prusa.webp" alt={t('mould.equipment.items.prusa.title')} 
                              className="h-full object-contain transition-transform duration-700"
                              style={{
                                transform: hoveredItem === 4 ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0)'
                              }}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{t('mould.equipment.items.prusa.title')}</h3>
                          <div 
                            className="overflow-hidden transition-all duration-500"
                            style={{
                              maxHeight: hoveredItem === 4 ? '100px' : '0',
                              opacity: hoveredItem === 4 ? 1 : 0
                            }}
                          >
                            <p className="text-gray-600 text-sm text-center">{t('mould.equipment.items.prusa.description')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Spare Parts Section */}
        <section className="py-16 md:py-24 bg-gray-100 text-gray-900">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Left side content */}
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('mould.spareParts.title')}</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  {t('mould.spareParts.description')}
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">{t('mould.spareParts.features.replicate')}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">{t('mould.spareParts.features.custom')}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">{t('mould.spareParts.features.rapid')}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-block bg-gray-800 text-white font-medium px-6 py-3 rounded-md hover:bg-black transition-colors text-center">
                    {t('mould.hero.buttons.consultation')}
                  </a>
                </div>
              </div>
              
              {/* Right side image */}
              <div className="w-full lg:w-1/2">
                <div className="relative w-full">
                  <img
                    src="/mould/spare1.webp"
                    alt={t('mould.spareParts.title')}
                    className="w-full aspect-[4/3] object-cover h-auto max-h-[650px] rounded-md shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spare Parts Applications Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Spare Parts Applications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Application 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/mould/Screenshot_7.jpg" 
                    alt="Industrial Machine Parts" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="text-blue-600 text-sm font-semibold mb-2">INDUSTRIAL EQUIPMENT</div>
                  <h3 className="text-xl font-bold mb-4">Replacement Parts for Industrial Machinery and Equipment</h3>
                  <a href="#" className="text-blue-600 flex items-center gap-2 font-medium hover:text-blue-800 transition-colors">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Application 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/mould/optimized_for_web_jpeg-07202023_rigid_10k_sample_card_2_189d-sh-standard-square.webp" 
                    alt="Consumer Product Parts" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="text-blue-600 text-sm font-semibold mb-2">CONSUMER PRODUCTS</div>
                  <h3 className="text-xl font-bold mb-4">Custom Parts for Consumer Products and Home Appliances</h3>
                  <a href="#" className="text-blue-600 flex items-center gap-2 font-medium hover:text-blue-800 transition-colors">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">{t('mould.materials.title')}</h2>
              <p className="text-gray-600 mb-10 text-center">{t('mould.materials.subtitle')}</p>
              
              <div className="w-full max-w-3xl mx-auto mb-10 flex justify-center relative">
                <img
                  src="/mould/materials.png"
                  alt="3D Printing Materials"
                  className="w-4/5 rounded-md shadow-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a href="/3d-printing#materials" className="inline-block bg-gray-800 text-white font-medium px-8 py-3 rounded-md hover:bg-black transition-colors text-center">
                    {t('mould.materials.viewAll')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('mould.faq.title')}</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {/* FAQ Item 1 */}
              <div 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                onClick={() => setExpandedFaq(expandedFaq === 0 ? null : 0)}
              >
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{t('mould.faq.questions.spareParts.question')}</h3>
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
                    <p className="text-gray-600 leading-relaxed">{t('mould.faq.questions.spareParts.answer')}</p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
              >
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{t('mould.faq.questions.slaComparison.question')}</h3>
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
                    <p className="text-gray-600 leading-relaxed">{t('mould.faq.questions.slaComparison.answer')}</p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
              >
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{t('mould.faq.questions.productionTime.question')}</h3>
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
                    <p className="text-gray-600 leading-relaxed">{t('mould.faq.questions.productionTime.answer')}</p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
              >
                <div className="p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{t('mould.faq.questions.limitations.question')}</h3>
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
                    <p className="text-gray-600 leading-relaxed">{t('mould.faq.questions.limitations.answer')}</p>
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