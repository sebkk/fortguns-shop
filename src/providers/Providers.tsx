'use client';
import { ReactNode } from 'react';

import { ProgressProvider } from '@bprogress/next/app';

import { ScrollProvider } from './ScrollProvider';

// Keep in step with $color-primary-dark in _variables.scss.
const COLOR_PRIMARY_DARK = '#96682a';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ProgressProvider
      options={{ showSpinner: false }}
      color={COLOR_PRIMARY_DARK}
    >
      {/*
        ReCaptchaProvider is mounted by SectionNewsletter, the only thing left
        that uses reCAPTCHA. Site-wide it loaded Google's script — and parked
        its badge — on every page, including ones with no form at all.
      */}
      <ScrollProvider>{children}</ScrollProvider>
    </ProgressProvider>
  );
};
