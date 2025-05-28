import { Url } from 'next/dist/shared/lib/router/router';
import { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

export type TLinkVariant = 'primary' | 'secondary' | 'accent';
export type TLinkSize = 'small' | 'medium' | 'large';

export interface ILinkProps {
  href: Url;
  children: ReactNode;
  className?: string;
  variant?: TLinkVariant;
  size?: TLinkSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  anchorProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
  nextLinkProps?: Omit<LinkProps, 'href'>;
}
