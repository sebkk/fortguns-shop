import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { getLinkHref } from '@/helpers/links';
import { FooterElement, TLinkHref } from '@/types/footer';
import { ContactInfo } from '@/types/globalInfos';

import styles from '../styles.module.scss';

interface IAboutUsSectionProps {
  footer: FooterElement['nav_about_us'];
  contactInfos: ContactInfo[];
}

export const AboutUsSection = ({
  footer,
  contactInfos,
}: IAboutUsSectionProps) => {
  const { title } = footer || {};

  return (
    <div>
      <Typography className={styles['footer-nav-heading']} tag='h6'>
        {title}
      </Typography>
      <ul className={styles['footer-nav-list']}>
        {contactInfos.map(({ href, title, type }) => {
          const isAddress = type === 'address';

          return (
            <li key={href}>
              <Typography tag='span'>
                <Link
                  className={styles['footer-nav-link']}
                  anchorProps={{ target: '_blank', rel: 'noopener' }}
                  href={getLinkHref(href, type as TLinkHref)}
                  nativeLink
                >
                  {!isAddress && (title || href)}
                  {!isAddress && title && `: ${href}`}
                  {isAddress && href}
                </Link>
              </Typography>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
