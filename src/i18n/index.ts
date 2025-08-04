import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import ruTranslation from './locales/ru/translation.json';
import uzTranslation from './locales/uz/translation.json';
import enHomepage from './locales/en/homepage.json';
import ruHomepage from './locales/ru/homepage.json';
import uzHomepage from './locales/uz/homepage.json';
import enBlog from './locales/en/blog.json';
import ruBlog from './locales/ru/blog.json';
import uzBlog from './locales/uz/blog.json';
import en3dPrinting from './locales/en/3dprinting.json';
import ru3dPrinting from './locales/ru/3dprinting.json';
import uz3dPrinting from './locales/uz/3dprinting.json';
import en3dScanning from './locales/en/3dscanning.json';
import ru3dScanning from './locales/ru/3dscanning.json';
import uz3dScanning from './locales/uz/3dscanning.json';
import enMould from './locales/en/mould.json';
import ruMould from './locales/ru/mould.json';
import uzMould from './locales/uz/mould.json';
import enDigitalFabrication from './locales/en/digitalfabrication.json';
import ruDigitalFabrication from './locales/ru/digitalfabrication.json';
import uzDigitalFabrication from './locales/uz/digitalfabrication.json';
import enCourses from './locales/en/courses.json';
import ruCourses from './locales/ru/courses.json';
import uzCourses from './locales/uz/courses.json';
import enMembership from './locales/en/membership.json';
import ruMembership from './locales/ru/membership.json';
import uzMembership from './locales/uz/membership.json';
import enHorizontalScroll from './locales/en/horizontalscroll.json';
import ruHorizontalScroll from './locales/ru/horizontalscroll.json';
import uzHorizontalScroll from './locales/uz/horizontalscroll.json';

const resources = {
  en: {
    translation: enTranslation,
    homepage: enHomepage,
    blog: enBlog,
    '3dprinting': en3dPrinting,
    '3dscanning': en3dScanning,
    mould: enMould,
    digitalfabrication: enDigitalFabrication,
    courses: enCourses,
    membership: enMembership,
    horizontalscroll: enHorizontalScroll
  },
  ru: {
    translation: ruTranslation,
    homepage: ruHomepage,
    blog: ruBlog,
    '3dprinting': ru3dPrinting,
    '3dscanning': ru3dScanning,
    mould: ruMould,
    digitalfabrication: ruDigitalFabrication,
    courses: ruCourses,
    membership: ruMembership,
    horizontalscroll: ruHorizontalScroll
  },
  uz: {
    translation: uzTranslation,
    homepage: uzHomepage,
    blog: uzBlog,
    '3dprinting': uz3dPrinting,
    '3dscanning': uz3dScanning,
    mould: uzMould,
    digitalfabrication: uzDigitalFabrication,
    courses: uzCourses,
    membership: uzMembership,
    horizontalscroll: uzHorizontalScroll
  }
};

// Detect if running in Telegram WebApp
const isTelegramWebApp = () => {
  try {
    return window.navigator.userAgent.includes('TelegramWebApp') || 
           window.navigator.userAgent.includes('Telegram') ||
           'Telegram' in window;
  } catch (e) {
    return false;
  }
};

// Get preferred language from URL or localStorage
const getPreferredLanguage = () => {
  // Check URL first
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lng');
  if (langParam && ['en', 'ru', 'uz'].includes(langParam)) {
    return langParam;
  }
  
  // Then check localStorage
  const storedLang = localStorage.getItem('i18nextLng');
  if (storedLang) {
    const normalizedLang = storedLang.split('-')[0];
    if (['en', 'ru', 'uz'].includes(normalizedLang)) {
      return normalizedLang;
    }
  }
  
  // Default to browser language or 'en'
  return 'en';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['translation', 'homepage', 'blog', '3dprinting', '3dscanning', 'mould', 'digitalfabrication', 'courses', 'membership', 'horizontalscroll'],
    defaultNS: 'translation',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'navigator', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      // Convert language codes like 'ru-RU' to 'ru'
      convertDetectedLanguage: (lng) => lng.split('-')[0]
    },
    // Special handling for Telegram WebApp
    lng: isTelegramWebApp() ? getPreferredLanguage() : undefined
  });

export default i18n; 