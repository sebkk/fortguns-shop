import { SectionAboutUs } from '@/components/_sections/SectionAboutUs';
import { ContentHTML } from '@/components/ContentHTML';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { ISectionAboutUs, ISectionVariant } from '@/types/sections';

interface ISectionVariantProps {
  section: ISectionVariant;
}

export const SectionVariant = ({ section }: ISectionVariantProps) => {
  const { title, description, code_html, variant } = section;

  if (variant === 'about_us') {
    return <SectionAboutUs section={section as unknown as ISectionAboutUs} />;
  }

  return (
    <div>
      <TitleWithDesc title={title} description={description} />
      <ContentHTML content={code_html} />
    </div>
  );
};
