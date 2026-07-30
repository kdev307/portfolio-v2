import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Very subtle cursor-following radial glow, fixed behind content.
 * Updates a CSS variable via rAF so it never thrashes React state.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = 0;
      el.style.setProperty("--sx", `${pos.x}px`);
      el.style.setProperty("--sy", `${pos.y}px`);
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(440px circle at var(--sx, 50%) var(--sy, 50%), rgba(190,242,100,0.05), transparent 70%)",
      }}
    />
  );
}
