"use client";

import { LogoIconBlack, LogoIconWhite } from "@/components/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";

type LoaderContextType = {
  registerLoading: (id: string) => void;
  unregisterLoading: (id: string) => void;
  isAllLoaded: boolean;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);
type TLoadingState = Set<string> | null
const logoSize = 50


export  const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loadingSet, setLoadingSet] = useState<TLoadingState>(null);
  const pathname = usePathname()

  useEffect(()=>{
    setLoadingSet(null)
  }, [pathname])

  const registerLoading = (id: string) => {
    setLoadingSet((prev) => {
      const set: Set<string> = prev ? new Set(prev) : new Set();
      set.add(id);
      return set;
    });
  };

  const unregisterLoading = (id: string) => {
    setLoadingSet((prev) => {
      if (!prev) return prev;
      const updated = new Set(prev);
      updated.delete(id);
      return updated;
    });
  };

  const isAllLoaded = useMemo(()=>{
    return loadingSet !== null && loadingSet.size === 0;
  }, [loadingSet, pathname])


  return (
    <LoaderContext.Provider value={{ registerLoading, unregisterLoading, isAllLoaded }}>

          {children}
   
        <AnimatePresence>
          {!isAllLoaded && <LoaderSpninner/>}
        </AnimatePresence>
    </LoaderContext.Provider>
  );
}

const LoaderSpninner = ()=>{
  const { resolvedTheme} = useTheme()

  return <motion.div  
    exit={{opacity: 0}}
    className="absolute inset-0 flex items-center justify-center z-50 bg-background">
      <motion.div
        initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 1, 0],
          rotate: [0, 360],
          scale: [0.8, 1, 1.2, 1],
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.1,
        }}
       
       
      >
        {resolvedTheme === "light" ? <LogoIconBlack  width={logoSize} height={logoSize} /> : <LogoIconWhite width={logoSize} height={logoSize}/>}
      </motion.div>
    </motion.div>
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) throw new Error("useLoader must be used within a LoaderProvider");
  return context;
}
