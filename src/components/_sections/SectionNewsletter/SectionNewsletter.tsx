'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import parseHTML from 'html-react-parser';
import { useTranslations } from 'next-intl';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/_form/Input';
import { Button } from '@/components/Button';
import { ContentHTML } from '@/components/ContentHTML';
import { Modal } from '@/components/Modal';
import { Typography } from '@/components/Typography';
import { ISectionNewsletter } from '@/types/sections';

import styles from './SectionNewsletter.module.scss';

const NewsletterFormSchema = z.object({
  email: z.string().nonempty('formRequired').email('formErrorEmailInvalid'),
});

export const SectionNewsletter = ({
  section,
}: {
  section: ISectionNewsletter;
}) => {
  const [openModal, setOpenModal] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<z.infer<typeof NewsletterFormSchema>>({
    resolver: zodResolver(NewsletterFormSchema),
  });

  const t = useTranslations();

  const handleSubscribeNewsletter = async ({ email }: { email: string }) => {
    try {
      const response = await axios.post('/api/subscribe-newsletter', {
        email: email,
      });

      if (response.data.error) {
        setError('email', { message: 'formErrorNewsletterSubscription' });
        throw Error(response.data.error);
      }

      setOpenModal(true);

      reset();
    } catch (error) {
      setOpenModal(false);

      console.error('Error subscribing to newsletter:', error);
      setError('email', { message: 'formErrorNewsletterSubscription' });
    }
  };

  return (
    <div className={styles['section-newsletter']}>
      <Typography tag='h3' fontSize='3xl'>
        {parseHTML(section.title)}
      </Typography>
      <div>
        <form
          onSubmit={(e) => {
            handleSubmit(
              handleSubscribeNewsletter as SubmitHandler<FieldValues>,
            )(e);
            e.preventDefault();
          }}
          className={styles['section-newsletter_form-wrapper']}
        >
          <Input
            placeholder='Email'
            id='email'
            register={register}
            wrapperClassName={styles['section-newsletter_form-wrapper_input']}
            error={
              errors.email?.message
                ? t(
                    errors.email?.message === 'Required'
                      ? 'formRequired'
                      : errors.email?.message,
                  )
                : undefined
            }
          />
          <Button
            type='submit'
            className={styles['section-newsletter_form-wrapper_btn']}
            isLoading={isSubmitting}
          >
            {t('subscribeToNewsletter')}
          </Button>
        </form>
        <ContentHTML
          content={section.content}
          className={styles['section-newsletter_content-html']}
        />
      </div>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        modalTitle={t('formSuccessNewsletterSubscriptionModalTitle')}
      >
        <div className={styles['section-newsletter_modal-content']}>
          <Typography tag='p' fontSize='3xl'>
            {t('formSuccessNewsletterSubscription')}
          </Typography>
          <Button variant='outlined' onClick={() => setOpenModal(false)}>
            {t('closeDrawer')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
