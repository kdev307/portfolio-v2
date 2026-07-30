import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { exploring } from "@/data/exploring";

// Monochrome + lime: intensity encodes stage, not hue.
const stageColor: Record<string, string> = {
  Now: "text-accent border-accent/40 bg-accent/[0.06]",
  Next: "text-text border-border bg-white/[0.04]",
  Curious: "text-muted border-border bg-transparent",
};
const dotColor: Record<string, string> = {
  Now: "bg-accent",
  Next: "bg-text",
  Curious: "bg-muted",
};

export function Exploring() {
  return (
    <Section
      id="exploring"
      index="05"
      label="Currently Exploring"
      title="The roadmap in my head, right now."
    >
      <p className="-mt-6 mb-12 max-w-2xl leading-relaxed text-muted">
        What I'm actively learning, what's queued, and what I'm just curious
        about. Hover an item to expand it.
      </p>

      <div className="relative">
        {/* roadmap rail */}
        <div className="absolute left-[5px] top-3 bottom-3 w-px bg-gradient-to-b from-accent/50 via-border to-transparent" />

        <ul className="space-y-3">
          {exploring.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.05}>
              <div className="group relative pl-8">
                {/* node */}
                <span
                  className={`absolute left-0 top-4 h-[11px] w-[11px] rounded-full ring-4 ring-bg transition-transform duration-300 group-hover:scale-125 ${dotColor[item.stage]}`}
                />

                <div className="rounded-xl border border-border bg-surface/40 px-5 py-4 transition-colors duration-300 group-hover:border-muted/40 group-focus-within:border-muted/40">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-medium text-text">
                      {item.title}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${stageColor[item.stage]}`}
                    >
                      {item.stage}
                    </span>
                  </div>

                  {/* hover / focus expand via grid-rows */}
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] motion-reduce:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="pt-3 leading-relaxed text-muted">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
