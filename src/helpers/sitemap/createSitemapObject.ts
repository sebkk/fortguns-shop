import { MetadataRoute } from 'next';

const createSitemapObject = (
  url: string,
  options?: Partial<MetadataRoute.Sitemap[0]>,
): MetadataRoute.Sitemap[0] => ({
  url: url as string,
  lastModified: new Date(),
  changeFrequency: 'daily',
  priority: 0.8 as MetadataRoute.Sitemap[0]['priority'],
  ...options,
});

export { createSitemapObject };
