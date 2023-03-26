import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'US',
  lng: 'US',
  resources: {
    US: {
      translations: require('./locales/en/translations.json')
    },
    CN: {
      translations: require('./locales/cn/translations.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['US', 'CN'];

export default i18n;