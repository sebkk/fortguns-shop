import { DEFAULT_LOCALE } from '@/constants/locales';

export const createUrl = (locale: string, pathname: string) => {
  const pathnameWithoutSlash = pathname.includes('/')
    ? pathname.slice(1)
    : pathname;

  const fullPathname =
    locale === DEFAULT_LOCALE
      ? pathnameWithoutSlash
      : `${locale}/${pathnameWithoutSlash}`;

  return `${process.env.NEXT_PUBLIC_API_URL}/${fullPathname}`;
};
