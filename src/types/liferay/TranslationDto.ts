import { Langs, LangsDash } from '@app-types';

export type TranslationDto = {
  en_US: string;
  ar_SA?: string;
};

export enum Locale {
  EN = 'en',
  AR = 'ar',
}

export type TranslatedProperty<ID extends boolean = false> = ID extends true
  ? { [lang in LangsDash]: string }
  : { [lang in Langs]: string };
