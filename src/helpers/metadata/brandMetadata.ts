import { OG_FALLBACK_IMAGE, SITE_NAME } from '@/constants/environment';

import type { Metadata } from 'next';

/**
 * Brand listings are assembled in code rather than in Rank Math, so they miss
 * the Open Graph tags the rest of the site gets from the CMS. WooCommerce does
 * expose a brand image, but nothing in the app reads it and its shape is
 * unverified, so share cards fall back to the shop logo.
 */
export const buildBrandMetadata = (
  brandName?: string,
  brandDescription?: string,
): Metadata => {
  const title = `Fortguns - ${brandName}`;

  return {
    title,
    description: brandDescription,
    keywords: brandName,
    openGraph: {
      title,
      description: brandDescription,
      siteName: SITE_NAME,
      locale: 'pl_PL',
      type: 'website',
      images: [OG_FALLBACK_IMAGE],
    },
  };
};
