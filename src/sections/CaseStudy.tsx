import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/layout/Reveal";
import { ease } from "@/lib/motion";

const accentText: Record<string, string> = {
  blue: "text-accent",
  green: "text-accent",
  orange: "text-accent",
};
const accentBorder: Record<string, string> = {
  blue: "border-accent/30",
  green: "border-accent/30",
  orange: "border-accent/30",
};
const accentGlow: Record<string, string> = {
  blue: "from-accent/[0.07]",
  green: "from-accent/[0.07]",
  orange: "from-accent/[0.07]",
};

export function CaseStudy({ project, index }: { project: Project; index: number }) {
  // First section open by default; the rest reveal on demand.
  const [open, setOpen] = useState<number>(0);

  return (
    <article className="relative border-t border-border py-16 first:border-t-0 md:py-20">
      {/* index watermark */}
      <span className="pointer-events-none absolute right-0 top-10 select-none font-mono text-6xl font-semibold text-white/[0.03] md:text-8xl">
        {String(index + 1).padStart(2, "0")}
      </span>

      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center rounded-full border ${accentBorder[project.accent]} px-3 py-1 font-mono text-xs ${accentText[project.accent]}`}
          >
            {project.kind}
          </span>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>

        <h3 className="mt-5 text-4xl font-semibold tracking-tightest text-text md:text-5xl">
          {project.name}
        </h3>
        <p className="mt-3 max-w-2xl text-lg text-muted">{project.tagline}</p>
        <p className="mt-6 max-w-3xl leading-relaxed text-muted">
          {project.summary}
        </p>
      </Reveal>

      {/* visual frame */}
      <Reveal delay={0.05}>
        <div
          className={`relative mt-10 overflow-hidden rounded-xl border border-border bg-gradient-to-br ${accentGlow[project.accent]} to-transparent`}
        >
          <div className="flex items-center gap-1.5 border-b border-border bg-surface/60 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 font-mono text-[11px] text-muted">
              {project.id}
            </span>
          </div>
          <div className="flex h-56 items-center justify-center md:h-72">
            <div className="text-center">
              <div
                className={`font-mono text-sm ${accentText[project.accent]}`}
              >
                {project.name}
              </div>
              <div className="mt-1 text-xs text-muted/60">
                visual — drop a capture at /public/{project.id}.png
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* metrics */}
      <Reveal delay={0.1}>
        <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-surface/60 p-5">
              <dt
                className={`text-3xl font-semibold tracking-tight ${accentText[project.accent]}`}
              >
                {m.value}
              </dt>
              <dd className="mt-1.5 text-sm leading-snug text-muted">
                {m.label}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* expandable sections */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_16rem]">
        <div className="divide-y divide-border border-y border-border">
          {project.sections.map((s, i) => {
            const isOpen = open === i;
            return (
              <div key={s.heading}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-lg font-medium transition-colors ${
                        isOpen ? "text-text" : "text-muted group-hover:text-text"
                      }`}
                    >
                      {s.heading}
                    </span>
                  </span>
                  <Plus
                    className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-text" : "group-hover:text-text"
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-10 pr-2">
                        <p className="max-w-2xl leading-relaxed text-muted">
                          {s.body}
                        </p>
                        {s.bullets && (
                          <ul className="mt-4 space-y-2">
                            {s.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex gap-3 text-[15px] leading-relaxed text-muted"
                              >
                                <span
                                  className={`mt-2 h-1 w-1 shrink-0 rounded-full ${accentText[project.accent]} bg-current`}
                                />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* aside: stack + future */}
        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div>
            <h4 className="section-label mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-border bg-surface/50 px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="section-label mb-3">Future Improvements</h4>
            <ul className="space-y-3">
              {project.future.map((f) => (
                <li
                  key={f}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted"
                >
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted/60" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
