export interface ExploringItem {
  title: string;
  stage: "Now" | "Next" | "Curious";
  detail: string;
  accent: "blue" | "green" | "orange";
}

export const exploring: ExploringItem[] = [
  {
    title: "AEM internals",
    stage: "Now",
    detail:
      "Going below the API surface — how the Dispatcher decides what to cache, how authoring maps to the render, where the real performance cliffs hide.",
    accent: "blue",
  },
  {
    title: "System Design",
    stage: "Now",
    detail:
      "Reasoning about tradeoffs at the level of whole systems: consistency vs. availability, where state should live, and what to cache at which layer.",
    accent: "blue",
  },
  {
    title: "AI Engineering",
    stage: "Next",
    detail:
      "Building real product features on top of models — prompts as interfaces, evaluation as a discipline, and treating latency and cost as design constraints.",
    accent: "green",
  },
  {
    title: "Motion Design",
    stage: "Next",
    detail:
      "Interface motion with intent: easing, timing, and choreography that communicates state instead of decorating it.",
    accent: "orange",
  },
  {
    title: "Backend Scalability",
    stage: "Curious",
    detail:
      "How systems hold their shape under load — caching strategies, data modeling for read patterns, and the boundaries that let a service grow.",
    accent: "green",
  },
];

export const marqueeTech = [
  "AEM",
  "React",
  "TypeScript",
  "Micro Frontends",
  "Framer Motion",
  "Critical CSS",
  "Redux",
  "Django",
  "PostgreSQL",
  "Firebase",
  "Dispatcher",
  "Akamai",
  "SSR / Hydration",
  "Shared Libraries",
  "Vite",
];
