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

  // ref + state for measuring the main nav width
  const navRef = useRef<HTMLDivElement>(null);
  const [navWidth, setNavWidth] = useState(0);
  
  // Update nav width when language changes too
  useEffect(() => {
    const updateNavWidth = () => {
      if (navRef.current) setNavWidth(navRef.current.offsetWidth);
    };
    
    // Initial update
    updateNavWidth();
    
    // Update on resize
    window.addEventListener("resize", updateNavWidth);
    
    // Force recalculation after a brief delay when language changes
    const timeoutId = setTimeout(updateNavWidth, 100);
    
    return () => {
      window.removeEventListener("resize", updateNavWidth);
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
            className={`flex justify-between items-center h-16 sm:h-20 md:h-24 lg:h-28 transition-colors duration-300 ${
              isScrolled ? "bg-white shadow-md" : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <div
              className={`h-full flex items-center pl-4 sm:pl-6 md:pl-10 lg:pl-16 xl:pl-20 transition-colors duration-300 ${
                isScrolled ? "bg-white" : "bg-transparent"
              }`}
            >
              <Link to="/" className="block h-full py-3">
                <img
                  src="/fablab/logo.png"
                  alt="FabLab Logo"
                  className="h-full w-auto max-h-10 sm:max-h-12 md:max-h-16 lg:max-h-20 object-contain"
                />
              </Link>
            </div>

            {/* Main right-side nav (measured) */}
            <div
              ref={navRef}
              className={`transition-colors duration-300 ${
                shouldUseBlackTheme ? "bg-black" : isScrolled ? "bg-white" : "bg-transparent md:bg-white"
              } px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 h-full`}
            >
              <div className="hidden md:flex items-center space-x-3 lg:space-x-6 xl:space-x-10 h-full">
                {/* Services link with dropdown */}
                <div 
                  className="relative group h-full"
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                >
                  <button
                    ref={servicesButtonRef}
                    className={`flex items-center h-full ${shouldUseBlackTheme ? "text-white group-hover:text-[#f05a28]" : "text-black group-hover:text-brand-red"} transition-colors text-sm lg:text-base xl:text-lg px-1 sm:px-2`}
                    onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                  >
                    {t('header.services')}
                    <ChevronDown className={`ml-1 h-4 w-4 lg:h-5 lg:w-5 transition-transform duration-200 ${servicesMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Other top-level links */}
                <Link
                  to="/about-fablab"
                  className={`${shouldUseBlackTheme ? "text-white hover:text-[#f05a28]" : "text-black hover:text-brand-red"} transition-colors text-sm lg:text-base xl:text-lg px-1 sm:px-2`}
                >
                  {t('header.aboutFablab')}
                </Link>
                <Link
                  to="/projects"
                  className={`${shouldUseBlackTheme ? "text-white hover:text-[#f05a28]" : "text-black hover:text-brand-red"} transition-colors text-sm lg:text-base xl:text-lg px-1 sm:px-2`}
                >
                  {t('header.projects')}
                </Link>
                <Link
                  to="/book-session"
                  className="bg-[#E6DB00] text-black px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-sm lg:text-base xl:text-lg hover:opacity-90 transition-opacity"
                >
                  {t('header.bookSession')}
                </Link>

                {/* Language Switcher */}
                <div className="flex items-center ml-3 md:ml-4 lg:ml-6">
                  <LanguageSwitcher />
                </div>

                {/* Hamburger / close */}
                <button
                  className="flex items-center justify-center hover:opacity-75 transition-opacity ml-3 sm:ml-4 md:ml-5 lg:ml-6"
                  onClick={toggleMenu}
                >
                  <span className={`flex items-center space-x-1 border ${shouldUseBlackTheme ? "border-white" : "border-black"} px-2 sm:px-3 py-1.5 sm:py-2 ${shouldUseBlackTheme ? "bg-black text-white" : "bg-white text-black"}`}>
                    {isMobileMenuOpen ? <X size={18} className="lg:w-5 lg:h-5 xl:w-6 xl:h-6" /> : <Menu size={18} className="lg:w-5 lg:h-5 xl:w-6 xl:h-6" />}
                    <span className="text-sm lg:text-base xl:text-lg">
                      {t('header.menu')}
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden flex items-center space-x-4 pr-4 sm:pr-6">
              {/* Mobile Language Switcher */}
              <LanguageSwitcher />
              
              <button
                className="flex items-center justify-center"
                onClick={toggleMenu}
              >
                <span className={`flex items-center space-x-1 border ${shouldUseBlackTheme ? "border-white bg-black text-white" : "border-black bg-white text-black"} px-2 py-1.5`}>
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
        className={`fixed top-16 sm:top-20 md:top-24 lg:top-28 right-0 z-40 overflow-hidden transition-all duration-500 ease-in-out ${
          servicesMenuOpen ? "max-h-[350px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
        style={{ width: navWidth }}
        onMouseEnter={handleServicesMouseEnter}
        onMouseLeave={handleServicesMouseLeave}
      >
        <div className="bg-gray-100 shadow-md w-full transform transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top" 
             style={{ 
               transform: servicesMenuOpen ? 'translateY(0)' : 'translateY(-100%)'
             }}>
          <div className="flex h-16 sm:h-20 md:h-24 lg:h-28 items-center">
            <Link
              to="/mould"
              className="flex-1 h-full flex items-center justify-center text-black hover:text-white bg-gray-100 hover:bg-[#0e9a48] transition-all duration-300 text-sm lg:text-base xl:text-lg transform transition-transform hover:translate-y-1 ease-out"
            >
              {t('header.mould')}
            </Link>
            <Link
              to="/3d-printing"
              className="flex-1 h-full flex items-center justify-center text-black hover:text-white bg-gray-100 hover:bg-[#cb2026] transition-all duration-300 text-sm lg:text-base xl:text-lg transform transition-transform hover:translate-y-1 ease-out delay-[100ms]"
            >
              {t('header.3dPrinting')}
            </Link>
            <Link
              to="/prototyping"
              className="flex-1 h-full flex items-center justify-center text-black hover:text-white bg-gray-100 hover:bg-[#35469d] transition-all duration-300 text-sm lg:text-base xl:text-lg transform transition-transform hover:translate-y-1 ease-out delay-[200ms]"
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