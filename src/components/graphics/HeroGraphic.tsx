import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const C = 200; // center

interface Ring {
  r: number;
  duration: number;
  dir: 1 | -1;
  nodes: { angle: number; lime?: boolean; size?: number }[];
}

const rings: Ring[] = [
  { r: 66, duration: 28, dir: 1, nodes: [{ angle: 0, lime: true }, { angle: 150 }] },
  {
    r: 118,
    duration: 44,
    dir: -1,
    nodes: [{ angle: 40 }, { angle: 200, lime: true }, { angle: 300 }],
  },
  {
    r: 172,
    duration: 66,
    dir: 1,
    nodes: [{ angle: 20, lime: true }, { angle: 160 }, { angle: 250 }],
  },
];

const pos = (r: number, angle: number) => {
  const rad = (angle * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
};

export function HeroGraphic() {
  const reduced = usePrefersReducedMotion();

  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <filter id="hero-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="hero-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#BEF264" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#BEF264" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* core halo */}
      <circle cx={C} cy={C} r="46" fill="url(#hero-core)" opacity="0.5" />

      {/* rings + orbiting nodes */}
      {rings.map((ring, ri) => (
        <g key={ri}>
          <motion.circle
            cx={C}
            cy={C}
            r={ring.r}
            fill="none"
            className="stroke-border"
            strokeWidth="1"
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 + ri * 0.15, ease: "easeInOut" }}
          />

          <motion.g
            style={{ transformOrigin: `${C}px ${C}px` }}
            animate={reduced ? undefined : { rotate: 360 * ring.dir }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
          >
            {ring.nodes.map((n, ni) => {
              const p = pos(ring.r, n.angle);
              return (
                <g key={ni}>
                  <line
                    x1={C}
                    y1={C}
                    x2={p.x}
                    y2={p.y}
                    className="stroke-border"
                    strokeWidth="0.75"
                    opacity="0.5"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={n.size ?? (n.lime ? 5 : 3.5)}
                    className={n.lime ? "fill-accent" : "fill-muted"}
                    filter={n.lime ? "url(#hero-glow)" : undefined}
                  />
                </g>
              );
            })}
          </motion.g>
        </g>
      ))}

      {/* central node */}
      <circle cx={C} cy={C} r="7" className="fill-accent" filter="url(#hero-glow)" />
      <circle cx={C} cy={C} r="13" fill="none" className="stroke-accent/40" strokeWidth="1" />
    </svg>
  );
}
