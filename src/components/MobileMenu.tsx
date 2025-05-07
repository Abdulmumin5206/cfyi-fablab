import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown, ChevronUp, ArrowRight, Facebook, Instagram, Linkedin, Twitter, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t } = useTranslation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4; // Blog + 3 services
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  // Track window width for responsive design
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isLaptopScreen = windowWidth < 1440;

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
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

  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  // Service data for the left slider
  const services = [
    {
      title: "3D Printing",
      description: "Additive manufacturing for rapid prototyping and production",
      path: "/3d-printing",
      image: "/3dprinters/formlabs-form3-01_2_1.png",
      color: "bg-[#cb2026]"
    },
    {
      title: "Mould",
      description: "Custom mold design and fabrication for various materials",
      path: "/mould",
      image: "/mould/imhero.webp",
      color: "bg-[#0e9a48]"
    },
    {
      title: "Engineering",
      description: "Turn your ideas into physical prototypes quickly",
      path: "/engineering",
      image: "/mould/Equipments/Raise.png", 
      color: "bg-[#35469d]"
    }
  ];

  // Main services categories matching desktop dropdown
  const mainServices = [
    { name: t('header.mould'), path: "/mould", color: "hover:text-[#0e9a48]" },
    { name: t('header.3dPrinting'), path: "/3d-printing", color: "hover:text-[#cb2026]" },
    { name: t('header.prototyping'), path: "/prototyping", color: "hover:text-[#35469d]" },
  ];

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen z-[100] ${
        isOpen ? "" : "pointer-events-none"
      }`}
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
      >
        <div className="min-h-screen w-full flex flex-col md:flex-row">
          {/* Mobile-only slider (visible on small screens) */}
          <div className="md:hidden w-full h-40 relative overflow-hidden">
            <div className={`absolute inset-0 transition-all duration-1000 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}>
              {/* Blog Slide */}
              <div 
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-black ${
                  activeSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img 
                  src="/blog_images/blog1.png" 
                  alt="Blog" 
                  className="w-full h-full object-cover object-center transition-transform duration-10000 ease-out scale-110 origin-center"
                  style={{ transform: activeSlide === 0 ? 'scale(1)' : 'scale(1.1)' }}
                  onError={(e) => {
                    const imgElement = e.currentTarget;
                    imgElement.onerror = null; // Prevent infinite loops
                    imgElement.src = "/fablab/3.jpg"; // Fallback image
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className={`text-[#E6DB00] uppercase text-xs font-medium mb-1 transition-all duration-700 delay-300 ${activeSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Latest Post</div>
                  <h2 className={`text-base font-light mb-1 text-white transition-all duration-700 delay-400 ${activeSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    3D Printing Innovations
                  </h2>
                  <Link 
                    to="/blog/3d-printing-innovations" 
                    onClick={onClose}
                    className={`inline-flex items-center text-xs text-white hover:text-[#E6DB00] transition-all duration-700 delay-600 ${activeSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                  >
                    Read Article <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
              
              {/* Service Slides */}
              {services.map((service, index) => (
                <div 
                  key={service.title}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-black ${
                    activeSlide === index + 1 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-10000 ease-out scale-110 origin-center"
                    style={{ transform: activeSlide === index + 1 ? 'scale(1)' : 'scale(1.1)' }}
                    onError={(e) => {
                      const imgElement = e.currentTarget;
                      imgElement.onerror = null; // Prevent infinite loops
                      imgElement.src = "/fablab/3.jpg"; // Fallback image
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className={`text-[#E6DB00] uppercase text-xs font-medium mb-1 transition-all duration-700 delay-300 ${activeSlide === index + 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Our Services</div>
                    <h2 className={`text-base font-light mb-1 text-white transition-all duration-700 delay-400 ${activeSlide === index + 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                      {service.title}
                    </h2>
                    <Link 
                      to={service.path} 
                      onClick={onClose}
                      className={`inline-flex items-center text-xs text-white hover:text-[#E6DB00] transition-all duration-700 delay-600 ${activeSlide === index + 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    >
                      Explore {service.title} <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
              
              {/* Slide Indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1.5">
                {[...Array(totalSlides)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeSlide === index ? "bg-[#E6DB00] w-5" : "bg-white/50 w-1 hover:bg-white/80"
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop slider (hidden on small screens) */}
          <div className="hidden md:block w-[40%] xl:w-[35%] relative overflow-hidden z-20">
            <div 
              className={`absolute inset-0 transition-all duration-1000 delay-300 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {/* Blog Slide */}
              <div 
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-black ${
                  activeSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img 
                  src="/blog_images/blog1.png" 
                  alt="Blog" 
                  className="w-full h-full object-cover transition-transform duration-10000 ease-out scale-110 origin-center"
                  style={{ transform: activeSlide === 0 ? 'scale(1)' : 'scale(1.1)' }}
                  onError={(e) => {
                    const imgElement = e.currentTarget;
                    imgElement.onerror = null; // Prevent infinite loops
                    imgElement.src = "/fablab/3.jpg"; // Fallback image
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 lg:p-6">
                  <div className={`text-[#E6DB00] uppercase text-xs md:text-sm font-medium mb-1 md:mb-2 transition-all duration-700 delay-300 ${activeSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Latest Post</div>
                  <h2 className={`text-lg md:text-xl lg:text-2xl font-light mb-1 md:mb-2 text-white transition-all duration-700 delay-400 ${activeSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    3D Printing Innovations
                  </h2>
                  <p className={`text-sm md:text-base text-white/80 mb-2 md:mb-3 transition-all duration-700 delay-500 ${activeSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${isLaptopScreen ? 'hidden md:block' : ''}`}>
                    Discover the latest advancements in 3D printing technology
                  </p>
                  <Link 
                    to="/blog/3d-printing-innovations" 
                    onClick={onClose}
                    className={`inline-flex items-center text-sm md:text-base text-white hover:text-[#E6DB00] transition-all duration-700 delay-600 ${activeSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                  >
                    Read Article <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Service Slides */}
              {services.map((service, index) => (
                <div 
                  key={service.title}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-black ${
                    activeSlide === index + 1 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-10000 ease-out scale-110 origin-center"
                    style={{ transform: activeSlide === index + 1 ? 'scale(1)' : 'scale(1.1)' }}
                    onError={(e) => {
                      const imgElement = e.currentTarget;
                      imgElement.onerror = null; // Prevent infinite loops
                      imgElement.src = "/fablab/3.jpg"; // Fallback image
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 lg:p-6">
                    <div className={`text-[#E6DB00] uppercase text-xs md:text-sm font-medium mb-1 md:mb-2 transition-all duration-700 delay-300 ${activeSlide === index + 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Our Services</div>
                    <h2 className={`text-lg md:text-xl lg:text-2xl font-light mb-1 md:mb-2 text-white transition-all duration-700 delay-400 ${activeSlide === index + 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                      {service.title}
                    </h2>
                    <p className={`text-sm md:text-base text-white/80 mb-2 md:mb-3 transition-all duration-700 delay-500 ${activeSlide === index + 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${isLaptopScreen ? 'hidden md:block' : ''}`}>
                      {service.description}
                    </p>
                    <Link 
                      to={service.path} 
                      onClick={onClose}
                      className={`inline-flex items-center text-sm md:text-base text-white hover:text-[#E6DB00] transition-all duration-700 delay-600 ${activeSlide === index + 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    >
                      Explore {service.title} <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Link>
                  </div>
                </div>
              ))}
              
              {/* Slide Indicators */}
              <div className="absolute bottom-16 md:bottom-20 left-0 right-0 flex justify-center space-x-2">
                {[...Array(totalSlides)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeSlide === index ? "bg-[#E6DB00] w-6" : "bg-white/50 w-1.5 hover:bg-white/80"
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Menu Content */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Header with fade-down effect - FIXED SECTION */}
            <div 
              className={`flex items-center justify-end h-14 sm:h-16 md:h-16 lg:h-20 px-3 sm:px-4 md:px-6 lg:px-8 transition-all duration-700 delay-100 ${
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
              }`}
            >
              {/* Header right section with Close button */}
              <div className="flex items-center space-x-2">              
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="flex items-center justify-center hover:opacity-75 transition-opacity"
                  aria-label="Close menu"
                >
                  <span className="flex items-center space-x-1 sm:space-x-2 border border-white px-2 py-1.5 text-white">
                    <X size={16} className="lg:w-4 lg:h-4" />
                    <span className="text-xs sm:text-sm">{t('header.menu')}</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Navigation with staggered fade-in effect */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 lg:p-6 flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-3 md:gap-y-4 max-w-3xl mx-auto w-full">
                {/* Left column */}
                <div className="space-y-2 md:space-y-3 lg:space-y-4 flex flex-col justify-center">
                  {/* Direct navigation links */}
                  <Link 
                    to="/3d-printing"
                    onClick={onClose}
                    className={`block text-lg sm:text-xl md:text-xl lg:text-2xl text-white hover:text-[#cb2026] transition-colors duration-300 ${
                      isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "300ms" }}
                  >
                    3D Printing
                  </Link>
                  <Link 
                    to="/mould"
                    onClick={onClose}
                    className={`block text-lg sm:text-xl md:text-xl lg:text-2xl text-white hover:text-[#0e9a48] transition-colors duration-300 ${
                      isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "400ms" }}
                  >
                    Mould & Spare Parts
                  </Link>
                  <Link 
                    to="/prototyping"
                    onClick={onClose}
                    className={`block text-lg sm:text-xl md:text-xl lg:text-2xl text-white hover:text-[#35469d] transition-colors duration-300 ${
                      isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "500ms" }}
                  >
                    Prototyping
                  </Link>
                  <Link 
                    to="/projects"
                    onClick={onClose}
                    className={`block text-lg sm:text-xl md:text-xl lg:text-2xl text-white hover:text-[#E6DB00] transition-colors duration-300 ${
                      isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "600ms" }}
                  >
                    Projects
                  </Link>
                </div>
                
                {/* Right column */}
                <div className="space-y-2 md:space-y-3 lg:space-y-4 flex flex-col justify-center">
                  <Link
                    to="/about-fablab"
                    onClick={onClose}
                    className={`block text-lg sm:text-xl md:text-xl lg:text-2xl text-white hover:text-[#E6DB00] transition-colors duration-300 ${
                      isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "300ms" }}
                  >
                    About Fablab
                  </Link>
                  <Link
                    to="/blog"
                    onClick={onClose}
                    className={`block text-lg sm:text-xl md:text-xl lg:text-2xl text-white hover:text-[#E6DB00] transition-colors duration-300 ${
                      isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "400ms" }}
                  >
                    Blog
                  </Link>
                  <Link
                    to="/contact"
                    onClick={onClose}
                    className={`block text-lg sm:text-xl md:text-xl lg:text-2xl text-white hover:text-[#E6DB00] transition-colors duration-300 ${
                      isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "500ms" }}
                  >
                    Contact us
                  </Link>
                  <Link
                    to="/book-session"
                    onClick={onClose}
                    className={`block text-lg sm:text-xl md:text-xl lg:text-2xl text-white hover:text-[#E6DB00] transition-colors duration-300 ${
                      isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "600ms" }}
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Footer with location and social media */}
            <div className={`mt-auto p-3 sm:p-4 md:p-5 border-t border-white/10 transition-all duration-700 delay-[800ms] ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {/* Location and contact info */}
                <div>
                  <div className="flex items-center justify-start space-x-3 mb-3 w-full">
                    <img 
                      src="/fablab/cfyi.svg" 
                      alt="CFYI Logo" 
                      className="h-8 w-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <img 
                      src="/fablab/logowhite.png" 
                      alt="FabLab Logo" 
                      className="h-8 w-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <address className="not-italic text-white/70 text-xs md:text-sm space-y-0.5 mb-3">
                    <p>17 Olmachi St., Mirzo-Ulugbek,</p>
                    <p>Tashkent, Uzbekistan</p>
                  </address>
                  <div className="text-white/70 text-xs md:text-sm space-y-0.5">
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-1 text-[#E6DB00]" />
                      <p>+998 (77) 088 39 77 (ru/uz)</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-1 text-[#E6DB00]" />
                      <p>+998 (77) 088 49 77 (ru/en)</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-3 h-3 mr-1 text-[#E6DB00]" />
                      <a href="mailto:info@cfyi.uz" className="hover:text-[#E6DB00] transition-colors">
                        info@cfyi.uz
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="flex flex-col md:items-start">
                  <h3 className="text-sm md:text-base font-medium text-white mb-2 md:mb-3">Connect With Us</h3>
                  <div className="flex justify-start items-center space-x-3 w-full">
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E6DB00] hover:text-black transition-all duration-300 text-white"
                    >
                      <Facebook size={16} />
                    </a>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E6DB00] hover:text-black transition-all duration-300 text-white"
                    >
                      <Instagram size={16} />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E6DB00] hover:text-black transition-all duration-300 text-white"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E6DB00] hover:text-black transition-all duration-300 text-white"
                    >
                      <Twitter size={16} />
                    </a>
                  </div>
                  <div className="mt-3 md:mt-4">
                    <p className="text-white/50 text-xs">{t('footer.copyright') || "© 2023 FabLab. All rights reserved."}</p>
                  </div>
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