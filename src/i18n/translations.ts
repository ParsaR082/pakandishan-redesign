import { fa } from './locales/fa';
import { en } from './locales/en';
import { ar } from './locales/ar';
import { tr } from './locales/tr';
import { ru } from './locales/ru';
import { Language, Translations } from './types';

export * from './types';

export const TRANSLATIONS: Record<Language, Translations> = {
  fa,
  en,
  ar,
  tr,
  ru,
};
