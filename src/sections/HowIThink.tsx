import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { MiniTerminal } from "@/components/command/MiniTerminal";
import { principles } from "@/data/profile";
import { fadeUp, viewportOnce } from "@/lib/motion";

const accentText: Record<string, string> = {
  blue: "text-accent",
  green: "text-accent",
  orange: "text-accent",
};

export function HowIThink() {
  return (
    <Section
      id="how-i-think"
      index="01"
      label="How I Think"
      title="I want to know why a system behaves the way it does."
    >
      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* principles */}
        <motion.ol
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-10"
        >
          {principles.map((p, i) => (
            <motion.li key={p.title} variants={fadeUp} className="group">
              <div className="flex items-baseline gap-4">
                <span
                  className={`font-mono text-sm ${accentText[p.accent]} opacity-80`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-text">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-md leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        {/* interactive terminal */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-sm text-muted">
            Or skip the prose — poke around directly.
          </p>
          <MiniTerminal />
          <p className="mt-4 font-mono text-xs text-muted/60">
            hint: try <span className="text-muted">whoami</span> or{" "}
            <span className="text-muted">projects</span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
