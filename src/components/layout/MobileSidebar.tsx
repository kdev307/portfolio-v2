import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Search,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Layers,
  FileText,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { sections } from "@/lib/sections";
import { useSectionNav } from "@/lib/nav";
import { profile, resumeHref } from "@/data/profile";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  onOpenPalette: () => void;
}

const socialIcon: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

const ease = [0.22, 1, 0.36, 1] as const;

export function MobileSidebar({
  open,
  onClose,
  onOpenPalette,
}: MobileSidebarProps) {
  const goSection = useSectionNav();

  const go = (id: string) => {
    onClose();
    goSection(id);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[65] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease }}
            className="absolute right-0 top-0 flex h-full w-[82vw] max-w-[340px] flex-col border-l border-border bg-surface/95 backdrop-blur-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:text-text"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
              {/* search */}
              <button
                onClick={() => {
                  onClose();
                  onOpenPalette();
                }}
                className="mb-6 flex w-full items-center gap-3 rounded-xl border border-border bg-elevated px-4 py-3 text-left text-sm text-muted transition-colors hover:border-accent/40 hover:text-text"
              >
                <Search className="h-4 w-4" />
                <span className="flex-1">Search everything…</span>
                <span className="flex items-center gap-0.5">
                  <kbd className="kbd">⌘</kbd>
                  <kbd className="kbd">K</kbd>
                </span>
              </button>

              {/* explore (sections) */}
              <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted/60">
                Explore
              </p>
              <nav className="mb-6 flex flex-col" aria-label="Sections">
                {sections.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => go(s.id)}
                      className="group flex items-center gap-3 rounded-lg px-2 py-2.5 text-left text-[15px] text-muted transition-colors hover:bg-white/5 hover:text-text"
                    >
                      <Icon
                        className="h-[18px] w-[18px] text-muted/70 group-hover:text-accent"
                        strokeWidth={1.75}
                      />
                      {s.label}
                    </button>
                  );
                })}
              </nav>

              {/* pages (routes) */}
              <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted/60">
                Pages
              </p>
              <nav className="flex flex-col" aria-label="Pages">
                <Link
                  to="/work"
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-lg px-2 py-2.5 text-[15px] text-muted transition-colors hover:bg-white/5 hover:text-text"
                >
                  <Layers
                    className="h-[18px] w-[18px] text-muted/70 group-hover:text-accent"
                    strokeWidth={1.75}
                  />
                  All case studies
                </Link>
                <Link
                  to="/notes"
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-lg px-2 py-2.5 text-[15px] text-muted transition-colors hover:bg-white/5 hover:text-text"
                >
                  <FileText
                    className="h-[18px] w-[18px] text-muted/70 group-hover:text-accent"
                    strokeWidth={1.75}
                  />
                  All notes
                </Link>
              </nav>
            </div>

            {/* socials footer */}
            <div className="border-t border-border px-5 py-4">
              <div className="flex flex-wrap gap-2">
                {profile.socials.map((s) => {
                  const Icon = socialIcon[s.label] ?? Globe;
                  const isMail = s.label === "Email";
                  const href = isMail ? `mailto:${profile.email}` : s.href;
                  return (
                    <a
                      key={s.label}
                      href={href}
                      target={isMail ? undefined : "_blank"}
                      rel={isMail ? undefined : "noopener noreferrer"}
                      aria-label={s.label}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </a>
                  );
                })}
              </div>
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-accent/30 bg-accent/10 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/15"
              >
                Résumé
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
