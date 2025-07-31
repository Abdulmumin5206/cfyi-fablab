import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Linkedin, Youtube, Send, ArrowRight } from "lucide-react";

interface FooterProps {
  bgClass?: string;
  textClass?: string;
}

const Footer = ({ bgClass = "bg-[#212121]", textClass = "text-white" }: FooterProps) => {
  const { t } = useTranslation();
  
  // Determine border colors based on background
  const borderColor = bgClass.includes("white") ? "border-gray-200" : "border-gray-800";
  const linkHoverColor = bgClass.includes("white") ? "hover:text-blue-600" : "hover:text-[#329db7]";
  const secondaryTextColor = bgClass.includes("white") ? "text-gray-600" : "text-gray-400";
  
  // Function to scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to scroll to membership section
  const scrollToMembership = () => {
    const membershipSection = document.getElementById('membership-section');
    if (membershipSection) {
      membershipSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className={`${bgClass} ${textClass}`}>
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-12 py-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex flex-row md:flex-row items-center gap-6">
              <div className="w-40 h-24 flex items-center justify-center">
                <a href="https://cfyi.uz/" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="/fablab/cfyi.svg" 
                    alt="CFYI Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/200x100/gray/white?text=CFYI";
                    }}
                  />
                </a>
              </div>
              <div className="w-32 h-20 flex items-center justify-center">
                <a href="https://fablab-cfyi.uz/" target="_blank" rel="noopener noreferrer">
                  <img 
                    src={bgClass.includes("white") ? "/fablab/logo.png" : "/fablab/logowhite.png"} 
                    alt="FabLab Logo" 
                    className="w-[70%] h-[70%] object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/200x100/gray/white?text=FabLab";
                    }}
                  />
                </a>
              </div>
            </div>
            
            <p className={`${secondaryTextColor} text-sm leading-relaxed`}>
              {t('footer.description')}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/centerforyouthinitiatives" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${secondaryTextColor} ${linkHoverColor} transition-all duration-300 p-2 rounded-full bg-white/5 hover:bg-[#329db7] hover:text-white`}
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a 
                href="https://www.instagram.com/cfyi.uz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${secondaryTextColor} ${linkHoverColor} transition-all duration-300 p-2 rounded-full bg-white/5 hover:bg-[#329db7] hover:text-white`}
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href="https://t.me/+998770884977" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${secondaryTextColor} ${linkHoverColor} transition-all duration-300 p-2 rounded-full bg-white/5 hover:bg-[#329db7] hover:text-white`}
              >
                <Send size={20} />
                <span className="sr-only">Telegram</span>
              </a>
              <a 
                href="https://www.linkedin.com/company/center-for-youth-initiatives" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${secondaryTextColor} ${linkHoverColor} transition-all duration-300 p-2 rounded-full bg-white/5 hover:bg-[#329db7] hover:text-white`}
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a 
                href="https://www.youtube.com/@CenterforYouthInitiatives" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${secondaryTextColor} ${linkHoverColor} transition-all duration-300 p-2 rounded-full bg-white/5 hover:bg-[#329db7] hover:text-white`}
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 mt-8">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {[
                {
                  id: "3d-printing",
                  titleKey: "serviceCategories.3dPrinting.title",
                  link: "/3d-printing"
                },
                {
                  id: "molding",
                  titleKey: "serviceCategories.molding.title",
                  link: "/mould"
                },
                {
                  id: "digital-fabrication",
                  titleKey: "serviceCategories.digitalFabrication.title",
                  link: "/digital-fabrication"
                },
                {
                  id: "precision-manufacturing",
                  titleKey: "serviceCategories.precisionManufacturing.title",
                  link: "/digital-fabrication#precision-manufacturing"
                },
                {
                  id: "3d-scanning",
                  titleKey: "serviceCategories.3dScanning.title",
                  link: "/3d-scanning"
                }
              ].map((service) => (
                <li key={service.id}>
                  <Link 
                    to={service.link} 
                    className={`text-sm text-white ${linkHoverColor} transition-colors duration-200 flex items-center gap-2`}
                  >
                    <span>{t(service.titleKey)}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* About Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 mt-8">{t('footer.about')}</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={scrollToMembership}
                  className={`text-sm text-white ${linkHoverColor} transition-colors duration-200 cursor-pointer flex items-center gap-2`}
                >
                  <span>{t('footer.membership')}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </li>
              <li>
                <Link 
                  to="/about-us" 
                  className={`text-sm text-white ${linkHoverColor} transition-colors duration-200 flex items-center gap-2`}
                >
                  <span>{t('header.aboutUs')}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
              <li>
                <Link to="/courses" className={`text-sm text-white ${linkHoverColor} transition-colors duration-200 flex items-center gap-2`}>
                  <span>{t('header.courses')}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
              <li>
                <Link to="/projects" className={`text-sm text-white ${linkHoverColor} transition-colors duration-200 flex items-center gap-2`}>
                  <span>{t('footer.blog')}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
              <li>
                <button 
                  onClick={scrollToContact}
                  className={`text-sm text-white ${linkHoverColor} transition-colors duration-200 cursor-pointer flex items-center gap-2`}
                >
                  <span>{t('footer.contact')}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 mt-8">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className={`text-sm ${secondaryTextColor}`}>
                17 Olmachi St., Mirzo-Ulugbek,<br />
                Tashkent, Uzbekistan
              </li>
              <li>
                <a 
                  href="tel:+998770883977" 
                  className={`text-sm ${linkHoverColor} transition-colors duration-200`}
                >
                  +998 (77) 088 39 77 (ru/uz)
                </a>
              </li>
              <li>
                <a 
                  href="tel:+998770884977" 
                  className={`text-sm ${linkHoverColor} transition-colors duration-200`}
                >
                  +998 (77) 088 49 77 (ru/en)
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@cfyi.uz" 
                  className={`text-sm ${linkHoverColor} transition-colors duration-200`}
                >
                  info@cfyi.uz
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className={`border-t ${borderColor} py-6`}>
          <div className="flex justify-center items-center">
            <p className={`text-sm ${secondaryTextColor}`}>
              © 2025 Center for Youth Initiatives FabLab. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
