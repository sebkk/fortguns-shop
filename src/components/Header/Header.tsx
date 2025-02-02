'use client';

import React from 'react';

// interface IHeaderProps {}

export const Header = ({}) => {
  return (
    <header className='bg-elevation-1 flex h-20 w-full items-center justify-center'>
      <div className='max-w-max-screen flex w-full items-center justify-between px-10 py-4 text-white'>
        <h1>logo</h1>
        <nav>links</nav>
      </div>
    </header>
  );
};
