import Card from '../components/Card';
import Container from '../components/Container';

export default function AboutPage() {
  return (
    <Container className="space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">About Griswold Plumbing</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-100">A local team focused on quality and trust</h1>
      </header>

      <Card>
        <p className="text-slate-300">
          We are a full-service plumbing company serving homeowners and small businesses with dependable repair, maintenance, and installation work.
          Our technicians are trained to diagnose issues clearly and provide options that fit your timeline and budget.
        </p>
        <p className="mt-4 text-slate-300">
          From routine repairs to urgent calls, our mission is simple: solve problems quickly, treat your property with care, and stand behind the work.
        </p>
      </Card>
    </Container>
  );
}
