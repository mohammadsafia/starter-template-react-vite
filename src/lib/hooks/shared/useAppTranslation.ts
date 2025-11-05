import { LANGUAGE_OPTIONS, LANGUAGES } from '@constants';
import { useTranslation as useI18nTranslation } from 'react-i18next';

import { TranslatedProperty } from '@app-types';
import { LOCALES } from '@locales';
import { useCallback } from 'react';

export type Namespace = keyof typeof LOCALES.EN | 'translation';
export type LanguageOption = (typeof LANGUAGE_OPTIONS)[number];

export const useAppTranslation = <T extends Namespace = 'translation'>(namespace?: T) => {
  const { t, i18n, ready } = useI18nTranslation(namespace);

  const currentLanguage = i18n.language as LANGUAGES;

  const getCurrentLanguageConfig = (): LanguageOption | undefined => {
    return LANGUAGE_OPTIONS.find((lang) => lang.code === currentLanguage);
  };

  const isRTL = (): boolean => {
    return currentLanguage === LANGUAGES.AR;
  };

  const getDirection = (): 'ltr' | 'rtl' => {
    return isRTL() ? 'rtl' : 'ltr';
  };

  const getOppositeLanguage = (): LANGUAGES => {
    return currentLanguage === LANGUAGES.AR ? LANGUAGES.EN : LANGUAGES.AR;
  };

  const getAllNamespaces = (): Namespace[] => {
    return Object.keys(LOCALES.EN) as Namespace[];
  };

  const changeLanguage = (lng: LANGUAGES) => {
    const newUrl = window.location.href.replace(new RegExp(`/${currentLanguage}/`), `/${lng}/`);
    i18n.changeLanguage(lng);
    if (import.meta.env.MODE === 'development') return;
    window.location.href = newUrl;
  };

  const translateProperty = useCallback(
    (property: Partial<TranslatedProperty<boolean>>) => {
      return Object.entries(property).find(([key]) => key.startsWith(currentLanguage))?.[1] ?? Object.values(property)[0];
    },
    [currentLanguage],
  );

  return {
    t,
    currentLanguage,
    ready,
    i18n,
    currentLanguageConfig: getCurrentLanguageConfig(),
    availableLanguages: LANGUAGE_OPTIONS,
    isRTL: isRTL(),
    direction: getDirection(),
    oppositeLanguage: getOppositeLanguage(),
    availableNamespaces: getAllNamespaces(),
    changeLanguage,
    translateProperty,
  };
};
