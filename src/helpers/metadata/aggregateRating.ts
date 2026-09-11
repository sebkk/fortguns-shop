import { TMetadataTransformResult } from '@/types/metadata';
import { TFlexibleContentLayout } from '@/types/sections';

/**
 * Ocena w danych strukturalnych musi zgadzać się z tą, którą widzi człowiek na
 * stronie — Google traktuje rozjazd jako wprowadzanie w błąd. Bierzemy ją więc
 * z tego samego pola ACF, z którego renderuje się sekcja opinii, zamiast
 * wpisywać liczby na sztywno. Zmiana w WordPressie rusza obie rzeczy naraz.
 */
export const withAggregateRating = (
  scripts: TMetadataTransformResult['scripts'],
  sections: TFlexibleContentLayout[],
): TMetadataTransformResult['scripts'] => {
  const reviews = sections.find(
    (section) => section.acf_fc_layout === 'section_reviews_google',
  );

  if (!scripts?.length) return scripts ?? [];

  if (!reviews || !('rating_value' in reviews)) return scripts;

  const ratingValue = Number(reviews.rating_value);
  const reviewCount = Number(reviews.reviews_count);

  if (!ratingValue || !reviewCount) return scripts;

  return scripts.map((script) => {
    try {
      const graph = JSON.parse(script.content) as {
        '@graph'?: Record<string, unknown>[];
      };

      const organisation = graph['@graph']?.find(
        (node) => node['@type'] === 'Organization',
      );

      if (!organisation) return script;

      organisation.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: String(ratingValue),
        reviewCount: String(reviewCount),
      };

      return { ...script, content: JSON.stringify(graph) };
    } catch {
      return script;
    }
  });
};
