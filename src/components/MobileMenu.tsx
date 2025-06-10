import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, ChevronDown, ChevronUp, ArrowRight, Facebook, Instagram, Linkedin, Twitter, Mail, Phone, Youtube, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4; // Blog + 3 services
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  // Track window width for responsive design
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isLaptopScreen = windowWidth < 1440;
  const isLargeScreen = windowWidth >= 1920; // For 27" monitors and above

  // Function to scroll to contact section and close menu
  const scrollToContact = () => {
    onClose(); // Close the mobile menu first
    setTimeout(() => {
      // Wait for menu to close before scrolling
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  // Function to scroll to membership section and close menu
  const scrollToMembership = () => {
    onClose(); // Close the mobile menu first
    navigate('/');
    setTimeout(() => {
      const membershipSection = document.getElementById('membership-section');
      if (membershipSection) {
        membershipSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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

  // Reset expanded menu when closing mobile menu
  useEffect(() => {
    if (!isOpen) {
      setExpandedMenu(null);
    }
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

  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

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
      path: "/mould",
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

  // Main services categories matching desktop dropdown
  const mainServices = [
    { name: t('serviceCategories.molding.title'), path: "/mould", color: "hover:text-[#0e9a48]" },
    { name: t('serviceCategories.3dPrinting.title'), path: "/3d-printing", color: "hover:text-[#cb2026]" },
    { name: t('serviceCategories.digitalFabrication.title'), path: "/digital-fabrication", color: "hover:text-[#35469d]" },
    { name: t('serviceCategories.precisionManufacturing.title'), path: "/digital-fabrication#precision-manufacturing", color: "hover:text-[#8a2be2]" },
    { name: t('serviceCategories.3dScanning.title'), path: "/3d-scanning", color: "hover:text-[#ff6b6b]" }
  ];

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen z-[100] ${
        isOpen ? "" : "pointer-events-none"
      }`}
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {/* Background overlay with fade effect */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-700 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Content wrapper with slide effect */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
        style={{ height: isOpen ? '100%' : '0' }}
      >
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Desktop slider (hidden on small screens) */}
          <div className={`hidden md:block ${isLargeScreen ? 'w-[30%]' : 'w-[40%]'} relative overflow-hidden z-20`}>
            <div 
              className={`absolute inset-0 transition-all duration-1000 delay-300 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {/* Blog and Service Slides - Only render the active one */}
              {activeSlide === 0 ? (
                <div 
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out bg-black opacity-100 z-10"
                >
                  <img 
                    src="/menu/blog1.png" 
                    alt="Blog" 
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
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
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
                      to="/blog/3d-printing-innovations" 
                      onClick={onClose}
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
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
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
                      onClick={onClose}
                      className={`inline-flex items-center ${isLargeScreen ? 'text-lg' : 'text-base'} text-white hover:text-[#E6DB00] transition-all duration-700 delay-600`}
                    >
                      {t('mobileMenu.explore')} {services[activeSlide - 1].title} <ArrowRight className={`ml-2 ${isLargeScreen ? 'h-5 w-5' : 'h-4 w-4'}`} />
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Slide Indicators */}
              <div className={`absolute ${isLargeScreen ? 'bottom-24' : 'bottom-16'} left-0 right-0 flex justify-center space-x-2`}>
                {[...Array(totalSlides)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`${isLargeScreen ? 'h-2 w-8' : 'h-1.5 w-6'} rounded-full transition-all duration-300 ${
                      activeSlide === index ? "bg-[#E6DB00]" : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Menu Content and Mobile Slider */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header with fade-down effect - FIXED at top */}
            <div className={`flex justify-between items-center h-16 sm:h-20 ${isLaptopScreen ? 'md:h-[75px]' : 'md:h-24 lg:h-28'} bg-black`}>
              <div className={`h-full flex items-center pl-4 sm:pl-6 ${isLaptopScreen ? 'md:pl-8' : 'md:pl-10 lg:pl-16 xl:pl-20'}`}>
                {/* Empty space for alignment */}
              </div>

              {/* Right side nav with close button - always visible */}
              <div className={`h-full flex items-center px-3 sm:px-4 ${isLaptopScreen ? 'md:px-6' : 'md:px-8 lg:px-12 xl:px-20'}`}>
                <button
                  onClick={onClose}
                  className={`flex items-center justify-center hover:opacity-75 transition-opacity`}
                  aria-label="Close menu"
                >
                  <span className={`flex items-center space-x-1 border border-white px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} bg-black text-white`}>
                    <X size={isLaptopScreen ? 16 : 18} className={`${isLaptopScreen ? 'md:w-4 md:h-4' : 'lg:w-5 lg:h-5 xl:w-6 xl:h-6'}`} />
                    <span className={`text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'}`}>{t('header.menu')}</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto">
              {/* Navigation with staggered fade-in effect */}
              <div className={`flex items-center ${isLargeScreen ? 'p-8' : 'p-6'}`}>
                <div className="flex flex-row max-w-4xl mx-auto w-full">
                  {/* Navigation Links - improved spacing */}
                  <div className="flex-1 grid grid-cols-2 gap-x-8">
                    {/* First Column */}
                    <div className="space-y-6 md:space-y-5">
                      <Link 
                        to="/3d-printing"
                        onClick={onClose}
                        className={`block ${isLargeScreen ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} text-white hover:text-[#cb2026] transition-colors duration-300 ${
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                      >
                        {t('header.3dPrinting')}
                      </Link>
                      <Link 
                        to="/mould"
                        onClick={onClose}
                        className={`block ${isLargeScreen ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} text-white hover:text-[#0e9a48] transition-colors duration-300 ${
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                      >
                        {t('serviceCategories.molding.title')}
                      </Link>
                      <Link 
                        to="/digital-fabrication"
                        onClick={onClose}
                        className={`block ${isLargeScreen ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} text-white hover:text-[#35469d] transition-colors duration-300 ${
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                      >
                        {t('serviceCategories.digitalFabrication.title')}
                      </Link>
                      <Link 
                        to="/digital-fabrication#precision-manufacturing"
                        onClick={onClose}
                        className={`block ${isLargeScreen ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} text-white hover:text-[#8a2be2] transition-colors duration-300 ${
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                      >
                        {t('serviceCategories.precisionManufacturing.title')}
                      </Link>
                      <Link 
                        to="/3d-scanning"
                        onClick={onClose}
                        className={`block ${isLargeScreen ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} text-white hover:text-[#ff6b6b] transition-colors duration-300 ${
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                      >
                        {t('serviceCategories.3dScanning.title')}
                      </Link>
                    </div>
                    
                    {/* Second Column */}
                    <div className="space-y-6 md:space-y-5">
                      <Link 
                        to="/blog"
                        onClick={onClose}
                        className={`block ${isLargeScreen ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} text-white hover:text-[#E6DB00] transition-colors duration-300 ${
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                      >
                        {t('header.projects')}
                      </Link>
                      <a
                        href="https://cfyi.uz/fablab"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className={`block ${isLargeScreen ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} text-white hover:text-[#E6DB00] transition-colors duration-300 ${
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                      >
                        {t('header.aboutFablab')}
                      </a>
                      <Link
                        to="/blog"
                        onClick={onClose}
                        className={`block ${isLargeScreen ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} text-white hover:text-[#E6DB00] transition-colors duration-300 ${
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                      >
                        {t('header.blog')}
                      </Link>
                      <Link
                        to="/courses"
                        onClick={onClose}
                        className={`block ${isLargeScreen ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} text-white hover:text-[#E6DB00] transition-colors duration-300 ${
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                      >
                        {t('navigation.courses')}
                      </Link>
                      <button
                        onClick={scrollToMembership}
                        className={`block w-full text-left ${isLargeScreen ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} text-white hover:text-[#E6DB00] transition-colors duration-300 ${
                          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                      >
                        {t('navigation.membership')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile slider content */}
              <div className={`w-full ${isLargeScreen ? 'p-8' : 'p-0'} border-t border-white/10 transition-all duration-700 delay-[800ms] ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                {/* Mobile slider - Fixed height, always at bottom */}
                <div className="md:hidden w-full h-[25vh] min-h-[150px] max-h-[200px] flex flex-col justify-end overflow-hidden mt-6">
                  <div className={`relative w-full h-full transition-all duration-1000 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}> 
                    {/* Blog Slide */}
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-black ${activeSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"}`}> 
                      <img 
                        src="/blog_images/blog1.png" 
                        alt="Blog" 
                        className="w-full h-full object-cover object-center transition-transform duration-10000 ease-out scale-110 origin-center" 
                        style={{ transform: activeSlide === 0 ? 'scale(1)' : 'scale(1.1)' }} 
                        onError={(e) => { 
                          const imgElement = e.currentTarget; 
                          imgElement.onerror = null; 
                          imgElement.src = "/fablab/3.jpg"; 
                        }} 
                      /> 
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90" /> 
                      <div className="absolute bottom-0 left-0 right-0 p-6"> 
                        <div className={`text-[#E6DB00] uppercase text-base font-medium mb-3 transition-all duration-700 delay-300 ${activeSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Latest Post</div> 
                        <h2 className={`text-2xl font-light mb-3 text-white transition-all duration-700 delay-400 ${activeSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>3D Printing Innovations</h2> 
                        <p className={`text-white/80 mb-3 transition-all duration-700 delay-500 ${activeSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${isLaptopScreen ? 'hidden md:block' : ''}`}>Discover the latest advancements in 3D printing technology</p> 
                        <Link 
                          to="/blog/3d-printing-innovations" 
                          onClick={onClose} 
                          className={`inline-flex items-center text-base text-white hover:text-[#E6DB00] transition-all duration-700 delay-600 ${activeSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        > 
                          Read Article <ArrowRight className="ml-3 h-5 w-5" /> 
                        </Link> 
                      </div> 
                    </div>
                    {/* Service Slides */}
                    {services.map((service, index) => (
                      <div 
                        key={service.title} 
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-black ${activeSlide === index + 1 ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                      > 
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover object-center transition-transform duration-10000 ease-out scale-110 origin-center" 
                          style={{ transform: activeSlide === index + 1 ? 'scale(1)' : 'scale(1.1)' }} 
                          onError={(e) => { 
                            const imgElement = e.currentTarget; 
                            imgElement.onerror = null; 
                            imgElement.src = "/fablab/3.jpg"; 
                          }} 
                        /> 
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90" /> 
                        <div className="absolute bottom-0 left-0 right-0 p-6"> 
                          <div className={`text-[#E6DB00] uppercase text-base font-medium mb-3 transition-all duration-700 delay-300 ${activeSlide === index + 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Our Services</div> 
                          <h2 className={`text-2xl font-light mb-3 text-white transition-all duration-700 delay-400 ${activeSlide === index + 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>{service.title}</h2> 
                          <Link 
                            to={service.path} 
                            onClick={onClose} 
                            className={`inline-flex items-center text-base text-white hover:text-[#E6DB00] transition-all duration-700 delay-600 ${activeSlide === index + 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                          > 
                            {t('mobileMenu.explore')} {service.title} <ArrowRight className="ml-3 h-5 w-5" /> 
                          </Link> 
                        </div> 
                      </div>
                    ))}
                    {/* Slide Indicators */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2"> 
                      {[...Array(totalSlides)].map((_, index) => ( 
                        <button 
                          key={index} 
                          onClick={() => setActiveSlide(index)} 
                          className={`h-2 rounded-full transition-all duration-300 ${activeSlide === index ? "bg-[#E6DB00] w-8" : "bg-white/50 w-2 hover:bg-white/80"}`} 
                          aria-label={`Slide ${index + 1}`} 
                        /> 
                      ))} 
                    </div> 
                  </div> 
                </div>

                {/* Footer content */}
                <div className="w-full flex flex-col items-center justify-center mt-8 mb-4">
                  <h3 className="text-lg font-medium text-white mb-2 text-center">
                    {t('mobileMenu.connectWithUs')}
                  </h3>
                  <div className="flex justify-center items-center space-x-4 mb-2">
                    <a 
                      href="https://www.facebook.com/centerforyouthinitiatives" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E6DB00] hover:text-black transition-all duration-300 text-white"
                    >
                      <Facebook size={20} />
                    </a>
                    <a 
                      href="https://www.instagram.com/fablab.cfyi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E6DB00] hover:text-black transition-all duration-300 text-white"
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/center-for-youth-initiatives" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E6DB00] hover:text-black transition-all duration-300 text-white"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a 
                      href="https://www.youtube.com/@CenterforYouthInitiatives" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E6DB00] hover:text-black transition-all duration-300 text-white"
                    >
                      <Youtube size={20} />
                    </a>
                    <a 
                      href="https://t.me/+998770884977" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E6DB00] hover:text-black transition-all duration-300 text-white"
                    >
                      <svg 
                        className="w-5 h-5" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>
                  </div>
                  <p className="text-white/50 text-xs text-center">
                    © 2025 Center for Youth Initiatives FabLab. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;