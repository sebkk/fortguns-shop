const SRCSET_ENTRY = /^(\S+)\s+(\d+)w$/;

/**
 * WordPress trzyma obok oryginału gotowe pomniejszenia i wypisuje je w
 * `srcset`, więc nie trzeba zgadywać nazw plików — WordPress nazywa je
 * rzeczywistymi wymiarami wyjścia, a te zależą od proporcji oryginału.
 *
 * Zwraca najwęższą wersję, która nie jest węższa od miejsca, w jakim zdjęcie
 * ma się wyświetlić. Gdy `srcset` jest pusty albo wszystkie wersje są za małe
 * (WordPress nie powiększa), zostaje przekazany adres.
 */
export const pickSrcSetUrl = (
  src: string,
  srcset: string | undefined,
  targetWidth: number,
): string => {
  const entries = (srcset ?? '')
    .split(',')
    .map((entry) => SRCSET_ENTRY.exec(entry.trim()))
    .filter((match): match is RegExpExecArray => !!match)
    .map((match) => ({ url: match[1], width: Number(match[2]) }))
    .sort((a, b) => a.width - b.width);

  if (!entries.length) return src;

  return entries.find(({ width }) => width >= targetWidth)?.url ?? src;
};
