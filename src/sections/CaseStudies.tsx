import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { ProjectPreview } from "@/components/previews/ProjectPreview";
import { ShimmerReveal } from "@/components/ui/ShimmerReveal";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { visibleProjects as projects } from "@/data/projects";

export function CaseStudies() {
  return (
    <Section
      id="case-studies"
      index="03"
      label="Case Studies"
      title="Products, read as engineering stories."
    >
      <p className="-mt-6 mb-10 max-w-2xl leading-relaxed text-muted">
        Not a gallery of screenshots — the decisions behind each build. Open one
        to read the full story.
      </p>

      <ShimmerReveal
        skeleton={<ListSkeleton rows={projects.length} variant="project" />}
      >
        <div>
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <ProjectPreview project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </ShimmerReveal>

      <Reveal delay={0.1}>
        <Link
          to="/work"
          className="group mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
        >
          View all case studies
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </Section>
  );
}
