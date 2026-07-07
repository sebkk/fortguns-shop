const normalizeCacheValue = (value: unknown): unknown => {
  if (!value || typeof value !== 'object') {
    return value ?? null;
  }

  if (Array.isArray(value)) {
    return value.map(normalizeCacheValue);
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([, entryValue]) => entryValue !== undefined)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, entryValue]) => [key, normalizeCacheValue(entryValue)]),
  );
};

export const createStableCacheKey = (value: unknown): string =>
  JSON.stringify(normalizeCacheValue(value));
