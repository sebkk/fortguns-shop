import { GalleryCarousel } from '@/components/_carousels/GalleryCarousel';
import { ContentHTML } from '@/components/ContentHTML';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { TSectionGalleryProps } from '@/types/handlerComponents';

import styles from './SectionGallery.module.scss';

export const SectionGallery = ({ section }: TSectionGalleryProps) => {
  const {
    title,
    description,
    html_code,
    hide_main_carousel,
    hide_thumbnails,
    photos,
  } = section;

  return (
    <div>
      <TitleWithDesc
        title={title}
        description={description}
        wrapperClassName={styles['section-gallery-title-desc-wrapper']}
      />
      <ContentHTML
        content={html_code}
        className={styles['section-gallery-content-html']}
      />
      <GalleryCarousel
        images={photos}
        hideThumbs={hide_thumbnails}
        hideMainCarousel={hide_main_carousel}
      />
    </div>
  );
};
