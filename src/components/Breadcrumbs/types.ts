import { ReactNode } from 'react';

export interface IBreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface IBreadcrumbsProps {
  items: IBreadcrumbItem[];
  className?: string;
  separator?: ReactNode;
  maxItems?: number;
  showHome?: boolean;
  homeLabel?: string;
  homeHref?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'minimal';
}
