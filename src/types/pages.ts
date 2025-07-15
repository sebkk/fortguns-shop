import { IAcfData } from './sections';

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
}
