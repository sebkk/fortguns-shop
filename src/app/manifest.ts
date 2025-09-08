import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FortGuns - Sklep z branią palną',
    short_name: 'FortGuns',
    description: 'Sklep z bronią palną i wyposażeniem strzeleckim.',
    icons: [
      {
        src: '/pictures/fortguns-favicon-512.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
      {
        src: '/pictures/fortguns-favicon-192.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
    ],
    start_url: '/',
    display: 'standalone',
    theme_color: '#0f0f0f',
    background_color: '#0f0f0f',
    orientation: 'portrait',
    scope: '/',
  };
}
