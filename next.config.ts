import path from 'path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/assets/styles')],
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
    ],
  },
};

export default nextConfig;
