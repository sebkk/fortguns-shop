import { ISpacerSize } from './components';

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

export interface ISectionPageHeader extends ITitleAndDescription {
  acf_fc_layout: 'section_page_header';
}

export interface ISpacerSection {
  acf_fc_layout: 'spacer';
  size: ISpacerSize;
}

export interface ISectionAccordion {
  acf_fc_layout: 'section_accordion';
  list: IAccordionGroup[];
}

export interface ISectionHtml extends ITitleAndDescription {
  acf_fc_layout: 'section_html';
  html_code: string;
}

export interface ISectionVariant extends ITitleAndDescription {
  acf_fc_layout: 'section_variant';
  variant: 'about_us';
  show_map: boolean;
  code_html: string;
}

export type TFlexibleContentLayout =
  | ISectionPageHeader
  | ISpacerSection
  | ISectionAccordion
  | ISectionHtml;

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
