import { ISpacerSize } from './components';
import { IPhoto } from './pages';
import { IProductListing } from './product';

export enum EVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum ESectionBackground {
  DEFAULT = 'default',
  BG_LIGHT = 'bg-light',
  BG_PRIMARY = 'bg-primary',
  BG_SECONDARY = 'bg-secondary',
}

export enum ESectionLayout {
  CONTAINER = 'container',
  FULL_SIZE = 'full-size',
}

interface ITitleAndDescription {
  title: string;
  description: string;
}

interface IAccordionItem extends ITitleAndDescription {
  code_html: string;
}

interface IAccordionGroup {
  title: string;
  typeId: string;
  list: IAccordionItem[];
}

export interface ISectionOptions {
  section_options: {
    section_background: ESectionBackground;
    section_layout: ESectionLayout;
  };
}

export interface ISectionPageHeader
  extends ITitleAndDescription,
    ISectionOptions {
  acf_fc_layout: 'section_page_header';
}

export interface ISpacerSection {
  acf_fc_layout: 'spacer';
  size: ISpacerSize;
}

export interface ISectionAccordion extends ISectionOptions {
  acf_fc_layout: 'section_accordion';
  list: IAccordionGroup[];
}

export interface ISectionHtml extends ITitleAndDescription, ISectionOptions {
  acf_fc_layout: 'section_html';
  html_code: string;
}

export interface ISectionVariant extends ITitleAndDescription, ISectionOptions {
  acf_fc_layout: 'section_variant';
  variant: 'about_us';
  show_map: boolean;
  code_html: string;
}

export interface ISectionAboutUs extends ITitleAndDescription, ISectionOptions {
  acf_fc_layout: 'section_about_us';
  show_map: boolean;
  code_html: string;
  content: string;
  location_description: string;
}

export interface ISectionGallery extends ITitleAndDescription, ISectionOptions {
  acf_fc_layout: 'section_gallery';
  html_code: string;
  hide_main_carousel: boolean;
  hide_thumbnails: boolean;
  photos: IPhoto[];
}

export interface ISectionProductsCarousel extends ISectionOptions {
  acf_fc_layout: 'section_products_carousel';
  title: string;
  products_category: 'all';
  show_listing_link: boolean;
  products: IProductListing[];
}

interface ISectionHeroSlide {
  title: string;
  description: string;
  picture: IPhoto;
  variant: EVariants.PRIMARY | EVariants.SECONDARY;
}

export interface ISectionHero extends ISectionOptions {
  acf_fc_layout: 'section_hero';
  slides: ISectionHeroSlide[];
}

export interface ISectionNewsletter extends ISectionOptions {
  acf_fc_layout: 'section_newsletter';
  title: string;
  content: string;
  variant: EVariants.PRIMARY;
}

export type TFlexibleContentLayout =
  | ISectionPageHeader
  | ISpacerSection
  | ISectionAccordion
  | ISectionHtml
  | ISectionAboutUs
  | ISectionGallery
  | ISectionProductsCarousel
  | ISectionHero
  | ISectionVariant
  | ISectionNewsletter;

interface ISlugItem {
  locale: string;
  pathname: string;
}

export interface IAcfData {
  sections?: TFlexibleContentLayout[];
  slugs_list?: ISlugItem[];
  source?: string;
  destination?: string;
}
