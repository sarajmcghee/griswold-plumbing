export default function Card({ className = '', children }) {
  return <section className={`rounded-2xl bg-slate-900 p-6 shadow-card ${className}`}>{children}</section>;
}
