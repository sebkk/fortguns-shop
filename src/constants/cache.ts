export const PUBLIC_API_CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=60',
  'Vercel-CDN-Cache-Control': 'max-age=300, stale-while-revalidate=3600',
};

export const API_SEARCH_MAX_PER_PAGE = 100;
export const API_SEARCH_MAX_QUERY_LENGTH = 100;

export const PRODUCTS_DATA_REVALIDATE = 7200;
/**
 * Treść z CMS-a zmienia się rzadko, ale po zmianie chce się ją zobaczyć od
 * razu. Doba oznaczała, że poprawka literówki wisiała niewidoczna do
 * następnego dnia, a Data Cache Vercela przeżywa wdrożenie, więc nie dało się
 * tego obejść przebudową. Strony zasilane z CMS-a mają dobrany do tego własny
 * `revalidate` — obie warstwy muszą schodzić razem, inaczej świeże dane i tak
 * czekają na regenerację HTML-a.
 */
export const CMS_DATA_REVALIDATE = 1800;
