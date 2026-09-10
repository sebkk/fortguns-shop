const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

const decodeEntities = (value: string) =>
  value
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCharCode(Number(code)),
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCharCode(parseInt(code, 16)),
    )
    .replace(
      /&([a-z]+);/gi,
      (match, name: string) => NAMED_ENTITIES[name.toLowerCase()] ?? match,
    );

/**
 * WooCommerce returns brand names and descriptions as HTML — the listing
 * renders them through `htmlContent`, but meta tags are plain strings, so
 * `Smith &amp; Wesson` reaches the browser double-escaped and any markup in a
 * description leaks into the description tag.
 */
export const toPlainText = (value?: string): string | undefined => {
  if (!value) return undefined;

  const text = decodeEntities(value.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();

  return text || undefined;
};

const META_DESCRIPTION_MAX = 160;

/** Same text, cut on a word boundary so search results are not clipped mid-word. */
export const toMetaDescription = (value?: string): string | undefined => {
  const text = toPlainText(value);

  if (!text || text.length <= META_DESCRIPTION_MAX) return text;

  const cut = text.slice(0, META_DESCRIPTION_MAX);
  const lastSpace = cut.lastIndexOf(' ');

  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[.,;:]$/, '')}…`;
};
