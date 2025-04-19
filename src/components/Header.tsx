
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-white border-b">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <div className="flex items-center">
          <Link to="/" className="mr-8">
            <div className="text-2xl font-bold">
              Think<span className="text-sm">:</span>
              <span className="text-sm font-normal">Group</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div ref={dropdownRef} className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 py-2 hover:text-brand-red transition-colors"
              >
                <span>All Products</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              <div
                className={`absolute top-full left-0 w-screen bg-white shadow-lg z-50 transition-all duration-300 origin-top ${
                  isDropdownOpen
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
                }`}
              >
                <div className="container mx-auto grid grid-cols-3 gap-8 p-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Fibres & Fillings</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/" className="hover:text-brand-red transition-colors">
                          Hollow Conjugate Fibres
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="hover:text-brand-red transition-colors">
                          Carded Fibres
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="hover:text-brand-red transition-colors">
                          Polyester Fibres
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="hover:text-brand-red transition-colors">
                          Natural Fibres
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">Non-Wovens</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/" className="hover:text-brand-red transition-colors">
                          SpringBond®
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="hover:text-brand-red transition-colors">
                          SpringBond UltraFlex®
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="hover:text-brand-red transition-colors">
                          PU Foam Replacements
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="hover:text-brand-red transition-colors">
                          Thermal Insulation
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">Textile Engineering</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/" className="hover:text-brand-red transition-colors">
                          Fibre Cusion Machines
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="hover:text-brand-red transition-colors">
                          Fabric Inspection Tables
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="hover:text-brand-red transition-colors">
                          Engineering Services
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="hover:text-brand-red transition-colors">
                          Emergency Repairs
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/" className="hover:text-brand-red transition-colors py-2">
              Markets
            </Link>
            <Link to="/" className="hover:text-brand-red transition-colors py-2">
              Brands
            </Link>
            <Link to="/" className="hover:text-brand-red transition-colors py-2">
              Sustainability
            </Link>
            <Link to="/" className="hover:text-brand-red transition-colors py-2">
              Projects
            </Link>
            <Link to="/" className="hover:text-brand-red transition-colors py-2">
              Our Story
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/" className="hidden md:block bg-brand-yellow text-black px-6 py-2">
            Product Finder
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center p-2"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
