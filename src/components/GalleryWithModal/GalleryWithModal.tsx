'use client';

import { useState } from 'react';

import clsx from 'clsx';

import {
  GalleryCarousel,
  type GalleryCarouselProps,
} from '@/components/_carousels/GalleryCarousel';
import { Modal, type ModalProps } from '@/components/Modal';

import styles from './GalleryWithModal.module.scss';

interface GalleryWithModalProps {
  galleryCarouselProps: GalleryCarouselProps;
  galleryCarouselModalProps?: GalleryCarouselProps;
  modalProps?: Omit<ModalProps, 'children' | 'isOpen' | 'onClose'>;
  showModalWithGallery?: boolean;
}

export const GalleryWithModal = ({
  galleryCarouselProps,
  modalProps = {} as Omit<ModalProps, 'children'>,
  galleryCarouselModalProps = {} as GalleryCarouselProps,
  showModalWithGallery = false,
}: GalleryWithModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const handleOpenModal = (index: number) => {
    setIsModalOpen(true);
    setInitialSlide(index);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <GalleryCarousel
        {...galleryCarouselProps}
        onClickOnImage={(_, index) => handleOpenModal(index)}
      />
      {showModalWithGallery && (
        <Modal
          {...modalProps}
          modalClassName={clsx(styles['gallery-with-modal-wrapper_modal'])}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <GalleryCarousel
            {...galleryCarouselProps}
            swiperWrapperClassName={clsx(
              styles['gallery-with-modal-wrapper_modal-carousel'],
            )}
            {...galleryCarouselModalProps}
            swiperConfig={{
              initialSlide,
            }}
          />
        </Modal>
      )}
    </div>
  );
};
