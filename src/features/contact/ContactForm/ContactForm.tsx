// src/features/contact/ContactForm.tsx

'use client'; // Formularze używają stanu i interakcji użytkownika

import { zodResolver } from '@hookform/resolvers/zod'; // Do walidacji Zod (jeśli używasz)
import { SubmitHandler, useForm } from 'react-hook-form'; // Importy z react-hook-form
import { z } from 'zod';

import { Input } from '@/components/_form/Input';
import { Select } from '@/components/_form/Select';
import { Textarea } from '@/components/_form/Textarea';
import { Button } from '@/components/Button';

const ContactFormSchema = z.object({
  topic: z.string().min(1, 'Proszę wybrać temat'),
  title: z.string().min(3, 'Tytuł musi zawierać co najmniej 3 znaki'),
  message: z.string().min(10, 'Wiadomość musi zawierać co najmniej 10 znaków'),
});

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    console.log(data);
    alert('Wiadomość wysłana (symulacja)!');
  };

  const topics = [
    { value: '', label: 'Wybierz temat' },
    { value: 'ogolne', label: 'Pytanie ogólne' },
    { value: 'oferta', label: 'Pytanie o ofertę' },
    { value: 'serwis', label: 'Zapytanie serwisowe' },
    { value: 'inne', label: 'Inny temat' },
  ];

  return (
    <div className='mx-auto w-full max-w-screen-md'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <Select
          label='Temat'
          id='topic'
          register={register}
          error={errors.topic?.message}
          options={topics}
        />
        <Input
          label='Tytuł wiadomości'
          id='title'
          type='text'
          register={register}
          error={errors.title?.message}
        />

        <Textarea
          label='Twoja wiadomość'
          id='message'
          register={register}
          error={errors.message?.message}
          rows={7}
        />

        <div className='text-center'>
          <Button type='submit' color='primary' size='medium'>
            Wyślij wiadomość
          </Button>
        </div>
      </form>
    </div>
  );
};
