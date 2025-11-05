export const enum LANGUAGES {
  AR = 'ar',
  EN = 'en',
}

export const LANGUAGE_OPTIONS = [
  { code: LANGUAGES.AR, name: 'العربية', flag: '🇸🇦' },
  { code: LANGUAGES.EN, name: 'English', flag: '🇺🇸' },
] as const;
