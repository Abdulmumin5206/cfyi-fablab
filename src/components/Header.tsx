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

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <Link to="/" className="mr-8">
          <div className="text-2xl font-bold text-white">
            Think<span className="text-sm">:</span>
            <span className="text-sm font-normal">Group</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center bg-white px-8 py-2 absolute top-0 right-0 h-full z-50">
            <div className="flex items-center space-x-8">
              <NavigationMenu className="relative">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-base font-normal text-black bg-white hover:bg-gray-50 group">
                      All Products
                    </NavigationMenuTrigger>
                    <div className="absolute left-0 top-[100%] w-full bg-white px-8 py-8 hidden group-hover:block z-40" style={{ width: 'calc(100vw - ((100vw - 1280px) / 2))' }}>
                      <div className="flex justify-between items-center">
                        <div className="text-2xl text-black">Fibres & Fillings</div>
                        <div className="text-2xl text-black">Non-Wovens</div>
                        <div className="text-2xl text-black">Textile Engineering</div>
                      </div>
                    </div>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-black hover:text-brand-red">Markets</Link>
                <Link to="/" className="text-black hover:text-brand-red">Brands</Link>
                <Link to="/" className="text-black hover:text-brand-red">Sustainability</Link>
                <Link to="/" className="text-black hover:text-brand-red">Projects</Link>
                <Link to="/" className="text-black hover:text-brand-red">Our Story</Link>
                <Link to="/" className="bg-[#E6DB00] text-black px-6 py-2">
                  Product Finder
                </Link>
                <div className="border-l border-gray-200 pl-8">
                  <button
                    className="flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <span className="flex items-center space-x-1 border border-black px-2 py-1">
                      {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                      <span className="text-sm">Menu</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile menu button - only show on mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="flex items-center space-x-1 border border-black px-2 py-1">
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            <span className="text-sm">Menu</span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
