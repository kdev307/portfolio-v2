import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type WatermarkDirection = "left" | "right";

interface ParallaxWordProps {
  /** The watermark word, e.g. "THINK". Rendered uppercase. */
  word: string;
  /**
   * Direction the word slides in from as the section enters view. "left"
   * enters from the left, "right" from the right. Alternate between sections.
   */
  direction?: WatermarkDirection;
  /** Scroll target — the section element the watermark belongs to. */
  targetRef: React.RefObject<HTMLElement>;
}

const SPRING = { stiffness: 90, damping: 30, mass: 0.4 };

// Horizontal distance the word slides in from as the section enters view.
const ENTER_TRAVEL = 160; // px

/**
 * `matchMedia`-driven flag, mirroring `usePrefersReducedMotion`. `true` only at
 * the desktop breakpoint (Tailwind `lg` = 1024px) and up. Below that we treat
 * the layout as mobile/tablet: the watermark is static, regardless of motion
 * preference.
 */
function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/**
 * Premium environmental watermark word.
 *
 * Desktop (lg+, motion allowed): the word has continuous scroll-linked
 * horizontal parallax — it travels across the whole time the section is in
 * view, in its `direction`, and reverses when you scroll back up. A brief
 * opacity fade eases it in as the section first appears.
 *
 * Mobile / tablet (< lg) OR reduced-motion: completely static. On mobile/tablet
 * it is pinned to the bottom-right of the section, fully inside the viewport.
 *
 * Always: `pointer-events-none`, `aria-hidden`, `z-0`, low-contrast patterned
 * lime fill (`.watermark-fill`). The whole word stays on one line and never
 * clips or triggers horizontal overflow (parent clips overflow).
 */
export function ParallaxWord({
  word,
  direction = "left",
  targetRef,
}: ParallaxWordProps) {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const animate = isDesktop && !reduced;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"] as never,
  });

  const sign = direction === "left" ? -1 : 1;

  // Continuous scroll-linked horizontal parallax. The word travels the whole
  // time the section is in view — mapped across the full scroll pass (0→1) so
  // it keeps moving whether you scroll down or back up, and tracks the scroll
  // position rather than snapping into place. "left" drifts left→right,
  // "right" drifts right→left.
  const enterRaw = useTransform(
    scrollYProgress,
    [0, 1],
    animate ? [ENTER_TRAVEL * sign, -ENTER_TRAVEL * sign] : [0, 0]
  );
  const enterX = useSpring(enterRaw, SPRING);
  // Gentle fade-in as it enters, staying fully visible once past the threshold.
  const enterOpacity = useTransform(
    scrollYProgress,
    [0, 0.18],
    animate ? [0, 1] : [1, 1]
  );

  return (
    <>
      {/* Desktop: lower/background band, horizontally centred */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-24 z-0 hidden select-none justify-center lg:flex"
      >
        <motion.span
          style={animate ? { x: enterX, opacity: enterOpacity } : undefined}
          className="watermark-fill block whitespace-nowrap font-semibold leading-none tracking-tightest [font-size:clamp(5rem,17vw,17rem)]"
        >
          {word}
        </motion.span>
      </div>

      {/* Mobile / tablet: static, bottom-right, fully inside the viewport */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-4 z-0 flex select-none justify-end px-6 sm:px-8 lg:hidden"
      >
        <span className="watermark-fill block max-w-full whitespace-nowrap text-right font-semibold leading-none tracking-tightest [font-size:clamp(3rem,16vw,8rem)]">
          {word}
        </span>
      </div>
    </>
  );
}
