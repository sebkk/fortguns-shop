'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

import { Overlay } from '@/components/Overlay';

import styles from './styles.module.scss';

interface IDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Drawer = ({
  isOpen,
  onClose,
  children,
  title = 'Filtry',
}: IDrawerProps) => {
  return (
    <>
      <Overlay isOpen={isOpen} onClose={onClose} />
      <div
        className={clsx(
          styles['drawer-panel'],
          isOpen && styles['drawer-panel-open'],
        )}
        role='dialog'
        aria-modal='true'
        aria-labelledby='drawer-title'
        aria-hidden={!isOpen}
      >
        <div className={styles['drawer-header']}>
          <h2 id='drawer-title' className={styles['drawer-title']}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className={styles['drawer-close-button']}
            aria-label='Zamknij panel'
          >
            &times;
          </button>
        </div>
        <div className={styles['drawer-content']}>{children}</div>
      </div>
    </>
  );
};
