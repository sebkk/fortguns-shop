'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { ArrowIcon } from '@/components/_icons/ArrowIcon';
import { Typography } from '@/components/Typography';

import styles from './styles.module.scss';

interface AccordionProps {
  title: string;
  content: string;
}

export const Accordion = ({ title, content }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles['accordion-item']}>
      <button
        className={styles['accordion-button']}
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <Typography
          variant='c-heading'
          tag='h3'
          fontSize='xl'
          className={styles['accordion-title']}
        >
          {title}
        </Typography>
        <ArrowIcon
          className={clsx(
            styles['accordion-icon'],
            isOpen && styles['accordion-icon-open'],
          )}
        />
      </button>
      <div
        className={clsx(
          styles['accordion-content-wrapper'],
          isOpen && styles['accordion-content-wrapper-open'],
        )}
      >
        <div
          className={clsx(
            styles['accordion-content-grid'],
            isOpen && styles['accordion-content-grid-open'],
          )}
        >
          <div className={styles['accordion-content-inner']}>
            <div className={styles['accordion-content-padding']}>
              <Typography
                variant='body'
                tag='p'
                className={styles['accordion-text']}
              >
                {content}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
