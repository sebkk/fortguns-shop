'use client';

import Link from 'next/link';
import React from 'react';

const links = [
  { text: 'Regulamin', href: '/regulamin' },
  { text: 'Pytania', href: '/pytania' },
  { text: 'Kontakt', href: '/kontakt' },
];

export const Footer = () => {
  return (
    <footer className='bg-elevation-1 absolute bottom-0 h-auto w-full py-4 text-white'>
      <div className='container grid grid-cols-3 gap-2'>
        <nav>
          <h6>Nawigacja</h6>
          <ul>
            {links.map(({ text, href }) => (
              <li key={href}>
                <Link href={href}>{text}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='col-span-2'>contact</div>
      </div>
    </footer>
  );
};
