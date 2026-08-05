'use client';

import clsx from 'clsx';

import { Typography } from '@/components/Typography';
import {
  BY_APPOINTMENT_DAY,
  DAY_NAMES,
  OPENING_HOURS,
  WEEK_ORDER,
  formatRange,
} from '@/constants/openingHours';
import { useOpeningStatus } from '@/features/contact/useOpeningStatus';

import styles from './OpeningHours.module.scss';

/** The table is static; only the "today" highlight needs the browser's clock. */
export const OpeningHours = () => {
  const status = useOpeningStatus();

  return (
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
  );
};
