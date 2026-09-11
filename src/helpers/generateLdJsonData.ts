import { Graph } from 'schema-dts';

import pagesApi from '@/api/pages';
import { NAVIGATION_ROUTE, PL_SLUGS } from '@/constants/navigation';
import { fieldsFaqPage } from '@/constants/pages';
import { toSectionsArray } from '@/helpers/flexibleContent';
import { SITE_URL, withPublicUrls } from '@/helpers/metadata/cmsUrl';
import { getOpeningHoursSpecification } from '@/helpers/metadata/openingHoursSchema';
import { TMetadataType } from '@/types/metadata';
import { IWordPressPageFaqPageMetadata } from '@/types/pages';

const NEW_CONDITION = 'https://schema.org/NewCondition';
const USED_CONDITION = 'https://schema.org/UsedCondition';

/**
 * Godziny otwarcia przyjmuje Place i każdy podtyp LocalBusiness — ale nie
 * Organization. Rank Math emituje dziś osobny węzeł Place, jednak po zmianie
 * typu działalności w Lokalizacji SEO (na przykład na GunStore) opisem miejsca
 * staje się sam węzeł firmy. Rozpoznajemy więc jedno i drugie, żeby przełączenie
 * ustawienia w CMS-ie nie wygasiło po cichu godzin.
 */
const isPlaceLikeType = (type: unknown): boolean => {
  const types = Array.isArray(type) ? type : [type];

  return types.some(
    (value) =>
      typeof value === 'string' &&
      (value === 'Place' ||
        value === 'LocalBusiness' ||
        value.endsWith('Store') ||
        value.endsWith('Shop')),
  );
};

const STORE_LIKE = /(?:Store|Shop)$|^LocalBusiness$/;

/**
 * Darmowy Rank Math nie ma GunStore na liście rodzajów działalności, a to
 * najbardziej precyzyjny typ schema.org dla tego sklepu.
 *
 * Podmieniamy wyłącznie człon handlowy, bo Rank Math podaje typ tablicą —
 * ['Store', 'Organization'] — i zastąpienie jej jednym tekstem odebrałoby
 * węzłowi rolę organizacji, na którą wskazują inne węzły grafu.
 */
const refineToGunStore = (type: unknown): unknown => {
  const refine = (value: unknown) =>
    typeof value === 'string' && STORE_LIKE.test(value) ? 'GunStore' : value;

  return Array.isArray(type) ? type.map(refine) : refine(type);
};

/**
 * Rank Math nie publikuje godzin otwarcia w ogóle, a to jedna z pierwszych
 * rzeczy, jakich Google szuka przy sklepie stacjonarnym. Przy okazji kraj w
 * adresie zapisujemy kodem ISO, jak chce schema.org — to poprawiamy wszędzie,
 * bo adres nosi też Organization.
 */
const applyPlaceDetails = (graph: Graph) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodes = (graph as any)['@graph'];

  if (!Array.isArray(nodes)) return;

  for (const node of nodes) {
    if (!node) continue;

    if (node.address?.addressCountry === 'Polska') {
      node.address.addressCountry = 'PL';
    }

    if (!isPlaceLikeType(node['@type'])) continue;

    // Nadpisujemy, a nie dokładamy: godziny mają jedno źródło w
    // openingHours.ts, także gdy Rank Math wyśle własną wersję.
    node.openingHoursSpecification = getOpeningHoursSpecification();

    node['@type'] = refineToGunStore(node['@type']);
  }
};

/**
 * Rank Math opisuje każdy towar jako nowy — także karabin z 1944 roku. Dla
 * sklepu, którego głównym asortymentem jest broń używana, to nieprawda podana
 * wprost Google, a `itemCondition` trafia do wyników z rozszerzonymi danymi.
 * Stan bierzemy z kategorii, którą ten sam graf już niesie, więc nie trzeba po
 * nic sięgać do WooCommerce.
 */
const applyItemCondition = (graph: Graph) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodes = (graph as any)['@graph'];

  if (!Array.isArray(nodes)) return;

  for (const node of nodes) {
    if (node?.['@type'] !== 'Product') continue;

    const category = typeof node.category === 'string' ? node.category : '';
    const condition = /używan/i.test(category) ? USED_CONDITION : NEW_CONDITION;

    node.itemCondition = condition;

    if (node.offers && typeof node.offers === 'object') {
      node.offers.itemCondition = condition;
    }
  }
};

export const generateLdJsonData = async (
  graph: Graph,
  pageInfo: {
    slug: string;
    type: TMetadataType;
  },
) => {
  const { slug, type } = pageInfo || {};

  // Rank Math builds the whole graph from CMS permalinks — @id, url, breadcrumb
  // items. Left as is, Google reads cms.fortguns.pl as the canonical location
  // of every page.
  const newGraph = withPublicUrls(graph);

  applyItemCondition(newGraph);
  applyPlaceDetails(newGraph);

  if (type === TMetadataType.DYNAMIC_PAGE) {
    if (slug === PL_SLUGS[NAVIGATION_ROUTE.FAQ]) {
      await graphHandlers[slug](newGraph, slug);
    }
  }

  return newGraph;
};

const graphHandlers = {
  [PL_SLUGS[NAVIGATION_ROUTE.FAQ]]: async (newGraph: Graph, slug: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const oldGraphArray = (newGraph as any)['@graph'];

    const isFaqPageGraphAlreadyExists = oldGraphArray.some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => item['@type'] === 'FAQPage',
    );

    if (!isFaqPageGraphAlreadyExists) {
      const faqPageDataSections =
        await pagesApi.getPageBySlug<IWordPressPageFaqPageMetadata>(slug, {
          _fields: fieldsFaqPage,
          status: 'publish',
        });

      const sections = toSectionsArray(faqPageDataSections?.[0]?.acf?.sections);

      const faqQuestions =
        sections?.find(
          (section) => section.acf_fc_layout === 'section_accordion',
        )?.list || [];

      const faqQuestionsGraph = faqQuestions
        .map((question) =>
          question.list.map((item) => ({
            '@type': 'Question',
            name: item.title,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.description,
            },
          })),
        )
        .flat();

      const faqPageGraph = {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/${slug}`,
        mainEntity: faqQuestionsGraph,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newGraph['@graph'] as any[]).push(faqPageGraph);
    }
  },
};
