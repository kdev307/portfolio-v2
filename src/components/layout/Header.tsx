import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Command, Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

interface HeaderProps {
  onOpenPalette: () => void;
}

export function Header({ onOpenPalette }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => setMenuOpen(false), [location.pathname]);

  // Close the drawer on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[backdrop-filter] duration-300 ${
          scrolled ? "backdrop-blur-xl" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 sm:px-8">
          <Link
            to="/"
            aria-label="Home"
            className="group -ml-1 rounded-lg p-1 transition-opacity hover:opacity-90"
          >
            <Logo />
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPalette}
              aria-label="Open command palette"
              className="group flex items-center gap-2 rounded-full border border-border bg-surface/60 py-1.5 pl-3 pr-1.5 text-sm text-muted transition-colors hover:border-muted/50 hover:text-text"
            >
              <Command className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="hidden sm:inline">Search</span>
              <span className="flex items-center gap-0.5">
                <kbd className="kbd">⌘</kbd>
                <kbd className="kbd">K</kbd>
              </span>
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface/60 text-muted transition-colors hover:text-text md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <MobileSidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenPalette={onOpenPalette}
      />
    </>
  );
}
