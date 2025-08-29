import dynamic from 'next/dynamic';

import { ContentHTML } from '@/components/ContentHTML';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import {
  ISectionAboutUs,
  ISectionContact,
  ISectionVariant,
} from '@/types/sections';

const SectionContact = dynamic(() =>
  import('@/components/_sections/SectionVariant/SectionContact').then(
    (mod) => mod.SectionContact,
  ),
);

const SectionAboutUs = dynamic(() =>
  import('@/components/_sections/SectionVariant/SectionAboutUs').then(
    (mod) => mod.SectionAboutUs,
  ),
);

export { SectionContact };

interface ISectionVariantProps {
  section: ISectionVariant;
}

export const SectionVariant = ({ section }: ISectionVariantProps) => {
  const { title, description, code_html, variant } = section;

  if (variant === 'about_us') {
    return <SectionAboutUs section={section as unknown as ISectionAboutUs} />;
  }

  if (variant === 'contact') {
    return <SectionContact section={section as unknown as ISectionContact} />;
  }

  return (
    <div>
      <TitleWithDesc title={title} description={description} />
      <ContentHTML content={code_html} />
    </div>
  );
};
