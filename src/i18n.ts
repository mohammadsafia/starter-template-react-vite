import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { LANGUAGES } from '@constants';
import { LOCALES } from '@locales';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: LANGUAGES.EN,
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: { ...LOCALES.EN, translation: LOCALES.EN },
      ar: { ...LOCALES.AR, translation: LOCALES.AR },
    },

    defaultNS: 'translation',
    ns: ['translation', ...Object.keys(LOCALES.EN)],

    supportedLngs: [LANGUAGES.AR, LANGUAGES.EN],
    nonExplicitSupportedLngs: true,

    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

document.dir = i18n.dir();
document.documentElement.lang = i18n.language ?? LANGUAGES.AR;

i18n.on('languageChanged', (language) => {
  document.dir = language === LANGUAGES.AR ? 'rtl' : 'ltr';
  document.documentElement.lang = language;
});

export default i18n;
