import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen]     = useState(false);
  const [isVisible, setIsVisible]                   = useState(true);
  const [prevScrollPos, setPrevScrollPos]           = useState(0);
  const [isScrolled, setIsScrolled]                 = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen]     = useState(false);
  const location = useLocation();
  const is3DPrintingPage = location.pathname === "/3d-printing";
  const is3DPrintingBlogPost = location.pathname === "/blog/3d-printing-innovations";
  const shouldUseBlackTheme = is3DPrintingPage || is3DPrintingBlogPost;

  // ref + state for measuring the main nav width
  const navRef = useRef<HTMLDivElement>(null);
  const [navWidth, setNavWidth] = useState(0);
  useEffect(() => {
    const updateNavWidth = () => {
      if (navRef.current) setNavWidth(navRef.current.offsetWidth);
    };
    updateNavWidth();
    window.addEventListener("resize", updateNavWidth);
    return () => window.removeEventListener("resize", updateNavWidth);
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
            className={`flex justify-end items-center h-16 sm:h-18 md:h-20 transition-colors duration-300 ${
              isScrolled ? "bg-white shadow-md" : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <div
              className={`absolute left-0 top-0 h-full flex items-center pl-4 sm:pl-6 md:pl-8 lg:pl-12 transition-colors duration-300 ${
                isScrolled ? "bg-white" : "bg-transparent"
              }`}
            >
              <Link to="/" className="block h-full py-2">
                <img
                  src="/fablab/logo.png"
                  alt="FabLab Logo"
                  className="h-full w-auto max-h-12 sm:max-h-14 md:max-h-16 lg:max-h-20 object-contain"
                />
              </Link>
            </div>

            {/* Main right-side nav (measured) */}
            <div
              ref={navRef}
              className={`transition-colors duration-300 ${
                shouldUseBlackTheme ? "bg-black" : isScrolled ? "bg-white" : "bg-transparent md:bg-white"
              } px-4 sm:px-6 md:px-8 lg:px-12 h-full`}
            >
              <div className="hidden md:flex items-center space-x-4 lg:space-x-8 xl:space-x-12 h-full">
                {/* Services link with dropdown */}
                <div className="relative group h-full">
                  <button
                    className={`flex items-center h-full ${shouldUseBlackTheme ? "text-white group-hover:text-[#f05a28]" : "text-black group-hover:text-brand-red"} transition-colors text-xs sm:text-sm lg:text-base px-2 sm:px-3`}
                    onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                    onMouseEnter={openServicesMenu}
                  >
                    Services
                    <ChevronDown className={`ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 ${servicesMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Other top-level links */}
                <Link
                  to="/engineering"
                  className={`${shouldUseBlackTheme ? "text-white hover:text-[#f05a28]" : "text-black hover:text-brand-red"} transition-colors text-xs sm:text-sm lg:text-base px-2 sm:px-3`}
                >
                  Engineering
                </Link>
                <Link
                  to="/about-fablab"
                  className={`${shouldUseBlackTheme ? "text-white hover:text-[#f05a28]" : "text-black hover:text-brand-red"} transition-colors text-xs sm:text-sm lg:text-base px-2 sm:px-3`}
                >
                  About Fablab
                </Link>
                <Link
                  to="/projects"
                  className={`${shouldUseBlackTheme ? "text-white hover:text-[#f05a28]" : "text-black hover:text-brand-red"} transition-colors text-xs sm:text-sm lg:text-base px-2 sm:px-3`}
                >
                  Projects
                </Link>
                <Link
                  to="/book-session"
                  className="bg-[#E6DB00] text-black px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base hover:opacity-90 transition-opacity"
                >
                  Book a session
                </Link>

                {/* Hamburger / close */}
                <button
                  className="flex items-center justify-center hover:opacity-75 transition-opacity ml-2 sm:ml-4 md:ml-6"
                  onClick={toggleMenu}
                >
                  <span className={`flex items-center space-x-1 sm:space-x-2 border ${shouldUseBlackTheme ? "border-white" : "border-black"} px-3 sm:px-4 py-1.5 sm:py-2 ${shouldUseBlackTheme ? "bg-black text-white" : "bg-white text-black"}`}>
                    {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                    <span className="text-xs sm:text-sm lg:text-base">
                      Menu
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden px-4">
              <button
                className="flex items-center justify-center"
                onClick={toggleMenu}
              >
                <span className={`flex items-center space-x-1 border ${shouldUseBlackTheme ? "border-white bg-black text-white" : "border-black bg-white text-black"} px-2 py-1.5`}>
                  {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                  <span className="text-xs">Menu</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMenu} />
      </header>

      {/* Secondary bar: exactly navWidth, three equal sections */}
      <div
        className={`fixed top-16 sm:top-18 md:top-20 right-0 z-40 transition-all duration-200 ${
          servicesMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ width: navWidth }}
        onMouseEnter={openServicesMenu}
        onMouseLeave={closeServicesMenu}
      >
        <div className="bg-gray-100 shadow-md w-full">
          <div className="flex h-16 sm:h-18 md:h-20 items-center">
            <Link
              to="/mould"
              className="flex-1 h-full flex items-center justify-center text-black hover:text-white bg-gray-100 hover:bg-[#0e9a48] transition-all duration-200 text-xs sm:text-sm lg:text-base"
            >
              Mould
            </Link>
            <Link
              to="/3d-printing"
              className="flex-1 h-full flex items-center justify-center text-black hover:text-white bg-gray-100 hover:bg-[#cb2026] transition-all duration-200 text-xs sm:text-sm lg:text-base"
            >
              3D Printing
            </Link>
            <Link
              to="/prototyping"
              className="flex-1 h-full flex items-center justify-center text-black hover:text-white bg-gray-100 hover:bg-[#35469d] transition-all duration-200 text-xs sm:text-sm lg:text-base"
            >
              Prototyping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
