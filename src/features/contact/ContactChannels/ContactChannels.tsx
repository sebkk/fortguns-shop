import { Link } from '@/components/Link';
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import { Typography } from '@/components/Typography';
import globalInfos from '@/constants/api/global-infos';

import styles from './ContactChannels.module.scss';

const WHATSAPP_CHAT = 'https://wa.me/48666366361';

export const ContactChannels = () => {
  const { contact_infos, socials } = globalInfos;

  const email = contact_infos.find(({ type }) => type === 'mail');
  const phone = contact_infos.find(({ type }) => type === 'phone');
  const whatsappGroup = socials.find(({ type }) => type === 'whatsapp');
  const facebook = socials.find(({ type }) => type === 'facebook');

  return (
    <div className={styles['channels']}>
      {email && (
        <ObfuscatedEmail
          email={email.href}
          linkProps={{ className: styles['channel-primary'] }}
        >
          <span className={styles['channel-kicker']}>
            E-mail — odpiszemy także po godzinach
          </span>
          <span className={styles['channel-value']}>{email.label}</span>
          <span className={styles['channel-hint']}>
            Kliknij, żeby napisać — albo zaznacz i skopiuj adres.
          </span>
        </ObfuscatedEmail>
      )}

      {phone && (
        // Not a single link: the card holds two separate destinations.
        <div className={styles['channel-static']}>
          <span className={styles['channel-kicker']}>Telefon</span>
          <a
            className={styles['channel-value-link']}
            href={`tel:${phone.href.replace(/\s/g, '')}`}
          >
            {phone.label}
          </a>
          <span className={styles['channel-hint']}>
            Najszybszy sposób w godzinach otwarcia.
          </span>
          <Link
            className={styles['channel-sub-link']}
            href={WHATSAPP_CHAT}
            anchorProps={{ target: '_blank', rel: 'noopener' }}
            nativeLink
          >
            Nie odbieramy? Napisz SMS-a lub na WhatsAppie →
          </Link>
        </div>
      )}

      {whatsappGroup && (
        <Link
          className={styles['channel']}
          href={whatsappGroup.href}
          anchorProps={{ target: '_blank', rel: 'noopener' }}
          nativeLink
        >
          <span className={styles['channel-kicker']}>Społeczność</span>
          <Typography tag='span' className={styles['channel-value-sm']}>
            Dołącz do grupy na WhatsAppie
          </Typography>
          <span className={styles['channel-hint']}>
            Nowości w ofercie i okazje z rynku wtórnego, zanim trafią na stronę.
          </span>
        </Link>
      )}

      {facebook && (
        <Link
          className={styles['channel']}
          href={facebook.href}
          anchorProps={{ target: '_blank', rel: 'noopener' }}
          nativeLink
        >
          <span className={styles['channel-kicker']}>Społeczność</span>
          <Typography tag='span' className={styles['channel-value-sm']}>
            Obserwuj nas na Facebooku
          </Typography>
          <span className={styles['channel-hint']}>
            Bieżące informacje ze sklepu i o dostawach.
          </span>
        </Link>
      )}
    </div>
  );
};
