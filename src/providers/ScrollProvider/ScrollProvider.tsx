'use client';

import { createContext, useContext, useMemo, useState } from 'react';

export interface IScrollContext {
  isScrolling: boolean;
  handleScrolling: (_value: boolean) => void;
}

export const ScrollContext = createContext<IScrollContext | undefined>(
  undefined,
);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScrolling = (scrolling: boolean) => setIsScrolling(scrolling);

  const value = useMemo(
    () => ({ isScrolling, handleScrolling }),
    [isScrolling],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);

  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }

  return context;
};
