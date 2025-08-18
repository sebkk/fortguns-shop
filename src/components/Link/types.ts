import { AnchorHTMLAttributes, ReactNode } from 'react';

import { LinkProps } from 'next/link';

import { UrlObject } from 'url';

export type TLinkVariant = 'primary' | 'secondary' | 'accent';
export type TLinkSize = 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge';

export interface ILinkProps {
  href:
    | string
    | number
    | ({
        pathname: string;
      } & Omit<UrlObject, 'pathname'>)
    | ({
        pathname: number;
      } & Omit<UrlObject, 'pathname'>);
  children: ReactNode;
  className?: string;
  variant?: TLinkVariant;
  size?: TLinkSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  anchorProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
  nextLinkProps?: Omit<LinkProps, 'href' | 'locale'>;
  shouldFillIcon?: boolean;
  nativeLink?: boolean;
}
