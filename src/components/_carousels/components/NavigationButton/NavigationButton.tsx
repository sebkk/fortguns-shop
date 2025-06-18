import clsx from 'clsx';

import { ArrowIcon } from '@/components/_icons/ArrowIcon';
import { Button } from '@/components/Button';

import styles from './styles.module.scss';

interface INavigationButtonProps {
  handleNextSlide: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  swiperButtonPrev: string;
  direction: 'next' | 'prev';
  className?: string;
}

export const NavigationButton = ({
  handleNextSlide,
  swiperButtonPrev,
  direction = 'next',
  className,
}: INavigationButtonProps) => {
  return (
    <Button
      variant='blank'
      className={clsx(
        styles['products-btn'],
        styles[`products-btn-dir-${direction}`],
        swiperButtonPrev,
        className,
      )}
      onClick={handleNextSlide}
    >
      <ArrowIcon />
    </Button>
  );
};
