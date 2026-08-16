import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowUpRight } from "lucide-react";
import { PageBackdrop } from "@/components/graphics/PageBackdrop";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeUp } from "@/lib/motion";

const quickLinks = [
  { label: "Case Studies", to: "/work" },
  { label: "Engineering Notes", to: "/notes" },
];

export function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <PageBackdrop label="404" />
      <main className="relative z-10 mx-auto flex min-h-svh w-full max-w-content flex-col items-center justify-center px-6 py-28 text-center sm:px-8">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="section-label"
        >
          Error · 404
        </motion.span>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.05 }}
          className="mt-4 font-semibold leading-none tracking-tightest text-text"
          style={{ fontSize: "clamp(4.5rem, 22vw, 12rem)" }}
        >
          4<span className="text-accent">0</span>4
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1 }}
          className="mt-4 text-h2 font-semibold tracking-tight text-text"
        >
          This page took a wrong turn.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.15 }}
          className="mt-4 max-w-md text-lead text-muted"
        >
          The link is broken or the page never existed. Let's get you back to
          something real.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton onClick={() => navigate("/")} variant="solid">
            <Home className="h-4 w-4" />
            Back home
          </MagneticButton>

          {quickLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-4 py-2.5 text-sm text-muted transition-colors duration-300 hover:border-accent/40 hover:text-text"
            >
              {l.label}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </motion.div>
      </main>
    </>
  );
}
