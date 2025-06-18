import { ReactNode } from 'react';

import clsx from 'clsx';

import styles from './styles.module.scss';

interface IOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  className?: string;
}

export const Overlay = ({
  isOpen,
  onClose,
  children,
  className,
}: IOverlayProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={clsx(
        styles['overlay'],
        isOpen && styles['overlay--open'],
        className,
      )}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      {children && children}
    </div>
  );
};
