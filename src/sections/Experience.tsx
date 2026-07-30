import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { experience } from "@/data/profile";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="Experience"
      title="Where I'm building right now."
    >
      <div className="relative">
        {/* timeline rail */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-border via-border to-transparent md:left-[calc(9rem+7px)]" />

        {experience.map((job) => (
          <motion.article
            key={job.company}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative grid gap-x-8 gap-y-4 pl-8 md:grid-cols-[9rem_1fr] md:pl-0"
          >
            {/* node marker */}
            <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center md:left-36">
              <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/40" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg" />
            </span>

            {/* period */}
            <div className="md:pr-8 md:text-right">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-xs text-accent">
                {job.period}
              </span>
            </div>

            {/* body */}
            <div className="md:pl-4">
              <h3 className="text-2xl font-semibold tracking-tight text-text">
                {job.role}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-muted">
                <span className="text-text">{job.company}</span>
              </p>

              <p className="mt-5 max-w-2xl leading-relaxed text-muted">
                {job.summary}
              </p>

              <motion.ul
                variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="mt-6 space-y-3"
              >
                {job.highlights.map((h) => (
                  <motion.li
                    key={h}
                    variants={fadeUp}
                    className="flex gap-3 text-[15px] leading-relaxed text-muted"
                  >
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span>{h}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-surface/50 px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
