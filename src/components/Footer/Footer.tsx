import Link from 'next/link';

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
        </nav>
        <div className={styles['footer-contact-section']}>contact</div>
      </div>
    </footer>
  );
};
