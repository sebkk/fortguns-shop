/* eslint-disable prettier/prettier */
import { join } from 'path';

import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
    unoptimized: true,
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
