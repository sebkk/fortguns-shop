import { NAVIGATION_ROUTE } from './navigation';

export const DEFAULT_LOCALE = 'pl';

export const LOCALES = [DEFAULT_LOCALE];

// TODO: FETCH PAGES AND GENERATE
export const PATHNAMES = {
  '/': {
    pl: '/',
    en: '/',
  },
  [NAVIGATION_ROUTE.PRODUCTS_LISTING]: {
    pl: '/produkty',
    en: NAVIGATION_ROUTE.PRODUCTS_LISTING,
  },
  [NAVIGATION_ROUTE.CONTACT]: {
    pl: '/kontakt',
    en: NAVIGATION_ROUTE.CONTACT,
  },
  [NAVIGATION_ROUTE.FAQ]: {
    pl: '/najczestsze-pytania',
    en: NAVIGATION_ROUTE.FAQ,
  },
  [NAVIGATION_ROUTE.PRODUCT_DETAILS]: {
    pl: '/produkt/[productSlug]',
    en: NAVIGATION_ROUTE.PRODUCT_DETAILS,
  },
};
