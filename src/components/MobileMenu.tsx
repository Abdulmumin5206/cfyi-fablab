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

  // Main services categories matching desktop dropdown
  const mainServices = [
    { name: t('header.mould'), path: "/mould", color: "hover:text-[#0e9a48]" },
    { name: t('header.3dPrinting'), path: "/3d-printing", color: "hover:text-[#cb2026]" },
    { name: t('header.prototyping'), path: "/prototyping", color: "hover:text-[#35469d]" },
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
          <div className="hidden md:block w-[40%] xl:w-[35%] relative overflow-hidden">
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
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                <h2 
                  className={`text-2xl md:text-3xl lg:text-4xl font-light mb-2 text-white transition-all duration-1000 delay-500 ${
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  Featured Project
                </h2>
                <p 
                  className={`text-base md:text-lg lg:text-xl text-white/90 transition-all duration-1000 delay-700 ${
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
            {/* Header with fade-down effect - FIXED SECTION */}
            <div 
              className={`flex items-center justify-end h-16 sm:h-20 md:h-24 lg:h-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-white/10 transition-all duration-700 delay-100 ${
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
              }`}
            >
              {/* Header right section with Book Session and Close button */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Book Session Button */}
                <Link
                  to="/book-session"
                  onClick={onClose}
                  className="text-black bg-[#E6DB00] hover:opacity-90 transition-opacity text-sm lg:text-base xl:text-lg px-3 sm:px-4 py-1.5 sm:py-2 md:py-2.5 font-medium"
                >
                  {t('header.bookSession')}
                </Link>
              
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="flex items-center justify-center hover:opacity-75 transition-opacity"
                  aria-label="Close menu"
                >
                  <span className="flex items-center space-x-1 sm:space-x-2 border border-white px-2 sm:px-3 py-1.5 sm:py-2 text-white">
                    <X size={18} className="lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
                    <span className="text-sm lg:text-base xl:text-lg">{t('header.menu')}</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Navigation with staggered fade-in effect */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 lg:gap-x-16 gap-y-6 md:gap-y-8 max-w-5xl">
                <div className="space-y-4 md:space-y-6 lg:space-y-8">
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
                      className="flex items-center justify-between w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white hover:text-[#E6DB00] transition-all duration-300"
                    >
                      <span>{t('header.services')}</span>
                      {expandedMenu === 'services' ? 
                        <ChevronUp className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" /> : 
                        <ChevronDown className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                      }
                    </button>
                    
                    {/* Services submenu matching desktop dropdown */}
                    {expandedMenu === 'services' && (
                      <div className="mt-4 md:mt-6 space-y-4 md:space-y-6">
                        {/* Main three services with colored hover states matching desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pb-4 md:pb-6 border-b border-white/10">
                          {mainServices.map((service, idx) => (
                            <Link 
                              key={idx}
                              to={service.path}
                              onClick={onClose}
                              className={`block py-3 sm:py-4 md:py-5 px-4 text-base sm:text-lg md:text-xl lg:text-2xl text-center text-white bg-black/30 ${service.color} transition-colors duration-300`}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                        
                        {/* Additional service links */}
                        <div className="pl-4 md:pl-6 space-y-3 md:space-y-4 border-l border-white/20">
                          {[
                            "CNC Machining",
                            "Laser Cutting",
                            "Finishing Services",
                            "Design Consultation"
                          ].map((item, idx) => (
                            <Link 
                              key={idx}
                              to="/"
                              onClick={onClose}
                              className="block text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 hover:text-[#E6DB00] transition-all duration-300"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
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
                      className={`block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white hover:text-[#E6DB00] transition-all duration-700 ${
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
                <div className="space-y-4 md:space-y-6 lg:space-y-8">
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
                      className={`block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white hover:text-[#E6DB00] transition-all duration-700 ${
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
              className={`p-4 md:p-6 lg:p-8 border-t border-white/10 transition-all duration-700 delay-[1200ms] ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className="text-white/60 text-xs md:text-sm lg:text-base space-y-1 md:space-y-2 max-w-3xl">
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