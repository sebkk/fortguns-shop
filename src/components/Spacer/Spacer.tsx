'use client';

import clsx from 'clsx';

import styles from './styles.module.scss';

export interface ISpacerProps {
  size?: 'sm' | 'md' | 'default' | 'lg' | 'xl';
}

const sizeMap = {
  sm: styles['spacer-size--sm'],
  md: styles['spacer-size--md'],
  default: styles['spacer-size--default'],
  lg: styles['spacer-size--lg'],
  xl: styles['spacer-size--xl'],
};

export const Spacer = ({ size = 'default' }: ISpacerProps) => (
  <hr
    className={clsx(styles['spacer'], sizeMap[size as keyof typeof sizeMap])}
  />
);
