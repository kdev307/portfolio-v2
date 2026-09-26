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
    title: "System Design & Architecture",
    stage: "Now",
    detail:
      "Reasoning about whole systems and the architecture that shapes them: consistency vs. availability, where state should live, how services and their boundaries fit together, and what to cache at which layer.",
    accent: "blue",
  },
  {
    title: "Backend & Scalability",
    stage: "Next",
    detail:
      "Going deeper on the server side and how systems hold their shape under load — API and data modeling for real read patterns, caching strategies, and the boundaries that let a service grow without falling over.",
    accent: "green",
  },
  {
    title: "AI Engineering & Gen AI",
    stage: "Next",
    detail:
      "Building real product features on top of generative models — prompts as interfaces, retrieval and evaluation as disciplines, and treating latency and cost as first-class design constraints.",
    accent: "green",
  },
  {
    title: "Advanced Motion & Animation",
    stage: "Curious",
    detail:
      "Pushing interface motion further — richer, heavier animation and choreography (scroll-linked, physics, and 3D) that communicates state and adds depth without ever getting in the way.",
    accent: "orange",
  },
  {
    title: "Game Development",
    stage: "Curious",
    detail:
      "The other side of interactivity — game loops, state machines, real-time input, and rendering — where feel and performance are the whole point.",
    accent: "orange",
  },
];

export const marqueeTech = [
  "AEM",
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Micro Frontends",
  "Framer Motion",
  "Tailwind CSS",
  "Material UI",
  "React Router",
  "React Query",
  "React Hook Form",
  "Redux",
  "Critical CSS",
  "SSR / Hydration",
  "WCAG / Accessibility",
  "Shared Libraries",
  "Node.js",
  "Express.js",
  "Django",
  "PostgreSQL",
  "Firebase",
  "Dispatcher",
  "Akamai",
  "Vite",
  "Jest",
  "Git",
  "GitHub",
  "Bitbucket",
  "Postman",
  "Figma",
  "Canva",
  "Framer",
];
