import { motion } from "framer-motion";
import { ArrowDown, Briefcase, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { marqueeTech } from "@/data/exploring";
import { StatusPill } from "@/components/ui/StatusPill";
import { Marquee } from "@/components/ui/Marquee";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroGraphic } from "@/components/graphics/HeroGraphic";
import { lineReveal, ease } from "@/lib/motion";
import { scrollToSection } from "@/lib/sections";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface LandingProps {
  onOpenPalette: () => void;
}

const headlineWords = profile.headline.replace(".", "").split(" ");

export function Landing({ onOpenPalette }: LandingProps) {
  const reduced = usePrefersReducedMotion();
  return (
    <section
      id="landing"
      className="relative flex min-h-svh flex-col justify-center px-6 pb-16 pt-28 sm:px-8"
    >
      {/* hero graphic — sits behind the title as a living backdrop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease }}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(94vw,880px)] w-[min(94vw,880px)] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          className="h-full w-full"
          animate={reduced ? undefined : { scale: [1, 1.05, 1], y: [0, -18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <HeroGraphic />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-content">
        {/* identity — spotlight on me */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="relative mb-10"
        >
          {/* soft spotlight glow behind the name */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-12 h-52 w-[34rem] max-w-full rounded-full bg-accent/[0.12] blur-[90px]"
          />

          {/* kicker: monogram + location */}
          <div className="relative mb-4 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 py-1 pl-1.5 pr-3">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-xs font-bold text-bg">
                {profile.name.charAt(0)}
              </span>
              <span className="font-mono text-xs text-muted">portfolio</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
              <MapPin className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
              {profile.location}
            </span>
          </div>

          {/* name */}
          <h2 className="relative inline-block text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            <span className="text-accent">.</span>dev
            <span className="absolute -bottom-1 left-0 h-[3px] w-2/5 rounded-full bg-accent" />
          </h2>

          {/* designation @ organization */}
          <p className="relative mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-base text-muted sm:text-lg">
            <Briefcase className="h-[18px] w-[18px] text-accent" strokeWidth={1.75} />
            <span className="text-text">{profile.role}</span>
            <span className="h-1 w-1 rounded-full bg-accent/70" />
            <span className="font-semibold text-accent">{profile.company}</span>
          </p>
        </motion.div>

        {/* headline — word-by-word reveal */}
        <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tightest sm:text-6xl md:text-7xl lg:text-8xl">
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-baseline">
              <motion.span
                custom={i}
                variants={lineReveal}
                initial="hidden"
                animate="show"
                className="mr-[0.22em] inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: headlineWords.length * 0.06 + 0.1 }}
            className="text-accent"
          >
            .
          </motion.span>
        </h1>

        {/* subhead */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease }}
          className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-muted"
        >
          {profile.subhead}
        </motion.p>

        {/* status + actions */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <StatusPill label={profile.status.label} detail={profile.status.detail} />
          <MagneticButton onClick={onOpenPalette} variant="ghost">
            <span className="text-muted">Press</span>
            <kbd className="kbd">⌘</kbd>
            <kbd className="kbd">K</kbd>
            <span className="text-muted">to explore</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* marquee pinned toward bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="relative z-10 mx-auto mt-20 w-full max-w-content"
      >
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
          Currently in my toolbox
        </div>
        <Marquee items={marqueeTech} />
      </motion.div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollToSection("how-i-think")}
        aria-label="Scroll to next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative z-10 mx-auto mt-12 flex items-center gap-2 text-xs text-muted transition-colors hover:text-text"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
        Scroll to explore
      </motion.button>
    </section>
  );
}
