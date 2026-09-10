import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';

import { Graph } from 'schema-dts';

import {
  IHeadContentWithAttributes,
  IHeadContentWithContent,
  IHeadContentWithScript,
  IMetaAttributes,
  IMetadataScripts,
  THeadContentItem,
  TMetadataTransformResult,
  TMetadataType,
} from '@/types/metadata';

import { generateLdJsonData } from '../generateLdJsonData';
import { toPublicUrl, withPublicUrls } from './cmsUrl';

export const transformToMetadata = async (
  input: IMetaAttributes[],
  pageInfo: { slug: string; type: TMetadataType },
): Promise<TMetadataTransformResult> => {
  const metadata: TMetadataTransformResult = {
    openGraph: {},
    twitter: {},
    other: {},
    scripts: [],
  };

  for (const item of input) {
    if (item.type === 'title') {
      metadata.title = item.content;
    } else if ('name' in item) {
      switch (item.name) {
        case 'description':
          metadata.description = item.content;
          break;
        case 'robots':
          metadata.robots = item.content;
          break;
        default:
          if (item.name?.startsWith('twitter:')) {
            const key = item.name!.replace('twitter:', '');
            if (metadata.twitter) {
              metadata.twitter[key as keyof Twitter] = item.content ?? '';
            }
          } else {
            metadata.other![item.name!] = item.content ?? '';
          }
          break;
      }
    } else if ('rel' in item && item.rel === 'canonical' && item.href) {
      metadata.alternates = { canonical: toPublicUrl(item.href) };
    } else if ('property' in item) {
      if (item.property && item.property.startsWith('og:')) {
        const key = item.property.replace('og:', '');

        if (metadata.openGraph) {
          if (item.content === 'product') {
            metadata.other!['og:type'] = 'product.group';
          } else if (key === 'image') {
            // Next.js only renders og:image from the plural `images` field.
            metadata.openGraph.images = [
              ...(Array.isArray(metadata.openGraph.images)
                ? metadata.openGraph.images
                : []),
              item.content ?? '',
            ];
          } else if (key !== 'site_name') {
            // og:site_name is dropped: Next.js only reads `siteName`, and Rank
            // Math sends the keyword-stuffed site title, not the brand.
            (metadata.openGraph as Record<string, unknown>)[key] = toPublicUrl(
              item.content ?? '',
            );
          }
        }
      } else {
        metadata.other![item.property!] = toPublicUrl(item.content! ?? '');
      }
    } else if (item.type === 'script' && item.content) {
      if (item.type === 'script') {
        const { slug, type } = pageInfo || {};

        let parsedContent: unknown;
        try {
          const ldJsonData = await generateLdJsonData(
            JSON.parse(item.content ?? '') as Graph,
            {
              slug,
              type,
            },
          );

          parsedContent = ldJsonData;
        } catch {
          parsedContent = item.content;
        }

        metadata.scripts.push({
          type: 'application/ld+json',
          content: JSON.stringify((parsedContent as Graph) ?? ''),
        });
      }
    }
  }

  metadata.openGraph = {
    siteName: 'FortGuns',
    locale: 'pl_PL',
    ...metadata.openGraph,
  };

  metadata.other = withPublicUrls(metadata.other);

  return metadata;
};

export const filterMetadata = (item: THeadContentItem) =>
  typeof item !== 'string';

export const mapMetadata = (item: THeadContentItem) => {
  if ((item as IHeadContentWithScript).type === 'script')
    return {
      type: 'script',
      content: (item as IHeadContentWithScript).content?.[0],
    };

  if ((item as IHeadContentWithContent).content)
    return {
      type: (item as IHeadContentWithContent).type,
      content: (item as IHeadContentWithContent).content.join(''),
    };

  return {
    ...(item as IHeadContentWithAttributes).attributes,
  };
};

export const getMetadataScripts = (
  input: IMetaAttributes[],
): IMetadataScripts[] => {
  const scripts: IMetadataScripts[] = [] as IMetadataScripts[];

  for (const item of input) {
    if (item.type === 'script') {
      let parsedContent: unknown;
      try {
        parsedContent = JSON.parse(item.content ?? '');
      } catch {
        parsedContent = item.content;
      }
      scripts.push({
        type: 'application/ld+json',
        content: (parsedContent as Graph) ?? '',
      });
    }
  }

  return scripts;
};
