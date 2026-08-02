import { useEffect, useMemo, useRef, useState } from "react";
import { scrollToSection } from "@/lib/sections";
import { useTilt } from "@/hooks/useTilt";
import { profile } from "@/data/profile";
import { visibleProjects as projects } from "@/data/projects";
import { exploring } from "@/data/exploring";

interface Line {
  type: "input" | "output" | "system";
  text: string;
}

const PROMPT = "dev@portfolio ~ %";

function runCommand(raw: string): { lines: string[]; nav?: string; clear?: boolean } {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return { lines: [] };
    case "help":
      return {
        lines: [
          "available commands:",
          "  whoami       who is this engineer",
          "  projects     list case studies",
          "  experience   current role",
          "  learning     what i'm exploring",
          "  resume       open résumé",
          "  clear        clear the terminal",
        ],
      };
    case "whoami":
      return {
        lines: [
          `${profile.name} — ${profile.role} @ ${profile.company}`,
          profile.subhead,
        ],
      };
    case "projects":
      return {
        lines: [
          ...projects.map((p) => `  ${p.name.padEnd(12)} ${p.kind}`),
          "↳ opening case studies…",
        ],
        nav: "case-studies",
      };
    case "experience":
      return {
        lines: [
          `  ${profile.company} · ${profile.role}`,
          "↳ opening experience…",
        ],
        nav: "experience",
      };
    case "learning":
      return {
        lines: exploring.map((e) => `  [${e.stage.padEnd(7)}] ${e.title}`),
      };
    case "resume":
      window.open(profile.resumeHref, "_blank", "noopener");
      return { lines: ["↳ opening résumé in a new tab…"] };
    case "clear":
      return { lines: [], clear: true };
    default:
      return { lines: [`command not found: ${cmd}. try 'help'.`] };
  }
}

export function MiniTerminal() {
  const initial = useMemo<Line[]>(
    () => [
      { type: "system", text: "Interactive shell — type a command, or 'help'." },
      { type: "system", text: "try: whoami · projects · experience · learning" },
    ],
    []
  );
  const [lines, setLines] = useState<Line[]>(initial);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tilt = useTilt<HTMLDivElement>({ max: 9, scale: 1.02 });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const raw = value;
    const result = runCommand(raw);
    if (result.clear) {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        { type: "input", text: raw },
        ...result.lines.map((t) => ({ type: "output" as const, text: t })),
      ]);
    }
    if (raw.trim()) setHistory((h) => [raw, ...h]);
    setHIndex(-1);
    setValue("");
    if (result.nav) setTimeout(() => scrollToSection(result.nav!), 350);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIndex + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHIndex(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(hIndex - 1, -1);
      setHIndex(next);
      setValue(next === -1 ? "" : history[next]);
    }
  };

  return (
    <div className="[perspective:1200px]">
      <div
        ref={tilt.ref}
        {...tilt.handlers}
        onClick={() => inputRef.current?.focus()}
        style={{
          transform:
            "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) scale(var(--tscale,1))",
          transformStyle: "preserve-3d",
        }}
        className="group relative overflow-hidden rounded-xl border border-border bg-[#0B0B0D] font-mono text-[13px] shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform duration-200 ease-out will-change-transform"
      >
        {/* pointer glare */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            opacity: "var(--gop,0)",
            background:
              "radial-gradient(340px circle at var(--gx,50%) var(--gy,50%), rgba(190,242,100,0.10), transparent 60%)",
            transition: "opacity 250ms ease",
          }}
        />
      <div className="flex items-center gap-2 border-b border-border bg-surface/60 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[11px] text-muted">— shell</span>
      </div>

      <div ref={scrollRef} className="h-64 overflow-y-auto p-4 leading-relaxed">
        {lines.map((line, i) => {
          if (line.type === "input") {
            return (
              <div key={i} className="flex gap-2">
                <span className="text-accent">{PROMPT}</span>
                <span className="text-text">{line.text}</span>
              </div>
            );
          }
          return (
            <div
              key={i}
              className={
                line.type === "system"
                  ? "whitespace-pre-wrap text-muted/70"
                  : "whitespace-pre-wrap text-muted"
              }
            >
              {line.text}
            </div>
          );
        })}

        <div className="flex gap-2">
          <span className="text-accent">{PROMPT}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
            className="flex-1 bg-transparent text-text caret-accent outline-none"
          />
        </div>
      </div>
      </div>
    </div>
  );
}
