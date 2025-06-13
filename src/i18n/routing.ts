import { defineRouting } from 'next-intl/routing';

import { DEFAULT_LOCALE, LOCALES, PATHNAMES } from '@/constants/locales';

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
  pathnames: PATHNAMES,
});
