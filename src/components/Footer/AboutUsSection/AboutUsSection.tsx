import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { getLinkHref } from '@/helpers/links';
import { FooterElement, TLinkHref } from '@/types/footer';

import styles from '../styles.module.scss';

interface IAboutUsSectionProps {
  footer: FooterElement['nav_about_us'];
}

export const AboutUsSection = ({ footer }: IAboutUsSectionProps) => {
  const { title, links } = footer || {};

  return (
    <div>
      <Typography className={styles['footer-nav-heading']} tag='h6'>
        {title}
      </Typography>
      <ul className={styles['footer-nav-list']}>
        {links.map(({ href, title, type }) => (
          <li key={href}>
            <Typography tag='span'>
              <Link
                className={styles['footer-nav-link']}
                anchorProps={{ target: '_blank' }}
                href={getLinkHref(href, type as TLinkHref)}
                nativeLink
              >
                {title || href}
                {title && `: ${href}`}
              </Link>
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};
