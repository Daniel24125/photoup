"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";

type LoaderContextType = {
  registerLoading: (id: string) => void;
  unregisterLoading: (id: string) => void;
  isAllLoaded: boolean;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);
type TLoadingState = Set<string> | null

export  const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loadingSet, setLoadingSet] = useState<TLoadingState>(null);

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
  }, [loadingSet])

  return (
    <LoaderContext.Provider value={{ registerLoading, unregisterLoading, isAllLoaded }}>

          {children}
   
        <AnimatePresence>
          {!isAllLoaded && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white z-50"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-900"></div>
            </motion.div>
          )}
        </AnimatePresence>
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) throw new Error("useLoader must be used within a LoaderProvider");
  return context;
}
