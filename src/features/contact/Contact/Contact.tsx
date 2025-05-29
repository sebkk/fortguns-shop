'use client';

import Link from 'next/link';

import { Spacer } from '@/components/Spacer';
import { Typography } from '@/components/Typography';

import { ContactForm } from '../ContactForm';
import styles from './styles.module.scss';

export const Contact = () => {
  return (
    <div className={styles['contact-section-container']}>
      <Typography
        variant='main-heading'
        tag='h1'
        className={styles['contact-main-heading']}
      >
        Skontaktuj się z nami
      </Typography>
      <Typography
        variant='c-heading'
        tag='p'
        className={styles['contact-sub-heading']}
        color='text-medium_dark'
      >
        {
          'Zanim wyślesz wiadomość, sprawdź, czy odpowiedź na\u00A0Twoje pytanie nie znajduje się na naszej'
        }
        <Link href='/faq' className={styles['faq-link']}>
          stronie FAQ
        </Link>
        .
      </Typography>
      <Spacer size='md' />
      <ContactForm />
    </div>
  );
};
