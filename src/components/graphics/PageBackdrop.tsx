import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface PageBackdropProps {
  /** Big faint watermark word for the route, e.g. "WORK" / "NOTES". */
  label: string;
}

// Deterministic scatter of accent dots (no random → stable across renders).
const dots = [
  { x: "12%", y: "22%", d: 0 },
  { x: "78%", y: "16%", d: 0.6 },
  { x: "88%", y: "62%", d: 1.2 },
  { x: "22%", y: "72%", d: 0.9 },
  { x: "60%", y: "84%", d: 1.6 },
  { x: "40%", y: "34%", d: 0.3 },
];

/**
 * Faint, animated backdrop shown on section route pages (/work, /notes …):
 * a giant watermark, a blueprint grid, an accent glow and drifting dots.
 * Purely decorative, sits behind page content.
 */
export function PageBackdrop({ label }: PageBackdropProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden"
    >
      {/* accent glow */}
      <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/[0.06] blur-[130px]" />

      {/* blueprint grid, faded at the edges */}
      <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(theme(colors.border)_1px,transparent_1px),linear-gradient(90deg,theme(colors.border)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(circle_at_60%_35%,black,transparent_70%)]" />

      {/* watermark */}
      <motion.span
        className="absolute right-[-1%] top-[14%] select-none font-semibold leading-none tracking-tightest text-white/[0.028]"
        style={{ fontSize: "clamp(7rem, 22vw, 20rem)" }}
        animate={reduced ? undefined : { x: [0, -24, 0], y: [0, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        {label}
      </motion.span>

      {/* drifting accent dots */}
      {dots.map((dot, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-accent/60"
          style={{ left: dot.x, top: dot.y }}
          animate={
            reduced ? undefined : { y: [0, -14, 0], opacity: [0.3, 0.8, 0.3] }
          }
          transition={{
            duration: 6 + i,
            delay: dot.d,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}
