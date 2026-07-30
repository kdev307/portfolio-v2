import type { ReactNode, PointerEvent } from "react";
import { useRef } from "react";

interface CursorCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "button";
  onClick?: () => void;
  accent?: "blue" | "green" | "orange";
}

const accentRGB: Record<string, string> = {
  blue: "190,242,100",
  green: "190,242,100",
  orange: "190,242,100",
};

/**
 * Card that tracks the pointer and reveals a soft border-glow highlight where
 * the cursor is. Pure CSS variables driven from a rAF-free pointer handler.
 */
export function CursorCard({
  children,
  className = "",
  as = "div",
  onClick,
  accent = "blue",
}: CursorCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const Tag = as;
  const rgb = accentRGB[accent];

  return (
    <Tag
      ref={ref as never}
      onPointerMove={onMove}
      onClick={onClick}
      style={
        {
          "--glow": `rgba(${rgb},0.14)`,
        } as React.CSSProperties
      }
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface/40 transition-colors duration-300 hover:border-muted/40 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx) var(--my), var(--glow), transparent 65%)",
        }}
      />
      <div className="relative">{children}</div>
    </Tag>
  );
}
