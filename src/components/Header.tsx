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

  // ref + state for measuring the main nav width
  const navRef = useRef<HTMLDivElement>(null);
  const [navWidth, setNavWidth] = useState(0);
  
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

  // Handle services menu hover behavior
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
    setIsMobileMenuOpen((o) => !o);
    document.body.style.overflow = isMobileMenuOpen ? "" : "hidden";
  };
  
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const openServicesMenu = () => setServicesMenuOpen(true);
  const closeServicesMenu = () => setServicesMenuOpen(false);

  // This timeout helps with more natural hover behavior
  let hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleServicesMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    openServicesMenu();
  };

  const handleServicesMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      closeServicesMenu();
    }, 150); // Small delay to make the interaction feel natural
  };

  // Dynamic styling for laptop screens
  const headerStyle = isLaptopScreen ? {
    height: '75px'
  } : {};

  const logoStyle = isLaptopScreen ? {
    maxHeight: '50px'
  } : {};

  const textStyle = isLaptopScreen ? {
    fontSize: '0.9375rem' // 15px
  } : {};

  const buttonStyle = isLaptopScreen ? {
    padding: '0.375rem 0.75rem' // slightly larger padding
  } : {};
  
  // Position dropdown based on header height
  const getDropdownPosition = () => {
    if (isLaptopScreen) {
      return '75px';
    } else {
      // Standard breakpoints
      if (windowWidth < 640) {
        return '4rem'; // sm
      } else if (windowWidth < 768) {
        return '5rem'; // md
      } else if (windowWidth < 1024) {
        return '6rem'; // lg
      } else {
        return '7rem'; // xl
      }
    }
  };
  
  const servicesMenuStyle = {
    top: getDropdownPosition()
  };

  return (
    <>
      {/* Main header */}
      <header
        className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="relative">
          <div
            style={headerStyle}
            className={`flex justify-between items-center h-16 sm:h-20 ${isLaptopScreen ? 'md:h-[75px]' : 'md:h-24 lg:h-28'} transition-colors duration-300 ${
              isScrolled ? "bg-white shadow-md" : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <div
              className={`h-full flex items-center pl-4 sm:pl-6 ${isLaptopScreen ? 'md:pl-8' : 'md:pl-10 lg:pl-16 xl:pl-20'} transition-colors duration-300 ${
                isScrolled ? "bg-white" : "bg-transparent"
              }`}
            >
              <Link to="/" className="block h-full py-3">
                <img
                  style={logoStyle}
                  src="/fablab/logo.png"
                  alt="FabLab Logo"
                  className={`h-full w-auto max-h-8 sm:max-h-10 ${isLaptopScreen ? 'md:max-h-10' : 'md:max-h-16 lg:max-h-20'} object-contain`}
                />
              </Link>
            </div>

            {/* Main right-side nav (measured) - Only apply black bg on non-mobile */}
            <div
              ref={navRef}
              className={`transition-colors duration-300 ${
                shouldUseBlackTheme && !isMobileScreen ? "bg-black" : isScrolled ? "bg-white" : "bg-transparent md:bg-white"
              } px-3 sm:px-4 ${isLaptopScreen ? 'md:px-6' : 'md:px-8 lg:px-12 xl:px-20'} h-full`}
            >
              <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-8 h-full">
                {/* Services link with dropdown */}
                <div 
                  className="relative group h-full"
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                >
                  <button
                    ref={servicesButtonRef}
                    style={textStyle}
                    className={`flex items-center h-full ${shouldUseBlackTheme ? "text-white group-hover:text-blue-500" : "text-black group-hover:text-blue-600"} transition-colors text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} px-1 sm:px-2`}
                    onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                  >
                    {t('header.services')}
                    <ChevronDown className={`ml-1 h-4 w-4 ${isLaptopScreen ? 'md:h-4 md:w-4' : 'lg:h-5 lg:w-5'} transition-transform duration-200 ${servicesMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Other top-level links */}
                <Link
                  to="/about-fablab"
                  style={textStyle}
                  className={`${shouldUseBlackTheme ? "text-white hover:text-blue-500" : "text-black hover:text-blue-600"} transition-colors text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} px-1 sm:px-2`}
                >
                  {t('header.aboutFablab')}
                </Link>
                <Link
                  to="/projects"
                  style={textStyle}
                  className={`${shouldUseBlackTheme ? "text-white hover:text-blue-500" : "text-black hover:text-blue-600"} transition-colors text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} px-1 sm:px-2`}
                >
                  {t('header.projects')}
                </Link>
                <Link
                  to="/book-session"
                  style={{...textStyle, ...buttonStyle}}
                  className={`bg-blue-600 text-white border border-blue-600 px-2 sm:px-3 ${isLaptopScreen ? 'md:px-3 md:py-1.5' : 'lg:px-4 xl:px-6'} py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} hover:opacity-90 transition-opacity`}
                >
                  {t('header.bookSession')}
                </Link>

                {/* Language Switcher */}
                <div className={`flex items-center ml-2 ${isLaptopScreen ? 'md:ml-1' : 'md:ml-3 lg:ml-4 xl:ml-6'}`}>
                  <LanguageSwitcher useBlackTheme={shouldUseBlackTheme} />
                </div>

                {/* Hamburger / close */}
                <button
                  className={`flex items-center justify-center hover:opacity-75 transition-opacity ml-2 sm:ml-3 ${isLaptopScreen ? 'md:ml-2' : 'md:ml-4 lg:ml-5 xl:ml-6'}`}
                  onClick={toggleMenu}
                >
                  <span 
                    style={buttonStyle}
                    className={`flex items-center space-x-1 border ${shouldUseBlackTheme ? "border-white" : "border-black"} px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} ${shouldUseBlackTheme ? "bg-black text-white" : "bg-white text-black"}`}
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

      {/* Secondary bar: exactly navWidth, three equal sections */}
      <div
        ref={servicesMenuRef}
        className={`fixed right-0 z-40 overflow-hidden transition-all duration-500 ease-in-out ${
          servicesMenuOpen ? "max-h-[350px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
        style={{ 
          width: navWidth > 0 ? navWidth : 'auto',
          top: getDropdownPosition()
        }}
        onMouseEnter={handleServicesMouseEnter}
        onMouseLeave={handleServicesMouseLeave}
      >
        <div className="bg-gray-100 shadow-md w-full transform transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top" 
             style={{ 
               transform: servicesMenuOpen ? 'translateY(0)' : 'translateY(-100%)'
             }}>
          <div className={`grid grid-cols-3 min-h-[4rem] sm:min-h-[5rem] ${isLaptopScreen ? 'md:min-h-[4.5rem]' : 'md:min-h-[6rem] lg:min-h-[7rem]'} items-stretch`}>
            <Link
              to="/mould"
              style={textStyle}
              className={`col-span-1 flex items-center justify-center text-black hover:text-white bg-gray-100 hover:bg-[#0e9a48] transition-all duration-300 text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} transform transition-transform hover:scale-105 hover:shadow-lg ease-out p-4 w-full h-full`}
            >
              {t('header.mould')}
            </Link>
            <Link
              to="/3d-printing"
              style={textStyle}
              className={`col-span-1 flex items-center justify-center text-black hover:text-white bg-gray-100 hover:bg-[#cb2026] transition-all duration-300 text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} transform transition-transform hover:scale-105 hover:shadow-lg ease-out delay-[100ms] p-4 w-full h-full`}
            >
              {t('header.3dPrinting')}
            </Link>
            <Link
              to="/prototyping"
              style={textStyle}
              className={`col-span-1 flex items-center justify-center text-black hover:text-white bg-gray-100 hover:bg-[#35469d] transition-all duration-300 text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} transform transition-transform hover:scale-105 hover:shadow-lg ease-out delay-[200ms] p-4 w-full h-full`}
            >
              {t('header.prototyping')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;