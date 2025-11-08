import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Load per-screen translation JSONs
import enLogin from './locales/en/login.json';
import zhLogin from './locales/zh/login.json';

const resources = {
  en: {
    translation: {
      login: enLogin,
    },
  },
  zh: {
    translation: {
      login: zhLogin,
    },
  },
};

const locales = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode;

i18n
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    resources,
    lng: systemLanguage, // try to use system language
    fallbackLng: 'en', // if the language is not found, use English by default
    interpolation: {
      escapeValue: false, // React Native can prevent XSS
    },
  });

export default i18n;
