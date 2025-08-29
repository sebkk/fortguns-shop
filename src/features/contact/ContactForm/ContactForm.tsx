'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/_form/Input';
import { Select } from '@/components/_form/Select';
import { Textarea } from '@/components/_form/Textarea';
import { Button } from '@/components/Button';

import styles from './styles.module.scss';

const ContactFormSchema = z.object({
  topic: z.string().min(1, 'Proszę wybrać temat'),
  title: z.string().min(3, 'Tytuł musi zawierać co najmniej 3 znaki'),
  message: z.string().min(10, 'Wiadomość musi zawierać co najmniej 10 znaków'),
});

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export const ContactForm = () => {
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = (_data) => {
    alert('Wiadomość wysłana (symulacja)!');
  };

  const topics = [
    { value: '', label: t('contactFormTopic') },
    { value: 'ogolne', label: t('contactFormTopicGeneral') },
    { value: 'oferta', label: t('contactFormTopicOffer') },
    { value: 'serwis', label: t('contactFormTopicService') },
    { value: 'inne', label: t('contactFormTopicOther') },
  ];

  return (
    <div className={styles['contact-form-wrapper']}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles['contact-form']}
      >
        <Select
          label={t('contactFormTopic')}
          id='topic'
          register={register}
          error={errors.topic?.message}
          options={topics}
        />
        <Input
          label={t('contactFormTitle')}
          id='title'
          type='text'
          register={register}
          error={errors.title?.message}
        />
        <Textarea
          label={t('contactFormMessage')}
          id='message'
          register={register}
          error={errors.message?.message}
          rows={7}
        />
        <div className={styles['form-submit-container']}>
          <Button
            className={styles['form-submit-button']}
            type='submit'
            color='primary'
            size='medium'
          >
            {t('contactFormSubmit')}
          </Button>
        </div>
      </form>
    </div>
  );
};
