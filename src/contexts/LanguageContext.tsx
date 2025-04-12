import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: Readonly<{ children: React.ReactNode }>) {

  const getDeviceLanguage = (): Language => {
    const deviceLang = navigator.language.split("-")[0];
    return deviceLang === "en" ? "en" : "ar";
  };
  const [language, setLanguage] = useState<Language>('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    // Update document direction when language changes
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.body.style.fontFamily = language === 'ar' ? '"Baloo Bhaijaan 2", sans-serif' : '"SF Pro Display", sans-serif';
    setDir(language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  useEffect(() => {
    setLanguage(getDeviceLanguage());
  }, []);

  const contextValue = useMemo(() => ({ language, setLanguage, dir }), [language, dir]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
