const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

/**
 * Zamienia encje HTML na znaki, które reprezentują.
 *
 * WooCommerce oddaje nazwy marek zakodowane ("Heckler &amp; Koch"), choć
 * nazwę produktu i kategorii podaje zwykłym tekstem. React — słusznie —
 * koduje wszystko, co wypisuje, więc taka nazwa jechała do przeglądarki
 * zakodowana drugi raz i na ekranie było widać "Heckler &AMP; KOCH".
 *
 * Jedno przejście po tekście, bez ponownego czytania tego, co już podmieniono:
 * dzięki temu "&amp;lt;" zostaje "&lt;", a nie staje się "<".
 */
export const decodeHtmlEntities = (value: string): string =>
  value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, body: string) => {
    if (!body.startsWith('#')) {
      return NAMED_ENTITIES[body.toLowerCase()] ?? entity;
    }

    const isHex = body[1]?.toLowerCase() === 'x';

    const codePoint = Number.parseInt(
      isHex ? body.slice(2) : body.slice(1),
      isHex ? 16 : 10,
    );

    if (!Number.isFinite(codePoint) || codePoint <= 0 || codePoint > 0x10ffff) {
      return entity;
    }

    return String.fromCodePoint(codePoint);
  });
