import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
// import { useSectionNav } from "@/lib/nav";

interface HeaderProps {
  onOpenPalette: () => void;
}

// interface NavLink {
//   label: string;
//   type: "route" | "section";
//   to: string;
// }

// const links: NavLink[] = [
//   { label: "Work", type: "route", to: "/work" },
//   { label: "Notes", type: "route", to: "/notes" },
//   { label: "Exploring", type: "section", to: "exploring" },
//   { label: "Contact", type: "section", to: "contact" },
// ];

export function Header({ onOpenPalette }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const goSection = useSectionNav();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [location.pathname]);

  // const renderLink = (link: NavLink, onClick?: () => void) => {
  //   const cls =
  //     "text-sm text-muted transition-colors duration-200 hover:text-text";
  //   if (link.type === "route") {
  //     return (
  //       <Link key={link.label} to={link.to} onClick={onClick} className={cls}>
  //         {link.label}
  //       </Link>
  //     );
  //   }
  //   return (
  //     <button
  //       key={link.label}
  //       onClick={() => {
  //         goSection(link.to);
  //         onClick?.();
  //       }}
  //       className={cls}
  //     >
  //       {link.label}
  //     </button>
  //   );
  // };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 border-b border-transparent ${
          scrolled
            && "backdrop-blur-xl"
            
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

          {/* <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((l) => renderLink(l))}
          </nav> */}

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPalette}
              aria-label="Open command palette"
              className="group hidden items-center gap-2 rounded-full border border-border bg-surface/60 py-1.5 pl-3 pr-1.5 text-sm text-muted transition-colors hover:border-muted/50 hover:text-text sm:flex"
            >
              <Command className="h-3.5 w-3.5" strokeWidth={2} />
              <span>Search</span>
              <span className="flex items-center gap-0.5">
                <kbd className="kbd">⌘</kbd>
                <kbd className="kbd">K</kbd>
              </span>
            </button>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface/60 text-muted transition-colors hover:text-text md:hidden"
            >
              {menuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Mobile"
              className="absolute inset-x-3 top-20 rounded-2xl border border-border bg-surface/95 p-3 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex flex-col">
                {/* {links.map((l) => (
                  <div
                    key={l.label}
                    className="border-b border-border/60 py-3 last:border-b-0"
                  >
                    <span className="text-base [&>*]:!text-base [&>*]:!text-text">
                      {renderLink(l, () => setMenuOpen(false))}
                    </span>
                  </div>
                ))} */}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenPalette();
                  }}
                  className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-border bg-elevated py-2.5 text-sm text-text"
                >
                  <Command className="h-4 w-4" /> Command palette
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
