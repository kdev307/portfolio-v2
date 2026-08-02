import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ShimmerRevealProps {
  skeleton: ReactNode;
  children: ReactNode;
  /** How long the shimmer shows after entering view (ms). */
  delay?: number;
  className?: string;
}

/**
 * Shows a shimmer skeleton when the block first scrolls into view, then
 * cross-fades to the real content. Skips straight to content under
 * reduced-motion. The skeleton mirrors the content shape to avoid layout jump.
 */
export function ShimmerReveal({
  skeleton,
  children,
  delay = 550,
  className,
}: ShimmerRevealProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const [loaded, setLoaded] = useState(reduced);

  useEffect(() => {
    if (reduced || !inView) return;
    const t = window.setTimeout(() => setLoaded(true), delay);
    return () => window.clearTimeout(t);
  }, [inView, reduced, delay]);

  return (
    <div ref={ref} className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {loaded ? (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div key="skeleton" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {skeleton}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
