export interface Note {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  summary: string;
  takeaways: string[];
}

export const notes: Note[] = [
  {
    id: "understanding-hydration",
    title: "Understanding Hydration",
    category: "Rendering",
    readingTime: "4 min",
    summary:
      "Hydration is the moment server-rendered HTML and client React have to agree. When they don't, you get a mismatch — and the fix is almost never in the component that logs the warning. It's in the input that differed between server and client: a date, a random id, a value read from the window.",
    takeaways: [
      "A hydration mismatch is a symptom of divergent input, not divergent code — chase the value that differed.",
      "Anything non-deterministic at render (time, randomness, browser-only globals) is a hydration hazard; defer it to an effect.",
      "The server render is a contract; the first client render must honor it byte-for-byte before it's allowed to change.",
    ],
  },
  {
    id: "micro-frontend-learnings",
    title: "Micro Frontend Learnings",
    category: "Architecture",
    readingTime: "5 min",
    summary:
      "Micro frontends trade one coordination problem for another: you stop coordinating deploys and start coordinating contracts. The shared component library becomes the most important code in the estate, because it's the only thing every team agrees on.",
    takeaways: [
      "Independent deployment is the goal; a stable shared contract is the price.",
      "Version the shared library like an API — a breaking change ripples across every consumer at once.",
      "Cross-package changes need a story for how they land, or 'independent' teams quietly become tightly coupled.",
    ],
  },
  {
    id: "building-realtime-systems",
    title: "Building Realtime Systems",
    category: "Systems",
    readingTime: "4 min",
    summary:
      "The instinct in realtime is to send more messages. The lesson is to share less state and make that state authoritative. Every value you can derive instead of synchronize is a bug you never have to write.",
    takeaways: [
      "Minimize shared state; make what's shared the single source of truth.",
      "Model changes as writes to shared state, not events to replay — you can't get the order wrong if there's no order.",
      "UI motion should follow confirmed state, never predict it; prediction is where multiplayer desync begins.",
    ],
  },
  {
    id: "improving-developer-experience",
    title: "Improving Developer Experience",
    category: "Craft",
    readingTime: "3 min",
    summary:
      "DX isn't a nicety, it's a multiplier. A fast feedback loop and an obvious project boundary change how much a team can safely ship. The best DX work removes a question someone would otherwise have to ask.",
    takeaways: [
      "Optimize the loop developers run hundreds of times a day before the one they run once.",
      "A clear boundary is documentation that can't go stale — make the right thing the obvious thing.",
      "Every removed footgun is compounding: it pays out on every future change, not just today's.",
    ],
  },
];
