'use client';

import { useCallback, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/_form/Input';
import { Button } from '@/components/Button';
import { useRecaptchaVerification } from '@/hooks/useRecaptchaVerification';

const NewsletterFormSchema = z.object({
  email: z.string().nonempty('formRequired').email('formErrorEmailInvalid'),
});

type NewsletterFormInputs = z.infer<typeof NewsletterFormSchema>;

export const NewsletterFormWithRecaptcha = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  const t = useTranslations();
  const {
    verifyRecaptcha,
    executeRecaptcha,
    isRecaptchaReady,
    isVerifying: isRecaptchaVerifying,
  } = useRecaptchaVerification();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<NewsletterFormInputs>({
    resolver: zodResolver(NewsletterFormSchema),
  });

  const handleRecaptchaVerify = useCallback(
    async (token?: string) => {
      if (!token) {
        try {
          token = await executeRecaptcha('newsletter_subscription');
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

  const onSubmit: SubmitHandler<NewsletterFormInputs> = async (data) => {
    if (!isRecaptchaVerified) {
      setError('root', { message: 'formErrorRecaptchaRequired' });
      return;
    }

    try {
      const response = await axios.post('/api/subscribe-newsletter', {
        email: data.email,
      });

      if (response.data.error) {
        setError('email', { message: 'formErrorNewsletterSubscription' });
        throw Error(response.data.error);
      }

      setSuccessMessage('Zapisano do newslettera pomyślnie!');
      reset();
      setIsRecaptchaVerified(false);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setError('email', { message: 'formErrorNewsletterSubscription' });
    }
  };

  const { email, root } = errors;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t('contactFormEmail')}
          id='email'
          register={register}
          error={email?.message ? t(email?.message) : undefined}
          required
        />

        {(root?.message || successMessage) && (
          <p
            style={{
              color: root?.message ? 'red' : 'green',
              margin: '10px 0',
            }}
          >
            {t(root?.message || (successMessage as string))}
          </p>
        )}

        <Button
          type='submit'
          color='primary'
          size='medium'
          isLoading={isSubmitting || isRecaptchaVerifying}
          disabled={!isRecaptchaVerified}
        >
          {isRecaptchaVerifying
            ? 'Weryfikacja...'
            : !isRecaptchaVerified
              ? 'Oczekiwanie na weryfikację...'
              : 'Zapisz się do newslettera'}
        </Button>
      </form>
    </div>
  );
};
