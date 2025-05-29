import clsx from 'clsx';

import styles from './icons.module.scss';

interface ArrowIconProps {
  className?: string;
  strokeWidth?: number;
}

export const ArrowIcon = ({ className, strokeWidth = 2 }: ArrowIconProps) => {
  return (
    <svg
      className={clsx(styles['arrow-icon'], className)}
      width={24}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={strokeWidth}
        d='M19 9l-7 7-7-7'
      />
    </svg>
  );
};
