import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FortGuns',
    short_name: 'FortGuns',
    description: 'Sklep z bronią palną i wyposażeniem strzeleckim.',
    icons: [
      {
        src: '/pictures/favicon-fortguns.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/pictures/favicon-fortguns.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
    start_url: '/',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#000000',
    orientation: 'portrait',
    scope: '/',
  };
}
