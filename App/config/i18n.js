import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {en, fr} from '../../translations';

i18n.use(initReactI18next).init({
  //language to use if translations in user language are not available
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
  },
});

export default i18n;
