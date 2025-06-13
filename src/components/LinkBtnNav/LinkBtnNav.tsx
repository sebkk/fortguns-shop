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
  linkProps?: Omit<ILinkProps, 'href' | 'children'>;
}

export const LinkBtnNav = ({
  href,
  children,
  className,
  linkProps,
}: ILinkBtnNavProps) => {
  return (
    <Link
      href={href || ''}
      {...linkProps}
      className={clsx(styles['link-btn-nav'], className)}
    >
      {children}
    </Link>
  );
};
