'use client';
import { ReactNode } from 'react';

import { ProgressProvider } from '@bprogress/next/app';

import { ReCaptchaProvider } from './ReCaptchaProvider';
import { ScrollProvider } from './ScrollProvider';

// Keep in step with $color-primary-dark in _variables.scss.
const COLOR_PRIMARY_DARK = '#96682a';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ProgressProvider
      options={{ showSpinner: false }}
      color={COLOR_PRIMARY_DARK}
    >
      <ReCaptchaProvider>
        <ScrollProvider>{children}</ScrollProvider>
      </ReCaptchaProvider>
    </ProgressProvider>
  );
};
