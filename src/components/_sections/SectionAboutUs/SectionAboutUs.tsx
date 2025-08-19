import { ContentHTML } from '@/components/ContentHTML';
import { GoogleMapComponent } from '@/components/GoogleMapComponent';
import { Link } from '@/components/Link';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { Typography } from '@/components/Typography';
import globalInfos from '@/constants/api/global-infos';
import { getContactInfoIcon, getLinkHref } from '@/helpers/links';
import { TLinkHref } from '@/types/footer';
import { TSectionAboutUsProps } from '@/types/handlerComponents';

import styles from './SectionAboutUs.module.scss';

const containerStyle = {
  width: '100%',
  height: '400px',
};

export const SectionAboutUs = ({ section }: TSectionAboutUsProps) => {
  const {
    title,
    description,
    show_map,
    code_html,
    content,
    location_description,
  } = section;

  const address = globalInfos.contact_infos.find(
    ({ type }) => type === 'address',
  );

  const contactInfosFiltered = globalInfos.contact_infos.filter(
    ({ type }) => type !== 'address',
  );

  return (
    <div className={styles['section-about-us']}>
      <TitleWithDesc
        title={title}
        description={description}
        wrapperClassName={styles['section-about-us-title-desc-wrapper']}
      />
      <div className={styles['content-grid']}>
        <div className={styles['info-column']}>
          {content && (
            <Typography tag='p' className={styles['content-text']}>
              {content}
            </Typography>
          )}
          <address className={styles['address-block']}>
            <a
              href={`maps:?q=${address?.href}`}
              target='_blank'
              className={styles['address-link']}
            >
              {getContactInfoIcon(
                address?.type as string,
                styles['contact-icon'],
              )}
              <span>{address?.href}</span>
            </a>
            {location_description && (
              <Typography tag='p' className={styles['location-description']}>
                {location_description}
              </Typography>
            )}
          </address>
          <ul className={styles['contact-list']}>
            {contactInfosFiltered.map(({ href, type }) => (
              <li className={styles['contact-list-item']} key={type}>
                <Link
                  className={styles['contact-link']}
                  href={getLinkHref(href, type as TLinkHref)}
                  size='xxLarge'
                >
                  {getContactInfoIcon(type, styles['contact-icon'])} {href}
                </Link>
              </li>
            ))}
          </ul>
          <ContentHTML
            content={code_html}
            className={styles['content-html--mobile']}
          />
        </div>
        {show_map && (
          <GoogleMapComponent
            styles={containerStyle}
            location='Fortguns,Poland'
          />
        )}
      </div>
      <ContentHTML
        content={code_html}
        className={styles['content-html--desktop']}
      />
    </div>
  );
};
