import { Command } from "lucide-react";
import { motion } from "framer-motion";
import { sections, scrollToSection } from "@/lib/sections";
import { useScrollSpy } from "@/hooks/useScrollSpy";

interface FloatingDockProps {
  onOpenPalette: () => void;
}

export function FloatingDock({ onOpenPalette }: FloatingDockProps) {
  const dockItems = sections.filter((s) => s.dock);
  const active = useScrollSpy(sections.map((s) => s.id));

  return (
    <motion.nav
      aria-label="Section navigation"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 md:block"
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-surface/80 p-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/5"
            >
              {isActive && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-inset ring-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon
                className={`relative h-[18px] w-[18px] transition-colors duration-200 ${
                  isActive ? "text-text" : "text-muted group-hover:text-text"
                }`}
                strokeWidth={1.75}
              />
              <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-[11px] text-text opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {item.label}
              </span>
            </button>
          );
        })}

        <span className="mx-1 h-5 w-px bg-border" />

        <button
          onClick={onOpenPalette}
          aria-label="Open command palette"
          className="group flex h-9 items-center gap-1.5 rounded-full px-2.5 transition-colors duration-200 hover:bg-white/5"
        >
          <Command
            className="h-[18px] w-[18px] text-muted group-hover:text-text"
            strokeWidth={1.75}
          />
          <span className="kbd hidden sm:inline-flex">K</span>
        </button>
      </div>
    </motion.nav>
  );
}
