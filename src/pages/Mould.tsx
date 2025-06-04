import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Info, ChevronDown, ChevronUp } from "lucide-react";
import styles from "@/styles/Slider.module.css";
import "@/styles/Carousel.css"; // Import the carousel CSS
import { useTranslation } from "react-i18next";
import AboutSection from "@/components/AboutSection";

const MouldPage = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const marketsRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0); // First FAQ item expanded by default
  
  // Image comparison slider references and state
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderKnobRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // Start in the middle
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = t('header.mould') + " | FabLab";
    
    console.log("Mould page mounted");
  }, [t]);

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
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium mb-2 sm:mb-4">CUSTOM PLASTIC MOULDING & SLA SOLUTIONS</div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-2 sm:mb-4 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl">Professional SLA Moulding & Spare Parts Production</h1>
                
                <div className="space-y-4 text-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl">Rapid SLA prototyping and small-batch production solutions</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl">{t('mould.hero.features.highPrecision')}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl">{t('mould.hero.features.specialized')}</p>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-flex items-center space-x-1 sm:space-x-2 bg-[#329db7] text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-medium hover:bg-[#2b86a0] transition-colors duration-300">
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
        
        <AboutSection />
        
        {/* Premium Quality Section */}
        <section id="premium-quality" className="bg-[#f7f7f7] py-16 md:py-24 overflow-visible">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Left side content */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-900">
                    Precision Plastic Moulding for Small-Batch Excellence
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    Transform your spare parts and small-volume production needs with our specialized plastic moulding solutions. Whether you need replacement parts for legacy equipment or small-batch production runs, our advanced moulding technologies deliver consistent quality and precise tolerances. Perfect for manufacturers, maintenance teams, and businesses requiring reliable, cost-effective solutions for quantities from 1 to 1000 units.
                  </p>

                  <button className="inline-flex items-center px-6 py-3 bg-[#329db7] text-white rounded-lg hover:bg-[#2b86a0] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    Request a Quote
                  </button>
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
                      src="/mould/mould2.webp" 
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
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-900 text-center">Why Choose Plastic Moulding?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-8">
              {/* Benefit 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                  <img src="/mould/lower_costs.webp" alt={t('mould.whyDigital.benefits.lowerCosts.title')} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{t('mould.whyDigital.benefits.lowerCosts.title')}</h3>
                <p className="text-sm sm:text-base text-gray-600">{t('mould.whyDigital.benefits.lowerCosts.description')}</p>
              </div>
              
              {/* Benefit 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                  <img src="/mould/faster_time.webp" alt={t('mould.whyDigital.benefits.fasterTime.title')} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{t('mould.whyDigital.benefits.fasterTime.title')}</h3>
                <p className="text-sm sm:text-base text-gray-600">{t('mould.whyDigital.benefits.fasterTime.description')}</p>
              </div>
              
              {/* Benefit 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                  <img src="/mould/clean_workflow.webp" alt={t('mould.whyDigital.benefits.designFreedom.title')} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{t('mould.whyDigital.benefits.designFreedom.title')}</h3>
                <p className="text-sm sm:text-base text-gray-600">{t('mould.whyDigital.benefits.designFreedom.description')}</p>
              </div>
            </div>

            {/* Video Section */}
            <div className="mb-12">
              <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                <video
                  className="w-full aspect-video object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source 
                    src="/mould/im21_multiplus_webheader-compressed.mp4" 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">See Plastic Moulding in Action</h3>
                  <p className="text-white/90 text-lg">Watch how Formlabs' advanced moulding technology transforms raw materials into precise, high-quality parts with exceptional detail and consistency.</p>
                </div>
              </div>
            </div>

            {/* Formlabs Solutions */}
            <div className="mt-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6">Read Formlabs Injection Molding Solutions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Case Study 1 */}
                <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                  <div className="md:w-2/5 h-40 sm:h-48 md:h-auto overflow-hidden">
                    <img 
                      src="/mould/Screenshot_7.jpg" 
                      alt="Guide to Low-Volume Injection Molding" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-4 sm:p-6">
                    <div className="text-[#329db7] text-xs sm:text-sm font-semibold mb-2">MANUFACTURING GUIDE</div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Guide to Low-Volume Injection Molding</h3>
                    <p className="text-gray-600 mb-4">Learn how to use 3D printed injection molds to produce high-quality parts for prototyping and low-volume production.</p>
                    <a href="https://formlabs.com/global/blog/low-volume-injection-molding/" target="_blank" rel="noopener noreferrer" className="text-[#329db7] flex items-center gap-2 font-medium hover:text-[#2b86a0] transition-colors text-sm sm:text-base">
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
                      alt="When to Replace Injection Molding" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-4 sm:p-6">
                    <div className="text-[#329db7] text-xs sm:text-sm font-semibold mb-2">MANUFACTURING INSIGHTS</div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">When to Replace Injection Molding With 3D Printing?</h3>
                    <p className="text-gray-600 mb-4">Discover when to use 3D printing as an alternative to traditional injection molding for your manufacturing needs.</p>
                    <a href="https://formlabs.com/global/applications/injection-molding/" target="_blank" rel="noopener noreferrer" className="text-[#329db7] flex items-center gap-2 font-medium hover:text-[#2b86a0] transition-colors text-sm sm:text-base">
                      Learn More
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
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">{t('mould.spareParts.features.replicate')}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">{t('mould.spareParts.features.custom')}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#329db7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">{t('mould.spareParts.features.rapid')}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-block bg-[#329db7] text-white font-medium px-6 py-3 rounded-md hover:bg-[#2b86a0] transition-colors text-center">
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

        {/* Blog Section */}
        <section className="py-16 md:py-24 bg-gray-100 text-gray-900">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Spare Part Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Blog Post */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/blog_images/blog1.webp" 
                    alt="3D Printing Innovations" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="text-[#329db7] text-xs sm:text-sm font-semibold mb-2">3D PRINTING</div>
                  <h3 className="text-xl font-bold mb-4">SLA Resin Printing: Revolutionizing Small-Batch Production for Spare Parts</h3>
                  <p className="text-gray-600 mb-4">Created a fully functional prototype using advanced 3D printing techniques for an Uzbek tech startup.</p>
                  <a href="/blog/3d-printing-innovations" className="text-[#329db7] flex items-center gap-2 font-medium hover:text-[#2b86a0] transition-colors">
                    Read More
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
                  <a href="/3d-printing#materials" className="inline-block bg-[#329db7] text-white font-medium px-8 py-3 rounded-md hover:bg-[#2b86a0] transition-colors text-center">
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