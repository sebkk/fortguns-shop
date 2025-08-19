import { ISpacerSize } from './components';
import { IPhoto } from './pages';
import { IProduct } from './product';

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
    section_background: 'default' | 'bg-light';
    section_layout: 'container' | 'full-size';
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
  products: IProduct[];
}

interface ISectionHeroSlide {
  title: string;
  description: string;
  picture: IPhoto;
  variant: 'primary' | 'secondary';
}

export interface ISectionHero extends ISectionOptions {
  acf_fc_layout: 'section_hero';
  slides: ISectionHeroSlide[];
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
  | ISectionVariant;

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
