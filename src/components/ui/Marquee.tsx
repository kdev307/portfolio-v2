interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className="mask-fade-x group relative w-full overflow-hidden py-2">
      <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex shrink-0 items-center rounded-full border border-border bg-surface/50 px-4 py-1.5 font-mono text-xs text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
