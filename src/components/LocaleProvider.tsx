'use client';

import { useEffect } from 'react';

import { useLocale } from 'next-intl';

interface LocaleProviderProps {
  children: React.ReactNode;
}

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const locale = useLocale();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return <>{children}</>;
};
