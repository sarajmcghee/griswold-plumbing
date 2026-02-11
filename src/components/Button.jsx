export default function Button({
  as: Comp = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary: 'bg-slate-800 text-slate-100 ring-1 ring-slate-700 hover:bg-slate-700',
    ghost: 'text-brand-200 hover:bg-brand-900/40'
  };

  return (
    <Comp
      className={[
        'focus-ring inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition',
        variants[variant],
        className
      ].join(' ')}
      {...props}
    >
      {children}
    </Comp>
  );
}
