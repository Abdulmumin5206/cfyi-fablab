import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t } = useTranslation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset expanded menu when closing mobile menu
  useEffect(() => {
    if (!isOpen) {
      setExpandedMenu(null);
    }
  }, [isOpen]);

  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  // Services submenu items
  const servicesSubMenu = [
    { name: t('header.mould'), path: "/mould" },
    { name: t('header.3dPrinting'), path: "/3d-printing" },
    { name: "CNC Machining", path: "/" },
    { name: "Laser Cutting", path: "/" },
    { name: "Finishing Services", path: "/" },
    { name: "Design Consultation", path: "/" }
  ];

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen z-[100] ${
        isOpen ? "" : "pointer-events-none"
      }`}
    >
      {/* Background overlay with fade effect */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-700 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Content wrapper with slide effect */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        <div className="min-h-screen w-full flex">
          {/* Featured Project Section with fade-up effect */}
          <div className="hidden lg:block w-[40%] relative overflow-hidden">
            <div 
              className={`absolute inset-0 transition-all duration-1000 delay-300 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <img 
                src="/fablab/3.jpg" 
                alt="Featured Project" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 
                  className={`text-4xl font-light mb-2 text-white transition-all duration-1000 delay-500 ${
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  Featured Project
                </h2>
                <p 
                  className={`text-xl text-white/90 transition-all duration-1000 delay-700 ${
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  Atlantis The Royal
                </p>
              </div>
            </div>
          </div>

          {/* Menu Content */}
          <div className="flex-1 flex flex-col">
            {/* Header with fade-down effect */}
            <div 
              className={`flex justify-end items-center h-20 md:h-[105px] px-4 md:px-8 border-b border-white/10 transition-all duration-700 delay-100 ${
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
              }`}
            >
              <div className="absolute left-8 md:left-12 h-full flex items-center">
                <Link to="/" className="text-white" onClick={onClose}>
                  <div className="text-xl md:text-2xl font-bold">
                    Think<span className="text-sm">:</span>
                    <span className="text-sm font-normal">Group</span>
                  </div>
                </Link>
              </div>
              
              {/* Close button */}
              <div className="flex items-center mr-4 lg:mr-8">
                <button
                  onClick={onClose}
                  className="flex items-center justify-center hover:opacity-75 transition-opacity"
                  aria-label="Close menu"
                >
                  <span className="flex items-center space-x-2 border border-white px-3 py-2 text-white">
                    <X size={20} />
                    <span className="text-sm lg:text-base">{t('header.menu')}</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Navigation with staggered fade-in effect */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-6 md:gap-y-8 max-w-3xl">
                <div className="space-y-4 md:space-y-6">
                  {/* Services with dropdown */}
                  <div
                    className={`transition-all duration-700 ${
                      isOpen 
                        ? "translate-y-0 opacity-100" 
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "300ms" }}
                  >
                    <button
                      onClick={() => toggleMenu('services')}
                      className="flex items-center justify-between w-full text-2xl md:text-3xl text-white hover:text-[#E6DB00] transition-all duration-300"
                    >
                      <span>{t('header.services')}</span>
                      {expandedMenu === 'services' ? 
                        <ChevronUp size={24} /> : 
                        <ChevronDown size={24} />
                      }
                    </button>
                    
                    {/* Services submenu */}
                    {expandedMenu === 'services' && (
                      <div className="pl-4 mt-3 space-y-3 border-l border-white/20">
                        {servicesSubMenu.map((item, idx) => (
                          <Link 
                            key={idx}
                            to={item.path}
                            onClick={onClose}
                            className="block text-lg md:text-xl text-white/80 hover:text-[#E6DB00] transition-all duration-300"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Other first column menu items */}
                  {[
                    { key: 'header.aboutFablab', path: '/about-fablab' },
                    { key: 'header.projects', path: '/projects' }
                  ].map((item, index) => (
                    <Link
                      key={item.key}
                      to={item.path}
                      onClick={onClose}
                      className={`block text-2xl md:text-3xl text-white hover:text-[#E6DB00] transition-all duration-700 ${
                        isOpen 
                          ? "translate-y-0 opacity-100" 
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
                <div className="space-y-4 md:space-y-6">
                  {[
                    "About Us",
                    "Our Story",
                    "News",
                    "Blog",
                    "Contact Us"
                  ].map((item, index) => (
                    <Link
                      key={item}
                      to={item === "Blog" ? "/blog" : "/"}
                      onClick={onClose}
                      className={`block text-2xl md:text-3xl text-white hover:text-[#E6DB00] transition-all duration-700 ${
                        isOpen 
                          ? "translate-y-0 opacity-100" 
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${600 + index * 100}ms` }}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with fade-up effect */}
            <div 
              className={`p-4 md:p-6 border-t border-white/10 transition-all duration-700 delay-[1200ms] ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className="text-white/60 text-xs md:text-sm space-y-1 max-w-3xl">
                <p>Millersdale Cl, Euroway Industrial Estate</p>
                <p>Bradford</p>
                <p>BD4 6RX, UK</p>
                <p className="mt-2 md:mt-4">T: +44 (0) 1274 689400</p>
                <p>info@thinkgroupuk.co.uk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
