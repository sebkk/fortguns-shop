import { ReactNode } from 'react';

import clsx from 'clsx';

import { LinkServer } from '@/components/Link/LinkServer';
import { ILinkProps } from '@/components/Link/types';

import styles from './styles.module.scss';

interface ILinkBtnNavServerProps {
  href?: string;
  children: ReactNode;
  className?: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  linkProps?: Omit<ILinkProps, 'href' | 'children'>;
}

export const LinkBtnNavServer = ({
  href,
  children,
  className,
  linkProps,
}: ILinkBtnNavServerProps) => {
  return (
    <LinkServer
      href={href || ''}
      {...linkProps}
      className={clsx(styles['link-btn-nav'], className)}
    >
      {children}
    </LinkServer>
  );
};
