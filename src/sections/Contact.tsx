import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Code2, Brain, Code, FileCode } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile, resumeHref } from "@/data/profile";
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
        className="max-w-3xl text-balance text-h1 font-semibold tracking-tightest"
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
        className="mt-6 max-w-xl text-lead text-muted"
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
        <MagneticButton href={resumeHref} variant="outline">
          Résumé
          <ArrowUpRight className="h-4 w-4" />
        </MagneticButton>
      </motion.div>

      {/* elsewhere — compact tile grid */}
      <div className="mt-16">
        <div className="mb-5 flex items-center gap-3">
          <span className="section-label">Find me elsewhere</span>
          <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {profile.socials.map((s) => {
            const Icon = iconFor[s.label] ?? Mail;
            const isExternal = s.href.startsWith("http");
            const href =
              s.label === "Email" ? `mailto:${profile.email}` : s.href;
            return (
              <motion.a
                key={s.label}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                variants={fadeUp}
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface/40 px-4 py-3 transition-colors duration-300 hover:border-accent/40 hover:bg-surface"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-bg text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-text">
                    {s.label}
                  </span>
                  <span className="block truncate font-mono text-[11px] text-muted">
                    {s.handle}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </motion.a>
            );
          })}
        </motion.div>
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
