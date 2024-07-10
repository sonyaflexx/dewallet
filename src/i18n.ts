import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './locales';

export const i18nConfig = {
  locales: ['en', 'ru'],
  defaultLocale: 'en',
};

i18next 
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie', 'localStorage'],
    },
    debug: true,
  }, (err, t) => {
    if (err) return console.error(err);
    console.log('i18next initialized with language:', i18next.language);
  });

export default i18next;