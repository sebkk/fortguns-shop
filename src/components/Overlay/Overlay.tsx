import clsx from 'clsx';

import styles from './styles.module.scss';

interface IOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Overlay = ({ isOpen, onClose }: IOverlayProps) => {
  return (
    <div
      className={clsx(styles['overlay'], isOpen && styles['overlay--open'])}
      onClick={onClose}
      aria-hidden={!isOpen}
    />
  );
};
