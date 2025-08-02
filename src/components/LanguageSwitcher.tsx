import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  useBlackTheme?: boolean;
  isScrolled?: boolean;
  isLaptopScreen?: boolean;
  shouldUseBlackText?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  useBlackTheme = false, 
  isScrolled = false, 
  isLaptopScreen = false,
  shouldUseBlackText = false 
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'uz', name: 'O\'zbekcha' }
  ];

  // Get the actual current language from i18n
  const currentLanguageCode = i18n.language.split('-')[0]; // Handle cases like 'ru-RU' -> 'ru'
  const currentLanguage = languages.find(lang => lang.code === currentLanguageCode) || languages[0];

  useEffect(() => {
    // Log language information in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Current i18n language:', i18n.language);
      console.log('Normalized language code:', currentLanguageCode);
      console.log('Navigator language:', navigator.language);
      console.log('Navigator languages:', navigator.languages);
    }
  }, [i18n.language, currentLanguageCode]);

  const changeLanguage = async (langCode: string) => {
    if (langCode !== i18n.language && !isChanging) {
      setIsChanging(true);
      
      try {
        // Show loading state
        console.log(`🔄 Switching language to: ${langCode}`);
        
        // Change the language
        await i18n.changeLanguage(langCode);

        // Trigger a window resize event after a small delay
        // to ensure any responsive elements recalculate their dimensions
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 100);

        // Optional: Add a subtle visual feedback
        document.body.style.transition = 'opacity 0.1s ease-out';
        document.body.style.opacity = '0.95';
        
        setTimeout(() => {
          document.body.style.opacity = '1';
          document.body.style.transition = '';
        }, 150);

        console.log(`✅ Language switched to: ${langCode}`);
        
        // Future enhancement: Update URL if URL-based routing is implemented
        // if (process.env.REACT_APP_ENABLE_URL_LANGUAGE_ROUTING === 'true') {
        //   // Update URL without page refresh
        //   const currentPath = window.location.pathname;
        //   const newPath = currentPath.replace(/^\/(en|ru|uz)/, `/${langCode}`);
        //   window.history.replaceState(null, '', newPath);
        // }
        
      } catch (error) {
        console.error('❌ Error changing language:', error);
      } finally {
        setIsChanging(false);
      }
    }
    
    setIsOpen(false);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const getTextColor = () => {
    if (isScrolled) return "text-black";
    if (shouldUseBlackText) return "text-black";
    if (useBlackTheme) return "text-white";
    return "text-white";
  };

  const getBorderColor = () => {
    if (isScrolled) return "border-black";
    if (shouldUseBlackText) return "border-black";
    if (useBlackTheme) return "border-black";
    return "border-white";
  };

  // Toggle debug info in development mode
  const toggleDebug = (e: React.MouseEvent) => {
    if (process.env.NODE_ENV === 'development') {
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey && e.altKey) {
        setShowDebug(!showDebug);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onContextMenu={toggleDebug}
        disabled={isChanging}
        className={`flex items-center border hover:text-[#329db7] transition-opacity px-2 sm:px-3 py-1.5 sm:py-2 h-[36px] sm:h-[40px] ${isLaptopScreen ? 'md:h-[36px]' : 'lg:h-[40px] xl:h-[44px]'} ${getBorderColor()} bg-transparent ${getTextColor()} ${isChanging ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Change language"
      >
        <Globe className={`mr-1 h-4 w-4 ${getTextColor()} ${isChanging ? 'animate-spin' : ''}`} />
        <span className="text-xs sm:text-sm font-medium uppercase">
          {isChanging ? '...' : currentLanguage.code}
        </span>
      </button>
      
      {isOpen && (
        <div className={`absolute right-0 mt-2 ${isScrolled || shouldUseBlackText ? 'bg-white' : 'bg-transparent'} shadow-lg overflow-hidden z-50 w-32 border ${isScrolled || shouldUseBlackText ? 'border-gray-100' : 'border-white'}`}>
          {languages.map(language => (
            <button
              key={language.code}
              onClick={(e) => {
                e.stopPropagation();
                changeLanguage(language.code);
              }}
              disabled={isChanging || language.code === currentLanguageCode}
              className={`w-full text-left px-3 py-2.5 flex items-center justify-between ${
                isScrolled || shouldUseBlackText ? 'text-gray-800' : 'text-white'
              } ${
                language.code === currentLanguageCode 
                  ? (isScrolled || shouldUseBlackText ? 'bg-gray-100' : 'bg-white/10') 
                  : (isScrolled || shouldUseBlackText ? 'hover:bg-gray-50' : 'hover:bg-white/5')
              } transition-colors duration-150 ${
                isChanging || language.code === currentLanguageCode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
            >
              <span className="text-sm">{language.name}</span>
              <span className={`text-xs uppercase ${isScrolled || shouldUseBlackText ? 'text-gray-500' : 'text-white/70'}`}>{language.code}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* Debug panel - only visible in development when activated */}
      {showDebug && process.env.NODE_ENV === 'development' && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg overflow-hidden z-50 w-64 border border-gray-200 p-3 text-black text-xs">
          <h4 className="font-bold mb-1">Language Debug Info:</h4>
          <p>i18n.language: {i18n.language}</p>
          <p>currentLanguageCode: {currentLanguageCode}</p>
          <p>navigator.language: {navigator.language}</p>
          <p>navigator.languages: {navigator.languages?.join(', ')}</p>
          <p>localStorage: {localStorage.getItem('i18nextLng')}</p>
          <p>isChanging: {isChanging.toString()}</p>
          <p>Current URL: {window.location.pathname}</p>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 