import dynamic from 'next/dynamic';

import {
  IHandlerComponents,
  TSectionAboutUsProps,
  TSectionAccordionProps,
  TSectionGalleryProps,
  TSectionHeroProps,
  TSectionHtmlProps,
  TSectionNewsletterProps,
  TSectionPageHeaderProps,
  TSectionProductsCarouselProps,
  TSectionVariantProps,
  TSpacerSectionProps,
} from '@/types/handlerComponents';

// --- DYNAMIC IMPORTS ---
const Spacer = dynamic(() =>
  import('@/components/Spacer').then((mod) => mod.Spacer),
);

const SectionAccordion = dynamic(() =>
  import('@/components/_sections/SectionAccordion').then(
    (mod) => mod.SectionAccordion,
  ),
);

const SectionPageHeader = dynamic(() =>
  import('@/components/_sections/SectionPageHeader').then(
    (mod) => mod.SectionPageHeader,
  ),
);

const SectionHTML = dynamic(() =>
  import('@/components/_sections/SectionHTML').then((mod) => mod.SectionHTML),
);

const SectionVariant = dynamic(() =>
  import('@/components/_sections/SectionVariant').then(
    (mod) => mod.SectionVariant,
  ),
);

const SectionAboutUs = dynamic(() =>
  import('@/components/_sections/SectionAboutUs').then(
    (mod) => mod.SectionAboutUs,
  ),
);

const SectionGallery = dynamic(() =>
  import('@/components/_sections/SectionGallery').then(
    (mod) => mod.SectionGallery,
  ),
);

const SectionProductsCarousel = dynamic(() =>
  import('@/components/_sections/SectionProductsCarousel').then(
    (mod) => mod.SectionProductsCarousel,
  ),
);

const SectionHero = dynamic(() =>
  import('@/components/_sections/SectionHero').then((mod) => mod.SectionHero),
);

const SectionNewsletter = dynamic(() =>
  import('@/components/_sections/SectionNewsletter').then(
    (mod) => mod.SectionNewsletter,
  ),
);

export const handlerComponents: IHandlerComponents = {
  section_page_header: ({ section }: TSectionPageHeaderProps) => (
    <SectionPageHeader section={section} />
  ),
  spacer: ({ section }: TSpacerSectionProps) => <Spacer size={section.size} />,
  section_accordion: ({ section }: TSectionAccordionProps) => (
    <SectionAccordion section={section} />
  ),
  section_html: ({ section }: TSectionHtmlProps) => (
    <SectionHTML section={section} />
  ),
  section_variant: ({ section }: TSectionVariantProps) => (
    <SectionVariant section={section} />
  ),
  section_about_us: ({ section }: TSectionAboutUsProps) => (
    <SectionAboutUs section={section} />
  ),
  section_gallery: ({ section }: TSectionGalleryProps) => (
    <SectionGallery section={section} />
  ),
  section_products_carousel: ({ section }: TSectionProductsCarouselProps) => (
    <SectionProductsCarousel section={section} />
  ),
  section_hero: ({ section }: TSectionHeroProps) => (
    <SectionHero section={section} />
  ),
  section_newsletter: ({ section }: TSectionNewsletterProps) => (
    <SectionNewsletter section={section} />
  ),
};
