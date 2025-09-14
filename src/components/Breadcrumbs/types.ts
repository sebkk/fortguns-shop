import { ReactNode } from 'react';

import { TLocale } from '@/constants/locales';

export interface IBreadcrumbItem {
  label: string;
  href?: { [key in TLocale]: string };
  isActive?: boolean;
  shouldTranslate?: boolean;
}

export interface IBreadcrumbsProps {
  items: IBreadcrumbItem[];
  className?: string;
  separator?: ReactNode;
  maxItems?: number;
  showHome?: boolean;
  homeLabel?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'minimal';
  hideSpacer?: boolean;
}
