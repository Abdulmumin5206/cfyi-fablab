
import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div
      className={`fixed inset-0 bg-black z-50 transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="container mx-auto h-full">
        <div className="flex justify-between items-center p-4">
          <Link to="/" className="text-white" onClick={onClose}>
            <div className="text-2xl font-bold">
              Think<span className="text-sm">:</span>
              <span className="text-sm font-normal">Group</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="bg-[#E6DB00] text-black px-6 py-2">
              Product Finder
            </Link>
            <button
              onClick={onClose}
              className="text-white border border-white px-2 py-1 flex items-center gap-2"
            >
              <X size={16} />
              <span className="text-sm">Close</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 p-8 text-white">
          <div className="space-y-6">
            <Link to="/" className="block text-3xl hover:text-[#E6DB00]">All Products</Link>
            <Link to="/" className="block text-3xl hover:text-[#E6DB00]">Markets</Link>
            <Link to="/" className="block text-3xl hover:text-[#E6DB00]">Brands</Link>
            <Link to="/" className="block text-3xl hover:text-[#E6DB00]">Sustainability</Link>
            <Link to="/" className="block text-3xl hover:text-[#E6DB00]">Projects</Link>
          </div>
          <div className="space-y-6">
            <Link to="/" className="block text-3xl hover:text-[#E6DB00]">About Us</Link>
            <Link to="/" className="block text-3xl hover:text-[#E6DB00]">Our Story</Link>
            <Link to="/" className="block text-3xl hover:text-[#E6DB00]">News</Link>
            <Link to="/" className="block text-3xl hover:text-[#E6DB00]">Blog</Link>
            <Link to="/" className="block text-3xl hover:text-[#E6DB00]">Contact Us</Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="text-white">
            <p>Millersdale Cl, Euroway Industrial Estate</p>
            <p>Bradford</p>
            <p>BD4 6RX, UK</p>
            <p className="mt-4">T: +44 (0) 1274 689400</p>
            <p>info@thinkgroupuk.co.uk</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
