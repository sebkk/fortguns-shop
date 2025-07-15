import { TFlexibleContentLayout } from '@/types/sections';

import { SectionHandler } from './SectionHandler';

interface IContentSectionsProps {
  sections: TFlexibleContentLayout[];
}

export const ContentSections = ({ sections }: IContentSectionsProps) => {
  return (
    <div>
      {sections.map((section) => (
        <SectionHandler key={section.acf_fc_layout} section={section} />
      ))}
    </div>
  );
};
