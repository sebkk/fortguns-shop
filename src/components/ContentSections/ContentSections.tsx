import { TFlexibleContentLayout } from '@/types/sections';

import styles from './ContentSections.module.scss';
import { SectionHandler } from './SectionHandler';

interface IContentSectionsProps {
  sections: TFlexibleContentLayout[];
}

export const ContentSections = ({ sections }: IContentSectionsProps) => {
  const sectionHero = sections.find(
    (section) => section.acf_fc_layout === 'section_hero',
  );

  if (!!sectionHero) {
    const sectionWithoutHero = sections.filter(
      (section) => section.acf_fc_layout !== 'section_hero',
    );

    return (
      <>
        <SectionHandler section={sectionHero} />
        <div className={styles['homepage-content-container']}>
          {sectionWithoutHero.map((section, index) => (
            <SectionHandler
              key={`${section.acf_fc_layout}-${index}`}
              section={section}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <div>
      {sections.map((section, index) => (
        <SectionHandler
          key={`${section.acf_fc_layout}-${index}`}
          section={section}
        />
      ))}
    </div>
  );
};
