import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { CursorCard } from "@/components/ui/CursorCard";
import { achievements } from "@/data/profile";

const accents = ["blue", "green", "orange", "blue"] as const;

export function Achievements() {
  return (
    <Section
      id="achievements"
      index="06"
      label="Beyond the Code"
      title="What I do around the work."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.label} delay={i * 0.05}>
            <CursorCard accent={accents[i % accents.length]} className="h-full">
              <div className="p-6">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-muted/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-medium text-text">{a.label}</h3>
                </div>
                <p className="mt-3 leading-relaxed text-muted">{a.detail}</p>
              </div>
            </CursorCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
