import { NextRequest, NextResponse } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { DEFAULT_LOCALE, PATHNAMES } from './constants/locales';
import { NAVIGATION_ROUTE } from './constants/navigation';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/en') {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }

  let newPathname = pathname;

  if (pathname.startsWith('/en')) {
    newPathname = pathname.replace('/en', '');
  }

  if (newPathname.startsWith('/product-category')) {
    const pathSplitted = newPathname
      .replace('/product-category', '')
      .split('/');

    const pathWithoutPrefix = pathSplitted[pathSplitted.length - 1];

    const path = PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING_CATEGORY][
      DEFAULT_LOCALE
    ].replace('[categoryName]', pathWithoutPrefix);

    return NextResponse.redirect(new URL(path, request.url), 301);
  }

  if (newPathname.startsWith('/product')) {
    const pathWithoutPrefix = newPathname.replace('/product', '');

    const path = PATHNAMES[NAVIGATION_ROUTE.PRODUCT_DETAILS][
      DEFAULT_LOCALE
    ].replace('[productSlug]', pathWithoutPrefix);

    return NextResponse.redirect(new URL(path, request.url), 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|manifest.webmanifest|pictures|sitemap|robots.txt).*)',
  ],
};
