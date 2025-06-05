import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Linkedin, Youtube, Send } from "lucide-react";

interface FooterProps {
  bgClass?: string;
  textClass?: string;
}

const Footer = ({ bgClass = "bg-black", textClass = "text-white" }: FooterProps) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-20 flex items-center justify-center">
                <img 
                  src="/fablab/cfyi.svg" 
                  alt="CFYI Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/200x100/gray/white?text=CFYI";
                  }}
                />
              </div>
              <div className="w-32 h-20 flex items-center justify-center">
                <img 
                  src={bgClass.includes("white") ? "/fablab/logo.png" : "/fablab/logowhite.png"} 
                  alt="FabLab Logo" 
                  className="w-[85%] h-[85%] object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/200x100/gray/white?text=FabLab";
                  }}
                />
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
            <h3 className="text-lg font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/3d-printing" className={`text-sm ${linkHoverColor} transition-colors duration-200`}>
                  {t('header.3dPrinting')}
                </Link>
              </li>
              <li>
                <Link to="/mould" className={`text-sm ${linkHoverColor} transition-colors duration-200`}>
                  {t('header.mould')}
                </Link>
              </li>
              <li>
                <Link to="/custom-fabrication" className={`text-sm ${linkHoverColor} transition-colors duration-200`}>
                  {t('header.customFabrication')}
                </Link>
              </li>
              <li>
                <button 
                  onClick={scrollToMembership}
                  className={`text-sm ${linkHoverColor} transition-colors duration-200 cursor-pointer`}
                >
                  Membership
                </button>
              </li>
              <li>
                <Link to="/" className={`text-sm ${linkHoverColor} transition-colors duration-200`}>
                  {t('header.aboutFablab')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* About Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.about')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className={`text-sm ${linkHoverColor} transition-colors duration-200`}>
                  {t('header.projects')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className={`text-sm ${linkHoverColor} transition-colors duration-200`}>
                  Blog
                </Link>
              </li>
              <li>
                <button 
                  onClick={scrollToContact}
                  className={`text-sm ${linkHoverColor} transition-colors duration-200 cursor-pointer`}
                >
                  {t('footer.contact')}
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${secondaryTextColor}`}>
              © 2025 Center for Youth Initiatives FabLab. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className={`text-sm ${linkHoverColor} transition-colors duration-200`}>
                {t('footer.privacy')}
              </Link>
              <Link to="/" className={`text-sm ${linkHoverColor} transition-colors duration-200`}>
                {t('footer.terms')}
              </Link>
              <Link to="/" className={`text-sm ${linkHoverColor} transition-colors duration-200`}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
