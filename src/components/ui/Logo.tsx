interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

/**
 * Monogram mark — a geometric "d" drawn as a stroked path with a lime tittle.
 * Pairs with a lowercase wordmark. Scales cleanly at any size.
 */
export function Logo({ className = "", showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface transition-colors duration-300 group-hover:border-accent/50">
        <svg
          viewBox="0 0 32 32"
          className="h-[18px] w-[18px]"
          fill="none"
          aria-hidden
        >
          <path
            d="M9 8v16h5a8 8 0 0 0 0-16H9Z"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
            className="text-text"
          />
          <circle cx="24" cy="9" r="2.2" className="fill-accent" />
        </svg>
      </span>
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight text-text">
          <span className="text-accent">.</span>dev
        </span>
      )}
    </span>
  );
}
