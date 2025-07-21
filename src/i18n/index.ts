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
import enMould from './locales/en/mould.json';
import ruMould from './locales/ru/mould.json';
import uzMould from './locales/uz/mould.json';
import enDigitalFabrication from './locales/en/digitalfabrication.json';
import ruDigitalFabrication from './locales/ru/digitalfabrication.json';
import uzDigitalFabrication from './locales/uz/digitalfabrication.json';

const resources = {
  en: {
    translation: enTranslation,
    blog: enBlog,
    '3dprinting': en3dPrinting,
    '3dscanning': en3dScanning,
    mould: enMould,
    digitalfabrication: enDigitalFabrication
  },
  ru: {
    translation: ruTranslation,
    blog: ruBlog,
    '3dprinting': ru3dPrinting,
    '3dscanning': ru3dScanning,
    mould: ruMould,
    digitalfabrication: ruDigitalFabrication
  },
  uz: {
    translation: uzTranslation,
    blog: uzBlog,
    '3dprinting': uz3dPrinting,
    '3dscanning': uz3dScanning,
    mould: uzMould,
    digitalfabrication: uzDigitalFabrication
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['translation', 'blog', '3dprinting', '3dscanning', 'mould', 'digitalfabrication'],
    defaultNS: 'translation',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n; 