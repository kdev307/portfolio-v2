import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectPreview } from "@/components/previews/ProjectPreview";
import { fadeUp } from "@/lib/motion";

export function WorkIndex() {
  return (
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
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tightest sm:text-5xl md:text-6xl">
          Everything I've built, in depth.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Each entry is an article — problem, architecture, the decisions that
          mattered, and what I'd do next.
        </p>
      </motion.header>

      <div className="mt-14">
        {projects.map((p, i) => (
          <ProjectPreview key={p.id} project={p} index={i} />
        ))}
      </div>
    </main>
  );
}
