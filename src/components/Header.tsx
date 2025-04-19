import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import MobileMenu from "./MobileMenu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-transparent relative z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <div className="flex items-center">
          <Link to="/" className="mr-8">
            <div className="text-2xl font-bold">
              Think<span className="text-sm">:</span>
              <span className="text-sm font-normal">Group</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="bg-white absolute left-[15%] right-0 top-0 h-full">
              <div className="flex items-center h-full space-x-8 px-8">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-base font-normal">
                        All Products
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid grid-cols-3 gap-8 p-8 w-screen bg-gray-100">
                          <div>
                            <h3 className="text-xl mb-4">Fibres & Fillings</h3>
                            <ul className="space-y-2">
                              <li><Link to="/" className="hover:text-brand-red">Hollow Conjugate Fibres</Link></li>
                              <li><Link to="/" className="hover:text-brand-red">Carded Fibres</Link></li>
                              <li><Link to="/" className="hover:text-brand-red">Polyester Fibres</Link></li>
                              <li><Link to="/" className="hover:text-brand-red">Natural Fibres</Link></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xl mb-4">Non-Wovens</h3>
                            <ul className="space-y-2">
                              <li><Link to="/" className="hover:text-brand-red">SpringBond®</Link></li>
                              <li><Link to="/" className="hover:text-brand-red">SpringBond UltraFlex®</Link></li>
                              <li><Link to="/" className="hover:text-brand-red">PU Foam Replacements</Link></li>
                              <li><Link to="/" className="hover:text-brand-red">Thermal Insulation</Link></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xl mb-4">Textile Engineering</h3>
                            <ul className="space-y-2">
                              <li><Link to="/" className="hover:text-brand-red">Fibre Cusion Machines</Link></li>
                              <li><Link to="/" className="hover:text-brand-red">Fabric Inspection Tables</Link></li>
                              <li><Link to="/" className="hover:text-brand-red">Engineering Services</Link></li>
                              <li><Link to="/" className="hover:text-brand-red">Emergency Repairs</Link></li>
                            </ul>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                
                <Link to="/" className="hover:text-brand-red">Markets</Link>
                <Link to="/" className="hover:text-brand-red">Brands</Link>
                <Link to="/" className="hover:text-brand-red">Sustainability</Link>
                <Link to="/" className="hover:text-brand-red">Projects</Link>
                <Link to="/" className="hover:text-brand-red">Our Story</Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/" className="bg-[#E6DB00] text-black px-6 py-2">
            Product Finder
          </Link>

          {/* Menu button - now visible on both mobile and desktop */}
          <button
            className="flex items-center justify-center p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="flex items-center space-x-1 border border-black px-2 py-1">
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              <span className="text-sm">Menu</span>
            </span>
          </button>
        </div>
      </div>

      {/* Menu - now works for both mobile and desktop */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
