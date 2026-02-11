import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import { FieldError, FieldLabel, Input, Textarea } from '../components/FormField';
import StatusBanner from '../components/StatusBanner';
import { createContact } from '../lib/api';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(7, 'Phone is required'),
  message: z.string().min(10, 'Message should be at least 10 characters')
});

export default function ContactPage() {
  const [submitState, setSubmitState] = useState({ loading: false, error: '', success: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values) => {
    setSubmitState({ loading: true, error: '', success: '' });
    try {
      await createContact(values);
      setSubmitState({ loading: false, error: '', success: 'Message sent. Our team will contact you shortly.' });
      reset();
    } catch (error) {
      setSubmitState({ loading: false, error: error.message || 'Unable to send your message.', success: '' });
    }
  };

  return (
    <Container className="grid gap-6 md:grid-cols-[1fr,1.2fr]">
      <Card>
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <p className="mt-3 text-sm text-slate-400">Tell us what is going on and we will follow up quickly with next steps.</p>
        <div className="mt-6 space-y-2 text-sm text-slate-300">
          <p>Phone: (555) 210-9090</p>
          <p>Email: service@griswoldplumbing.com</p>
          <p>Address: 214 Maple Ave, Riverside, CA</p>
        </div>
      </Card>

      <Card>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input id="name" autoComplete="name" {...register('name')} />
            <FieldError>{errors.name?.message}</FieldError>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" autoComplete="email" {...register('email')} />
              <FieldError>{errors.email?.message}</FieldError>
            </div>
            <div>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" type="tel" autoComplete="tel" {...register('phone')} />
              <FieldError>{errors.phone?.message}</FieldError>
            </div>
          </div>
          <div>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <Textarea id="message" rows={5} {...register('message')} />
            <FieldError>{errors.message?.message}</FieldError>
          </div>

          <StatusBanner type="error" message={submitState.error} />
          <StatusBanner type="success" message={submitState.success} />

          <Button type="submit" disabled={submitState.loading} className="w-full disabled:cursor-not-allowed disabled:opacity-70">
            {submitState.loading ? 'Sending...' : 'Send message'}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
