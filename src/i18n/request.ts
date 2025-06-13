import { notFound } from 'next/navigation';

import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { LOCALES } from '@/constants/locales';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  if (!LOCALES.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`../../translations/${locale}.json`)).default,
  };
});
