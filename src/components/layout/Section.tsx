import { useRef, type ReactNode } from "react";
import {
    ParallaxWord,
    type WatermarkDirection,
} from "@/components/graphics/ParallaxWord";
import { SectionGlyph } from "@/components/graphics/SectionGlyph";

type GlyphVariant = "orbit" | "grid" | "wave" | "arc";
type GlyphCorner = "tl" | "tr" | "bl" | "br";

interface SectionProps {
    id: string;
    label?: string;
    index?: string;
    title?: string;
    children: ReactNode;
    className?: string;
    /**
     * Optional environmental watermark word (e.g. "THINK"). Rendered as a large,
     * low-contrast patterned-lime graphic behind all foreground content.
     */
    watermark?: string;
    /** Desktop parallax direction for the watermark. Alternate between sections. */
    watermarkDirection?: WatermarkDirection;
    /** Optional decorative corner glyph (orbit/grid/wave/arc). */
    glyph?: GlyphVariant;
    /**Corner to anchor the glyph to (default top-right), */
    glyphCorner?: GlyphCorner;
}

/**
 * Consistent section shell: anchor id, generous vertical rhythm, an editorial
 * label/index header, and a max-width content column.
 *
 * Layering architecture (applied uniformly to every section):
 *   section (relative, overflow-clip)
 *     ├── watermark   → z-0, decorative, pointer-events-none
 *     └── foreground  → z-10, wraps header + all children
 *
 * Because the entire foreground (header AND children) lives in one z-10 layer,
 * no child can ever fall behind the watermark — the watermark is guaranteed to
 * stay in the background. `overflow-clip` guarantees oversized watermark
 * letters never spill out or create horizontal page overflow.
 */
export function Section({
    id,
    label,
    index,
    title,
    children,
    className = "",
    watermark,
    watermarkDirection = "left",
    glyph,
    glyphCorner = "tr",
}: SectionProps) {
    const ref = useRef<HTMLElement>(null);

    return (
        <section
            ref={ref}
            id={id}
            className={`relative mx-auto w-full max-w-content scroll-mt-24 overflow-clip px-6 py-24 sm:px-8 md:py-32 ${className}`}
        >
            {watermark && (
                <ParallaxWord
                    word={watermark}
                    direction={watermarkDirection}
                    targetRef={ref}
                />
            )}
            {glyph && <SectionGlyph variant={glyph} corner={glyphCorner} />}

            {/* Foreground — the whole content column sits above the watermark. */}
            <div className="relative z-10">
                {(label || title) && (
                    <header className="mb-12 md:mb-16">
                        {(label || index) && (
                            <div className="mb-5 flex items-center gap-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                {index && (
                                    <span className="font-mono text-xs text-muted/70">
                                        {index}
                                    </span>
                                )}
                                {label && (
                                    <span className="section-label">
                                        {label}
                                    </span>
                                )}
                                <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                            </div>
                        )}
                        {title && (
                            <h2 className="max-w-3xl text-balance text-h2 font-semibold tracking-tightest text-text">
                                {title}
                            </h2>
                        )}
                    </header>
                )}
                {children}
            </div>
        </section>
    );
}
