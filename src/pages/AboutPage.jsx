import Card from '../components/Card';
import Container from '../components/Container';

export default function AboutPage() {
  return (
    <Container className="space-y-6">
      <header className="rounded-2xl border border-slate-800 bg-slate-950/85 p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-100">About Griswold Plumbing</p>
        <h1 className="mt-2 text-3xl font-bold text-white">A local team focused on quality and trust</h1>
      </header>

      <Card className="border border-slate-700 bg-slate-900/95">
        <p className="text-slate-100">
          We are a full-service plumbing company serving homeowners and small businesses with dependable repair, maintenance, and installation work.
          Our technicians are trained to diagnose issues clearly and provide options that fit your timeline and budget.
        </p>
        <p className="mt-4 text-slate-100">
          From routine repairs to urgent calls, our mission is simple: solve problems quickly, treat your property with care, and stand behind the work.
        </p>
      </Card>
    </Container>
  );
}
