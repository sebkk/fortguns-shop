import {
  BY_APPOINTMENT_DAY,
  OPENING_HOURS,
  type IOpeningRange,
} from '@/constants/openingHours';

/** Nazwy dni w zapisie, którego oczekuje schema.org. */
const SCHEMA_DAY_NAMES: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const toClock = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(
    minutes % 60,
  ).padStart(2, '0')}`;

export interface IOpeningHoursSpecification {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string;
  opens: string;
  closes: string;
}

/**
 * Godziny dla danych strukturalnych, liczone z tej samej tablicy, z której
 * rysowana jest tabela na stronie — inaczej byłoby trzecie miejsce, w którym
 * trzeba pamiętać o zmianie.
 *
 * Sobota celowo wypada: nie ma stałych godzin, jest „po umówieniu
 * telefonicznym". Wpisanie jej tutaj kazałoby Google pokazywać sklep jako
 * otwarty i ściągałoby ludzi pod zamknięte drzwi.
 */
export const getOpeningHoursSpecification = (): IOpeningHoursSpecification[] =>
  Object.entries(OPENING_HOURS)
    .filter(
      (entry): entry is [string, IOpeningRange] =>
        !!entry[1] && Number(entry[0]) !== BY_APPOINTMENT_DAY,
    )
    .sort(([dayA], [dayB]) => Number(dayA) - Number(dayB))
    .map(([day, range]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: SCHEMA_DAY_NAMES[Number(day)],
      opens: toClock(range.open),
      closes: toClock(range.close),
    }));
