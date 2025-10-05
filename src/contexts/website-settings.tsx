"use client"

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect} from 'react';

type TsettingsTextColor = "text-white" | "text-foreground"

// Define the context value interface
interface WebsiteSettingsContextValueValue {
  settingsTextColor: TsettingsTextColor;
  setSettingsTextColor: (settingsTextColor: TsettingsTextColor) => void;
  navigationTextColor: TsettingsTextColor;
  setNavigationTextColor: (settingsTextColor: TsettingsTextColor) => void;
  setDarkMode: () => void;
  setLightMode: () => void;
 
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
    const [settingsTextColor, setSettingsTextColor] = useState<TsettingsTextColor>('text-foreground');
    const [navigationTextColor, setNavigationTextColor] = useState<TsettingsTextColor>('text-foreground');

    const setDarkMode = useCallback(()=>{
      console.log("setDarkMode triggered")
      setNavigationTextColor("text-white")
    },[])

    const setLightMode = useCallback(()=>{
      console.log("setLightMode triggered")

      setNavigationTextColor("text-foreground")
    },[])

    
    const value: WebsiteSettingsContextValueValue = useMemo(() => ({
        settingsTextColor,
        setSettingsTextColor,
        navigationTextColor,
        setNavigationTextColor,
        setDarkMode,
        setLightMode
    }), [settingsTextColor, setSettingsTextColor]);

    return (
        <WebsiteSettingsContext.Provider value={value}>
            {children}
        </WebsiteSettingsContext.Provider>
    );
};
