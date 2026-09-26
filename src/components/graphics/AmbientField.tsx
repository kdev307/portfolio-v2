import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SPRING = { stiffness: 80, damping: 30, mass: 0.4 };

// Deterministic accent orbs — position (%), size (px), blur (px), depth factor.
const orbs = [
  { x: "8%", y: "12%", size: 340, depth: -120, opacity: 0.05 },
  { x: "82%", y: "34%", size: 460, depth: 180, opacity: 0.045 },
  { x: "18%", y: "68%", size: 300, depth: -90, opacity: 0.05 },
  { x: "70%", y: "88%", size: 420, depth: 220, opacity: 0.04 },
];

/**
 * Home-page ambient graphics layer. Faint accent-lime glow orbs and a masked
 * blueprint grid that drift on scroll (parallax) to add depth behind content.
 * Sits below the z-10 page content and complements the three.js dot field
 * rather than competing with it. Decorative only, reduced-motion aware.
 */
export function AmbientField() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  // Grid drifts slowly upward as the whole page scrolls.
  const gridYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [0, -160]
  );
  const gridY = useSpring(gridYRaw, SPRING);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[8] overflow-hidden"
    >
      {/* masked blueprint grid — parallax drift */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-x-0 -top-24 h-[140%] opacity-[0.25] [background-image:linear-gradient(theme(colors.border)_1px,transparent_1px),linear-gradient(90deg,theme(colors.border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(circle_at_50%_30%,black,transparent_75%)]"
      />

      {/* drifting accent glow orbs, each at its own parallax depth */}
      {orbs.map((orb, i) => (
        <Orb key={i} orb={orb} scrollYProgress={scrollYProgress} reduced={reduced} />
      ))}
    </div>
  );
}

interface OrbConfig {
  x: string;
  y: string;
  size: number;
  depth: number;
  opacity: number;
}

function Orb({
  orb,
  scrollYProgress,
  reduced,
}: {
  orb: OrbConfig;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [0, orb.depth]
  );
  const y = useSpring(yRaw, SPRING);

  return (
    <motion.div
      style={{
        y,
        left: orb.x,
        top: orb.y,
        width: orb.size,
        height: orb.size,
        opacity: orb.opacity,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent blur-[120px]"
    />
  );
}
