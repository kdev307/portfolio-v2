import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "solid" | "outline" | "ghost";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
  strength?: number;
}

const variantClasses: Record<Variant, string> = {
  solid:
    "bg-text text-bg hover:bg-white border border-transparent",
  outline:
    "bg-surface/60 text-text border border-border hover:border-muted/60 hover:bg-surface",
  ghost: "bg-transparent text-muted hover:text-text border border-transparent",
};

/**
 * Button/link with magnetic pointer attraction and a subtle press.
 * The inner element carries the transform so the hit area stays put.
 */
export function MagneticButton({
  children,
  onClick,
  href,
  variant = "outline",
  className = "",
  ariaLabel,
  strength = 0.3,
}: MagneticButtonProps) {
  const { ref, handlers } = useMagnetic<HTMLSpanElement>(strength);

  const inner = (
    <span
      ref={ref}
      className={`inline-flex items-center gap-2 transition-transform duration-200 ease-out`}
    >
      {children}
    </span>
  );

  const base = `group relative inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 active:scale-[0.97] ${variantClasses[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        {...handlers}
        className={base}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      {...handlers}
      className={base}
    >
      {inner}
    </button>
  );
}
