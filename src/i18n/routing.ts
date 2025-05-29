import { DEFAULT_LOCALE, LOCALES, PATHNAMES } from '@/constants/locales';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
  pathnames: PATHNAMES,
});
