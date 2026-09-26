import { motion, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type GlyphVariant = "orbit" | "grid" | "wave" | "arc";
type Corner = "tl" | "tr" | "bl" | "br";

interface SectionGlyphProps {
    /** Which decorative motif to draw. */
    variant?: GlyphVariant;
    /** Corner to anchor the glyph to. */
    corner?: Corner;
    /** Optional scroll-parallax translate bound to a MotionValue. */
    y?: MotionValue<number>;
    className?: string;
}

const cornerClasses: Record<Corner, string> = {
    tl: "left-2 top-2 sm:left-4 sm:top-4",
    tr: "right-2 top-2 sm:right-4 sm:top-4",
    bl: "left-2 bottom-2 sm:left-4 sm:bottom-4",
    br: "right-2 bottom-2 sm:right-4 sm:bottom-4",
};

/**
 * Subtle, decorative section glyph. A faint accent-lime SVG motif anchored to a
 * section corner to add texture without stealing focus. Purely ornamental:
 * aria-hidden, pointer-events-none, low opacity. Infinite motion is gated by
 * reduced-motion; an optional `y` MotionValue wires it to scroll parallax.
 */
export function SectionGlyph({
    variant = "orbit",
    corner = "tr",
    y,
    className = "",
}: SectionGlyphProps) {
    const reduced = usePrefersReducedMotion();

    return (
        <motion.div
            aria-hidden
            style={y ? { y } : undefined}
            className={`pointer-events-none absolute z-0 h-56 w-56 opacity-[0.5] sm:h-72 sm:w-72 ${cornerClasses[corner]} ${className}`}
        >
            <svg viewBox="0 0 200 200" className="h-full w-full">
                <defs>
                    <radialGradient
                        id={`glyph-core-${variant}`}
                        cx="50%"
                        cy="50%"
                        r="50%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#BEF264"
                            stopOpacity="0.5"
                        />
                        <stop
                            offset="100%"
                            stopColor="#BEF264"
                            stopOpacity="0"
                        />
                    </radialGradient>
                </defs>

                {variant === "orbit" && (
                    <Orbit reduced={reduced} variant={variant} />
                )}
                {variant === "grid" && <Grid />}
                {variant === "wave" && <Wave reduced={reduced} />}
                {variant === "arc" && (
                    <Arc reduced={reduced} variant={variant} />
                )}
            </svg>
        </motion.div>
    );
}

function Orbit({
    reduced,
    variant,
}: {
    reduced: boolean;
    variant: GlyphVariant;
}) {
    return (
        <g>
            <circle
                cx="100"
                cy="100"
                r="20"
                fill={`url(#glyph-core-${variant})`}
            />
            <circle
                cx="100"
                cy="100"
                r="40"
                fill="none"
                className="stroke-border"
                strokeWidth="1"
            />
            <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                className="stroke-border/60"
                strokeWidth="1"
            />
            <motion.g
                style={{ transformOrigin: "100px 100px" }}
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                <circle cx="140" cy="100" r="4" className="fill-accent/70" />
                <circle cx="100" cy="30" r="2.5" className="fill-muted/60" />
            </motion.g>
            <motion.g
                style={{ transformOrigin: "100px 100px" }}
                animate={reduced ? undefined : { rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                <circle cx="60" cy="100" r="3" className="fill-accent/50" />
            </motion.g>
        </g>
    );
}

function Grid() {
    const lines = [40, 70, 100, 130, 160];
    return (
        <g className="stroke-border/50" strokeWidth="1">
            {lines.map((v) => (
                <line key={`h${v}`} x1="30" y1={v} x2="170" y2={v} />
            ))}
            {lines.map((v) => (
                <line key={`v${v}`} x1={v} y1="30" x2={v} y2="170" />
            ))}
            <circle
                cx="100"
                cy="100"
                r="3"
                className="fill-accent/70 stroke-none"
            />
            <circle
                cx="70"
                cy="70"
                r="2"
                className="fill-accent/40 stroke-none"
            />
            <circle
                cx="130"
                cy="130"
                r="2"
                className="fill-accent/40 stroke-none"
            />
        </g>
    );
}

function Wave({ reduced }: { reduced: boolean }) {
    const paths = [
        "M10 100 Q 55 60 100 100 T 190 100",
        "M10 120 Q 55 80 100 120 T 190 120",
        "M10 80 Q 55 40 100 80 T 190 80",
    ];
    return (
        <g fill="none" className="stroke-accent/30" strokeWidth="1.25">
            {paths.map((d, i) => (
                <motion.path
                    key={i}
                    d={d}
                    initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                        duration: 1.6,
                        delay: i * 0.2,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </g>
    );
}

function Arc({
    reduced,
    variant,
}: {
    reduced: boolean;
    variant: GlyphVariant;
}) {
    return (
        <g>
            <circle
                cx="100"
                cy="100"
                r="16"
                fill={`url(#glyph-core-${variant})`}
            />
            <motion.g
                style={{ transformOrigin: "100px 100px" }}
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
                <path
                    d="M100 20 A 80 80 0 0 1 180 100"
                    fill="none"
                    className="stroke-accent/40"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M100 180 A 80 80 0 0 1 20 100"
                    fill="none"
                    className="stroke-border"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <circle cx="180" cy="100" r="3.5" className="fill-accent/70" />
            </motion.g>
        </g>
    );
}
