import { useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

import { Overlay } from '@/components/Overlay';

import { Button } from '../Button';
import { Typography } from '../Typography';
import styles from './styles.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalTitle?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  modalTitle,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return createPortal(
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      className={styles['modal_overlay']}
    >
      <div className={styles['modal']} ref={modalRef}>
        <div className={styles['modal-header']}>
          <Typography fontSize='3xl' tag='h2' className={styles['modal-title']}>
            {modalTitle}
          </Typography>
          <Button
            variant='blank'
            className={styles['modal-header-btn']}
            onClick={onClose}
          >
            &times;
          </Button>
        </div>
        <div className={styles['modal-content']}>{children}</div>
      </div>
    </Overlay>,
    document.body,
  );
};
