import {
  ISectionAboutUs,
  ISectionAccordion,
  ISectionGallery,
  ISectionHero,
  ISectionHtml,
  ISectionNewsletter,
  ISectionPageHeader,
  ISectionProductsCarousel,
  ISectionReviewsTrustIndex,
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
export type TSectionAboutUsProps = IHandlerComponentsProps<ISectionAboutUs>;
export type TSectionGalleryProps = IHandlerComponentsProps<ISectionGallery>;
export type TSectionProductsCarouselProps =
  IHandlerComponentsProps<ISectionProductsCarousel>;
export type TSectionHeroProps = IHandlerComponentsProps<ISectionHero>;
export type TSectionNewsletterProps =
  IHandlerComponentsProps<ISectionNewsletter>;
export type TSectionReviewsTrustIndexProps =
  IHandlerComponentsProps<ISectionReviewsTrustIndex>;
export type THandlerComponentsProps = TSectionPageHeaderProps &
  TSpacerSectionProps &
  TSectionAccordionProps &
  TSectionHtmlProps &
  TSectionVariantProps &
  TSectionAboutUsProps &
  TSectionGalleryProps &
  TSectionProductsCarouselProps &
  TSectionNewsletterProps;

export interface IHandlerComponents {
  section_page_header: (props: TSectionPageHeaderProps) => React.ReactNode;
  spacer: (props: TSpacerSectionProps) => React.ReactNode;
  section_accordion: (props: TSectionAccordionProps) => React.ReactNode;
  section_html: (props: TSectionHtmlProps) => React.ReactNode;
  section_variant: (props: TSectionVariantProps) => React.ReactNode;
  section_about_us: (props: TSectionAboutUsProps) => React.ReactNode;
  section_gallery: (props: TSectionGalleryProps) => React.ReactNode;
  section_products_carousel: (
    props: TSectionProductsCarouselProps,
  ) => React.ReactNode;
  section_hero: (props: TSectionHeroProps) => React.ReactNode;
  section_newsletter: (props: TSectionNewsletterProps) => React.ReactNode;
  section_reviews_trustindex: (
    props: TSectionReviewsTrustIndexProps,
  ) => React.ReactNode;
}
