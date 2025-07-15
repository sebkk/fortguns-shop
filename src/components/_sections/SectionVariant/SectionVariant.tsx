import { ContentHTML } from '@/components/ContentHTML';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { AboutUs } from '@/features/homepage/AboutUs';
import { ISectionVariant } from '@/types/sections';

interface ISectionVariantProps {
  section: ISectionVariant;
}

export const SectionVariant = ({ section }: ISectionVariantProps) => {
  const { title, description, show_map, code_html } = section;

  return (
    <div>
      <TitleWithDesc title={title} description={description} />
      <ContentHTML content={code_html} />
      {show_map && <AboutUs />}
    </div>
  );
};
