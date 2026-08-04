/**
 * Opening hours, as minutes from midnight, keyed by JS day number (0 = Sunday).
 * `null` means no fixed hours that day.
 *
 * Single source for both the printed table and the live open/closed badge, so
 * the two can never drift. The other place these live is Rank Math → Lokalizacja
 * SEO, which feeds the structured data — update both together.
 */
export interface IOpeningRange {
  open: number;
  close: number;
}

const at = (hour: number, minute = 0) => hour * 60 + minute;

export const OPENING_HOURS: Record<number, IOpeningRange | null> = {
  1: { open: at(12), close: at(21, 30) },
  2: { open: at(10), close: at(17) },
  3: { open: at(10), close: at(17) },
  4: { open: at(12), close: at(21, 30) },
  5: { open: at(10), close: at(17) },
  6: null,
  0: null,
};

/** Saturday has no fixed hours but a visit can be arranged by phone. */
export const BY_APPOINTMENT_DAY = 6;

export const DAY_NAMES: Record<number, string> = {
  0: 'Niedziela',
  1: 'Poniedziałek',
  2: 'Wtorek',
  3: 'Środa',
  4: 'Czwartek',
  5: 'Piątek',
  6: 'Sobota',
};

/** Accusative form, for "otwieramy w środę". */
export const DAY_NAMES_WHEN: Record<number, string> = {
  0: 'niedzielę',
  1: 'poniedziałek',
  2: 'wtorek',
  3: 'środę',
  4: 'czwartek',
  5: 'piątek',
  6: 'sobotę',
};

/** Monday first — the order people expect to read. */
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

export const formatTime = (minutes: number) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

export const formatRange = (range: IOpeningRange) =>
  `${formatTime(range.open)}–${formatTime(range.close)}`;

/** Current day and minute in the shop's timezone, not the visitor's. */
export const getShopTime = () => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Warsaw',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const value = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? '';

  const days: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    day: days[value('weekday')] ?? 0,
    minutes: Number(value('hour')) * 60 + Number(value('minute')),
  };
};

export interface IOpeningStatus {
  isOpen: boolean;
  /** Minute the shop closes today, when open. */
  closesAt?: number;
  /** Next opening, when closed. */
  next?: { day: number; open: number; isToday: boolean };
  today: number;
}

export const getOpeningStatus = (): IOpeningStatus => {
  const { day, minutes } = getShopTime();
  const today = OPENING_HOURS[day];

  if (today && minutes >= today.open && minutes < today.close) {
    return { isOpen: true, closesAt: today.close, today: day };
  }

  if (today && minutes < today.open) {
    return {
      isOpen: false,
      next: { day, open: today.open, isToday: true },
      today: day,
    };
  }

  for (let ahead = 1; ahead <= 7; ahead += 1) {
    const candidate = (day + ahead) % 7;
    const range = OPENING_HOURS[candidate];

    if (range) {
      return {
        isOpen: false,
        next: { day: candidate, open: range.open, isToday: false },
        today: day,
      };
    }
  }

  return { isOpen: false, today: day };
};
