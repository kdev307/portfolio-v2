import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { marqueeTech } from "@/data/exploring";
import { StatusPill } from "@/components/ui/StatusPill";
import { Marquee } from "@/components/ui/Marquee";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { lineReveal, ease } from "@/lib/motion";
import { scrollToSection } from "@/lib/sections";

interface LandingProps {
  onOpenPalette: () => void;
}

const headlineWords = profile.headline.replace(".", "").split(" ");

export function Landing({ onOpenPalette }: LandingProps) {
  return (
    <section
      id="landing"
      className="relative flex min-h-svh flex-col justify-center px-6 pb-16 pt-28 sm:px-8"
    >
      <div className="mx-auto w-full max-w-content">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="font-mono text-xs text-muted">
            {profile.role} · {profile.company}
          </span>
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
        className="mx-auto mt-20 w-full max-w-content"
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
        className="mx-auto mt-12 flex items-center gap-2 text-xs text-muted transition-colors hover:text-text"
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
