import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { notes } from "@/data/notes";
import { PageBackdrop } from "@/components/graphics/PageBackdrop";
import { ShimmerReveal } from "@/components/ui/ShimmerReveal";
import { NoteDetailSkeleton } from "@/components/ui/Skeleton";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function NoteDetail() {
  const { id } = useParams();
  const idx = notes.findIndex((n) => n.id === id);

  if (idx === -1) return <Navigate to="/notes" replace />;

  const note = notes[idx];
  const next = notes[(idx + 1) % notes.length];

  return (
    <>
    <PageBackdrop label="NOTES" />
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 pt-28 sm:px-8 md:pt-32">
      <Link
        to="/notes"
        className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        All notes
      </Link>

      <ShimmerReveal skeleton={<NoteDetailSkeleton />}>
      <motion.article
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-10"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-accent/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
            {note.category}
          </span>
          <span className="font-mono text-xs text-muted">
            {note.readingTime} read
          </span>
        </div>

        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tightest sm:text-5xl">
          {note.title}
        </h1>

        <p className="mt-8 text-lg leading-relaxed text-muted">{note.summary}</p>

        <div className="mt-12 hairline pt-8">
          <h2 className="section-label mb-5">Key takeaways</h2>
          <motion.ul
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-4"
          >
            {note.takeaways.map((t) => (
              <motion.li
                key={t}
                variants={fadeUp}
                className="flex gap-4 rounded-xl border border-border bg-surface/40 p-4 leading-relaxed text-muted"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{t}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.article>
      </ShimmerReveal>

      {next.id !== note.id && (
        <Link
          to={`/notes/${next.id}`}
          className="group mt-14 flex items-center justify-between rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-accent/40"
        >
          <span>
            <span className="font-mono text-xs text-muted">Next note</span>
            <span className="mt-1 block text-lg font-semibold text-text">
              {next.title}
            </span>
          </span>
          <ArrowRight className="h-5 w-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      )}
    </main>
    </>
  );
}
