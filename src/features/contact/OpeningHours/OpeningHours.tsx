'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { Typography } from '@/components/Typography';
import {
  BY_APPOINTMENT_DAY,
  DAY_NAMES,
  DAY_NAMES_WHEN,
  IOpeningStatus,
  OPENING_HOURS,
  WEEK_ORDER,
  formatRange,
  formatTime,
  getOpeningStatus,
} from '@/constants/openingHours';

import styles from './OpeningHours.module.scss';

/**
 * Pages are statically generated, so "is the shop open right now" cannot be
 * answered at build time — it is worked out in the browser after mount.
 */
export const OpeningHours = () => {
  const [status, setStatus] = useState<IOpeningStatus | null>(null);

  useEffect(() => {
    setStatus(getOpeningStatus());

    const timer = setInterval(() => setStatus(getOpeningStatus()), 60_000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles['opening']}>
      {status && (
        <p
          className={clsx(
            styles['opening-status'],
            status.isOpen && styles['opening-status--open'],
          )}
        >
          <span className={styles['opening-dot']} aria-hidden='true' />
          <strong>{status.isOpen ? 'Otwarte teraz' : 'Teraz zamknięte'}</strong>
          <span className={styles['opening-status-sub']}>
            {status.isOpen
              ? `· czynne do ${formatTime(status.closesAt as number)} — zadzwoń lub napisz do nas`
              : `${
                  status.next
                    ? `· otwieramy ${
                        status.next.isToday
                          ? 'dziś'
                          : `w ${DAY_NAMES_WHEN[status.next.day]}`
                      } o ${formatTime(status.next.open)}`
                    : ''
                } — napisz SMS-a, maila lub wiadomość na WhatsAppie`}
          </span>
        </p>
      )}

      <div className={styles['opening-panel']}>
        <Typography tag='h3' className={styles['opening-heading']}>
          Godziny otwarcia
        </Typography>

        <table className={styles['opening-table']}>
          <tbody>
            {WEEK_ORDER.map((day) => {
              const range = OPENING_HOURS[day];
              const isToday = status?.today === day;

              return (
                <tr key={day} className={clsx(isToday && styles['is-today'])}>
                  <th scope='row'>{DAY_NAMES[day]}</th>
                  <td className={clsx(!range && styles['is-shut'])}>
                    {range
                      ? formatRange(range)
                      : day === BY_APPOINTMENT_DAY
                        ? 'po umówieniu telefonicznym'
                        : 'nieczynne'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Typography tag='p' className={styles['opening-note']}>
          Przed przyjazdem prosimy o wcześniejszy kontakt w sprawie odbioru.
        </Typography>
      </div>
    </div>
  );
};
