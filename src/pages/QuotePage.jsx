import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import { FieldError, FieldLabel, Input, Select, Textarea } from '../components/FormField';
import StatusBanner from '../components/StatusBanner';
import { serviceOptions } from '../data/services';
import { createQuote } from '../lib/api';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(7, 'Phone is required'),
  email: z.string().email('Valid email required'),
  address: z.string().optional(),
  serviceType: z.string().min(1, 'Select a service type'),
  issueDescription: z.string().min(15, 'Describe the issue with at least 15 characters'),
  urgency: z.enum(['low', 'medium', 'high', 'emergency'], {
    errorMap: () => ({ message: 'Select urgency level' })
  }),
  photos: z.any().optional()
});

export default function QuotePage() {
  const [submitState, setSubmitState] = useState({ loading: false, error: '', success: '' });
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      urgency: 'medium',
      serviceType: ''
    }
  });

  const onSubmit = async (values) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('email', values.email);
    formData.append('address', values.address || '');
    formData.append('serviceType', values.serviceType);
    formData.append('issueDescription', values.issueDescription);
    formData.append('urgency', values.urgency);

    const files = values.photos instanceof FileList ? Array.from(values.photos) : [];
    files.forEach((file) => formData.append('photos', file));

    setSubmitState({ loading: true, error: '', success: '' });
    setUploadProgress(25);

    try {
      setUploadProgress(70);
      await createQuote(formData);
      setUploadProgress(100);
      setSubmitState({
        loading: false,
        error: '',
        success: 'Quote request sent successfully. Our team will review your details and respond with pricing guidance.'
      });
      reset();
      setTimeout(() => setUploadProgress(0), 800);
    } catch (error) {
      setUploadProgress(0);
      setSubmitState({ loading: false, error: error.message || 'Unable to submit quote request.', success: '' });
    }
  };

  return (
    <Container className="grid gap-6 lg:grid-cols-[1fr,1.2fr]">
      <Card>
        <h1 className="text-2xl font-bold text-slate-100">Get a Plumbing Quote</h1>
        <p className="mt-3 text-sm text-slate-200">
          Share issue details and photos so we can provide a faster, more accurate estimate.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-200">
          <li>Upload multiple photos of the issue area.</li>
          <li>Mark urgency so we can prioritize appropriately.</li>
          <li>Receive a response with next steps and estimate details.</li>
        </ul>
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
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" type="tel" autoComplete="tel" {...register('phone')} />
              <FieldError>{errors.phone?.message}</FieldError>
            </div>
            <div>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" autoComplete="email" {...register('email')} />
              <FieldError>{errors.email?.message}</FieldError>
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="address">Address (optional)</FieldLabel>
            <Input id="address" autoComplete="street-address" {...register('address')} />
            <FieldError>{errors.address?.message}</FieldError>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="serviceType">Service type</FieldLabel>
              <Select id="serviceType" {...register('serviceType')}>
                <option value="">Select service</option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </Select>
              <FieldError>{errors.serviceType?.message}</FieldError>
            </div>

            <div>
              <FieldLabel htmlFor="urgency">Urgency</FieldLabel>
              <Select id="urgency" {...register('urgency')}>
                <option value="low">Low - within 1 week</option>
                <option value="medium">Medium - within 2-3 days</option>
                <option value="high">High - within 24 hours</option>
                <option value="emergency">Emergency - immediate</option>
              </Select>
              <FieldError>{errors.urgency?.message}</FieldError>
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="issueDescription">Issue description</FieldLabel>
            <Textarea
              id="issueDescription"
              rows={5}
              placeholder="Describe symptoms, when it started, and what has been tried so far."
              {...register('issueDescription')}
            />
            <FieldError>{errors.issueDescription?.message}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="photos">Upload photos (optional)</FieldLabel>
            <Input id="photos" type="file" accept="image/*" multiple {...register('photos')} />
            <p className="mt-1 text-xs text-slate-200">JPG, PNG, or HEIC accepted.</p>
          </div>

          {submitState.loading && (
            <div>
              <p className="mb-2 text-sm text-slate-200">Upload progress</p>
              <div className="h-2 rounded-full bg-slate-700">
                <div
                  className="h-2 rounded-full bg-brand-600 transition-all"
                  style={{ width: `${uploadProgress}%` }}
                  aria-hidden="true"
                />
              </div>
              <p className="mt-1 text-xs text-slate-200" aria-live="polite">
                {uploadProgress}% complete
              </p>
            </div>
          )}

          <StatusBanner type="error" message={submitState.error} />
          <StatusBanner type="success" message={submitState.success} />

          <Button type="submit" className="w-full disabled:cursor-not-allowed disabled:opacity-75" disabled={submitState.loading}>
            {submitState.loading ? 'Submitting quote...' : 'Submit quote request'}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
