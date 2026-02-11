import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import { services } from '../data/services';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <Container>
        <Card>
          <h1 className="text-2xl font-bold">Service not found</h1>
          <p className="mt-2 text-sm text-slate-400">The requested service does not exist or may have moved.</p>
          <Button as={Link} to="/services" className="mt-4">
            Back to Services
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="space-y-6">
      <div className="rounded-3xl bg-slate-900 p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">Service Detail</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-100">{service.name}</h1>
        <p className="mt-4 max-w-3xl text-slate-400">{service.details}</p>
        <ul className="mt-6 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
          {service.features.map((feature) => (
            <li key={feature} className="rounded-lg bg-slate-800 px-3 py-2">
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button as={Link} to="/book-online">
            Schedule This Service
          </Button>
          <Button as={Link} to="/get-a-quote" variant="secondary">
            Get a Quote
          </Button>
        </div>
      </div>
    </Container>
  );
}
