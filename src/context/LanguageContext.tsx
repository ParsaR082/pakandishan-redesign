import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import {
  Direction,
  Language,
  TRANSLATIONS,
  Translations,
} from '../i18n/translations';
import { toPersianDigits } from '../lib/dashboardLogic';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  shortLabel: string;
  dir: Direction;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'fa', label: 'Persian', nativeLabel: 'فارسی', shortLabel: 'FA', dir: 'rtl' },
  { code: 'en', label: 'English', nativeLabel: 'English', shortLabel: 'EN', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', shortLabel: 'AR', dir: 'rtl' },
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe', shortLabel: 'TR', dir: 'ltr' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский', shortLabel: 'RU', dir: 'ltr' },
];

interface LanguageContextValue {
  language: Language;
  direction: Direction;
  isRTL: boolean;
  supportedLanguages: LanguageOption[];
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  formatNumber: (value: number | string) => string;
}

const STORAGE_KEY = 'pakandishan_language';

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'fa';
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (
      saved &&
      (saved === 'fa' || saved === 'en' || saved === 'ar' || saved === 'tr' || saved === 'ru')
    ) {
      return saved;
    }
  } catch {
    // Ignore storage errors in restricted contexts
  }
  return 'fa';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const direction: Direction = language === 'fa' || language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = direction === 'rtl';

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const idx = SUPPORTED_LANGUAGES.findIndex((l) => l.code === language);
    const nextIdx = (idx + 1) % SUPPORTED_LANGUAGES.length;
    setLanguage(SUPPORTED_LANGUAGES[nextIdx].code);
  }, [language, setLanguage]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.lang = language;
      root.dir = direction;
      if (direction === 'ltr') {
        root.classList.add('ltr');
        root.classList.remove('rtl');
      } else {
        root.classList.add('rtl');
        root.classList.remove('ltr');
      }
    }
  }, [language, direction]);

  const t = useMemo(() => TRANSLATIONS[language] ?? TRANSLATIONS.fa, [language]);

  const formatNumber = useCallback(
    (value: number | string): string => {
      if (language === 'fa') {
        return toPersianDigits(value);
      }
      return String(value);
    },
    [language]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      direction,
      isRTL,
      supportedLanguages: SUPPORTED_LANGUAGES,
      setLanguage,
      toggleLanguage,
      t,
      formatNumber,
    }),
    [language, direction, isRTL, setLanguage, toggleLanguage, t, formatNumber]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
