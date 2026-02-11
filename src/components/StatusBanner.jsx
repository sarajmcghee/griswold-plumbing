export default function StatusBanner({ type = 'info', message }) {
  if (!message) {
    return null;
  }

  const tone = {
    info: 'bg-brand-900/40 text-brand-100 ring-brand-700',
    error: 'bg-red-950/40 text-red-200 ring-red-800',
    success: 'bg-green-950/40 text-green-200 ring-green-800'
  };

  return <p className={`rounded-lg px-4 py-3 text-sm ring-1 ${tone[type]}`}>{message}</p>;
}
