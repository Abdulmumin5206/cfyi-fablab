import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import ruTranslation from './locales/ru/translation.json';
import uzTranslation from './locales/uz/translation.json';
import enBlog from './locales/en/blog.json';
import ruBlog from './locales/ru/blog.json';
import uzBlog from './locales/uz/blog.json';
import en3dPrinting from './locales/en/3dprinting.json';
import ru3dPrinting from './locales/ru/3dprinting.json';
import uz3dPrinting from './locales/uz/3dprinting.json';
import en3dScanning from './locales/en/3dscanning.json';
import ru3dScanning from './locales/ru/3dscanning.json';
import uz3dScanning from './locales/uz/3dscanning.json';

// the translations
const resources = {
  en: {
    translation: enTranslation
  },
  ru: {
    translation: ruTranslation
  },
  uz: {
    translation: uzTranslation
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18n
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Add blog-specific translations
i18n.addResourceBundle('en', 'blog', enBlog.blog, true, true);
i18n.addResourceBundle('ru', 'blog', ruBlog.blog, true, true);
i18n.addResourceBundle('uz', 'blog', uzBlog.blog, true, true);

// Add 3D printing-specific translations
i18n.addResourceBundle('en', '3dprinting', en3dPrinting, true, true);
i18n.addResourceBundle('ru', '3dprinting', ru3dPrinting, true, true);
i18n.addResourceBundle('uz', '3dprinting', uz3dPrinting, true, true);

// Add 3D scanning-specific translations
i18n.addResourceBundle('en', '3dscanning', en3dScanning, true, true);
i18n.addResourceBundle('ru', '3dscanning', ru3dScanning, true, true);
i18n.addResourceBundle('uz', '3dscanning', uz3dScanning, true, true);

export default i18n; 