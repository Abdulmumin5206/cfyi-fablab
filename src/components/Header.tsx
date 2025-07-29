import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollPosRef = useRef(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Helper function to normalize paths (handles both with and without trailing slashes)
  const normalizePath = (path: string) => {
    // Special handling for root path
    if (path === "/" && (location.pathname === "/" || location.pathname === "")) {
      return true;
    }
    
    const currentPath = location.pathname;
    return currentPath === path || currentPath === `${path}/`;
  };
  
  // Check if path starts with a certain prefix
  const pathStartsWith = (prefix: string) => {
    return location.pathname.startsWith(prefix);
  };
  
  const is3DPrintingPage = normalizePath("/3d-printing");
  const is3DPrintingBlogPost = normalizePath("/blog/3d-printing-innovations");
  const isBlogPage = normalizePath("/blog") || pathStartsWith("/blog/");
  const isCoursesPage = normalizePath("/courses");
  const is3DScanningPage = normalizePath("/3d-scanning");
  const isHomePage = normalizePath("/");
  
  // const shouldUseBlackTheme = is3DPrintingBlogPost || isBlogPage;
  // Blog pages should use the same theme as 3D scanning (white background, black text)
  const shouldUseBlackTheme = false; // force black theme off for all pages
  // Blog and 3D scanning pages: white background, black text
  const shouldUseWhiteText = is3DPrintingPage && !isScrolled;
  const shouldUseBlackText = (isCoursesPage || is3DScanningPage || isBlogPage) && !isScrolled;
  
  // Track window width for responsive design
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // More flexible laptop detection
  const isLaptopScreen = windowWidth < 1280; // xl breakpoint
  const isMobileScreen = windowWidth < 768; // md breakpoint
  const isTabletScreen = windowWidth <= 1024; // lg breakpoint

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
      setIsVisible(prevScrollPosRef.current > y || y < 10);
      setIsScrolled(y > 10);
      prevScrollPosRef.current = y;
    };

    // Run once on mount to set correct state after refresh
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    height: windowWidth < 768 ? '65px' : windowWidth < 1024 ? '70px' : '75px'
  } : {};

  const logoStyle = isLaptopScreen ? {
    maxHeight: windowWidth < 768 ? '50px' : windowWidth < 1024 ? '55px' : '60px'
  } : {};

  const textStyle = isLaptopScreen ? {
    fontSize: windowWidth < 768 ? '0.875rem' : windowWidth < 1024 ? '0.9375rem' : '1rem'
  } : {};

  const buttonStyle = isLaptopScreen ? {
    padding: windowWidth < 768 ? '0.375rem 0.75rem' : windowWidth < 1024 ? '0.4375rem 0.875rem' : '0.5rem 1rem'
  } : {};
  
  // Position dropdown based on header height
  const getDropdownPosition = () => {
    if (windowWidth < 768) {
      return '50px'; // mobile
    } else if (windowWidth < 1024) {
      return '60px'; // tablet
    } else if (windowWidth < 1440) {
      return '65px'; // laptop
    } else {
      return '70px'; // desktop
    }
  };
  
  const servicesMenuStyle = {
    top: getDropdownPosition()
  };

  // Add scroll handler for membership section
  const handleMembershipClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're not on the main page, navigate to it first
    if (location.pathname !== '/') {
      navigate('/');
      // Store the intent to scroll to membership in sessionStorage
      sessionStorage.setItem('scrollToMembership', 'true');
    } else {
      // If we're already on the main page, just scroll
      const membershipSection = document.getElementById('membership-section');
      if (membershipSection) {
        membershipSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Add effect to handle scrolling after navigation
  useEffect(() => {
    if (location.pathname === '/' && sessionStorage.getItem('scrollToMembership') === 'true') {
      const membershipSection = document.getElementById('membership-section');
      if (membershipSection) {
        membershipSection.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear the scroll intent
      sessionStorage.removeItem('scrollToMembership');
    }
  }, [location.pathname]);

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
            className={`flex justify-between items-center h-12 sm:h-16 ${isLaptopScreen ? 'md:h-[65px]' : 'md:h-20 lg:h-24'} transition-colors duration-300`}
          >
            {/* Logo */}
            <div
              className={`h-full flex items-center pl-3 sm:pl-4 ${isLaptopScreen ? 'md:pl-6' : 'md:pl-8 lg:pl-12 xl:pl-16'} transition-colors duration-300`}
            >
              <Link 
                to="/" 
                className="block h-full py-2"
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
                  className={`h-full w-auto max-h-14 sm:max-h-16 ${isLaptopScreen ? 'md:max-h-9' : 'md:max-h-12 lg:max-h-16'} object-contain`}
                />
              </Link>
            </div>

            {/* Main right-side nav (measured) */}
            <div
              ref={rightNavRef}
              className={`transition-colors duration-300 ${shouldUseBlackTheme && !isMobileScreen ? "bg-black" : "bg-transparent"} px-2 sm:px-3 ${isLaptopScreen ? 'md:px-4' : 'md:px-6 lg:px-8 xl:px-16'} h-full`}
            >
              <div className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-4 h-full">
                {/* Services link with dropdown */}
                <div className="relative" onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
                  <span
                    style={buttonStyle}
                    className={`flex items-center space-x-1 border px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} ${isScrolled ? "border-black bg-transparent text-black" : (shouldUseBlackTheme && !isMobileScreen ? "border-black bg-black text-white" : shouldUseWhiteText ? "border-white bg-transparent text-white" : shouldUseBlackText ? "border-black bg-transparent text-black" : "border-white bg-transparent text-white")}`}
                  >
                    <button
                      ref={servicesButtonRef}
                      style={textStyle}
                      className={`flex items-center h-full ${isScrolled ? "text-black" : shouldUseWhiteText ? "text-white" : shouldUseBlackText ? "text-black" : "text-white"} hover:text-[#329db7] transition-colors duration-300 text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} px-1 sm:px-2 bg-transparent`}
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
                      width: '240px',
                      top: '100%',
                      left: 0
                    }}
                  >
                    <div className={`${isScrolled || shouldUseBlackText ? 'bg-white' : 'bg-transparent'} shadow-lg w-full transform transition-transform duration-300 ease-out origin-top border-b ${isScrolled || shouldUseBlackText ? 'border-b-black' : 'border-b-white'}`}
                         style={{ 
                           transform: servicesMenuOpen ? 'translateY(0)' : 'translateY(-100%)'
                         }}>
                      <div className="flex flex-col">
                        <Link
                          to="/mould"
                          style={textStyle}
                          className={`flex items-center ${isScrolled || shouldUseBlackText ? 'text-black' : 'text-white'} hover:text-white ${isScrolled || shouldUseBlackText ? 'bg-white hover:bg-[#0e9a48]' : 'bg-transparent hover:bg-[#0e9a48]'} transition-all duration-300 ${i18n.language === 'ru' || i18n.language === 'uz' ? 'text-xs lg:text-sm' : 'text-sm lg:text-base'} p-4 w-full border-b ${isScrolled || shouldUseBlackText ? 'border-black' : 'border-white'} last:border-b-0`}
                        >
                          {t('serviceCategories.molding.title')}
                        </Link>
                        <Link
                          to="/3d-printing"
                          style={textStyle}
                          className={`flex items-center ${isScrolled || shouldUseBlackText ? 'text-black' : 'text-white'} hover:text-white ${isScrolled || shouldUseBlackText ? 'bg-white hover:bg-[#cb2026]' : 'bg-transparent hover:bg-[#cb2026]'} transition-all duration-300 ${i18n.language === 'ru' || i18n.language === 'uz' ? 'text-xs lg:text-sm' : 'text-sm lg:text-base'} p-4 w-full border-b ${isScrolled || shouldUseBlackText ? 'border-black' : 'border-white'} last:border-b-0`}
                        >
                          {t('serviceCategories.3dPrinting.title')}
                        </Link>
                        <Link
                          to="/digital-fabrication"
                          style={textStyle}
                          className={`flex items-center ${isScrolled || shouldUseBlackText ? 'text-black' : 'text-white'} hover:text-white ${isScrolled || shouldUseBlackText ? 'bg-white hover:bg-[#35469d]' : 'bg-transparent hover:bg-[#35469d]'} transition-all duration-300 ${i18n.language === 'ru' || i18n.language === 'uz' ? 'text-xs lg:text-sm' : 'text-sm lg:text-base'} p-4 w-full border-b ${isScrolled || shouldUseBlackText ? 'border-black' : 'border-white'} last:border-b-0`}
                        >
                          {t('serviceCategories.digitalFabrication.title')}
                        </Link>
                        <Link
                          to="/digital-fabrication#precision-manufacturing"
                          style={textStyle}
                          className={`flex items-center ${isScrolled || shouldUseBlackText ? 'text-black' : 'text-white'} hover:text-white ${isScrolled || shouldUseBlackText ? 'bg-white hover:bg-[#8a2be2]' : 'bg-transparent hover:bg-[#8a2be2]'} transition-all duration-300 ${i18n.language === 'ru' || i18n.language === 'uz' ? 'text-xs lg:text-sm' : 'text-sm lg:text-base'} p-4 w-full border-b ${isScrolled || shouldUseBlackText ? 'border-black' : 'border-white'} last:border-b-0`}
                        >
                          {t('serviceCategories.precisionManufacturing.title')}
                        </Link>
                        <Link
                          to="/3d-scanning"
                          style={textStyle}
                          className={`flex items-center ${isScrolled || shouldUseBlackText ? 'text-black' : 'text-white'} hover:text-white ${isScrolled || shouldUseBlackText ? 'bg-white hover:bg-[#ff6b6b]' : 'bg-transparent hover:bg-[#ff6b6b]'} transition-all duration-300 ${i18n.language === 'ru' || i18n.language === 'uz' ? 'text-xs lg:text-sm' : 'text-sm lg:text-base'} p-4 w-full border-b ${isScrolled || shouldUseBlackText ? 'border-black' : 'border-white'} last:border-b-0`}
                        >
                          {t('serviceCategories.3dScanning.title')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other top-level links */}
                {/* Wrap About Us link in a styled span */}
                <span
                  style={{...textStyle, ...buttonStyle}}
                  className={`flex items-center space-x-1 border px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} ${isScrolled ? "border-black bg-transparent text-black" : (shouldUseBlackTheme && !isMobileScreen ? "border-black bg-black text-white" : shouldUseWhiteText ? "border-white bg-transparent text-white" : shouldUseBlackText ? "border-black bg-transparent text-black" : "border-white bg-transparent text-white")}`}
                >
                  <Link
                    to="/about-us"
                    style={textStyle}
                    className={`${isScrolled ? "text-black" : shouldUseWhiteText ? "text-white" : shouldUseBlackText ? "text-black" : "text-white"} hover:text-[#329db7] transition-colors duration-300 text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} px-1 sm:px-2 bg-transparent`}
                  >
                    {t('header.aboutUs')}
                  </Link>
                </span>

                {/* Wrap Projects link in a styled span */}
                <span
                  style={{...textStyle, ...buttonStyle}}
                  className={`flex items-center space-x-1 border px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} ${isScrolled ? "border-black bg-transparent text-black" : (shouldUseBlackTheme && !isMobileScreen ? "border-black bg-black text-white" : shouldUseWhiteText ? "border-white bg-transparent text-white" : shouldUseBlackText ? "border-black bg-transparent text-black" : "border-white bg-transparent text-white")}`}
                >
                  <Link
                    to="/blog"
                    style={textStyle}
                    className={`${isScrolled ? "text-black" : shouldUseWhiteText ? "text-white" : shouldUseBlackText ? "text-black" : "text-white"} hover:text-[#329db7] transition-colors duration-300 text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} px-1 sm:px-2 bg-transparent`}
                  >
                    {t('header.projects')}
                  </Link>
                </span>

                {/* Membership link */}
                <Link
                  to="/#membership"
                  onClick={handleMembershipClick}
                  style={{...textStyle, ...buttonStyle}}
                  className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} hover:text-[#329db7] transition-opacity transition-colors duration-300 ${isScrolled ? "border border-black bg-transparent text-black" : (shouldUseBlackTheme && !isMobileScreen ? "border border-black bg-black text-white" : shouldUseWhiteText ? "border border-white bg-transparent text-white" : shouldUseBlackText ? "border border-black bg-transparent text-black" : "border border-white bg-transparent text-white")}`}
                >
                  {t('navigation.membership')}
                </Link>

                {/* Courses link */}
                <Link
                  to="/courses"
                  style={{...textStyle, ...buttonStyle}}
                  className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} hover:text-[#329db7] transition-opacity transition-colors duration-300 ${isScrolled ? "border border-black bg-transparent text-black" : (shouldUseBlackTheme && !isMobileScreen ? "border border-black bg-black text-white" : shouldUseWhiteText ? "border border-white bg-transparent text-white" : shouldUseBlackText ? "border border-black bg-transparent text-black" : "border border-white bg-transparent text-white")}`}
                >
                  {t('navigation.courses')}
                </Link>

                {/* Language Switcher */}
                <div className={`flex items-center ml-2 ${isLaptopScreen ? 'md:ml-1' : 'md:ml-3 lg:ml-4 xl:ml-6'}`}>
                  <LanguageSwitcher useBlackTheme={shouldUseBlackTheme} isScrolled={isScrolled} isLaptopScreen={isLaptopScreen} shouldUseBlackText={shouldUseBlackText} />
                </div>

                {/* Hamburger / close */}
                <button
                  className={`flex items-center justify-center hover:text-[#329db7] transition-opacity ml-2 sm:ml-3 ${isLaptopScreen ? 'md:ml-2' : 'md:ml-4 lg:ml-5 xl:ml-6'}`}
                  onClick={toggleMenu}
                >
                  <span
                    style={buttonStyle}
                    className={`flex items-center space-x-1 border px-2 sm:px-3 py-1.5 sm:py-2 h-[38px] sm:h-[42px] ${isLaptopScreen ? 'md:h-[38px]' : 'lg:h-[42px] xl:h-[46px]'} text-sm ${isLaptopScreen ? 'md:text-sm' : 'lg:text-base xl:text-lg'} ${isScrolled ? "border-black bg-transparent text-black" : (shouldUseBlackTheme ? "border-black bg-black text-white" : shouldUseWhiteText ? "border-white bg-transparent text-white" : shouldUseBlackText ? "border-black bg-transparent text-black" : "border-white bg-transparent text-white")}`}
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
              <LanguageSwitcher useBlackTheme={false} isScrolled={isScrolled} isLaptopScreen={isLaptopScreen} shouldUseBlackText={shouldUseBlackText} />
              
              <button
                className="flex items-center justify-center"
                onClick={toggleMenu}
              >
                <span className={`flex items-center space-x-1 border px-2 py-1.5 h-[38px] sm:h-[42px] ${
                  isScrolled ? 'border-black text-black bg-transparent' : (shouldUseBlackText ? 'border-black text-black bg-transparent' : 'border-white text-white bg-transparent')
                }`}>
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