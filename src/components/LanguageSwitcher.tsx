import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'uz', name: 'O\'zbekcha' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    if (langCode !== i18n.language) {
      i18n.changeLanguage(langCode);

      // Trigger a window resize event after a small delay
      // to ensure any responsive elements recalculate their dimensions
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
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

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center h-8 px-2 overflow-hidden rounded-full border border-gray-300 hover:border-gray-400 transition-all duration-200 bg-white/20 backdrop-blur-sm"
        aria-label="Change language"
      >
        <Globe className="mr-1 h-4 w-4 text-gray-600" />
        <span className="text-xs font-medium uppercase">{currentLanguage.code}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50 w-32 border border-gray-100">
          {languages.map(language => (
            <button
              key={language.code}
              onClick={(e) => {
                e.stopPropagation();
                changeLanguage(language.code);
              }}
              className={`w-full text-left px-3 py-2.5 flex items-center justify-between text-gray-800 ${
                language.code === i18n.language 
                  ? 'bg-gray-100' 
                  : 'hover:bg-gray-50'
              } transition-colors duration-150`}
            >
              <span className="text-sm">{language.name}</span>
              <span className="text-xs text-gray-500 uppercase">{language.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 