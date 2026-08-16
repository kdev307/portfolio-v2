import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github, Codepen } from "lucide-react";
import { motion } from "framer-motion";
import { visibleProjects as projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { ProjectPreview } from "@/components/previews/ProjectPreview";
import { PageBackdrop } from "@/components/graphics/PageBackdrop";
import { ShimmerReveal } from "@/components/ui/ShimmerReveal";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { fadeUp } from "@/lib/motion";

const findSocial = (label: string) =>
    profile.socials.find((s) => s.label === label)?.href ?? "#";

export function WorkIndex() {
    return (
        <>
            <PageBackdrop label="WORK" />
            <main className="relative z-10 mx-auto min-h-svh w-full max-w-content px-6 pb-32 pt-28 sm:px-8 md:pt-32">
                <Link
                    to="/"
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Home
                </Link>

                <motion.header
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="mt-8 max-w-3xl"
                >
                    <span className="section-label">Case Studies</span>
                    <h1 className="mt-4 text-balance text-h1 font-semibold tracking-tightest">
                        Selected work, in depth.
                    </h1>
                    <p className="mt-5 max-w-xl text-lead text-muted">
                        The projects worth the long read — problem,
                        architecture, the decisions that mattered, and what I'd
                        do next. The rest lives on GitHub and CodePen.
                    </p>
                </motion.header>

                <ShimmerReveal
                    className="mt-14"
                    skeleton={
                        <ListSkeleton
                            rows={projects.length}
                            variant="project"
                        />
                    }
                >
                    <div>
                        {projects.map((p, i) => (
                            <ProjectPreview key={p.id} project={p} index={i} />
                        ))}
                    </div>
                </ShimmerReveal>

                {/* the long tail lives elsewhere */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mt-16 flex flex-col gap-5 rounded-2xl border border-border bg-surface/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
                >
                    <div>
                        <h2 className="text-lg font-medium text-text">
                            Not everything makes the case-study cut.
                        </h2>
                        <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
                            Experiments, smaller builds, and UI pens live on
                            GitHub and CodePen. Have a dig around.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href={findSocial("GitHub")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2.5 text-sm text-muted transition-colors duration-300 hover:border-accent/40 hover:text-text"
                        >
                            <Github className="h-4 w-4" strokeWidth={1.75} />
                            GitHub
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                        <a
                            href={findSocial("CodePen")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2.5 text-sm text-muted transition-colors duration-300 hover:border-accent/40 hover:text-text"
                        >
                            <Codepen className="h-4 w-4" strokeWidth={1.75} />
                            CodePen
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </motion.div>
            </main>
        </>
    );
}
