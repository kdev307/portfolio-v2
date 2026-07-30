import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ShortcutsDialogProps {
  open: boolean;
  onClose: () => void;
}

const shortcuts: { keys: string[]; label: string }[] = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["G"], label: "Go home" },
  { keys: ["P"], label: "Jump to case studies" },
  { keys: ["C"], label: "Jump to contact" },
  { keys: ["?"], label: "Show this help" },
  { keys: ["Esc"], label: "Close any overlay" },
];

export function ShortcutsDialog({ open, onClose }: ShortcutsDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
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
            aria-label="Keyboard shortcuts"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text">
                Keyboard shortcuts
              </h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-md p-1 text-muted transition-colors hover:text-text"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-2.5">
              {shortcuts.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted">{s.label}</span>
                  <span className="flex items-center gap-1">
                    {s.keys.map((k) => (
                      <kbd key={k} className="kbd">
                        {k}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
