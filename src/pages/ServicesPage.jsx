import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import { PipeIcon, PlumbingScene, ShowerIcon } from '../components/PlumbingVisuals';
import { services } from '../data/services';

const iconByServiceSlug = {
  'drain-cleaning': PipeIcon,
  'water-heater-repair': ShowerIcon,
  'leak-detection': PipeIcon,
  'emergency-plumbing': ShowerIcon
};

export default function ServicesPage() {
  return (
    <Container className="space-y-6">
      <header className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/85 p-5 md:p-6">
        <div className="max-w-md text-brand-100">
          <PlumbingScene />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-100">Our Services</p>
        <h1 className="text-3xl font-bold text-white">Comprehensive plumbing solutions</h1>
        <p className="max-w-3xl text-slate-100">
          Whether it is a quick repair or full system upgrade, we deliver clean workmanship and clear communication from start to finish.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => {
          const ServiceIcon = iconByServiceSlug[service.slug] || PipeIcon;
          return (
            <Card key={service.slug} className="border border-slate-700 bg-slate-900/95">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-brand-100">
                <ServiceIcon className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-semibold text-white">{service.name}</h2>
              <p className="mt-2 text-sm text-slate-100">{service.details}</p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-100">
                {service.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Button as={Link} to={`/services/${service.slug}`} className="mt-5">
                Service details
              </Button>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
