import clsx from 'clsx';

import { ArrowIcon } from '@/components/_icons/ArrowIcon';
import { Button } from '@/components/Button';

import styles from './styles.module.scss';

interface INavigationButtonProps {
  handleNextSlide: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  swiperButtonPrev: string;
  direction: 'next' | 'prev';
  theme?: 'light' | 'dark';
  className?: string;
}

export const NavigationButton = ({
  handleNextSlide,
  swiperButtonPrev,
  direction = 'next',
  theme = 'light',
  className,
}: INavigationButtonProps) => {
  return (
    <Button
      variant='blank'
      className={clsx(
        styles['products-btn'],
        styles[`products-btn-dir-${direction}`],
        styles[`products-btn-theme-${theme}`],
        swiperButtonPrev,
        className,
      )}
      onClick={handleNextSlide}
    >
      <ArrowIcon />
    </Button>
  );
};
