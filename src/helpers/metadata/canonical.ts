import { DEFAULT_LOCALE, PATHNAMES } from '@/constants/locales';

import type { Metadata } from 'next';

type TRoute = keyof typeof PATHNAMES;

/**
 * Public path for a route, taken from the same PATHNAMES map the router uses,
 * with the [params] filled in — so a canonical can never drift from where the
 * page actually lives.
 */
export const getCanonicalPath = (
  route: TRoute,
  params: Record<string, string | number> = {},
) => {
  const template = PATHNAMES[route]?.[DEFAULT_LOCALE] ?? String(route);

  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`[${key}]`, String(value)),
    template,
  );
};

const setCanonical = (metadata: Metadata, canonical: string): Metadata => ({
  ...metadata,
  alternates: { ...metadata.alternates, canonical },
});

export const withCanonical = (
  metadata: Metadata,
  route: TRoute,
  params?: Record<string, string | number>,
): Metadata => setCanonical(metadata, getCanonicalPath(route, params));

/** Dynamic CMS pages live directly under the root, e.g. /kontakt. */
export const withCanonicalSlug = (metadata: Metadata, slug: string): Metadata =>
  setCanonical(metadata, `/${slug}`);
