import { TMetadataTransformResult } from '@/types/metadata';

export interface IJsonLdProps {
  scripts?: TMetadataTransformResult['scripts'];
}

// Next.js drops unknown keys from the object returned by generateMetadata, so
// the structured data collected there has to be rendered by the page itself.
export const JsonLd = ({ scripts }: IJsonLdProps) => {
  if (!scripts?.length) return null;

  return (
    <>
      {scripts.map(({ type, content }, index) => (
        <script
          key={index}
          type={type}
          dangerouslySetInnerHTML={{
            __html: content.replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
};
