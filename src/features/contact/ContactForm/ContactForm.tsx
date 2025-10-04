'use client';

import { useCallback, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/_form/Input';
import { Select } from '@/components/_form/Select';
import { Textarea } from '@/components/_form/Textarea';
import { Button } from '@/components/Button';
import { CONTACT_FORM_TOPICS } from '@/constants/forms/contact';
import { useRecaptchaVerification } from '@/hooks/useRecaptchaVerification';

import styles from './styles.module.scss';

const ContactFormSchema = z.object({
  topic: z.string().nonempty('formRequired'),
  title: z.string().nonempty('formRequired').min(3, 'formErrorTitleToShort'),
  message: z
    .string()
    .nonempty('formRequired')
    .min(10, 'formErrorMessageToShort'),
  email: z.string().nonempty('formRequired').email('formErrorEmailInvalid'),
  name: z.string().nonempty('formRequired').min(3, 'formErrorNameToShort'),
  recaptchaToken: z.string().optional(),
});

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export const ContactForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  const t = useTranslations();
  const { verifyRecaptcha, executeRecaptcha, isRecaptchaReady } =
    useRecaptchaVerification();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema),
  });

  const topics = CONTACT_FORM_TOPICS.map((topic) => ({
    value: topic.value,
    label: t(topic.label),
  }));

  const handleRecaptchaVerify = useCallback(
    async (token?: string) => {
      if (!token) {
        try {
          token = await executeRecaptcha('contact_form');
        } catch (error) {
          console.error('Error executing reCaptcha:', error);
          setError('root', { message: 'formErrorRecaptchaFailed' });
          return;
        }
      }

      // Verify the token
      const verification = await verifyRecaptcha(token);

      if (verification.verified) {
        setIsRecaptchaVerified(true);
        // Clear any previous recaptcha errors
        if (errors.root?.message === 'formErrorRecaptchaRequired') {
          setError('root', { message: '' });
        }
      } else {
        setIsRecaptchaVerified(false);
        setError('root', { message: 'formErrorRecaptchaInvalid' });

        console.error(verification.error);
      }
    },
    [executeRecaptcha, verifyRecaptcha, errors.root?.message, setError],
  );

  // Automatically execute reCaptcha when ready
  useEffect(() => {
    if (isRecaptchaReady && !isRecaptchaVerified) {
      handleRecaptchaVerify();
    }
  }, [isRecaptchaReady, isRecaptchaVerified, handleRecaptchaVerify]);

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    if (!isRecaptchaVerified) {
      setError('root', { message: 'formErrorRecaptchaRequired' });
      return;
    }

    const sendData = {
      ...data,
      topic: topics.find((topic) => topic.value === data.topic)?.label,
    };

    try {
      const response = await axios.post('/api/send-email-smtp', sendData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;

      if (!result.success) {
        setSuccessMessage(null);

        setError('root', { message: result.error });
        throw new Error(result.error);
      }

      setSuccessMessage(result.message);

      reset();
      setIsRecaptchaVerified(false);
    } catch (error) {
      console.error('Error sending email:', error);

      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;
        setError('root', { message: errorMessage });
        setSuccessMessage(null);
      }
    }
  };

  const { topic, title, message, email, name, root } = errors;

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
          type='email'
          register={register}
          error={email?.message ? t(email?.message) : undefined}
          required
          autoComplete='email'
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
          {(root?.message || successMessage) && (
            <p
              className={clsx(
                root?.message && styles['form-submit-error'],
                successMessage && styles['form-submit-success'],
              )}
            >
              {t(root?.message || (successMessage as string))}
            </p>
          )}
          <Button
            className={styles['form-submit-button']}
            type='submit'
            color='primary'
            size='medium'
            isLoading={isSubmitting}
            disabled={isSubmitting || !isRecaptchaVerified}
          >
            {isSubmitting
              ? t('formSubmitSending')
              : !isRecaptchaVerified
                ? 'Oczekiwanie na weryfikację...'
                : t('contactFormSubmit')}
          </Button>
        </div>
      </form>
    </div>
  );
};
