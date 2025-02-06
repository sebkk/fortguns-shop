import Link from 'next/link';
import React from 'react';

const links = [
  { text: 'Regulamin', href: '/regulamin' },
  { text: 'Pytania', href: '/pytania' },
  { text: 'Kontakt', href: '/kontakt' },
];

export const Footer = () => {
  return (
    <footer className='w-full bg-transparent py-4'>
      <div className='container relative grid grid-cols-3 gap-2'>
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
        <div className='col-span-2 rounded p-4'>contact</div>
      </div>
    </footer>
  );
};
