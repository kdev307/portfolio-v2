import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Linkedin } from "lucide-react";
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
        key={note.id}
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

        <h1 className="mt-5 text-balance text-h1 font-semibold tracking-tightest">
          {note.title}
        </h1>

        <p className="mt-8 text-lead text-muted">{note.summary}</p>

        <div className="mt-12 hairline pt-8">
          <h2 className="section-label mb-5">Key takeaways</h2>
          <motion.ul
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="show"
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

        {/* Read-on-LinkedIn CTA — only for notes published as a LinkedIn post */}
        {note.linkedinUrl && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-12 flex flex-col gap-4 rounded-2xl border border-border bg-surface/40 p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent/[0.06] text-accent">
                <Linkedin className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <h2 className="text-lg font-medium text-text">
                  Read the detailed note on LinkedIn
                </h2>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
                  This note started as a LinkedIn post — the full write-up, with
                  the carousel and discussion, lives there.
                </p>
              </div>
            </div>
            <a
              href={note.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/40 bg-accent/[0.06] px-4 py-2.5 text-sm font-medium text-accent transition-colors duration-300 hover:bg-accent/[0.12]"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.75} />
              Read on LinkedIn
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        )}
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
