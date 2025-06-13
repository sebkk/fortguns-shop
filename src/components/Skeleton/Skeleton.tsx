import clsx from 'clsx';

import styles from './styles.module.scss';

interface ISkeletonProps {
  variant?: 'rounded' | 'circle';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton = ({
  variant = 'rounded',
  width,
  height,
  className,
}: ISkeletonProps) => {
  return (
    <div
      className={clsx(
        styles.skeleton,
        styles[`skeleton--${variant}`],
        className,
      )}
      style={{
        width: width,
        height: height,
      }}
    />
  );
};
