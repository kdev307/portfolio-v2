interface StatusPillProps {
  label: string;
  detail: string;
}

export function StatusPill({ label, detail }: StatusPillProps) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 py-1.5 pl-2.5 pr-4 backdrop-blur">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      <span className="h-3.5 w-px bg-border" />
      <span className="text-[13px] font-medium text-text">{detail}</span>
    </div>
  );
}
