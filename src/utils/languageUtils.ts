import i18n from '../i18n';

/**
 * Utility functions for language management and testing
 */

export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'uz', name: 'Uzbek', nativeName: 'O\'zbekcha' }
];

/**
 * Get current language information
 */
export const getCurrentLanguage = (): LanguageInfo => {
  const currentCode = i18n.language.split('-')[0];
  return SUPPORTED_LANGUAGES.find(lang => lang.code === currentCode) || SUPPORTED_LANGUAGES[0];
};

/**
 * Check if a language is supported
 */
export const isLanguageSupported = (langCode: string): boolean => {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === langCode);
};

/**
 * Get browser language preferences
 */
export const getBrowserLanguages = (): string[] => {
  const languages: string[] = [];
  
  // Primary language
  if (navigator.language) {
    languages.push(navigator.language);
  }
  
  // Additional languages
  if (navigator.languages) {
    languages.push(...navigator.languages);
  }
  
  return [...new Set(languages)]; // Remove duplicates
};

/**
 * Detect the best language to use based on browser preferences
 */
export const detectBestLanguage = (): string => {
  const browserLanguages = getBrowserLanguages();
  
  // First, try to find an exact match
  for (const browserLang of browserLanguages) {
    const langCode = browserLang.split('-')[0];
    if (isLanguageSupported(langCode)) {
      return langCode;
    }
  }
  
  // If no exact match, try to find a language family match
  for (const browserLang of browserLanguages) {
    const langCode = browserLang.split('-')[0];
    
    // Handle language family mappings
    const familyMappings: Record<string, string> = {
      'be': 'ru', // Belarusian -> Russian
      'kk': 'ru', // Kazakh -> Russian
      'ky': 'ru', // Kyrgyz -> Russian
      'tg': 'ru', // Tajik -> Russian
      'tk': 'uz', // Turkmen -> Uzbek
      'ka': 'ru', // Georgian -> Russian
      'hy': 'ru', // Armenian -> Russian
      'az': 'ru', // Azerbaijani -> Russian
    };
    
    if (familyMappings[langCode]) {
      return familyMappings[langCode];
    }
  }
  
  // Default to English
  return 'en';
};

/**
 * Test language detection and switching
 */
export const testLanguageDetection = (): void => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🌐 Language Detection Test');
    
    console.log('Current i18n language:', i18n.language);
    console.log('Normalized language code:', i18n.language.split('-')[0]);
    console.log('Browser language:', navigator.language);
    console.log('Browser languages:', navigator.languages);
    console.log('Detected best language:', detectBestLanguage());
    console.log('localStorage i18nextLng:', localStorage.getItem('i18nextLng'));
    console.log('Supported languages:', SUPPORTED_LANGUAGES.map(l => l.code));
    
    // Test each supported language
    SUPPORTED_LANGUAGES.forEach(lang => {
      console.log(`Testing ${lang.code}:`, {
        isSupported: isLanguageSupported(lang.code),
        name: lang.name,
        nativeName: lang.nativeName
      });
    });
    
    console.groupEnd();
  }
};

/**
 * Validate translation completeness
 */
export const validateTranslations = (): void => {
  if (process.env.NODE_ENV === 'development') {
    console.group('📝 Translation Validation');
    
    const namespaces = Array.isArray(i18n.options.ns) ? i18n.options.ns : ['translation'];
    const languages = Object.keys(i18n.options.resources || {});
    
    languages.forEach(lang => {
      console.log(`\n${lang.toUpperCase()} translations:`);
      
      namespaces.forEach(ns => {
        const resources = i18n.options.resources?.[lang]?.[ns];
        if (resources) {
          const keyCount = Object.keys(resources).length;
          console.log(`  ${ns}: ${keyCount} keys`);
        } else {
          console.warn(`  ${ns}: Missing namespace`);
        }
      });
    });
    
    console.groupEnd();
  }
};

/**
 * Switch language with validation
 */
export const switchLanguage = async (langCode: string): Promise<boolean> => {
  if (!isLanguageSupported(langCode)) {
    console.error(`❌ Language ${langCode} is not supported`);
    return false;
  }
  
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Switching to ${langCode}...`);
    }
    await i18n.changeLanguage(langCode);
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Successfully switched to ${langCode}`);
    }
    return true;
  } catch (error) {
    console.error(`❌ Failed to switch to ${langCode}:`, error);
    return false;
  }
};

/**
 * Get language-specific URL path (for future URL-based routing)
 */
export const getLanguagePath = (path: string, langCode: string): string => {
  const pathMappings: Record<string, Record<string, string>> = {
    en: {
      '3d-printing': '3d-printing',
      'mould': 'mould',
      'digital-fabrication': 'digital-fabrication',
      '3d-scanning': '3d-scanning',
      'courses': 'courses',
      'projects': 'projects'
    },
    ru: {
      '3d-printing': '3d-pechat',
      'mould': 'formy',
      'digital-fabrication': 'tsifrovoe-proizvodstvo',
      '3d-scanning': '3d-skanirovanie',
      'courses': 'kursy',
      'projects': 'proekty'
    },
    uz: {
      '3d-printing': '3d-bosib-chiqarish',
      'mould': 'qolip',
      'digital-fabrication': 'raqamli-ishlab-chiqarish',
      '3d-scanning': '3d-skanlash',
      'courses': 'kurslar',
      'projects': 'loyihalar'
    }
  };
  
  const cleanPath = path.replace(/^\//, ''); // Remove leading slash
  const mappedPath = pathMappings[langCode]?.[cleanPath] || cleanPath;
  
  return `/${langCode}/${mappedPath}`;
};

export default {
  getCurrentLanguage,
  isLanguageSupported,
  getBrowserLanguages,
  detectBestLanguage,
  testLanguageDetection,
  validateTranslations,
  switchLanguage,
  getLanguagePath,
  SUPPORTED_LANGUAGES
}; 