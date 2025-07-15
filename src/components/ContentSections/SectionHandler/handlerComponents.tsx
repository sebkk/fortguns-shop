import dynamic from 'next/dynamic';

import {
  IHandlerComponents,
  TSectionAccordionProps,
  TSectionHtmlProps,
  TSectionPageHeaderProps,
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
};
