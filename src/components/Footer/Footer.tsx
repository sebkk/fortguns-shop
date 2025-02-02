import Link from 'next/link';
import React from 'react';

const links = [
  { text: 'Regulamin', href: '/regulamin' },
  { text: 'Pytania', href: '/pytania' },
  { text: 'Kontakt', href: '/kontakt' },
];

export const Footer = () => {
  return (
    <footer className='absolute bottom-0 w-full py-4'>
      <div className='container grid grid-cols-3 gap-6'>
        <nav className='p-4'>
          <h6>Nawigacja</h6>
          <ul>
            {links.map(({ text, href }) => (
              <li key={href}>
                <Link href={href}>{text}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='col-span-2 rounded p-4'>contact</div>
      </div>
    </footer>
  );
};
