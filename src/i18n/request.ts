import { LOCALES } from '@/constants/locales';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  if (!LOCALES.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`../../translations/${locale}.json`)).default,
  };
});
