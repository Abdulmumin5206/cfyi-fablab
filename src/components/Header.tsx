import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoveringProducts, setIsHoveringProducts] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setIsScrolled(currentScrollPos > 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={`fixed top-0 right-0 w-full z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="relative">
        <div className={`flex justify-end items-center h-16 sm:h-18 md:h-20 transition-colors duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}>
          <div className={`absolute left-0 top-0 h-full flex items-center pl-4 sm:pl-6 md:pl-8 lg:pl-12 transition-colors duration-300 ${
            isScrolled ? 'bg-white' : 'bg-transparent'
          }`}>
            <Link to="/" className="block h-full py-2">
              <img
                src="/fablab/logo.png"
                alt="FabLab Logo"
                className="h-full w-auto max-h-12 sm:max-h-14 md:max-h-16 lg:max-h-20 object-contain"
              />
            </Link>
          </div>

          <div className={`transition-colors duration-300 ${
            isScrolled ? 'bg-white' : 'bg-transparent'
          } md:bg-white px-4 sm:px-6 md:px-8 lg:px-12 h-full`}>
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8 xl:space-x-12 h-full">
              <div 
                className="relative group"
                onMouseEnter={() => setIsHoveringProducts(true)}
                onMouseLeave={() => setIsHoveringProducts(false)}
              >
                <button className="flex items-center text-black hover:text-brand-red transition-colors text-xs sm:text-sm lg:text-base px-2 sm:px-3">
                  Services
                  <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </button>
                
                <div 
                  className={`absolute top-full right-0 w-[250px] sm:w-[300px] bg-white shadow-lg transition-all duration-300 ${
                    isHoveringProducts ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  style={{
                    transform: isHoveringProducts ? 'translateY(0)' : 'translateY(-10px)',
                  }}
                >
                  <div className="py-2">
                    <Link 
                      to="/molds" 
                      className="block px-4 sm:px-6 py-1.5 sm:py-2 text-sm text-black hover:bg-gray-100 transition-colors duration-300"
                    >
                      Molds
                    </Link>
                    <Link 
                      to="/3d-printing" 
                      className="block px-4 sm:px-6 py-1.5 sm:py-2 text-sm text-black hover:bg-gray-100 transition-colors duration-300"
                    >
                      3D Printing
                    </Link>
                    <Link 
                      to="/cad-cam" 
                      className="block px-4 sm:px-6 py-1.5 sm:py-2 text-sm text-black hover:bg-gray-100 transition-colors duration-300"
                    >
                      CAD/CAM
                    </Link>
                  </div>
                </div>
              </div>

              <Link 
                to="/engineering" 
                className="text-black hover:text-brand-red transition-colors text-xs sm:text-sm lg:text-base px-2 sm:px-3"
              >
                Engineering
              </Link>
              <Link 
                to="/about-fablab" 
                className="text-black hover:text-brand-red transition-colors text-xs sm:text-sm lg:text-base px-2 sm:px-3"
              >
                About Fablab
              </Link>
              <Link 
                to="/projects" 
                className="text-black hover:text-brand-red transition-colors text-xs sm:text-sm lg:text-base px-2 sm:px-3"
              >
                Projects
              </Link>

              <Link 
                to="/book-session" 
                className="bg-[#E6DB00] text-black px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base hover:opacity-90 transition-opacity"
              >
                Book a session
              </Link>

              <button
                className="flex items-center justify-center hover:opacity-75 transition-opacity ml-2 sm:ml-4 md:ml-6"
                onClick={handleMenuToggle}
              >
                <span className="flex items-center space-x-1 sm:space-x-2 border border-black px-3 sm:px-4 py-1.5 sm:py-2 bg-white">
                  {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                  <span className="text-xs sm:text-sm lg:text-base">Menu</span>
                </span>
              </button>
            </div>
          </div>

          <div className="md:hidden px-4">
            <button
              className="flex items-center justify-center"
              onClick={handleMenuToggle}
            >
              <span className="flex items-center space-x-1 border border-black px-2 py-1.5 bg-white">
                {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                <span className="text-xs">Menu</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
    </header>
  );
};

export default Header;