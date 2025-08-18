export const fields = ['title', 'acf.layout', 'slug', 'acf'].join(',');

export const fieldsRewrites = [
  'acf.source',
  'acf.destination',
  'acf.slugs_list',
  'slug',
].join(',');

export const fieldsStaticPaths = ['acf.slugs_list', 'acf.destination'].join(
  ',',
);

export const homepageSlug = 'home';
