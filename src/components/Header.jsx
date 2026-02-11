import { NavLink } from 'react-router-dom';
import Container from './Container';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/book-online', label: 'Book Online' },
  { to: '/get-a-quote', label: 'Get a Quote' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
      <Container className="flex flex-wrap items-center justify-between gap-3 py-3">
        <NavLink to="/" className="focus-ring rounded-md text-lg font-extrabold tracking-tight text-slate-100">
          Griswold Plumbing
        </NavLink>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  'focus-ring rounded-md px-3 py-2 text-sm font-medium transition',
                  isActive ? 'bg-brand-600 text-white' : 'text-slate-200 hover:bg-slate-800'
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </Container>
    </header>
  );
}
