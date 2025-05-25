import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const location = useLocation();
  const is3DPrintingPage = location.pathname === "/3d-printing";
  const is3DPrintingBlogPost = location.pathname === "/blog/3d-printing-innovations";
  const isBlogPage = location.pathname === "/blog" || location.pathname.startsWith("/blog/");
  const shouldUseBlackTheme = is3DPrintingPage || is3DPrintingBlogPost || isBlogPage;
  
  // Track window width for responsive design
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // More aggressive laptop detection (covers most laptop screens)
  const isLaptopScreen = windowWidth < 1440;
  const isMobileScreen = windowWidth < 768; // md breakpoint
  const isTabletScreen = windowWidth <= 1024; // lg breakpoint, include 1024px

  // ref + state for measuring the main nav width
  const navRef = useRef<HTMLDivElement>(null);
  const [navWidth, setNavWidth] = useState(0);
  
  // Add this new state for measuring the right nav width
  const rightNavRef = useRef<HTMLDivElement>(null);
  const [rightNavWidth, setRightNavWidth] = useState(0);
  
  // Update nav width when language changes or window resizes
  useEffect(() => {
    const updateNavWidth = () => {
      if (navRef.current) setNavWidth(navRef.current.offsetWidth);
    };
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      updateNavWidth();
    };
    
    // Initial update
    updateNavWidth();
    
    // Update on resize
    window.addEventListener("resize", handleResize);
    
    // Force recalculation after a brief delay when language changes
    const timeoutId = setTimeout(updateNavWidth, 100);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [i18n.language]); // Added i18n.language as a dependency

  // Add this effect to measure the right nav width
  useEffect(() => {
    const updateRightNavWidth = () => {
      if (rightNavRef.current) {
        setRightNavWidth(rightNavRef.current.offsetWidth);
      }
    };

    updateRightNavWidth();
    window.addEventListener('resize', updateRightNavWidth);
    return () => window.removeEventListener('resize', updateRightNavWidth);
  }, []);

  // scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsVisible(prevScrollPos > y || y < 10);
      setIsScrolled(y > 10);
      setPrevScrollPos(y);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  // Handle services menu hover and click behavior
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesMenuOpen &&
        servicesButtonRef.current && 
        servicesMenuRef.current && 
        !servicesButtonRef.current.contains(event.target as Node) && 
        !servicesMenuRef.current.contains(event.target as Node)
      ) {
        setServicesMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesMenuOpen]);

  const toggleMenu = () => {
    // Toggle mobile menu state
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Handle body scroll locking properly
    if (!isMobileMenuOpen) {
      // Opening menu - lock scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Closing menu - restore scrolling with a small delay to allow animation
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 300);
    }
  };
  
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    // Add delay when closing to allow animation to complete
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 300);
  };

  const toggleServicesMenu = () => {
    setServicesMenuOpen(!servicesMenuOpen);
  };

  // This timeout helps with more natural hover behavior
  let hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleServicesMouseEnter = () => {
    // Only apply hover behavior on desktop
    if (!isTabletScreen) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setServicesMenuOpen(true);
    }
  };

  const handleServicesMouseLeave = () => {
    // Only apply hover behavior on desktop
    if (!isTabletScreen) {
      hoverTimeoutRef.current = setTimeout(() => {
        setServicesMenuOpen(false);
      }, 150); // Small delay to make the interaction feel natural
    }
  };

  // Dynamic styling for laptop screens
  const headerStyle = isLaptopScreen ? {
    height: windowWidth < 768 ? '60px' : windowWidth < 1024 ? '70px' : '75px'
  } : {};

  const logoStyle = isLaptopScreen ? {
    maxHeight: windowWidth < 768 ? '40px' : windowWidth < 1024 ? '45px' : '50px'
  } : {};

  const textStyle = isLaptopScreen ? {
    fontSize: windowWidth < 768 ? '0.875rem' : windowWidth < 1024 ? '0.9375rem' : '1rem'
  } : {};

  const buttonStyle = isLaptopScreen ? {
    padding: windowWidth < 768 ? '0.25rem 0.5rem' : windowWidth < 1024 ? '0.375rem 0.75rem' : '0.5rem 1rem'
  } : {};
  
  // Position dropdown based on header height
  const getDropdownPosition = () => {
    if (windowWidth < 768) {
      return '60px'; // mobile
    } else if (windowWidth < 1024) {
      return '70px'; // tablet
    } else if (windowWidth < 1440) {
      return '75px'; // laptop
    } else {
      return '80px'; // desktop
    }
  };
  
  const servicesMenuStyle = {
    top: getDropdownPosition()
  };

  return (
    <>
      {/* Main header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
      >
        <div className="relative">
          <div
            style={headerStyle}
            className={`flex justify-between items-center h-16 sm:h-20 ${isLaptopScreen ? 'md:h-[75px]' : 'md:h-24 lg:h-28'} transition-colors duration-300`}
          >
            {/* Logo */}
            <div
              className={`h-full flex items-center pl-4 sm:pl-6 ${isLaptopScreen ? 'md:pl-8' : 'md:pl-10 lg:pl-16 xl:pl-20'} transition-colors duration-300`}
            >
              <Link 
                to="/" 
                className="block h-full py-3"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <img
                  style={logoStyle}
                  src="/fablab/logo.png"
                  alt="FabLab Logo"
                  className={`h-full w-auto max-h-8 sm:max-h-10 ${isLaptopScreen ? 'md:max-h-10' : 'md:max-h-16 lg:max-h-20'} object-contain`}
                />
              </Link>
            </div>

            {/* Main right-side nav (measured) */}
            <div
              ref={rightNavRef}
              className={`transition-colors duration-300 ${shouldUseBlackTheme && !isMobileScreen ? "bg-black" : "bg-transparent"} px-3 sm:px-4 ${isLaptopScreen ? 'md:px-6' : 'md:px-8 lg:px-12 xl:px-20'} h-full`}
            >
              <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-8 h-full">
                {/* Services link with dropdown */}
                <div className="relative" onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
                  <span
                    style={buttonStyle}
                    className={`flex items-center space-x-1 border px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} ${isScrolled ? "border-black bg-white text-black" : (shouldUseBlackTheme && !isMobileScreen ? "border-black bg-black text-white" : "border-white bg-transparent text-white")}`}
                  >
                    <button
                      ref={servicesButtonRef}
                      style={textStyle}
                      className={`flex items-center h-full ${isScrolled ? "text-black" : "text-white"} ${shouldUseBlackTheme ? "group-hover:text-blue-500" : "group-hover:text-blue-600"} transition-colors duration-300 text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} px-1 sm:px-2 bg-transparent`}
                      onClick={toggleServicesMenu}
                    >
                      {t('header.services')}
                      <ChevronDown className={`ml-1 h-4 w-4 ${isLaptopScreen ? 'md:h-4 md:w-4' : 'lg:h-5 lg:w-5'} transition-transform duration-200 ${servicesMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </span>
                  {/* Services Dropdown Menu */}
                  <div
                    ref={servicesMenuRef}
                    className={`absolute z-40 overflow-hidden transition-all duration-300 ease-in-out mt-4 ${
                      servicesMenuOpen ? "max-h-[380px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
                    }`}
                    style={{ 
                      width: '200px',
                      top: '100%',
                      left: 0
                    }}
                  >
                    <div className={`${isScrolled ? 'bg-white' : 'bg-transparent'} shadow-lg w-full transform transition-transform duration-300 ease-out origin-top border ${isScrolled ? 'border-black' : 'border-white'}`}
                         style={{ 
                           transform: servicesMenuOpen ? 'translateY(0)' : 'translateY(-100%)'
                         }}>
                      <div className="flex flex-col">
                        <Link
                          to="/mould"
                          style={textStyle}
                          className={`flex items-center ${isScrolled ? 'text-black' : 'text-white'} hover:text-white ${isScrolled ? 'bg-white hover:bg-[#0e9a48]' : 'bg-transparent hover:bg-[#0e9a48]'} transition-all duration-300 text-sm lg:text-base p-4 w-full border-b ${isScrolled ? 'border-black' : 'border-white'} last:border-b-0`}
                        >
                          {t('header.mould')}
                        </Link>
                        <Link
                          to="/3d-printing"
                          style={textStyle}
                          className={`flex items-center ${isScrolled ? 'text-black' : 'text-white'} hover:text-white ${isScrolled ? 'bg-white hover:bg-[#cb2026]' : 'bg-transparent hover:bg-[#cb2026]'} transition-all duration-300 text-sm lg:text-base p-4 w-full border-b ${isScrolled ? 'border-black' : 'border-white'} last:border-b-0`}
                        >
                          {t('header.3dPrinting')}
                        </Link>
                        <Link
                          to="/custom-fabrication"
                          style={textStyle}
                          className={`flex items-center ${isScrolled ? 'text-black' : 'text-white'} hover:text-white ${isScrolled ? 'bg-white hover:bg-[#35469d]' : 'bg-transparent hover:bg-[#35469d]'} transition-all duration-300 text-sm lg:text-base p-4 w-full border-b ${isScrolled ? 'border-black' : 'border-white'} last:border-b-0`}
                        >
                          {t('header.customFabrication')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other top-level links */}
                {/* Wrap About Fablab link in a styled span */}
                <span
                  style={{...textStyle, ...buttonStyle}}
                  className={`flex items-center space-x-1 border px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} ${isScrolled ? "border-black bg-white text-black" : (shouldUseBlackTheme && !isMobileScreen ? "border-black bg-black text-white" : "border-white bg-transparent text-white")}`}
                >
                  <a
                    href="https://cfyi.uz/fablab"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={textStyle}
                    className={`${isScrolled ? "text-black" : "text-white"} ${shouldUseBlackTheme ? "hover:text-blue-500" : "hover:text-blue-600"} transition-colors duration-300 text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} px-1 sm:px-2 bg-transparent`}
                  >
                    {t('header.aboutFablab')}
                  </a>
                </span>

                {/* Wrap Projects link in a styled span */}
                <span
                  style={{...textStyle, ...buttonStyle}}
                  className={`flex items-center space-x-1 border px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} ${isScrolled ? "border-black bg-white text-black" : (shouldUseBlackTheme && !isMobileScreen ? "border-black bg-black text-white" : "border-white bg-transparent text-white")}`}
                >
                  <Link
                    to="/blog"
                    style={textStyle}
                    className={`${isScrolled ? "text-black" : "text-white"} ${shouldUseBlackTheme ? "hover:text-blue-500" : "hover:text-blue-600"} transition-colors duration-300 text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} px-1 sm:px-2 bg-transparent`}
                  >
                    {t('header.projects')}
                  </Link>
                </span>

                <a
                  href="https://t.me/+998770884977"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{...textStyle, ...buttonStyle}}
                  className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} hover:opacity-90 transition-opacity transition-colors duration-300 ${isScrolled ? "border border-black bg-white text-black" : (shouldUseBlackTheme && !isMobileScreen ? "border border-black bg-black text-white" : "border border-white bg-transparent text-white")}`}
                >
                  {t('header.bookSession')}
                </a>

                {/* Language Switcher */}
                <div className={`flex items-center ml-2 ${isLaptopScreen ? 'md:ml-1' : 'md:ml-3 lg:ml-4 xl:ml-6'}`}>
                  <LanguageSwitcher useBlackTheme={shouldUseBlackTheme} isScrolled={isScrolled} />
                </div>

                {/* Hamburger / close */}
                <button
                  className={`flex items-center justify-center hover:opacity-75 transition-opacity ml-2 sm:ml-3 ${isLaptopScreen ? 'md:ml-2' : 'md:ml-4 lg:ml-5 xl:ml-6'}`}
                  onClick={toggleMenu}
                >
                  <span
                    style={buttonStyle}
                    className={`flex items-center space-x-1 border px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} ${isScrolled ? "border-black bg-white text-black" : (shouldUseBlackTheme ? "border-black bg-black text-white" : "border-white bg-transparent text-white")}`}
                  >
                    {isMobileMenuOpen ? 
                      <X size={isLaptopScreen ? 16 : 18} className={`${isLaptopScreen ? 'md:w-4 md:h-4' : 'lg:w-5 lg:h-5 xl:w-6 xl:h-6'}`} /> : 
                      <Menu size={isLaptopScreen ? 16 : 18} className={`${isLaptopScreen ? 'md:w-4 md:h-4' : 'lg:w-5 lg:h-5 xl:w-6 xl:h-6'}`} />
                    }
                    <span style={textStyle} className={`text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'}`}>
                      {t('header.menu')}
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile toggle with proper background handling */}
            <div className="md:hidden flex items-center space-x-4 pr-4 sm:pr-6">
              {/* Mobile Language Switcher */}
              <LanguageSwitcher useBlackTheme={false} />
              
              <button
                className="flex items-center justify-center"
                onClick={toggleMenu}
              >
                <span className="flex items-center space-x-1 border border-black bg-white text-black px-2 py-1.5 h-[38px] sm:h-[42px]">
                  {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                  <span className="text-xs sm:text-sm">{t('header.menu')}</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMenu} />
      </header>
    </>
  );
};

export default Header;