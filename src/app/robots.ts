import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: process.env.NEXT_PUBLIC_SITE_URL || 'https://fortguns.pl',
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fortguns.pl'}/sitemap.xml`,
  };
}
