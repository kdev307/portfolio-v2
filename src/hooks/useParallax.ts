import { useRef } from "react";
import { useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ParallaxOptions {
  /**
   * Pixels to travel across the tracked scroll range. Positive moves the
   * element down as you scroll (slower than content → "further back");
   * negative moves it up (faster → "closer").
   */
  distance?: number;
  /**
   * Where in the viewport tracking starts/ends. Mirrors framer-motion's
   * `useScroll({ offset })`. Defaults to a full pass-through of the target.
   */
  offset?: [string, string];
  /** Spring feel — defaults to the house spring used across the site. */
  spring?: { stiffness: number; damping: number; mass: number };
}

const HOUSE_SPRING = { stiffness: 120, damping: 30, mass: 0.3 };

/**
 * Scroll-linked parallax translate for a target element.
 *
 * Attach `ref` to the scroll target (usually the section) and bind `y` to any
 * decorative `motion.*` layer inside it. Honors reduced-motion: when the user
 * prefers reduced motion, `y` stays pinned at 0 so nothing drifts.
 *
 * Uses framer-motion motion values (no React re-renders on scroll), matching
 * the ScrollProgress / ScrollToTop pattern already in the codebase.
 */
export function useParallax<T extends HTMLElement = HTMLElement>({
  distance = 80,
  offset = ["start end", "end start"],
  spring = HOUSE_SPRING,
}: ParallaxOptions = {}): {
  ref: React.RefObject<T>;
  y: MotionValue<number>;
} {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<T>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as never,
  });
  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [-distance, distance]
  );
  const y = useSpring(raw, spring);

  return { ref, y };
}
