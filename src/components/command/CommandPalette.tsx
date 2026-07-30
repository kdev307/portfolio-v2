import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, CornerDownLeft } from "lucide-react";
import { buildCommands, type CommandItem } from "./commands";
import { useSectionNav } from "@/lib/nav";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onShowShortcuts: () => void;
}

export function CommandPalette({
  open,
  onClose,
  onShowShortcuts,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const goSection = useSectionNav();

  const commands = useMemo(
    () => buildCommands({ onShowShortcuts, goSection, goTo: navigate }),
    [onShowShortcuts, goSection, navigate]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.title} ${c.hint ?? ""} ${c.keywords}`.toLowerCase().includes(q)
    );
  }, [query, commands]);

  // Group results while preserving order.
  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    results.forEach((c) => {
      const arr = map.get(c.group) ?? [];
      arr.push(c);
      map.set(c.group, arr);
    });
    return Array.from(map.entries());
  }, [results]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const runActive = () => {
    const item = results[active];
    if (item) {
      onClose();
      item.run();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runActive();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  // Keep the active row scrolled into view.
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted" strokeWidth={2} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, projects, actions…"
                aria-label="Search commands"
                className="h-14 w-full bg-transparent text-[15px] text-text outline-none placeholder:text-muted"
              />
              <kbd className="kbd">esc</kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted">
                  No results for “{query}”
                </p>
              )}

              {groups.map(([group, items]) => (
                <div key={group} className="mb-1">
                  <div className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70">
                    {group}
                  </div>
                  {items.map((item) => {
                    const idx = results.indexOf(item);
                    const isActive = idx === active;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        data-index={idx}
                        onMouseMove={() => setActive(idx)}
                        onClick={runActive}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                          isActive ? "bg-white/8" : "hover:bg-white/5"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 shrink-0 ${
                            isActive ? "text-text" : "text-muted"
                          }`}
                          strokeWidth={1.75}
                        />
                        <span className="flex-1 truncate text-sm text-text">
                          {item.title}
                        </span>
                        {item.hint && (
                          <span className="truncate font-mono text-xs text-muted">
                            {item.hint}
                          </span>
                        )}
                        {isActive && (
                          <CornerDownLeft className="h-3.5 w-3.5 text-muted" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="kbd">↑</kbd>
                  <kbd className="kbd">↓</kbd> navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="kbd">↵</kbd> select
                </span>
              </div>
              <span className="font-mono">Dev · portfolio</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
