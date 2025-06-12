import { clsx } from 'clsx';
import { ReactNode, useState } from 'react';

import { Drawer, IDrawerProps } from '@/components/Drawer';
import { HamburgerIcon } from '@/components/_icons/Hamburger';

import styles from './styles.module.scss';

interface IHamburgerMenuProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  drawerProps?: Omit<IDrawerProps, 'isOpen' | 'onClose' | 'children'>;
}

export const HamburgerMenu = ({
  onClick,
  className,
  children,
  drawerProps,
}: IHamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);

    onClick && onClick();
  };

  return (
    <>
      <button
        type='button'
        className={clsx(
          styles.hamburger,
          isOpen && styles['hamburger--open'],
          className,
        )}
        onClick={handleClick}
        aria-label='Menu'
      >
        <HamburgerIcon />
      </button>
      <Drawer isOpen={isOpen} onClose={handleClick} {...drawerProps}>
        {children}
      </Drawer>
    </>
  );
};
