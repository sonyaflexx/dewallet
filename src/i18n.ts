import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './locales';

i18next 
  .use(initReactI18next)
  .use(LanguageDetector) 
  .init({
    resources, 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'path'],
      caches: ['cookie', 'localStorage'],
    },
    debug: true, 
  });

export default i18next;
