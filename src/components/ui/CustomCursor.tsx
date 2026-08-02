import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const INTERACTIVE = "a,button,[role=button],input,textarea,select,label,summary";

/**
 * Themed pointer: a solid lime dot that tracks instantly plus a ring that lags
 * behind, growing over interactive elements. Only mounts on fine-pointer
 * devices; hides the native cursor while active.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const reduced = usePrefersReducedMotion();

  // 1) Decide whether to run at all (fine pointer only).
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setEnabled(true);
    }
  }, []);

  // 2) Once enabled AND the elements are mounted, wire up tracking.
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const html = document.documentElement;
    html.classList.add("cursor-none");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    // Show it at the current center immediately.
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (reduced) ring.style.transform = `translate(${mx}px, ${my}px)`;
      html.classList.toggle(
        "cursor-active",
        Boolean((e.target as Element | null)?.closest(INTERACTIVE))
      );
    };

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const setVisible = (v: boolean) => {
      const o = v ? "1" : "0";
      dot.style.opacity = o;
      ring.style.opacity = o;
    };
    const hide = () => setVisible(false);
    const showAgain = () => setVisible(true);

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", hide);
    document.addEventListener("pointerenter", showAgain);
    if (!reduced) loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("pointerenter", showAgain);
      html.classList.remove("cursor-none", "cursor-active");
    };
  }, [enabled, reduced]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] will-change-transform"
      >
        <div className="cursor-ring-inner" />
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] will-change-transform"
      >
        <div className="cursor-dot-inner" />
      </div>
    </>
  );
}
