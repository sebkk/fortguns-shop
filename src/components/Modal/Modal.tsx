'use client';

import { useEffect, useRef } from 'react';

import clsx from 'clsx';
import { createPortal } from 'react-dom';

import { Overlay } from '@/components/Overlay';
import { useMounted } from '@/hooks/useMounted';

import { Button } from '../Button';
import { Typography } from '../Typography';
import styles from './styles.module.scss';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalTitle?: string;
  modalClassName?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  modalTitle,
  modalClassName,
}: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const isMounted = useMounted();

  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMounted]);

  if (!isMounted) return;
  return createPortal(
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      className={styles['modal_overlay']}
    >
      <dialog
        onClick={(e) => e.stopPropagation()}
        open={isOpen}
        className={clsx(styles['modal'], modalClassName)}
        ref={modalRef}
      >
        <div
          className={clsx(
            styles['modal-header'],
            modalTitle && styles['modal-header--with-title'],
          )}
        >
          {modalTitle && (
            <Typography
              fontSize='3xl'
              tag='h2'
              className={styles['modal-title']}
            >
              {modalTitle}
            </Typography>
          )}
          <Button
            variant='blank'
            className={styles['modal-header-btn']}
            onClick={onClose}
          >
            &times;
          </Button>
        </div>
        <div className={styles['modal-content']}>{children}</div>
      </dialog>
    </Overlay>,
    document.body,
  );
};
