import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  label?: string;
  index?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Consistent section shell: anchor id, generous vertical rhythm,
 * an editorial label/index header, and a max-width content column.
 */
export function Section({
  id,
  label,
  index,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-content scroll-mt-24 px-6 py-24 sm:px-8 md:py-32 ${className}`}
    >
      {(label || title) && (
        <header className="mb-12 md:mb-16">
          {(label || index) && (
            <div className="mb-5 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {index && (
                <span className="font-mono text-xs text-muted/70">{index}</span>
              )}
              {label && <span className="section-label">{label}</span>}
              <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>
          )}
          {title && (
            <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tightest text-text sm:text-4xl md:text-5xl">
              {title}
            </h2>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
