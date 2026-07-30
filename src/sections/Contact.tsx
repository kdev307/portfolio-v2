import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Code2, Brain, Code, FileCode } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeUp, viewportOnce } from "@/lib/motion";

const iconFor: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
  LeetCode: Brain,
  GeeksForGeeks: Code,
  Hackerrank: Code2,
  CodePen: FileCode

};

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-content scroll-mt-24 px-6 py-28 sm:px-8 md:py-36"
    >
      <div className="mb-10 flex items-center gap-3">
        <span className="font-mono text-xs text-muted/70">07</span>
        <span className="section-label">Contact</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="max-w-3xl text-balance text-4xl font-semibold tracking-tightest sm:text-5xl md:text-6xl"
      >
        Let's build something{" "}
        <span className="text-accent">worth maintaining.</span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        transition={{ delay: 0.1 }}
        className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
      >
        Open to conversations about frontend architecture, performance, and
        building thoughtful products. The fastest way to reach me is email.
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        transition={{ delay: 0.2 }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <MagneticButton href={`mailto:${profile.email}`} variant="solid">
          <Mail className="h-4 w-4" />
          {profile.email}
        </MagneticButton>
        <MagneticButton href={profile.resumeHref} variant="outline">
          Résumé
          <ArrowUpRight className="h-4 w-4" />
        </MagneticButton>
      </motion.div>

      {/* social rows */}
      <div className="mt-16 border-t border-border">
        {profile.socials.map((s, i) => {
          const Icon = iconFor[s.label] ?? Mail;
          return (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ delay: i * 0.06 }}
              className="group flex items-center justify-between border-b border-border py-5 transition-colors hover:bg-white/[0.02]"
            >
              <span className="flex items-center gap-4">
                <Icon
                  className="h-5 w-5 text-muted transition-colors group-hover:text-text"
                  strokeWidth={1.75}
                />
                <span className="text-lg text-text">{s.label}</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="hidden font-mono text-sm text-muted sm:inline">
                  {s.handle}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text" />
              </span>
            </motion.a>
          );
        })}
      </div>

      <footer className="mt-16 flex flex-col items-start justify-between gap-4 text-sm text-muted sm:flex-row sm:items-center">
        <span>
          © {profile.name}. Built with React, Three.js & Framer Motion.
        </span>
        <span className="font-mono text-xs text-muted/60">
          Designed & engineered end to end.
        </span>
      </footer>
    </section>
  );
}
