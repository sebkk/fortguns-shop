import { notFound } from 'next/navigation';

import parseHTML from 'html-react-parser';

import pagesApi from '@/api/pages';
import { fields } from '@/constants/pages';
import { IGetPagesParams } from '@/types/pages';

import { mapPageSectionsData } from './mapPageSectionsData';

export const getPageContent = async (
  slug: string,
  params: IGetPagesParams = {},
) => {
  try {
    const [page] = await pagesApi.getPageBySlug(slug, {
      _fields: fields,
      status: 'publish',
      ...params,
    });

    const { title, acf } = page || {};

    const sections = await mapPageSectionsData(acf?.sections || []);

    return { pageTitle: parseHTML(title?.rendered || ''), sections };
  } catch (error) {
    console.error(error);

    return notFound();
  }
};
