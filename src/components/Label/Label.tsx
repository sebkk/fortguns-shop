import clsx from 'clsx';

import styles from './Label.module.scss';

interface ILabelProps {
  children: React.ReactNode;
  color?: 'primary' | 'error';
}

export const Label = ({ children, color = 'primary' }: ILabelProps) => {
  const labelClassName = clsx(styles['label'], styles[`label--c-${color}`]);

  return <span className={labelClassName}>{children}</span>;
};
