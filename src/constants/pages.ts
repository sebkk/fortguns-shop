export const fields = ['title', 'acf.layout', 'slug', 'link', 'acf'].join(',');

export const fieldsMetadata = ['link', 'rank_math_seo.rank_math_focus_keyword'];

export const fieldsRewrites = [
  'acf.source',
  'acf.destination',
  'acf.slugs_list',
  'slug',
].join(',');

export const fieldsStaticPaths = ['acf.slugs_list', 'acf.destination'].join(
  ',',
);

export const fieldsStaticPathsForSitemap = ['acf.slugs_list'].join(',');

export const fieldsFaqPage = ['acf.sections'].join(',');

export const homepageSlug = 'home';
