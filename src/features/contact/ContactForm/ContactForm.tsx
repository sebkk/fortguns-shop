'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/_form/Input';
import { Select } from '@/components/_form/Select';
import { Textarea } from '@/components/_form/Textarea';
import { Button } from '@/components/Button';
import { CONTACT_FORM_TOPICS } from '@/constants/forms/contact';

import styles from './styles.module.scss';

const ContactFormSchema = z.object({
  topic: z.string().min(1, 'formErrorTopicToShort'),
  title: z.string().min(3, 'formErrorTitleToShort'),
  message: z.string().min(10, 'formErrorMessageToShort'),
  email: z.string().email('formErrorEmailInvalid'),
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

  const topics = CONTACT_FORM_TOPICS.map((topic) => ({
    value: topic.value,
    label: t(topic.label),
  }));

  const { topic, title, message, email } = errors;

  return (
    <div className={styles['contact-form-wrapper']}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles['contact-form']}
      >
        <Input
          label={t('contactFormEmail')}
          id='email'
          register={register}
          error={email?.message ? t(email?.message) : undefined}
          required
        />
        <Select
          label={t('contactFormTopic')}
          id='topic'
          register={register}
          error={topic?.message ? t(topic?.message) : undefined}
          options={topics}
          required
        />
        <Input
          label={t('contactFormTitle')}
          id='title'
          type='text'
          register={register}
          error={title?.message ? t(title?.message) : undefined}
          required
        />
        <Textarea
          label={t('contactFormMessage')}
          id='message'
          register={register}
          error={message?.message ? t(message?.message) : undefined}
          rows={7}
          required
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
