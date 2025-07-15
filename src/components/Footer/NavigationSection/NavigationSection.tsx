import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { FooterElement } from '@/types/footer';

import styles from '../styles.module.scss';

interface INavigationSectionProps {
  footer: FooterElement['nav_column'];
}

export const NavigationSection = ({ footer }: INavigationSectionProps) => {
  const { title, links } = footer || {};

  return (
    <div>
      <Typography className={styles['footer-nav-heading']} tag='h6'>
        {title}
      </Typography>
      <ul className={styles['footer-nav-list']}>
        {links.map((link) => (
          <li key={link.href}>
            <Typography tag='span'>
              <Link className={styles['footer-nav-link']} href={link.href}>
                {link.title}
              </Link>
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};
