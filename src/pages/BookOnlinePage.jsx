import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import { FieldError, FieldLabel, Input, Select, Textarea } from '../components/FormField';
import StatusBanner from '../components/StatusBanner';
import { serviceOptions } from '../data/services';
import { createBooking, fetchAvailability } from '../lib/api';

const schema = z.object({
  name: z.string().min(2, 'Full name is required'),
  phone: z.string().min(7, 'Phone is required'),
  email: z.string().email('Valid email required'),
  address: z.string().min(5, 'Address is required'),
  serviceType: z.string().min(1, 'Select a service'),
  preferredDate: z.string().min(1, 'Select a date'),
  preferredTime: z.string().min(1, 'Select a time slot'),
  notes: z.string().max(1000, 'Notes must be 1000 characters or less').optional()
});

function getMinDate() {
  return new Date().toISOString().split('T')[0];
}

export default function BookOnlinePage() {
  const [slotsState, setSlotsState] = useState({ loading: false, error: '', slots: [] });
  const [submitState, setSubmitState] = useState({ loading: false, error: '', success: '' });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceType: '',
      preferredDate: '',
      preferredTime: '',
      notes: ''
    }
  });

  const selectedDate = watch('preferredDate');
  const selectedService = watch('serviceType');
  const hasAvailabilityParams = useMemo(() => Boolean(selectedDate && selectedService), [selectedDate, selectedService]);

  useEffect(() => {
    if (!hasAvailabilityParams) {
      setSlotsState({ loading: false, error: '', slots: [] });
      setValue('preferredTime', '');
      return;
    }

    let mounted = true;

    async function loadAvailability() {
      setSlotsState({ loading: true, error: '', slots: [] });
      setValue('preferredTime', '');
      try {
        const data = await fetchAvailability({ date: selectedDate, serviceType: selectedService });
        if (!mounted) {
          return;
        }

        const slots = Array.isArray(data?.slots) ? data.slots : [];
        setSlotsState({ loading: false, error: '', slots });
      } catch (error) {
        if (!mounted) {
          return;
        }
        setSlotsState({ loading: false, error: error.message || 'Could not load time slots.', slots: [] });
      }
    }

    loadAvailability();

    return () => {
      mounted = false;
    };
  }, [hasAvailabilityParams, selectedDate, selectedService, setValue]);

  const onSubmit = async (values) => {
    setSubmitState({ loading: true, error: '', success: '' });
    try {
      await createBooking(values);
      setSubmitState({
        loading: false,
        error: '',
        success: 'Booking request received. We will confirm your appointment and text/email next steps shortly.'
      });
      reset();
      setSlotsState({ loading: false, error: '', slots: [] });
    } catch (error) {
      setSubmitState({ loading: false, error: error.message || 'Unable to submit booking.', success: '' });
    }
  };

  return (
    <Container className="grid gap-6 lg:grid-cols-[1fr,1.25fr]">
      <Card>
        <h1 className="text-2xl font-bold text-slate-100">Book Plumbing Service Online</h1>
        <p className="mt-3 text-sm text-slate-200">
          Choose your service and preferred appointment time. Once submitted, our dispatcher confirms availability and next steps.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-200">
          <li>Pick a date and see available appointment windows.</li>
          <li>Share service details for faster arrival prep.</li>
          <li>Receive booking confirmation by phone/email.</li>
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
            <FieldLabel htmlFor="address">Service address</FieldLabel>
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
              <FieldLabel htmlFor="preferredDate">Preferred date</FieldLabel>
              <Input id="preferredDate" type="date" min={getMinDate()} {...register('preferredDate')} />
              <FieldError>{errors.preferredDate?.message}</FieldError>
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="preferredTime">Available time slots</FieldLabel>
            <Select
              id="preferredTime"
              disabled={!hasAvailabilityParams || slotsState.loading || Boolean(slotsState.error)}
              {...register('preferredTime')}
            >
              <option value="">
                {slotsState.loading
                  ? 'Loading slots...'
                  : !hasAvailabilityParams
                    ? 'Select service and date first'
                    : slotsState.slots.length
                      ? 'Select a time slot'
                      : 'No slots available'}
              </option>
              {slotsState.slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </Select>
            <FieldError>{errors.preferredTime?.message}</FieldError>
            <FieldError>{slotsState.error}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="notes">Notes (optional)</FieldLabel>
            <Textarea id="notes" rows={4} placeholder="Anything our plumber should know before arrival" {...register('notes')} />
            <FieldError>{errors.notes?.message}</FieldError>
          </div>

          <StatusBanner type="error" message={submitState.error} />
          <StatusBanner type="success" message={submitState.success} />

          <Button type="submit" className="w-full disabled:cursor-not-allowed disabled:opacity-75" disabled={submitState.loading}>
            {submitState.loading ? 'Submitting booking...' : 'Submit booking request'}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
