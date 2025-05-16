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
  const linkHoverColor = bgClass.includes("white") ? "hover:text-blue-600" : "hover:text-brand-yellow";
  const secondaryTextColor = bgClass.includes("white") ? "text-gray-600" : "text-gray-400";
  
  // Function to scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className={`${bgClass} ${textClass}`}>
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="w-40 h-24 flex items-center justify-center">
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
              <div className="w-40 h-24 flex items-center justify-center">
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
            
            <p className={`${secondaryTextColor} text-sm mb-6`}>
              {t('footer.description')}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-6">
              <a href="https://www.facebook.com/centerforyouthinitiatives" target="_blank" rel="noopener noreferrer" className={`${secondaryTextColor} ${linkHoverColor} transition-colors duration-200`}>
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://www.instagram.com/fablab.cfyi" target="_blank" rel="noopener noreferrer" className={`${secondaryTextColor} ${linkHoverColor} transition-colors duration-200`}>
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://t.me/+998770884977" target="_blank" rel="noopener noreferrer" className={`${secondaryTextColor} ${linkHoverColor} transition-colors duration-200`}>
                <Send size={24} />
                <span className="sr-only">Telegram</span>
              </a>
              <a href="https://www.linkedin.com/company/center-for-youth-initiatives" target="_blank" rel="noopener noreferrer" className={`${secondaryTextColor} ${linkHoverColor} transition-colors duration-200`}>
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://www.youtube.com/@CenterforYouthInitiatives" target="_blank" rel="noopener noreferrer" className={`${secondaryTextColor} ${linkHoverColor} transition-colors duration-200`}>
                <Youtube size={24} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">{t('footer.services')}</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/3d-printing" className={linkHoverColor}>
                    {t('header.3dPrinting')}
                  </Link>
                </li>
                <li>
                  <Link to="/mould" className={linkHoverColor}>
                    {t('header.mould')}
                  </Link>
                </li>
                <li>
                  <Link to="/custom-fabrication" className={linkHoverColor}>
                    {t('header.customFabrication')}
                  </Link>
                </li>
                <li>
                  <Link to="/" className={linkHoverColor}>
                    {t('header.aboutFablab')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">{t('footer.about')}</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/blog" className={linkHoverColor}>
                    {t('header.projects')}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className={linkHoverColor}>
                    Blog
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={scrollToContact}
                    className={`${linkHoverColor} cursor-pointer`}
                  >
                    {t('footer.contact')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`mt-12 pt-6 border-t ${borderColor} text-sm ${secondaryTextColor}`}>
          <div className="flex flex-col md:flex-row justify-between">
            <p>© 2025 Center for Youth Initiatives FabLab. All rights reserved.</p>
            
            <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
              <div className="flex space-x-4">
                <Link to="/" className={bgClass.includes("white") ? "hover:text-gray-900" : "hover:text-white"}>
                  {t('footer.privacy')}
                </Link>
                <Link to="/" className={bgClass.includes("white") ? "hover:text-gray-900" : "hover:text-white"}>
                  {t('footer.terms')}
                </Link>
                <Link to="/" className={bgClass.includes("white") ? "hover:text-gray-900" : "hover:text-white"}>
                  Cookie Policy
                </Link>
              </div>
              
              {/* Mobile Social Media Icons */}
              <div className="flex space-x-4 md:hidden mt-4">
                <a href="https://www.facebook.com/centerforyouthinitiatives" target="_blank" rel="noopener noreferrer" className={`${secondaryTextColor} ${linkHoverColor} transition-colors duration-200`}>
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/fablab.cfyi" target="_blank" rel="noopener noreferrer" className={`${secondaryTextColor} ${linkHoverColor} transition-colors duration-200`}>
                  <Instagram size={20} />
                </a>
                <a href="https://t.me/+998770884977" target="_blank" rel="noopener noreferrer" className={`${secondaryTextColor} ${linkHoverColor} transition-colors duration-200`}>
                  <Send size={20} />
                </a>
                <a href="https://www.linkedin.com/company/center-for-youth-initiatives" target="_blank" rel="noopener noreferrer" className={`${secondaryTextColor} ${linkHoverColor} transition-colors duration-200`}>
                  <Linkedin size={20} />
                </a>
                <a href="https://www.youtube.com/@CenterforYouthInitiatives" target="_blank" rel="noopener noreferrer" className={`${secondaryTextColor} ${linkHoverColor} transition-colors duration-200`}>
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
