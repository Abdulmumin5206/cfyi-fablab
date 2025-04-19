import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import MobileMenu from "./MobileMenu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Show header when scrolling up, hide when scrolling down
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      // Set scrolled state when not at top
      setIsScrolled(currentScrollPos > 10);
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={`w-full fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[100%] opacity-0'
    }`}>
      {/* White background container for logo side */}
      <div className={`absolute top-0 left-0 h-full bg-white transition-opacity duration-500 ease-in-out ${
        isScrolled ? 'opacity-100 w-[45%]' : 'opacity-0 w-[45%]'
      } py-16`}></div>

      <div className="relative w-full">
        <div className="container mx-auto flex justify-between items-center py-4 px-0">
          {/* Logo */}
          <div className="h-20 w-auto z-50 -ml-16 md:-ml-24 mt-2">
            <img
              src="/fablab/logo.png"
              alt="FabLab Logo"
              className="h-full w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="absolute top-0 right-0 h-full bg-white py-16">
              <div className="flex items-center h-full px-24">
                <div className="flex items-center space-x-12">
                  <div className="relative group">
                    <Link to="/" className="text-black hover:text-brand-red text-base flex items-center">
                      All Products
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Link>
                    <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible flex top-[75px] -left-24 right-[-1200px] bg-gray-100 shadow-lg z-50 transition-all duration-300 ease-in-out transform origin-top scale-95 group-hover:scale-100 hover:opacity-100 hover:visible delay-100">
                      <div className="w-full h-full absolute inset-0 -m-4">
                        {/* Invisible padding area to increase hover space */}
                      </div>
                      <div className="container mx-auto grid grid-cols-3 gap-8">
                        <Link to="/" className="flex items-center justify-center text-2xl font-normal hover:bg-white transition-colors duration-300 h-[88px]">
                          Fibres & Fillings
                        </Link>
                        <Link to="/" className="flex items-center justify-center text-2xl font-normal hover:bg-white transition-colors duration-300 h-[88px]">
                          Non-Wovens
                        </Link>
                        <Link to="/" className="flex items-center justify-center text-2xl font-normal hover:bg-white transition-colors duration-300 h-[88px]">
                          Textile Engineering
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-12">
                    <Link to="/" className="text-black hover:text-brand-red text-base">Markets</Link>
                    <Link to="/" className="text-black hover:text-brand-red text-base">Brands</Link>
                    <Link to="/" className="text-black hover:text-brand-red text-base">Sustainability</Link>
                    <Link to="/" className="text-black hover:text-brand-red text-base">Projects</Link>
                    <Link to="/" className="text-black hover:text-brand-red text-base">Our Story</Link>
                    <Link to="/" className="bg-[#E6DB00] text-black px-8 py-5 text-base">
                      Product Finder
                    </Link>
                    <div className="border-l border-gray-200 pl-9">
                      <button
                        className="flex items-center justify-center hover:opacity-75 transition-opacity"
                        onClick={handleMenuToggle}
                      >
                        <span className="flex items-center space-x-2 border border-black px-3 py-4">
                          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                          <span className="text-base">Menu</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile menu button - only show on mobile */}
          <button
            className="md:hidden flex items-center justify-center p-2"
            onClick={handleMenuToggle}
          >
            <span className="flex items-center space-x-1 border border-black px-2 py-1">
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              <span className="text-sm">Menu</span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
    </header>
  );
};

export default Header;
