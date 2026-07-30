import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { CaseStudy } from "@/sections/CaseStudy";

export function WorkDetail() {
  const { id } = useParams();
  const idx = projects.findIndex((p) => p.id === id);

  if (idx === -1) return <Navigate to="/work" replace />;

  const project = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="relative z-10 mx-auto w-full max-w-content px-6 pb-24 pt-28 sm:px-8 md:pt-32">
      <Link
        to="/work"
        className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        All case studies
      </Link>

      <CaseStudy project={project} index={idx} />

      {/* next project */}
      {next.id !== project.id && (
        <Link
          to={`/work/${next.id}`}
          className="group mt-8 flex items-center justify-between rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-accent/40"
        >
          <span>
            <span className="font-mono text-xs text-muted">Next case study</span>
            <span className="mt-1 block text-xl font-semibold text-text">
              {next.name}
            </span>
          </span>
          <ArrowRight className="h-5 w-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      )}
    </main>
  );
}
