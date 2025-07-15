import {
  ISectionAccordion,
  ISectionHtml,
  ISectionPageHeader,
  ISectionVariant,
  ISpacerSection,
} from './sections';

export interface IHandlerComponentsProps<T> {
  section: T;
}

export type TSectionPageHeaderProps =
  IHandlerComponentsProps<ISectionPageHeader>;
export type TSpacerSectionProps = IHandlerComponentsProps<ISpacerSection>;
export type TSectionAccordionProps = IHandlerComponentsProps<ISectionAccordion>;
export type TSectionHtmlProps = IHandlerComponentsProps<ISectionHtml>;
export type TSectionVariantProps = IHandlerComponentsProps<ISectionVariant>;

export type THandlerComponentsProps = TSectionPageHeaderProps &
  TSpacerSectionProps &
  TSectionAccordionProps &
  TSectionHtmlProps &
  TSectionVariantProps;

export interface IHandlerComponents {
  section_page_header: (props: TSectionPageHeaderProps) => React.ReactNode;
  spacer: (props: TSpacerSectionProps) => React.ReactNode;
  section_accordion: (props: TSectionAccordionProps) => React.ReactNode;
  section_html: (props: TSectionHtmlProps) => React.ReactNode;
  section_variant: (props: TSectionVariantProps) => React.ReactNode;
}
