/* eslint-disable prettier/prettier */
import { join } from 'path';

import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

// Both hosts answered 200, which leaves Google to guess which one is the site.
// The canonical host is whatever NEXT_PUBLIC_SITE_URL says — the same value
// robots.txt, the sitemap and every canonical are built from — so the redirect
// cannot drift away from them.
const canonicalHost = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fortguns.pl',
).host;

const duplicateHost = canonicalHost.startsWith('www.')
  ? canonicalHost.slice('www.'.length)
  : `www.${canonicalHost}`;

/**
 * Trzy marki miały w slugu zakodowany ampersand (smith-%26-wesson), w
 * przeciwieństwie do reszty, która od początku używała czystej konwencji.
 * Slugi poprawiono w WooCommerce, a stare adresy siedzą jeszcze w indeksie
 * Google i w odnośnikach z zewnątrz — WordPress nie przekierowuje sam po
 * zmianie sluga taksonomii.
 */
const BRAND_SLUG_REDIRECTS = [
  ['smith-%26-wesson', 'smith-wesson'],
  ['sauer-%26-sohn', 'sauer-sohn'],
  ['webley-%26-scott', 'webley-scott'],
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: duplicateHost }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      },
      // Dwa zapisy każdego adresu, bo nie ma pewności, na którym etapie Next
      // rozkoduje ścieżkę przy dopasowaniu trasy.
      ...BRAND_SLUG_REDIRECTS.flatMap(([from, to]) =>
        [from, decodeURIComponent(from)].map((source) => ({
          source: `/marki/${source}`,
          destination: `/marki/${to}`,
          permanent: true,
        })),
      ),
    ];
  },
  sassOptions: {
    includePaths: [join(__dirname, 'src/assets/styles')],
    additionalData: `@use '_variables' as *;
      @use '_functions' as *;
      @use '_mixins' as *;`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fortguns.pl',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'cms.fortguns.pl',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
    minimumCacheTTL: 2678400,
    formats: ['image/webp'],
  },
  experimental: {
    staticGenerationMaxConcurrency: 5,
    staticGenerationRetryCount: 3,
    staticGenerationMinPagesPerWorker: 25,
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = 'source-map';
    }
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
