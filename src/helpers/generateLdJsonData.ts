import { Graph } from 'schema-dts';

import pagesApi from '@/api/pages';
import { NAVIGATION_ROUTE, PL_SLUGS } from '@/constants/navigation';
import { fieldsFaqPage } from '@/constants/pages';
import { toSectionsArray } from '@/helpers/flexibleContent';
import { SITE_URL, withPublicUrls } from '@/helpers/metadata/cmsUrl';
import { TMetadataType } from '@/types/metadata';
import { IWordPressPageFaqPageMetadata } from '@/types/pages';

const NEW_CONDITION = 'https://schema.org/NewCondition';
const USED_CONDITION = 'https://schema.org/UsedCondition';

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
