import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MobileSlideProps {
  type: 'blog' | 'service';
  imageUrl: string;
  fallbackUrl?: string;
  title: string;
  description: string;
  linkTo: string;
  category?: string;
  isLargeScreen: boolean;
  isLaptopScreen: boolean;
  onClose: () => void;
}

const MobileSlide = ({ 
  type, 
  imageUrl, 
  fallbackUrl = "/fablab/3.jpg", 
  title, 
  description, 
  linkTo, 
  category,
  isLargeScreen,
  isLaptopScreen,
  onClose 
}: MobileSlideProps) => {
  const { t } = useTranslation();

  return (
    <div className="absolute inset-0 transition-opacity duration-700 ease-in-out bg-black opacity-100 z-10">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out scale-110 origin-center opacity-100"
        style={{
          transform: 'scale(1)',
          willChange: 'transform, opacity'
        }}
        onError={(e) => {
          const imgElement = e.currentTarget;
          imgElement.onerror = null; // Prevent infinite loops
          imgElement.src = fallbackUrl;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      <div className={`absolute bottom-0 left-0 right-0 ${isLargeScreen ? 'p-8' : 'p-6'}`}>
        {category && (
          <div className={`text-[#E6DB00] uppercase ${isLargeScreen ? 'text-base' : 'text-sm'} font-medium mb-2 transition-all duration-700 delay-300`}>
            {category}
          </div>
        )}
        <h2 className={`${isLargeScreen ? 'text-3xl' : 'text-2xl'} font-light mb-2 text-white transition-all duration-700 delay-400`}>
          {title}
        </h2>
        <p className={`${isLargeScreen ? 'text-lg' : 'text-base'} text-white/80 mb-3 transition-all duration-700 delay-500 ${isLaptopScreen ? 'hidden md:block' : ''}`}>
          {description}
        </p>
        <Link
          to={linkTo}
          onClick={onClose}
          className={`inline-flex items-center ${isLargeScreen ? 'text-lg' : 'text-base'} text-white hover:text-[#E6DB00] transition-all duration-700 delay-600`}
        >
          {type === 'blog' ? t('mobileMenu.readArticle') : t('mobileMenu.exploreService')} 
          <ArrowRight className={`ml-2 ${isLargeScreen ? 'h-5 w-5' : 'h-4 w-4'}`} />
        </Link>
      </div>
    </div>
  );
};

export default MobileSlide; 