import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
              FabLab Uzbekistan, in collaboration with Center for Youth Initiatives, is committed to advancing technical education and digital manufacturing. We provide modern equipment and expert support to inspire future innovators.
            </p>
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
                  <Link to="/prototyping" className={linkHoverColor}>
                    {t('header.prototyping')}
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
                  <Link to="/projects" className={linkHoverColor}>
                    {t('header.projects')}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className={linkHoverColor}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/" className={linkHoverColor}>
                    {t('footer.contact')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`mt-12 pt-6 border-t ${borderColor} text-sm ${secondaryTextColor}`}>
          <div className="flex flex-col md:flex-row justify-between">
            <p>© 2025 Center for Youth Initiatives FabLab. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
