import { useRef } from "react";
import type { PointerEvent } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Magnetic pointer attraction. Returns handlers + a ref for a target element.
 * The element translates a fraction of the pointer's offset from center.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  const onPointerMove = (e: PointerEvent<T>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  return {
    ref,
    handlers: { onPointerMove, onPointerLeave: reset, onPointerUp: reset },
  };
}
