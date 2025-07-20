"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo} from 'react';

// Define the supported languages
type Language = 'PT' | 'EN';


// Define the context value interface
interface LanguageContextValue {
  language: Language;
  changeLanguage: (lang: Language) => void;
  isPortuguese: boolean;
  isEnglish: boolean;
}

// Define the provider props interface
interface LanguageProviderProps {
  children: React.ReactNode;
}


// Create the Language Context
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// Custom hook to use the language context
export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language Provider Component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('PT');
  // Simple language detection based on browser settings
  const detectLanguage = (): void => {
    try {
      // Get browser language
      const browserLang = navigator.language || navigator.languages?.[0];
      
      // Check if it's Portuguese (pt, pt-PT, pt-BR, etc.)
      if (browserLang?.toLowerCase().startsWith('pt')) {
        setLanguage('PT');
      } else {
        setLanguage('EN');
      }
    } catch (error) {
      console.error('Language detection error:', error);
      setLanguage('EN'); // Default fallback
    }
  };

 // Manual language change function - memoized to prevent unnecessary re-renders
  const changeLanguage = useCallback((lang: Language): void => {
    setLanguage(lang);
    // Optionally store in localStorage for persistence
    try {
      localStorage.setItem('preferred-language', lang);
    } catch (error) {
      console.warn('Could not save language preference to localStorage:', error);
    }
  }, []); // No dependencies - function is stable

  // Initialize language on mount
  useEffect(() => {
    try {
      // First check if user has a saved preference
      const savedLang = localStorage.getItem('preferred-language') as Language;
      if (savedLang && ['PT', 'EN'].includes(savedLang)) {
        setLanguage(savedLang);
      } else {
        // Otherwise detect from browser
        detectLanguage();
      }
    } catch (error) {
      // localStorage might not be available (SSR, private browsing, etc.)
      console.warn('Could not access localStorage, using browser detection:', error);
      detectLanguage();
    }
  }, []);

 const value: LanguageContextValue = useMemo(() => ({
    language,
    changeLanguage,
    isPortuguese: language === 'PT',
    isEnglish: language === 'EN'
}), [language, changeLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
