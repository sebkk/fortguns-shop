'use client';
import { ProgressProvider } from '@bprogress/next/app';
import { ReactNode } from 'react';

import { ScrollProvider } from './ScrollProvider';

const COLOR_PRIMARY_DARK = '#4d633b';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ProgressProvider
      options={{ showSpinner: false }}
      color={COLOR_PRIMARY_DARK}
    >
      <ScrollProvider>{children}</ScrollProvider>
    </ProgressProvider>
  );
};
