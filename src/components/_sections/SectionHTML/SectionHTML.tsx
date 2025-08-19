import { ContentHTML } from '@/components/ContentHTML';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { ISectionHtml } from '@/types/sections';

import styles from './SectionHTML.module.scss';

interface ISectionHTMLProps {
  section: ISectionHtml;
}

export const SectionHTML = ({ section }: ISectionHTMLProps) => {
  const { title, description, html_code } = section;

  return (
    <div>
      <TitleWithDesc
        wrapperClassName={styles['section-html_title-desc-wrapper']}
        title={title}
        description={description}
      />
      <ContentHTML content={html_code} />
    </div>
  );
};
