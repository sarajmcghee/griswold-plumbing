import Container from './Container';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 py-8">
      <Container className="flex flex-col justify-between gap-2 text-sm text-slate-200 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Griswold Plumbing. Licensed and insured.</p>
        <p>Mon-Sat: 7:00 AM to 8:00 PM | Emergency response available</p>
      </Container>
    </footer>
  );
}
