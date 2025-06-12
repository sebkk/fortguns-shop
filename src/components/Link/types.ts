import { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';
import { UrlObject } from 'url';

export type TLinkVariant = 'primary' | 'secondary' | 'accent';
export type TLinkSize = 'small' | 'medium' | 'large';

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
}
