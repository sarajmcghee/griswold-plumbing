export function PipeIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 5h7v4h4v10h-4v-6H5V9h4V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.5" cy="6.5" r="1" fill="currentColor" />
      <circle cx="17.5" cy="17.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function ShowerIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 8h9c3.3 0 6 2.7 6 6v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 14h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 17v2M12 17v2M15 17v2M18 17v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PlumbingScene() {
  return (
    <svg viewBox="0 0 360 180" className="h-32 w-full text-brand-200" role="img" aria-label="Stylized plumbing pipes and shower illustration">
      <defs>
        <linearGradient id="pipeTone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect x="14" y="18" width="140" height="22" rx="11" fill="url(#pipeTone)" />
      <rect x="130" y="18" width="22" height="92" rx="11" fill="url(#pipeTone)" />
      <rect x="130" y="88" width="140" height="22" rx="11" fill="url(#pipeTone)" />
      <rect x="248" y="88" width="22" height="60" rx="11" fill="url(#pipeTone)" />
      <rect x="230" y="142" width="58" height="14" rx="7" fill="url(#pipeTone)" />
      <circle cx="282" cy="128" r="3" fill="currentColor" />
      <circle cx="300" cy="128" r="3" fill="currentColor" />
      <circle cx="318" cy="128" r="3" fill="currentColor" />
      <circle cx="336" cy="128" r="3" fill="currentColor" />
    </svg>
  );
}
