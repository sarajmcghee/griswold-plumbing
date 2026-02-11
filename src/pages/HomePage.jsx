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

export default function HomePage() {
  return (
    <Container className="space-y-8">
      <section className="grid gap-6 rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-6 py-10 text-white shadow-card md:grid-cols-2 md:px-10">
        <div>
          <p className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Trusted Local Plumbers
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">Fast, reliable plumbing service for your home or business.</h1>
          <p className="mt-4 max-w-xl text-sm text-brand-50 md:text-base">
            From emergency repairs to planned installations, Griswold Plumbing helps you solve issues quickly with transparent pricing and skilled technicians.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button as={Link} to="/book-online" variant="secondary">
              Book Online
            </Button>
            <Button as={Link} to="/get-a-quote" className="bg-slate-900 hover:bg-slate-800">
              Request a Quote
            </Button>
          </div>
        </div>
        <Card className="self-stretch bg-slate-900/95 text-slate-100">
          <PlumbingScene />
          <h2 className="text-xl font-semibold">Why homeowners choose us</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>Licensed and insured professionals</li>
            <li>Arrival windows and status updates</li>
            <li>Emergency support when you need it most</li>
            <li>Upfront recommendations before work begins</li>
          </ul>
        </Card>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-100">Popular services</h2>
          <Link to="/services" className="focus-ring rounded text-sm font-semibold text-brand-200 hover:text-brand-100">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => {
            const ServiceIcon = iconByServiceSlug[service.slug] || PipeIcon;
            return (
              <Card key={service.slug} className="border border-slate-800">
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-brand-200">
                  <ServiceIcon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-slate-100">{service.name}</h3>
                <p className="mt-2 text-sm text-slate-200">{service.summary}</p>
                <Button as={Link} to={`/services/${service.slug}`} variant="ghost" className="mt-4 px-0">
                  Learn more
                </Button>
              </Card>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
