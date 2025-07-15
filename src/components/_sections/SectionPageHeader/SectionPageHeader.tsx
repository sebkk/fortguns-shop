import { TitleWithDesc } from '@/components/TitleWithDesc';
import { ISectionPageHeader } from '@/types/sections';

interface ISectionPageHeaderProps {
  section: ISectionPageHeader;
}

export const SectionPageHeader = ({ section }: ISectionPageHeaderProps) => {
  return (
    <TitleWithDesc title={section.title} description={section.description} />
  );
};
