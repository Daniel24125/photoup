"use client"

import React, { createContext, useContext, useState, useCallback, useMemo} from 'react';

type TsettingsTextColor = "text-white" | "text-foreground"

// Define the context value interface
interface WebsiteSettingsContextValueValue {
  settingsTextColor: TsettingsTextColor;
  setSettingsTextColor: (settingsTextColor: TsettingsTextColor) => void;
  navigationTextColor: TsettingsTextColor;
  setNavigationTextColor: (settingsTextColor: TsettingsTextColor) => void;
 
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
    const [settingsTextColor, setSettingsTextColor] = useState<TsettingsTextColor>('text-white');
    const [navigationTextColor, setNavigationTextColor] = useState<TsettingsTextColor>('text-white');


    const value: WebsiteSettingsContextValueValue = useMemo(() => ({
        settingsTextColor,
        setSettingsTextColor,
        navigationTextColor,
        setNavigationTextColor
    }), [settingsTextColor, setSettingsTextColor]);

    return (
        <WebsiteSettingsContext.Provider value={value}>
            {children}
        </WebsiteSettingsContext.Provider>
    );
};
