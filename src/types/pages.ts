import { IAcfData, ISlugItem, TFlexibleContentLayout } from './sections';

interface IRenderedText {
  rendered: string;
}

interface IGuid {
  rendered: string;
}

interface IRankMathAssessorSerpData {
  title: string;
  description: string;
  focusKeywords: string;
  pillarContent: boolean;
  canonicalUrl: string;
  breadcrumbTitle: string;
  advancedRobots: {
    'max-snippet': string;
    'max-video-preview': string;
    'max-image-preview': string;
  };
  facebookTitle: string;
  facebookDescription: string;
  facebookImage: string;
  facebookImageID: string;
  facebookHasOverlay: boolean;
  facebookImageOverlay: string;
  facebookAuthor: string;
  twitterCardType: string;
  twitterUseFacebook: boolean;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterImageID: string;
  twitterHasOverlay: boolean;
  twitterImageOverlay: string;
  twitterPlayerUrl: string;
  twitterPlayerSize: string;
  twitterPlayerStream: string;
  twitterPlayerStreamCtype: string;
  twitterAppDescription: string;
  twitterAppIphoneName: string;
  twitterAppIphoneID: string;
  twitterAppIphoneUrl: string;
  twitterAppIpadName: string;
  twitterAppIpadID: string;
  twitterAppIpadUrl: string;
  twitterAppGoogleplayName: string;
  twitterAppGoogleplayID: string;
  twitterAppGoogleplayUrl: string;
  twitterAppCountry: string;
  robots: {
    index: boolean;
  };
  twitterAuthor: string;
  primaryTerm: number;
  authorName: string;
  titleTemplate: string;
  descriptionTemplate: string;
  showScoreFrontend: boolean;
  lockModifiedDate: boolean;
}

interface IRankMathAssessor {
  focusKeywordLink: string;
  hasTOCPlugin: boolean;
  primaryTaxonomy: boolean;
  serpData: IRankMathAssessorSerpData;
  powerWords: unknown[];
  diacritics: { [key: string]: string };
  researchesTests: string[];
  hasRedirection: boolean;
  hasBreadcrumb: boolean;
}

interface IRankMathOverlayImage {
  name: string;
  url: string;
  path: string;
  position: string;
}

interface IRankMath {
  parentDomain: string;
  noFollowDomains: unknown[];
  noFollowExcludeDomains: unknown[];
  noFollowExternalLinks: boolean;
  featuredImageNotice: string;
  pluginReviewed: boolean;
  postSettings: {
    linkSuggestions: boolean;
    useFocusKeyword: boolean;
  };
  frontEndScore: boolean;
  postName: string;
  permalinkFormat: string;
  showLockModifiedDate: boolean;
  assessor: IRankMathAssessor;
  homeUrl: string;
  objectID: number;
  objectType: string;
  locale: string;
  localeFull: string;
  overlayImages: {
    play: IRankMathOverlayImage;
    gif: IRankMathOverlayImage;
  };
  defautOgImage: string;
  customPermalinks: boolean;
  isUserRegistered: boolean;
  autoSuggestKeywords: boolean;
  connectSiteUrl: string;
  maxTags: number;
  trendsIcon: string;
}

interface IMetaData {
  _acf_changed: boolean;
  _uag_custom_page_level_css: string;
  'site-sidebar-layout': string;
  'site-content-layout': string;
  'ast-site-content-layout': string;
  'site-content-style': string;
  'site-sidebar-style': string;
  'ast-global-header-display': string;
  'ast-banner-title-visibility': string;
  'ast-main-header-display': string;
  'ast-hfb-above-header-display': string;
  'ast-hfb-below-header-display': string;
  'ast-hfb-mobile-header-display': string;
  'site-post-title': string;
  'ast-breadcrumbs-content': string;
  'ast-featured-img': string;
  'footer-sml-layout': string;
  'theme-transparent-header-meta': string;
  'adv-header-id-meta': string;
  'stick-header-meta': string;
  'header-above-stick-meta': string;
  'header-main-stick-meta': string;
  'header-below-stick-meta': string;
  'astra-migrate-meta-layouts': string;
  'ast-page-background-enabled': string;
  'ast-page-background-meta': Record<string, string>;
  'ast-content-background-meta': Record<string, string>;
  footnotes: string;
}

export interface IGetPagesParams {
  _fields?: string;
  slug?: string;
  per_page?: number;
  page?: number;
  exclude?: string;
  search?: string;
  _embed?: boolean;
  status?: 'publish' | 'draft' | 'any';
  [key: string]: string | number | boolean | undefined;
}

export interface IWordPressPage {
  id?: number;
  date?: string;
  date_gmt?: string;
  guid?: IGuid;
  modified?: string;
  modified_gmt?: string;
  slug?: string;
  status?: string;
  type?: string;
  link?: string;
  title?: IRenderedText;
  content?: IRenderedText;
  excerpt?: IRenderedText;
  author?: number;
  featured_media?: number;
  parent?: number;
  menu_order?: number;
  comment_status?: string;
  ping_status?: string;
  template?: string;
  meta?: IMetaData;
  class_list?: string[];
  acf?: IAcfData;
  rankMath?: IRankMath;
  rank_math_seo?: IRankMathSeo;
}

export interface IPhoto {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: {
    thumbnail: string;
    'thumbnail-width': number;
    'thumbnail-height': number;
    medium: string;
    'medium-width': number;
    'medium-height': number;
    medium_large: string;
    'medium_large-width': number;
    'medium_large-height': number;
    large: string;
    'large-width': number;
    'large-height': number;
    '1536x1536': string;
    '1536x1536-width': number;
    '1536x1536-height': number;
    '2048x2048': string;
    '2048x2048-width': number;
    '2048x2048-height': number;
    'trp-custom-language-flag': string;
    'trp-custom-language-flag-width': number;
    'trp-custom-language-flag-height': number;
    woocommerce_thumbnail: string;
    'woocommerce_thumbnail-width': number;
    'woocommerce_thumbnail-height': number;
    woocommerce_single: string;
    'woocommerce_single-width': number;
    'woocommerce_single-height': number;
    woocommerce_gallery_thumbnail: string;
    'woocommerce_gallery_thumbnail-width': number;
    'woocommerce_gallery_thumbnail-height': number;
  };
}

export interface IRankMathSeo {
  rank_math_focus_keyword: [string];
}

export interface IWordPressPageStandard {
  link: IWordPressPage['link'];
  title: IWordPressPage['title'];
  acf: IWordPressPage['acf'];
  slug: IWordPressPage['slug'];
  rank_math_seo: IWordPressPage['rank_math_seo'];
}

export interface IWordPressPageSeoStandard {
  link: IWordPressPage['link'];
  rank_math_seo: string | undefined;
}

export interface IWordPressPageRewrites {
  slug: IWordPressPage['slug'];
  acf: IWordPressPage['acf'];
  source: string;
  destination: string;
  slugs_list: ISlugItem[];
}

export interface IWordPressPageStaticPaths {
  acf: { slugs_list: ISlugItem[]; destination: string };
}

export interface IWordPressPageStaticPathsForSitemap {
  acf: { slugs_list: ISlugItem[] };
}

export interface IWordPressPageFaqPageMetadata {
  acf: { sections: TFlexibleContentLayout[] };
}
