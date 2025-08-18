import footerApi from '@/api/footer';
import globalInfos from '@/constants/api/global-infos';

import { AboutUsSection } from './AboutUsSection/AboutUsSection';
import { CopyrightSection } from './CopyrightSection';
import { NavigationSection } from './NavigationSection';
import { SocialsSection } from './SocialsSection/SocialsSection';
import styles from './styles.module.scss';

export const revalidate = 3000;

export const Footer = async () => {
  const footer = await footerApi.getFooter();

  const [{ acf }] = footer;

  const { nav_column, nav_about_us, follow_us } = acf;

  const { socials, contact_infos } = globalInfos;

  return (
    <footer className={styles['footer-wrapper']}>
      <div className={styles['footer-container']}>
        <nav className={styles['footer-nav']}>
          <NavigationSection footer={nav_column} />
          <AboutUsSection footer={nav_about_us} contactInfos={contact_infos} />
          <SocialsSection footer={follow_us} socials={socials} />
        </nav>
        <CopyrightSection />
      </div>
    </footer>
  );
};
