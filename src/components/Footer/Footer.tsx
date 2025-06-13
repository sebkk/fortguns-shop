import Link from 'next/link';

import clsx from 'clsx';

import { contactInfo } from '@/features/homepage/AboutUs/AboutUs';

import { CopyrightSection } from './CopyrightSection';
import styles from './styles.module.scss';

const links = [
  { text: 'Regulamin', href: '/regulamin' },
  { text: 'Pytania', href: '/faq' },
  { text: 'Kontakt', href: '/kontakt' },
];

export const Footer = () => {
  return (
    <footer className={styles['footer-wrapper']}>
      <div className={styles['footer-container']}>
        <nav className={styles['footer-nav']}>
          <div className={styles['footer-contact-section']}>
            <h6 className={styles['footer-nav-heading']}>Nawigacja</h6>
            <ul className={styles['footer-nav-list']}>
              {links.map(({ text, href }) => (
                <li key={href}>
                  <Link href={href} className={styles['footer-nav-link']}>
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles['footer-contact-section']}>
            <h6 className={styles['footer-nav-heading']}>Obserwuj nas</h6>
            <a
              href={`maps:?q=${'Borowa 104a, 24-100'}`}
              target='_blank'
              className={styles['address-link']}
            >
              Borowa 104a, 24-100 Borowa, Polska
            </a>
            <ul
              className={clsx(
                styles['footer-nav-list'],
                styles['footer-nav-list_contact'],
              )}
            >
              {contactInfo.map(({ value, type, title }) => (
                <li key={type}>
                  <a
                    // className={}
                    href={`${type}:${value}`}
                  >
                    {title}: {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles['footer-contact-section']}>
            <h6 className={styles['footer-nav-heading']}>Follow us</h6>
            <ul
              className={clsx(
                styles['footer-nav-list'],
                styles['footer-nav-list_socials'],
              )}
            >
              {contactInfo.map(({ value, type, icon }) => (
                <li key={type}>
                  <a
                    className={
                      type === 'telegram'
                        ? styles['nav-item_telegram']
                        : undefined
                    }
                    href={`${type}:${value}`}
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <CopyrightSection />
      </div>
    </footer>
  );
};
