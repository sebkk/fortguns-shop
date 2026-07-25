// ACF returns flexible content as an object keyed by the original row index
// (e.g. { "0": {...}, "2": {...} }) whenever a layout is disabled or removed,
// because the remaining rows no longer form a sequential PHP array.
export const toSectionsArray = <T>(sections?: T[] | Record<string, T>): T[] => {
  if (!sections) return [];

  if (Array.isArray(sections)) return sections;

  return Object.entries(sections)
    .sort(([keyA], [keyB]) => Number(keyA) - Number(keyB))
    .map(([, section]) => section);
};
