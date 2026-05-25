import { InfoBarMessage } from '@/types/infoBar';

interface RawMessageCandidate {
  text?: unknown;
  message?: unknown;
  content?: unknown;
  title?: unknown;
  label?: unknown;
  href?: unknown;
  link?: unknown;
  url?: unknown;
  id?: unknown;
}

const TEXT_FIELDS: (keyof RawMessageCandidate)[] = [
  'text',
  'message',
  'content',
  'title',
  'label',
];

const HREF_FIELDS: (keyof RawMessageCandidate)[] = ['href', 'link', 'url'];

const pickFirstString = (
  candidate: RawMessageCandidate,
  fields: (keyof RawMessageCandidate)[],
): string | undefined => {
  for (const field of fields) {
    const value = candidate[field];

    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }
  }

  return undefined;
};

const toMessage = (
  candidate: unknown,
  fallbackId: string,
): InfoBarMessage | null => {
  if (!candidate || typeof candidate !== 'object') return null;

  const raw = candidate as RawMessageCandidate;
  const text = pickFirstString(raw, TEXT_FIELDS);

  if (!text) return null;

  const href = pickFirstString(raw, HREF_FIELDS);
  const id =
    typeof raw.id === 'string' || typeof raw.id === 'number'
      ? String(raw.id)
      : fallbackId;

  return { id, text, ...(href ? { href } : {}) };
};

const extractFromAcfData = (acfData: unknown): InfoBarMessage[] => {
  if (!Array.isArray(acfData)) return [];

  const messages: InfoBarMessage[] = [];

  acfData.forEach((layout, layoutIndex) => {
    if (!layout || typeof layout !== 'object') return;

    Object.entries(layout).forEach(([key, value]) => {
      if (key === 'acf_fc_layout') return;
      if (!Array.isArray(value)) return;

      value.forEach((item, itemIndex) => {
        const parsed = toMessage(
          item,
          `info-bar-${layoutIndex}-${key}-${itemIndex}`,
        );

        if (parsed) {
          messages.push(parsed);
        }
      });
    });
  });

  return messages;
};

export const parseInfoBarMessages = (response: unknown): InfoBarMessage[] => {
  if (!response || typeof response !== 'object') return [];

  const acf = (response as { acf?: { data?: unknown } }).acf;

  return extractFromAcfData(acf?.data);
};
