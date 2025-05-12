import Link from 'next/link';

import { Spacer } from '@/components/Spacer';
import { Typography } from '@/components/Typography';

import { ContactForm } from '../ContactForm';

export const Contact = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Typography variant='main-heading' tag='h1' className='mb-4'>
        Skontaktuj się z nami
      </Typography>
      <Typography
        variant='c-heading'
        tag='p'
        className='mb-8 max-w-screen-md'
        color='text-medium_dark'
      >
        {
          'Zanim wyślesz wiadomość, sprawdź, czy odpowiedź na\u00A0Twoje pytanie nie znajduje się na naszej'
        }
        <Link href='/faq' className='ml-1 hover:underline'>
          stronie FAQ
        </Link>
        .
      </Typography>
      <Spacer size='md' />
      <ContactForm />
    </div>
  );
};
