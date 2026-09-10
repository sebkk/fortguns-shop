import { ReactNode } from 'react';

import clsx from 'clsx';

import { ILinkProps, Link } from '@/components/Link';

import styles from './styles.module.scss';

interface ILinkBtnNavProps {
  href?: string;
  children: ReactNode;
  className?: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  onClick?: () => void;
  linkProps?: Omit<ILinkProps, 'href' | 'children'>;
}

export const LinkBtnNav = ({
  href,
  children,
  className,
  linkProps,
  onClick,
}: ILinkBtnNavProps) => {
  const classNames = clsx(styles['link-btn-nav'], className);

  // Pozycja bez adresu niczego nie otwiera poza podmenu. Renderowana jako
  // <a href=""> dawała kotwicę wskazującą na bieżącą stronę: czytnik ekranu
  // zapowiadał odnośnik prowadzący donikąd, „otwórz w nowej karcie" nie robiło
  // nic sensownego, a brak nawigacji zależał od tego, że Next zignoruje pusty
  // adres.
  if (!href) {
    return (
      <button
        type='button'
        onClick={onClick}
        className={clsx(classNames, styles['link-btn-nav--button'])}
      >
        {children}
      </button>
    );
  }

  return (
    <Link href={href} {...linkProps} className={classNames}>
      {children}
    </Link>
  );
};
