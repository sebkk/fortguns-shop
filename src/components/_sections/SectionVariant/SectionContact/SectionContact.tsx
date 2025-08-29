import { ContentHTML } from '@/components/ContentHTML';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { ContactForm } from '@/features/contact/ContactForm';
import { ISectionContact } from '@/types/sections';

import styles from './SectionContact.module.scss';

interface ISectionContactProps {
  section: ISectionContact;
}

export const SectionContact = ({ section }: ISectionContactProps) => {
  const { title, description, code_html } = section;

  return (
    <div>
      <TitleWithDesc title={title} description={description} />
      <div className={styles['section-contact-grid']}>
        <ContentHTML content={code_html} />
        <ContactForm />
      </div>
    </div>
  );
};
