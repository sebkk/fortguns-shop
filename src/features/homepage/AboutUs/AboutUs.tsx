'use client';

import { MailIcon } from '@/components/_icons/MailIcon';
import { PhoneIcon } from '@/components/_icons/PhoneIcon';
import { TelegramIcon } from '@/components/_icons/TelegramIcon';
import { GoogleMapComponent } from '@/components/GoogleMapComponent';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const contactInfo = [
  {
    title: 'Telefon',
    value: '+48 666 366 361',
    type: 'tel',
    icon: <PhoneIcon className='mr-2' />,
  },
  {
    title: 'E-mail',
    value: 'sklep@fortguns.pl',
    type: 'mailto',
    icon: <MailIcon className='mr-2' />,
  },
  {
    title: 'Telegram',
    value: '@fortguns',
    type: 'telegram',
    icon: <TelegramIcon className='mr-2' />,
  },
];

export const AboutUs = () => {
  return (
    <div className='bg-background-light px-4 py-14'>
      <div className='container'>
        <h2 className='mb-10 text-center text-4xl'>O nas</h2>
        <div className='grid grid-cols-2 gap-10'>
          <div className='flex flex-col justify-center'>
            <address className='mb-4 text-2xl font-bold not-italic'>
              <a
                href={`maps:?q=${'Borowa 104a, 24-100'}`}
                target='_blank'
                className='mb-3 block'
              >
                Borowa 104a, 24-100 Borowa, Polska
              </a>
              <p className='font-normal'>
                Województwo Lubelskie. Przed przyjazdem prosimy o wcześniejszy
                kontakt i umówienie się.
              </p>
            </address>
            <ul>
              {contactInfo.map(({ value, type, icon }) => (
                <li className='py-3' key={type}>
                  <a className='flex' href={`${type}:${value}`}>
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
      </div>
    </div>
  );
};
