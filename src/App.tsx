import { Suspense, lazy, useCallback, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { Spotlight } from "@/components/background/Spotlight";
import { FloatingDock } from "@/components/layout/FloatingDock";
import { CommandPalette } from "@/components/command/CommandPalette";
import { ShortcutsDialog } from "@/components/command/ShortcutsDialog";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useSectionNav } from "@/lib/nav";

import { Home } from "@/pages/Home";
import { WorkIndex } from "@/pages/WorkIndex";
import { WorkDetail } from "@/pages/WorkDetail";
import { NotesIndex } from "@/pages/NotesIndex";
import { NoteDetail } from "@/pages/NoteDetail";

// Three.js is heavy — load it after first paint so it never blocks content.
const ThreeBackground = lazy(() =>
  import("@/components/background/ThreeBackground").then((m) => ({
    default: m.ThreeBackground,
  }))
);

function Chrome() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const goSection = useSectionNav();

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const showShortcuts = useCallback(() => {
    setPaletteOpen(false);
    setShortcutsOpen(true);
  }, []);

  useKeyboardShortcuts({
    onCommandPalette: () => setPaletteOpen((o) => !o),
    onGoHome: () => goSection("landing"),
    onGoProjects: () => goSection("case-studies"),
    onGoContact: () => goSection("contact"),
    onHelp: () => setShortcutsOpen((o) => !o),
  });

  return (
    <>
      {/* ambient layers */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>
      <Spotlight />
      <div className="grain" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(190,242,100,0.05),transparent_60%)]"
      />

      <ScrollProgress />
      <ScrollManager />
      <Header onOpenPalette={openPalette} />

      {/* skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:border focus:border-border focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <div id="main">
        <Routes>
          <Route path="/" element={<Home onOpenPalette={openPalette} />} />
          <Route path="/work" element={<WorkIndex />} />
          <Route path="/work/:id" element={<WorkDetail />} />
          <Route path="/notes" element={<NotesIndex />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {isHome && <FloatingDock onOpenPalette={openPalette} />}

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onShowShortcuts={showShortcuts}
      />
      <ShortcutsDialog
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Chrome />
    </BrowserRouter>
  );
}
