import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

/**
 * Brief case-study entry for index / home list. Links to the detail route.
 */
export function ProjectPreview({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      to={`/work/${project.id}`}
      className="group relative block border-b border-border py-8 transition-colors first:border-t"
    >
      {/* hover wash */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8">
        <span className="font-mono text-xs text-muted/50 md:w-10">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="rounded-full border border-accent/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
              {project.kind}
            </span>
            <span className="font-mono text-xs text-muted">{project.year}</span>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-text transition-colors sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-1.5 max-w-xl text-muted">{project.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded border border-border bg-surface/50 px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <span className="hidden items-center gap-2 text-sm text-muted transition-colors group-hover:text-text md:flex">
          Read
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
