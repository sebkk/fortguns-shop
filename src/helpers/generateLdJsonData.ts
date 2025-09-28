import { Graph } from 'schema-dts';

import pagesApi from '@/api/pages';
import { NAVIGATION_ROUTE, PL_SLUGS } from '@/constants/navigation';
import { fieldsFaqPage } from '@/constants/pages';
import { TMetadataType } from '@/types/metadata';
import { IWordPressPageFaqPageMetadata } from '@/types/pages';

const url = process.env.NEXT_PUBLIC_API_URL;

export const generateLdJsonData = async (
  graph: Graph,
  pageInfo: {
    slug: string;
    type: TMetadataType;
  },
) => {
  const { slug, type } = pageInfo || {};

  const newGraph = graph;

  if (type === TMetadataType.DYNAMIC_PAGE) {
    if (slug === PL_SLUGS[NAVIGATION_ROUTE.FAQ]) {
      const faqPageGraph = await graphHandlers[slug](newGraph, slug);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newGraph['@graph'] as any[]).push(faqPageGraph);
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

      const sections = faqPageDataSections?.[0]?.acf?.sections || [];

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
        '@id': `${url}/${slug}`,
        mainEntity: faqQuestionsGraph,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (newGraph['@graph'] as any[]).push(faqPageGraph);
    }
  },
};
