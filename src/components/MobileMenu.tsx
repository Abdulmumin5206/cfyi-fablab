
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="container mx-auto px-4 py-6 h-full overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          <div className="mb-6">
            <div
              className="flex items-center justify-between py-3 border-b"
              onClick={() => toggleCategory("products")}
            >
              <span className="text-xl font-medium">All Products</span>
              {expandedCategory === "products" ? (
                <ChevronDown className="text-gray-500" />
              ) : (
                <ChevronRight className="text-gray-500" />
              )}
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expandedCategory === "products" ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="py-3 pl-4">
                <h3 className="font-bold mb-2">Fibres & Fillings</h3>
                <ul className="space-y-2 mb-4">
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-brand-red">
                      Hollow Conjugate Fibres
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-brand-red">
                      Carded Fibres
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-brand-red">
                      Polyester Fibres
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-brand-red">
                      Natural Fibres
                    </Link>
                  </li>
                </ul>

                <h3 className="font-bold mb-2">Non-Wovens</h3>
                <ul className="space-y-2 mb-4">
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-brand-red">
                      SpringBond®
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-brand-red">
                      SpringBond UltraFlex®
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-brand-red">
                      PU Foam Replacements
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-brand-red">
                      Thermal Insulation
                    </Link>
                  </li>
                </ul>

                <h3 className="font-bold mb-2">Textile Engineering</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-brand-red">
                      Fibre Cusion Machines
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-brand-red">
                      Fabric Inspection Tables
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-brand-red">
                      Engineering Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-brand-red">
                      Emergency Repairs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Link to="/" className="py-3 text-xl border-b" onClick={onClose}>
            Markets
          </Link>
          <Link to="/" className="py-3 text-xl border-b" onClick={onClose}>
            Brands
          </Link>
          <Link to="/" className="py-3 text-xl border-b" onClick={onClose}>
            Sustainability
          </Link>
          <Link to="/" className="py-3 text-xl border-b" onClick={onClose}>
            Projects
          </Link>
          <Link to="/" className="py-3 text-xl border-b" onClick={onClose}>
            Our Story
          </Link>

          <Link
            to="/"
            className="bg-brand-yellow text-black text-center text-xl py-3 mt-4"
            onClick={onClose}
          >
            Product Finder
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
