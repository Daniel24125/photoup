"use client"

import React, { createContext, useContext, useState, useCallback, useMemo} from 'react';

type TNavigationTextColor = "text-white" | "text-foreground"

// Define the context value interface
interface WebsiteSettingsContextValueValue {
  navigationTextColor: TNavigationTextColor;
  setNavigationTextColor: (navigationTextColor: TNavigationTextColor) => void;
}

// Define the provider props interface
interface LanguageProviderProps {
  children: React.ReactNode;
}


// Create the Language Context
const WebsiteSettingsContext = createContext<WebsiteSettingsContextValueValue | undefined>(undefined);


// Custom hook to use the language context
export const useWebSettings = (): WebsiteSettingsContextValueValue => {
  const context = useContext(WebsiteSettingsContext);
  if (!context) {
    throw new Error('useWebSettings must be used within a ContextProvider');
  }
  return context;
};


export const WebsiteSettingsProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [navigationTextColor, setNavigationTextColor] = useState<TNavigationTextColor>('text-white');


    const value: WebsiteSettingsContextValueValue = useMemo(() => ({
        navigationTextColor,
        setNavigationTextColor
    }), [navigationTextColor, setNavigationTextColor]);

    return (
        <WebsiteSettingsContext.Provider value={value}>
            {children}
        </WebsiteSettingsContext.Provider>
    );
};
