import clsx from 'clsx';

import styles from './Label.module.scss';

export interface ILabelProps {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
  labelClassName?: string;
  required?: boolean;
}

export const Label = ({
  children,
  className,
  htmlFor,
  required,
  labelClassName,
}: ILabelProps) => {
  return (
    <label
      className={clsx(styles['label'], className, labelClassName)}
      htmlFor={htmlFor}
    >
      {children}
      {required && <span className={styles['label-required']}>*</span>}
    </label>
  );
};
