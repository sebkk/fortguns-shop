/**
 * Cena w zapisie polskim: spacja co tysiąc, przecinek dziesiętny, złotówki po
 * liczbie.
 *
 * Grosze pokazujemy tylko wtedy, gdy naprawdę są. Broń to kwoty okrągłe i
 * „12 600,00 zł" niepotrzebnie zaśmieca kartę, ale amunicja bywa wyceniana za
 * sztukę — 0,45 zł czy 2,50 zł — i tam grosz jest całą informacją. Gdy część
 * ułamkowa istnieje, wypisujemy ją zawsze na dwóch miejscach, żeby 2,5 nie
 * wyszło jako „2,5 zł”.
 */
export const formatPrice = (value: number | string): string | null => {
  if (typeof value === 'string' && !value.trim()) return null;

  const amount = Number(value);

  if (!Number.isFinite(amount)) return null;

  const hasFraction = amount % 1 !== 0;

  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
    // Polski Intl domyślnie nie grupuje liczb czterocyfrowych, więc bez tego
    // 1900 zostawało zbite w jedno, a 12 600 już rozdzielone.
    useGrouping: 'always',
  }).format(amount);
};
