import { useEffect } from "react";

export interface ShortcutHandlers {
  onCommandPalette: () => void;
  onGoHome: () => void;
  onGoProjects: () => void;
  onGoContact: () => void;
  onHelp: () => void;
}

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
}

/**
 * Global keyboard shortcuts.
 * Cmd/Ctrl+K → command palette. Single keys (g/p/c/?) → navigation & help.
 * Single-key shortcuts are ignored while typing or with modifiers held.
 */
export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;

      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        handlers.onCommandPalette();
        return;
      }

      if (meta || e.altKey || isTypingTarget(e.target)) return;

      switch (e.key.toLowerCase()) {
        case "g":
          handlers.onGoHome();
          break;
        case "p":
          handlers.onGoProjects();
          break;
        case "c":
          handlers.onGoContact();
          break;
        case "?":
          handlers.onHelp();
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlers]);
}
