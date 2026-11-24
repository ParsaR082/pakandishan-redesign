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

interface LanguageContextValue {
  language: Language;
  direction: Direction;
  isRTL: boolean;
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
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'fa') return saved;
  } catch {
    // Ignore localStorage access failures in restricted environments
  }
  return 'fa';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const direction: Direction = language === 'fa' ? 'rtl' : 'ltr';
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
    setLanguage(language === 'fa' ? 'en' : 'fa');
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

  const t = useMemo(() => TRANSLATIONS[language], [language]);

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
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
