'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { ReactNode, useEffect } from 'react';

import { Button } from '@/components/Button';
import { Overlay } from '@/components/Overlay';

import { usePathname } from '@/i18n/navigation';
import styles from './styles.module.scss';

export interface IDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  titleElement?: ReactNode;
  drawerClassName?: string;
}

export const Drawer = ({
  isOpen,
  onClose,
  children,
  title,
  titleElement,
  drawerClassName,
}: IDrawerProps) => {
  const t = useTranslations();
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  return (
    <>
      <Overlay isOpen={isOpen} onClose={onClose} />
      <div
        className={clsx(
          styles['drawer-panel'],
          isOpen && styles['drawer-panel-open'],
          drawerClassName,
        )}
        role='dialog'
        aria-modal='true'
        aria-labelledby='drawer-title'
        aria-hidden={!isOpen}
      >
        <div className={styles['drawer-header']}>
          {titleElement || (
            <h2 id='drawer-title' className={styles['drawer-title']}>
              {title}
            </h2>
          )}
          <Button
            onClick={onClose}
            className={styles['drawer-close-button']}
            aria-label={t('closeDrawer')}
            variant='blank'
          >
            &times;
          </Button>
        </div>
        <div className={styles['drawer-content']}>{children}</div>
      </div>
    </>
  );
};
