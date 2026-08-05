'use client';

import clsx from 'clsx';

import { DAY_NAMES_WHEN, formatTime } from '@/constants/openingHours';
import { useOpeningStatus } from '@/features/contact/useOpeningStatus';

import styles from './OpeningStatus.module.scss';

export const OpeningStatus = () => {
  const status = useOpeningStatus();

  if (!status) {
    return null;
  }

  const { isOpen, closesAt, next } = status;

  const getSub = () => {
    if (isOpen) {
      return `Czynne do ${formatTime(closesAt as number)} — zadzwoń lub napisz do nas`;
    }

    const contact = 'napisz SMS-a, maila lub wiadomość na WhatsAppie';

    if (!next) {
      return `Napisz SMS-a, maila lub wiadomość na WhatsAppie`;
    }

    const when = next.isToday ? 'dziś' : `w ${DAY_NAMES_WHEN[next.day]}`;

    return `Otwieramy ${when} o ${formatTime(next.open)} — ${contact}`;
  };

  return (
    <p className={clsx(styles['status'], isOpen && styles['status--open'])}>
      <span className={styles['status-dot']} aria-hidden='true' />
      <strong>{isOpen ? 'Otwarte teraz' : 'Teraz zamknięte'}</strong>
      <span className={styles['status-sub']}>{getSub()}</span>
    </p>
  );
};
