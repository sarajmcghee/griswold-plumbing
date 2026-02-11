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
      <header className="space-y-2">
        <div className="max-w-md text-brand-300">
          <PlumbingScene />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">Our Services</p>
        <h1 className="text-3xl font-bold text-slate-100">Comprehensive plumbing solutions</h1>
        <p className="max-w-3xl text-slate-400">
          Whether it is a quick repair or full system upgrade, we deliver clean workmanship and clear communication from start to finish.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => {
          const ServiceIcon = iconByServiceSlug[service.slug] || PipeIcon;
          return (
            <Card key={service.slug} className="border border-slate-800">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-brand-300">
                <ServiceIcon className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-semibold">{service.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{service.details}</p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-300">
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
