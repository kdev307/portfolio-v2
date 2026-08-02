import { useRef } from "react";
import type { PointerEvent } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface TiltOptions {
  max?: number; // max rotation in degrees
  scale?: number; // hover scale
  glare?: boolean; // move a light source with the pointer
}

/**
 * 3D tilt that leans toward whichever corner the pointer is over.
 * Pointer in the top-left tilts the top-left toward you, and so on.
 * Drives CSS variables on the element via a ref — no React re-renders.
 */
export function useTilt<T extends HTMLElement>({
  max = 10,
  scale = 1.015,
  glare = true,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();
  const raf = useRef(0);

  const apply = (px: number, py: number) => {
    const el = ref.current;
    if (!el) return;
    // px, py are 0..1 across the element.
    const ry = (px - 0.5) * 2 * max; // rotateY: left/right
    const rx = (0.5 - py) * 2 * max; // rotateX: up/down (corner lean)
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    el.style.setProperty("--tscale", `${scale}`);
    if (glare) {
      el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
      el.style.setProperty("--gop", "1");
    }
  };

  const onPointerMove = (e: PointerEvent<T>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => apply(px, py));
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tscale", "1");
    el.style.setProperty("--gop", "0");
  };

  return {
    ref,
    reduced,
    handlers: { onPointerMove, onPointerLeave: reset },
  };
}
