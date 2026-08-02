import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { NotePreview } from "@/components/previews/NotePreview";
import { ShimmerReveal } from "@/components/ui/ShimmerReveal";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { notes } from "@/data/notes";

export function Notes() {
  // Home shows the most recent few; the full set lives at /notes.
  const preview = notes.slice(0, 3);

  return (
    <Section
      id="notes"
      index="04"
      label="Engineering Notes"
      title="Things I've worked out by writing them down."
    >
      <p className="-mt-6 mb-10 max-w-2xl leading-relaxed text-muted">
        Written like internal documentation — short, opinionated, meant to be
        reread.
      </p>

      <ShimmerReveal
        skeleton={<ListSkeleton rows={preview.length} variant="note" />}
      >
        <div>
          {preview.map((note, i) => (
            <Reveal key={note.id} delay={i * 0.04}>
              <NotePreview note={note} index={i} />
            </Reveal>
          ))}
        </div>
      </ShimmerReveal>

      <Reveal delay={0.1}>
        <Link
          to="/notes"
          className="group mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
        >
          Read all notes
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </Section>
  );
}
