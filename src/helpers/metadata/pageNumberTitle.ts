import type { Metadata } from 'next';

const BRAND_SEPARATOR = ' | ';

/**
 * Strony paginacji dzieliły tytuł ze stroną pierwszą, więc w wynikach
 * wyszukiwania i w zakładkach przeglądarki były nie do odróżnienia.
 *
 * Numer wchodzi przed ostatni człon tytułu, czyli przed nazwę sklepu. Doklejony
 * na końcu ginąłby przy obcinaniu długich tytułów w wynikach — a to właśnie on
 * ma je rozróżniać.
 */
export const withPageNumberInTitle = (
  metadata: Metadata,
  page: number,
): Metadata => {
  const title = metadata.title;

  if (page <= 1 || typeof title !== 'string' || !title.trim()) return metadata;

  const suffix = `strona ${page}`;
  const lastSeparator = title.lastIndexOf(BRAND_SEPARATOR);

  const titleWithPage =
    lastSeparator === -1
      ? `${title} – ${suffix}`
      : `${title.slice(0, lastSeparator)} – ${suffix}${title.slice(lastSeparator)}`;

  return {
    ...metadata,
    title: titleWithPage,
    ...(metadata.openGraph && {
      openGraph: { ...metadata.openGraph, title: titleWithPage },
    }),
  };
};
