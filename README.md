# Dev — Portfolio

A portfolio built to feel like a product, not a résumé. Dark, editorial, interaction-first.

Stack: **Vite + React + TypeScript + TailwindCSS + Framer Motion + Three.js**.

## Run

Requires **Node 18+** (Vite 5). If `npm run dev` throws `crypto.getRandomValues is not a function`, your shell is on an old Node — run `nvm use 22` first.

```bash
npm install
npm run dev      # dev server
npm run build    # typecheck + production build → dist/
npm run preview  # serve the production build
```

## Routes

| Path | Page |
|------|------|
| `/` | Home — single-scroll story (Landing → Contact) |
| `/work` | All case studies (index) |
| `/work/:id` | Full case-study article (`connect-4`, `woody`) |
| `/notes` | All engineering notes (index) |
| `/notes/:id` | Full note |

Growable content (case studies, notes) lives in `src/data/` — add an entry and its index row + detail route appear automatically. `public/_redirects` and `vercel.json` provide SPA fallback for deep links.

## Structure

```
src/
  components/
    background/   ThreeBackground (dot field), Spotlight
    command/      CommandPalette (⌘K), MiniTerminal, ShortcutsDialog, commands
    layout/       Header, FloatingDock, ScrollProgress, ScrollManager, Section, Reveal
    previews/     ProjectPreview, NotePreview  ← brief list rows → detail routes
    ui/           Logo, MagneticButton, StatusPill, Marquee, CursorCard
  hooks/          usePrefersReducedMotion, useMagnetic, useScrollSpy, useKeyboardShortcuts
  lib/            motion (variants), sections (registry + scroll), nav (cross-route scroll)
  data/           profile, projects, notes, exploring  ← single source of truth
  sections/       Landing, HowIThink, Experience, CaseStudies, CaseStudy,
                  Notes, Exploring, Achievements, Contact
  pages/          Home, WorkIndex, WorkDetail, NotesIndex, NoteDetail
```

All copy lives in `src/data/`. Edit those files — no text is hard-coded in components.

## Make it yours

- **Links / email** — `src/data/profile.ts` (`socials`, `email`). Placeholder GitHub/LinkedIn handles are set; swap them.
- **Résumé** — drop `resume.pdf` into `public/`. The `resume` terminal command, palette action, and Contact button point there.
- **Screenshots** — each case study frame expects `/public/<project-id>.png` (e.g. `connect-4.png`, `woody.png`).
- **Favicon / OG** — `public/favicon.svg`, `public/og.svg`.

## Interactions

- `⌘/Ctrl + K` — command palette (search sections, projects, actions)
- `G` home · `P` case studies · `C` contact · `?` shortcuts
- Mini terminal (in *How I Think*): `whoami`, `projects`, `experience`, `learning`, `resume`, `help`, `clear`
- Magnetic buttons, cursor-aware cards, mouse spotlight, animated dot-field background, scroll progress, floating dock, marquee, section reveals

Everything motion-heavy is gated behind `prefers-reduced-motion`.
