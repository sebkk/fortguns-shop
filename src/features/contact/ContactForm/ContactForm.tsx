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
  name: z.string().min(3, 'formErrorNameToShort'),
});

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export const ContactForm = () => {
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema),
  });

  const topics = CONTACT_FORM_TOPICS.map((topic) => ({
    value: topic.value,
    label: t(topic.label),
  }));

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    const sendData = {
      ...data,
      topic: topics.find((topic) => topic.value === data.topic)?.label,
    };

    try {
      const response = await fetch('/api/send-email-smtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      });

      const result = await response.json();

      // eslint-disable-next-line no-console
      console.log('RESULT', result.success);

      reset();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const { topic, title, message, email, name } = errors;

  return (
    <div className={styles['contact-form-wrapper']}>
      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
          e.preventDefault();
        }}
        className={styles['contact-form']}
      >
        <Input
          label={t('contactFormEmail')}
          id='email'
          register={register}
          error={email?.message ? t(email?.message) : undefined}
          required
        />
        <Input
          label={t('contactFormName')}
          id='name'
          register={register}
          error={name?.message ? t(name?.message) : undefined}
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
            isLoading={isSubmitting}
          >
            {t('contactFormSubmit')}
          </Button>
        </div>
      </form>
    </div>
  );
};
