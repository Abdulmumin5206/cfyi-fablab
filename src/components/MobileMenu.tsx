import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4; // Blog + 3 services
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  // Track window width for responsive design
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isLaptopScreen = windowWidth < 1440;
  const isLargeScreen = windowWidth >= 1920; // For 27" monitors and above
  const isRussian = i18n.language === 'ru';

  // State to track closing animation phases
  const [isClosing, setIsClosing] = useState(false);

  // Custom close handler with staggered animations
  const handleClose = () => {
    setIsClosing(true);
    // After all closing animations complete, call the parent onClose
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 1200); // Total closing animation duration
  };

  // Function to scroll to membership section and close menu
  const scrollToMembership = () => {
    handleClose(); // Use custom close handler
    navigate('/');
    setTimeout(() => {
      const membershipSection = document.getElementById('membership-section');
      if (membershipSection) {
        membershipSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1300); // Adjusted for new closing duration
  };

  // Function to scroll to horizontal scrolling section and close menu
  const scrollToHorizontalSection = () => {
    handleClose(); // Use custom close handler
    navigate('/');
    setTimeout(() => {
      const horizontalSection = document.getElementById('horizontal-scroll-section');
      if (horizontalSection) {
        horizontalSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1300); // Adjusted for new closing duration
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      // Lock scrolling but ensure the menu itself can scroll internally
      document.body.style.overflow = 'hidden';

      // Force scroll to top when opening menu for better experience
      window.scrollTo(0, 0);
    } else {
      // Delay unlocking scroll to match animation duration
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 500);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);



  // Auto-rotate slides
  useEffect(() => {
    if (isOpen) {
      slideInterval.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % totalSlides);
      }, 6000); // Change slide every 6 seconds for better reading experience
    }

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isOpen, totalSlides]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle viewport height for mobile browsers (addresses iOS safari issues)
  useEffect(() => {
    const setVh = () => {
      // Set a CSS variable based on real viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial value
    setVh();

    // Update on resize
    window.addEventListener('resize', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  // Service data for the left slider
  const services = [
    {
      title: t('serviceCategories.3dPrinting.title'),
      description: t('serviceCategories.3dPrinting.description'),
      path: "/3d-printing",
      image: "/menu/3Dprinting.webp",
      color: "bg-[#cb2026]"
    },
    {
      title: t('serviceCategories.molding.title'),
      description: t('serviceCategories.molding.description'),
      path: "/injection-molding",
      image: "/mould/imhero.webp",
      color: "bg-[#0e9a48]"
    },
    {
      title: t('serviceCategories.digitalFabrication.title'),
      description: t('serviceCategories.digitalFabrication.description'),
      path: "/digital-fabrication",
      image: "/menu/form3plus-hero_main-v2.webp",
      color: "bg-[#35469d]"
    }
  ];

  // Helper function to get SEO-friendly URLs based on language
  const getSEOUrl = (service: string) => {
    const currentLang = i18n.language;
    switch (service) {
      case '3d-printing':
        // Use SEO-friendly URLs but keep them simple without language prefixes
        switch (currentLang) {
          case 'ru':
          case 'uz':
            return '/3d-printing-tashkent'; // More descriptive for local SEO
          default:
            return '/3d-printing-services'; // Commercial intent for English
        }
      default:
        return `/${service}`;
    }
  };

  return (
    <div
      className={`fixed inset-0 w-screen z-[100] ${isOpen ? "" : "pointer-events-none"}`}
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {/* Main background with expand/shrink animation */}
      <div
        className="absolute inset-0 bg-[#212121] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          height: isOpen && !isClosing ? '100%' : '0%',
          transformOrigin: isOpen && !isClosing ? 'top' : 'bottom',
          transitionDelay: isClosing ? '1000ms' : '0ms', // Delay background closing until last
        }}
      >
        {/* Content wrapper with fade in after background animation */}
        <div
          className="h-full w-full transition-all duration-500 ease-out"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
            transitionDelay: isOpen ? '0.4s' : '0s'
          }}
        >
          <div className="h-full w-full flex flex-col md:flex-row">
            {/* Desktop slider (hidden on small screens) */}
            <div className="hidden lg:block w-[45%] relative overflow-hidden z-20 flex flex-col">
              {/* Top section - 60% height - Existing slider content */}
              <div className="h-full relative overflow-hidden">
                <div
                  className={`absolute inset-0 transition-all duration-1000 ease-out ${isOpen && !isClosing ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  style={{
                    transitionDelay: isOpen && !isClosing ? '0.5s' : isClosing ? '600ms' : '0s',
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Blog and Service Slides - Only render the active one */}
                  {activeSlide === 0 ? (
                    <div
                      className="absolute inset-0 transition-opacity duration-700 ease-in-out bg-black opacity-100 z-10"
                    >
                      <img
                        src="/menu/blog1.png"
                        alt="Blog"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out scale-110 origin-center opacity-100"
                        style={{
                          transform: 'scale(1)',
                          willChange: 'transform, opacity'
                        }}
                        onError={(e) => {
                          const imgElement = e.currentTarget;
                          imgElement.onerror = null; // Prevent infinite loops
                          imgElement.src = "/fablab/3.jpg"; // Fallback image
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
                      <div className={`absolute bottom-0 left-0 right-0 ${isLargeScreen ? 'p-8' : 'p-6'}`}>
                        <div className={`text-[#E6DB00] uppercase ${isLargeScreen ? 'text-base' : 'text-sm'} font-medium mb-2 transition-all duration-700 delay-300`}>
                          {t('mobileMenu.latestPost')}
                        </div>
                        <h2 className={`${isLargeScreen ? 'text-3xl' : 'text-2xl'} font-light mb-2 text-white transition-all duration-700 delay-400`}>
                          {t('mobileMenu.latestPostTitle')}
                        </h2>
                        <p className={`${isLargeScreen ? 'text-lg' : 'text-base'} text-white/80 mb-3 transition-all duration-700 delay-500 ${isLaptopScreen ? 'hidden md:block' : ''}`}>
                          {t('mobileMenu.latestPostDescription')}
                        </p>
                        <Link
                          to="/projects/3d-printing-innovations"
                          onClick={handleClose}
                          className={`inline-flex items-center ${isLargeScreen ? 'text-lg' : 'text-base'} text-white hover:text-[#E6DB00] transition-all duration-700 delay-600`}
                        >
                          {t('mobileMenu.readArticle')} <ArrowRight className={`ml-2 ${isLargeScreen ? 'h-5 w-5' : 'h-4 w-4'}`} />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="absolute inset-0 transition-opacity duration-700 ease-in-out bg-black opacity-100 z-10"
                    >
                      <img
                        src={services[activeSlide - 1].image}
                        alt={services[activeSlide - 1].title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out scale-110 origin-center"
                        style={{
                          transform: 'scale(1)',
                          willChange: 'transform, opacity'
                        }}
                        onError={(e) => {
                          const imgElement = e.currentTarget;
                          imgElement.onerror = null; // Prevent infinite loops
                          imgElement.src = "/fablab/3.jpg"; // Fallback image
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
                      <div className={`absolute bottom-0 left-0 right-0 ${isLargeScreen ? 'p-8' : 'p-6'}`}>
                        <div className={`text-[#E6DB00] uppercase ${isLargeScreen ? 'text-base' : 'text-sm'} font-medium mb-2 transition-all duration-700 delay-300`}>
                          {t('mobileMenu.ourServices')}
                        </div>
                        <h2 className={`${isLargeScreen ? 'text-3xl' : 'text-2xl'} font-light mb-2 text-white transition-all duration-700 delay-400`}>
                          {services[activeSlide - 1].title}
                        </h2>
                        <p className={`${isLargeScreen ? 'text-lg' : 'text-base'} text-white/80 mb-3 transition-all duration-700 delay-500 ${isLaptopScreen ? 'hidden md:block' : ''}`}>
                          {services[activeSlide - 1].description}
                        </p>
                        <Link
                          to={services[activeSlide - 1].path}
                          onClick={handleClose}
                          className={`inline-flex items-center ${isLargeScreen ? 'text-lg' : 'text-base'} text-white hover:text-[#E6DB00] transition-all duration-700 delay-600`}
                        >
                          {t('mobileMenu.explore')} {services[activeSlide - 1].title} <ArrowRight className={`ml-2 ${isLargeScreen ? 'h-5 w-5' : 'h-4 w-4'}`} />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Slide Indicators */}
                  <div className={`absolute ${isLargeScreen ? 'bottom-6' : 'bottom-4'} left-0 right-0 flex justify-center space-x-2`}>
                    {[...Array(totalSlides)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`${isLargeScreen ? 'h-2 w-8' : 'h-1.5 w-6'} rounded-full transition-all duration-300 ${activeSlide === index ? "bg-[#E6DB00]" : "bg-white/50 hover:bg-white/80"
                          }`}
                        aria-label={`Slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Menu Content and Mobile Slider */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Header with fade-down effect - FIXED at top */}
              <div className={`flex lg:justify-end justify-between items-center h-16 sm:h-20 ${isLaptopScreen ? 'md:h-[75px]' : 'md:h-24 lg:h-28'}`}>
                {/* Logo - Only visible on mobile */}
                <div className="lg:hidden h-full flex items-center pl-3 sm:pl-4">
                  <Link 
                    to="/" 
                    className="block h-full py-2"
                    onClick={handleClose}
                  >
                    <img
                      src="/fablab/logo.png"
                      alt="FabLab Logo"
                      className="h-full w-auto max-h-12 sm:max-h-14 object-contain"
                    />
                  </Link>
                </div>
                
                {/* Right side nav with close button - always visible */}
                <div className={`h-full flex items-center px-3 sm:px-4 ${isLaptopScreen ? 'md:px-6' : 'md:px-8 lg:px-12 xl:px-20'}`}>
                  <button
                    onClick={handleClose}
                    className={`flex items-center justify-center hover:opacity-75 transition-opacity`}
                    aria-label="Close menu"
                  >
                    <span className={`flex items-center space-x-1 border border-white px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 h-[32px] sm:h-[38px] md:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} bg-transparent text-white`}>
                      <X size={14} className={`sm:w-4 sm:h-4 ${isLaptopScreen ? 'md:w-4 md:h-4' : 'lg:w-5 lg:h-5 xl:w-6 xl:h-6'}`} />
                      <span className={`text-xs sm:text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'}`}>{t('header.menu')}</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Scrollable content area */}
              <div className="flex-1 overflow-y-auto flex items-start justify-center pt-4 sm:pt-8 md:pt-12 lg:pt-16">
                {/* Navigation with float-in effect - Centered both horizontally and vertically */}
                <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
                  {/* Navigation Links - improved mobile responsiveness */}
                  <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full">
                    {/* Mobile and Tablet Single Column Layout */}
                    <div className="flex flex-col gap-6 w-full max-w-md mx-auto px-6 lg:hidden">
                      <Link
                        to={getSEOUrl('3d-printing')}
                        onClick={handleClose}
                        className="block text-left text-2xl md:text-3xl font-light text-white hover:text-[#329db7] py-3 leading-tight w-full"
                        style={{
                          transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                          opacity: isOpen && !isClosing ? 1 : 0,
                          transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                          transitionDelay: isOpen && !isClosing ? '0.8s' : isClosing ? '0ms' : '0s'
                        }}
                      >
                        {t('header.3dPrinting')}
                      </Link>
                      <Link
                        to="/injection-molding"
                        onClick={handleClose}
                        className="block text-left text-2xl md:text-3xl font-light text-white hover:text-[#329db7] py-3 leading-tight w-full"
                        style={{
                          transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                          opacity: isOpen && !isClosing ? 1 : 0,
                          transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                          transitionDelay: isOpen && !isClosing ? '0.85s' : isClosing ? '25ms' : '0.05s'
                        }}
                      >
                        {t('serviceCategories.molding.title')}
                      </Link>
                      <Link
                        to="/digital-fabrication"
                        onClick={handleClose}
                        className="block text-left text-2xl md:text-3xl font-light text-white hover:text-[#329db7] py-3 leading-tight w-full"
                        style={{
                          transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                          opacity: isOpen && !isClosing ? 1 : 0,
                          transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                          transitionDelay: isOpen && !isClosing ? '0.9s' : isClosing ? '50ms' : '0.1s'
                        }}
                      >
                        {t('serviceCategories.digitalFabrication.title')}
                      </Link>
                      <Link
                        to="/digital-fabrication#precision-manufacturing"
                        onClick={handleClose}
                        className="block text-left text-2xl md:text-3xl font-light text-white hover:text-[#329db7] py-3 leading-tight w-full"
                        style={{
                          transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                          opacity: isOpen && !isClosing ? 1 : 0,
                          transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                          transitionDelay: isOpen && !isClosing ? '0.95s' : isClosing ? '75ms' : '0.15s'
                        }}
                      >
                        {t('serviceCategories.precisionManufacturing.title')}
                      </Link>
                      <Link
                        to="/3d-scanning-services"
                        onClick={handleClose}
                        className="block text-left text-2xl md:text-3xl font-light text-white hover:text-[#329db7] py-3 leading-tight w-full"
                        style={{
                          transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                          opacity: isOpen && !isClosing ? 1 : 0,
                          transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                          transitionDelay: isOpen && !isClosing ? '1.0s' : isClosing ? '100ms' : '0.2s'
                        }}
                      >
                        {t('serviceCategories.3dScanning.title')}
                      </Link>
                      <Link
                        to="/projects"
                        onClick={handleClose}
                        className="block text-left text-2xl md:text-3xl font-light text-white hover:text-[#329db7] py-3 leading-tight w-full"
                        style={{
                          transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                          opacity: isOpen && !isClosing ? 1 : 0,
                          transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                          transitionDelay: isOpen && !isClosing ? '1.05s' : isClosing ? '125ms' : '0.25s'
                        }}
                      >
                        {t('header.projects')}
                      </Link>
                      <button
                        onClick={scrollToHorizontalSection}
                        className="block text-left text-2xl md:text-3xl font-light text-white hover:text-[#329db7] py-3 leading-tight w-full"
                        style={{
                          transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                          opacity: isOpen && !isClosing ? 1 : 0,
                          transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                          transitionDelay: isOpen && !isClosing ? '1.1s' : isClosing ? '150ms' : '0.3s'
                        }}
                      >
                        {t('header.aboutUs')}
                      </button>
                      <Link
                        to="/projects"
                        onClick={handleClose}
                        className="block text-left text-2xl md:text-3xl font-light text-white hover:text-[#329db7] py-3 leading-tight w-full"
                        style={{
                          transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                          opacity: isOpen && !isClosing ? 1 : 0,
                          transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                          transitionDelay: isOpen && !isClosing ? '1.15s' : isClosing ? '175ms' : '0.35s'
                        }}
                      >
                        {t('header.blog')}
                      </Link>
                      <Link
                        to="/courses"
                        onClick={handleClose}
                        className="block text-left text-2xl md:text-3xl font-light text-white hover:text-[#329db7] py-3 leading-tight w-full"
                        style={{
                          transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                          opacity: isOpen && !isClosing ? 1 : 0,
                          transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                          transitionDelay: isOpen && !isClosing ? '1.2s' : isClosing ? '200ms' : '0.4s'
                        }}
                      >
                        {t('navigation.courses')}
                      </Link>
                      <button
                        onClick={scrollToMembership}
                        className="block text-left text-2xl md:text-3xl font-light text-white hover:text-[#329db7] py-3 leading-tight w-full mb-8"
                        style={{
                          transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                          opacity: isOpen && !isClosing ? 1 : 0,
                          transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                          transitionDelay: isOpen && !isClosing ? '1.25s' : isClosing ? '225ms' : '0.45s'
                        }}
                      >
                        {t('navigation.membership')}
                      </button>
                    </div>

                    {/* Desktop Layout - Keep existing behavior for large screens only */}
                    <div className="hidden lg:flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-12 w-full">
                      {/* Row 1: 3D Printing & Projects */}
                      <div className="flex flex-row w-full px-4 md:px-8 lg:px-16 gap-0">
                        <Link
                          to={getSEOUrl('3d-printing')}
                          onClick={handleClose}
                          className={`block w-1/2 text-left text-lg md:text-xl ${isLargeScreen ? 'lg:text-2xl xl:text-3xl' : 'lg:text-2xl'} font-light text-white hover:text-[#329db7] py-0`}
                          style={{
                            transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                            opacity: isOpen && !isClosing ? 1 : 0,
                            transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                            transitionDelay: isOpen && !isClosing ? '0.8s' : isClosing ? '0ms' : '0s'
                          }}
                        >
                          {t('header.3dPrinting')}
                        </Link>
                        <Link
                          to="/projects"
                          onClick={handleClose}
                          className={`block w-1/2 text-left ${isRussian ? 'pl-16 md:pl-20 lg:pl-28 xl:pl-32' : 'pl-12 md:pl-16 lg:pl-20 xl:pl-24'} text-lg md:text-xl ${isLargeScreen ? 'lg:text-2xl xl:text-3xl' : 'lg:text-2xl'} font-light text-white hover:text-[#329db7] py-0`}
                          style={{
                            transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                            opacity: isOpen && !isClosing ? 1 : 0,
                            transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                            transitionDelay: isOpen && !isClosing ? '0.85s' : isClosing ? '25ms' : '0.05s'
                          }}
                        >
                          {t('header.projects')}
                        </Link>
                      </div>
                      
                      {/* Row 2: Molding & About Us */}
                      <div className="flex flex-row w-full px-4 md:px-8 lg:px-16 gap-0">
                        <Link
                          to="/injection-molding"
                          onClick={handleClose}
                          className={`block w-1/2 text-left text-lg md:text-xl ${isLargeScreen ? 'lg:text-2xl xl:text-3xl' : 'lg:text-2xl'} font-light text-white hover:text-[#329db7] py-0`}
                          style={{
                            transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                            opacity: isOpen && !isClosing ? 1 : 0,
                            transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                            transitionDelay: isOpen && !isClosing ? '0.9s' : isClosing ? '50ms' : '0.1s'
                          }}
                        >
                          {t('serviceCategories.molding.title')}
                        </Link>
                        <button
                          onClick={scrollToHorizontalSection}
                          className={`block text-left w-1/2 ${isRussian ? 'pl-16 md:pl-20 lg:pl-28 xl:pl-32' : 'pl-12 md:pl-16 lg:pl-20 xl:pl-24'} text-lg md:text-xl ${isLargeScreen ? 'lg:text-2xl xl:text-3xl' : 'lg:text-2xl'} font-light text-white hover:text-[#329db7] py-0`}
                          style={{
                            transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                            opacity: isOpen && !isClosing ? 1 : 0,
                            transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                            transitionDelay: isOpen && !isClosing ? '0.95s' : isClosing ? '75ms' : '0.15s'
                          }}
                        >
                          {t('header.aboutUs')}
                        </button>
                      </div>
                      
                      {/* Row 3: Digital Fabrication & Blog */}
                      <div className="flex flex-row w-full px-4 md:px-8 lg:px-16 gap-0">
                        <Link
                          to="/digital-fabrication"
                          onClick={handleClose}
                          className={`block w-1/2 text-left text-lg md:text-xl ${isLargeScreen ? 'lg:text-2xl xl:text-3xl' : 'lg:text-2xl'} font-light text-white hover:text-[#329db7] py-0 leading-tight`}
                          style={{
                            transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                            opacity: isOpen && !isClosing ? 1 : 0,
                            transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                            transitionDelay: isOpen && !isClosing ? '1.0s' : isClosing ? '100ms' : '0.2s'
                          }}
                        >
                          {t('serviceCategories.digitalFabrication.title')}
                        </Link>
                        <Link
                          to="/projects"
                          onClick={handleClose}
                          className={`block w-1/2 text-left ${isRussian ? 'pl-16 md:pl-20 lg:pl-28 xl:pl-32' : 'pl-12 md:pl-16 lg:pl-20 xl:pl-24'} text-lg md:text-xl ${isLargeScreen ? 'lg:text-2xl xl:text-3xl' : 'lg:text-2xl'} font-light text-white hover:text-[#329db7] py-0`}
                          style={{
                            transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                            opacity: isOpen && !isClosing ? 1 : 0,
                            transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                            transitionDelay: isOpen && !isClosing ? '1.05s' : isClosing ? '125ms' : '0.25s'
                          }}
                        >
                          {t('header.blog')}
                        </Link>
                      </div>
                      
                      {/* Row 4: Precision Manufacturing & Courses */}
                      <div className="flex flex-row w-full px-4 md:px-8 lg:px-16 gap-0">
                        <Link
                          to="/digital-fabrication#precision-manufacturing"
                          onClick={handleClose}
                          className={`block w-1/2 text-left text-lg md:text-xl ${isLargeScreen ? 'lg:text-2xl xl:text-3xl' : 'lg:text-2xl'} font-light text-white hover:text-[#329db7] py-0 leading-tight break-words`}
                          style={{
                            transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                            opacity: isOpen && !isClosing ? 1 : 0,
                            transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                            transitionDelay: isOpen && !isClosing ? '1.1s' : isClosing ? '150ms' : '0.3s'
                          }}
                        >
                          {t('serviceCategories.precisionManufacturing.title')}
                        </Link>
                        <Link
                          to="/courses"
                          onClick={handleClose}
                          className={`block w-1/2 text-left ${isRussian ? 'pl-16 md:pl-20 lg:pl-28 xl:pl-32' : 'pl-12 md:pl-16 lg:pl-20 xl:pl-24'} text-lg md:text-xl ${isLargeScreen ? 'lg:text-2xl xl:text-3xl' : 'lg:text-2xl'} font-light text-white hover:text-[#329db7] py-0`}
                          style={{
                            transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                            opacity: isOpen && !isClosing ? 1 : 0,
                            transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                            transitionDelay: isOpen && !isClosing ? '1.15s' : isClosing ? '175ms' : '0.35s'
                          }}
                        >
                          {t('navigation.courses')}
                        </Link>
                      </div>
                      
                      {/* Row 5: 3D Scanning & Membership */}
                      <div className="flex flex-row w-full px-4 md:px-8 lg:px-16 gap-0">
                        <Link
                          to="/3d-scanning-services"
                          onClick={handleClose}
                          className={`block w-1/2 text-left text-lg md:text-xl ${isLargeScreen ? 'lg:text-2xl xl:text-3xl' : 'lg:text-2xl'} font-light text-white hover:text-[#329db7] py-0`}
                          style={{
                            transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                            opacity: isOpen && !isClosing ? 1 : 0,
                            transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                            transitionDelay: isOpen && !isClosing ? '1.2s' : isClosing ? '200ms' : '0.4s'
                          }}
                        >
                          {t('serviceCategories.3dScanning.title')}
                        </Link>
                        <button
                          onClick={scrollToMembership}
                          className={`block text-left w-1/2 ${isRussian ? 'pl-16 md:pl-20 lg:pl-28 xl:pl-32' : 'pl-12 md:pl-16 lg:pl-20 xl:pl-24'} text-lg md:text-xl ${isLargeScreen ? 'lg:text-2xl xl:text-3xl' : 'lg:text-2xl'} font-light text-white hover:text-[#329db7] py-0`}
                          style={{
                            transform: isOpen && !isClosing ? 'translateY(0)' : 'translateY(30px)',
                            opacity: isOpen && !isClosing ? 1 : 0,
                            transition: 'transform 300ms ease-out, opacity 300ms ease-out',
                            transitionDelay: isOpen && !isClosing ? '1.25s' : isClosing ? '225ms' : '0.45s'
                          }}
                        >
                          {t('navigation.membership')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile slider content - REMOVED */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;