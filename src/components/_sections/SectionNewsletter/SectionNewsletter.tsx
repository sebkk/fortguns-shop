'use client';

import parseHTML from 'html-react-parser';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/_form/Input';
import { Button } from '@/components/Button';
import { ContentHTML } from '@/components/ContentHTML';
import { Typography } from '@/components/Typography';
import { ISectionNewsletter } from '@/types/sections';

import styles from './SectionNewsletter.module.scss';

export const SectionNewsletter = ({
  section,
}: {
  section: ISectionNewsletter;
}) => {
  const { register } = useForm();

  const t = useTranslations();

  return (
    <div className={styles['section-newsletter']}>
      <Typography tag='h3' fontSize='3xl'>
        {parseHTML(section.title)}
      </Typography>
      <div>
        <div className={styles['section-newsletter_form-wrapper']}>
          <Input
            placeholder='Email'
            id='email'
            register={register}
            wrapperClassName={styles['section-newsletter_form-wrapper_input']}
          />
          <Button>{t('subscribeToNewsletter')}</Button>
        </div>
        <ContentHTML
          content={section.content}
          className={styles['section-newsletter_content-html']}
        />
      </div>
    </div>
  );
};
