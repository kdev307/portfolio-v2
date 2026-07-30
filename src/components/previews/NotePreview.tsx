import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Note } from "@/data/notes";

/**
 * Brief engineering-note entry for index / home list. Links to the detail route.
 */
export function NotePreview({ note, index }: { note: Note; index: number }) {
  return (
    <Link
      to={`/notes/${note.id}`}
      className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b border-border py-6 transition-colors first:border-t sm:gap-6"
    >
      <span className="pt-1 font-mono text-xs text-muted/50">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-lg font-medium text-text transition-colors group-hover:text-accent sm:text-xl">
            {note.title}
          </h3>
          <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
            {note.category}
          </span>
        </div>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted line-clamp-2">
          {note.summary}
        </p>
      </div>

      <span className="flex items-center gap-3 pt-1">
        <span className="hidden font-mono text-xs text-muted sm:inline">
          {note.readingTime}
        </span>
        <ArrowRight className="h-4 w-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-text" />
      </span>
    </Link>
  );
}
