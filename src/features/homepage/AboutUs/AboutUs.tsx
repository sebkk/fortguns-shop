import { MailIcon } from '@/components/_icons/MailIcon';
import { PhoneIcon } from '@/components/_icons/PhoneIcon';
import { TelegramIcon } from '@/components/_icons/TelegramIcon';
import { GoogleMapComponent } from '@/components/GoogleMapComponent';

import { SectionWrapper } from '@/components/SectionWrapper';
import styles from './styles.module.scss';

const containerStyle = {
  width: '100%',
  height: '400px',
};

export const contactInfo = [
  {
    title: 'Telefon',
    value: '+48 666 366 361',
    type: 'tel',
    icon: <PhoneIcon className={styles['contact-icon']} />,
  },
  {
    title: 'E-mail',
    value: 'sklep@fortguns.pl',
    type: 'mailto',
    icon: <MailIcon className={styles['contact-icon']} />,
  },
  {
    title: 'Telegram',
    value: '@fortguns',
    type: 'telegram',
    icon: <TelegramIcon className={styles['contact-icon']} />,
  },
];

export const AboutUs = () => {
  return (
    <SectionWrapper
      sectionHeadingProps={{ title: 'O nas' }}
      background='light'
      withPadding
    >
      <div className={styles['content-grid']}>
        <div className={styles['info-column']}>
          <address className={styles['address-block']}>
            <a
              href={`maps:?q=${'Borowa 104a, 24-100'}`}
              target='_blank'
              className={styles['address-link']}
            >
              Borowa 104a, 24-100 Borowa, Polska
            </a>
            <p className={styles['address-details']}>
              Województwo Lubelskie. Przed przyjazdem prosimy o wcześniejszy
              kontakt i umówienie się.
            </p>
          </address>
          <ul className={styles['contact-list']}>
            {contactInfo.map(({ value, type, icon }) => (
              <li className={styles['contact-list-item']} key={type}>
                <a className={styles['contact-link']} href={`${type}:${value}`}>
                  {icon} {value}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <GoogleMapComponent
          styles={containerStyle}
          location='Fortguns,Poland'
        />
      </div>
    </SectionWrapper>
  );
};
