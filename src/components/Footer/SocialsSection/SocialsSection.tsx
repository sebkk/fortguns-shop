import clsx from 'clsx';

import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { getLinkIcon } from '@/helpers/links';
import { FooterElement, TLinkHref } from '@/types/footer';
import { Social } from '@/types/globalInfos';

import styles from '../styles.module.scss';

interface ISocialsSectionProps {
  footer: FooterElement['follow_us'];
  socials: Social[];
}

export const SocialsSection = ({ footer, socials }: ISocialsSectionProps) => {
  const { title } = footer || {};

  return (
    <div>
      <Typography className={styles['footer-nav-heading']} tag='h6'>
        {title}
      </Typography>
      <ul
        className={clsx(
          styles['footer-nav-list'],
          styles['footer-nav-list__socials'],
        )}
      >
        {socials.map(({ href, title, type }) => (
          <li key={href}>
            <Link
              href={href}
              anchorProps={{
                target: '_blank',
                'aria-label': title,
                rel: 'noopener',
              }}
              className={clsx(
                styles['footer-nav-link'],
                styles['footer-nav-link__social'],
              )}
            >
              {getLinkIcon(type as TLinkHref)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
