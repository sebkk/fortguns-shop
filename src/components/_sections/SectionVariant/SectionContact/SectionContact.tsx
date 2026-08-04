import { ContentHTML } from '@/components/ContentHTML';
import { Link } from '@/components/Link';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { Typography } from '@/components/Typography';
import globalInfos from '@/constants/api/global-infos';
import { ContactChannels } from '@/features/contact/ContactChannels';
import { OpeningHours } from '@/features/contact/OpeningHours';
import { ISectionContact } from '@/types/sections';

import styles from './SectionContact.module.scss';

interface ISectionContactProps {
  section: ISectionContact;
}

export const SectionContact = ({ section }: ISectionContactProps) => {
  const { title, description, code_html } = section;

  const address = globalInfos.contact_infos.find(
    ({ type }) => type === 'address',
  );

  return (
    <div className={styles['section-contact']}>
      <TitleWithDesc title={title} description={description} />

      <div className={styles['section-contact-grid']}>
        <ContactChannels />

        <div className={styles['section-contact-aside']}>
          <OpeningHours />

          {address && (
            <address className={styles['section-contact-address']}>
              <Typography
                tag='h3'
                className={styles['section-contact-address-heading']}
              >
                Sklep i strzelnica
              </Typography>
              <span>{address.label}</span>
              <Link
                className={styles['section-contact-address-link']}
                href={address.href}
                anchorProps={{ target: '_blank', rel: 'noopener' }}
                nativeLink
              >
                Wyznacz trasę w Mapach Google →
              </Link>
              <Typography
                tag='p'
                className={styles['section-contact-address-note']}
              >
                Bezpłatny parking pod sklepem, oś strzelecka 25 m tuż obok.
              </Typography>
            </address>
          )}
        </div>
      </div>

      {code_html && (
        <div className={styles['section-contact-company']}>
          <ContentHTML content={code_html} />
        </div>
      )}
    </div>
  );
};
