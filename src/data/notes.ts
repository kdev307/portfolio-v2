export interface Note {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  summary: string;
  takeaways: string[];
  /**
   * If this note was published as a LinkedIn post, the URL to it. When present,
   * the UI shows a "read the full note on LinkedIn" CTA on the detail page and a
   * small LinkedIn marker in the list.
   */
  linkedinUrl?: string;
}

export const notes: Note[] = [
  {
    id: "configuration-driven-development",
    title: "Imperative, Declarative, and Configuration-Driven UI",
    category: "UI Architecture",
    readingTime: "6 min",
    summary:
      "React gives you more than one way to build a UI. Three approaches are worth distinguishing: imperative (describe the steps), declarative (describe the target state), and configuration-driven (represent the structure as data and let a renderer interpret it). They aren't competing — each fits a different level of abstraction — and configuration-driven flexibility comes with a trade-off: complexity often moves from component code into the configuration and the renderer rather than disappearing.",
    takeaways: [
      "Three ways to build UI: imperative (tell it how), declarative (describe what), and configuration-driven (define the blueprint, let a renderer build it).",
      "It's less about a 'better' approach and more about choosing the right level of abstraction for the problem.",
      "More flexibility doesn't always mean less complexity — sometimes the complexity just moves from code into the configuration and the renderer.",
      "The real question is often not 'how do I make this UI work?' but 'how do I design it so it can adapt when requirements change?'",
    ],
    linkedinUrl:
      "https://www.linkedin.com/posts/kdev307_from-make-it-work-to-make-it-adapt-activity-7500428498214465536-s4Fw",
  },
  {
    id: "architecture-docs-pay-forward",
    title: "Architecture and Docs Are Slow Up Front, and Worth It",
    category: "Craft",
    readingTime: "4 min",
    summary:
      "Making an architectural decision deliberately and writing it down is genuinely painful in the moment — it slows you down when you just want to ship. But that up-front cost is what makes a codebase pleasant to work in later. Good structure and honest documentation improve developer experience; better DX makes the code easier to maintain; easier maintenance is what keeps the user-facing experience good over time. The pain is front-loaded; the payoff compounds.",
    takeaways: [
      "A deliberate architectural decision plus a written record is a loan you take from today to pay back many future days.",
      "The chain is real: good architecture and docs → better DX → easier maintenance → a UX that stays good instead of decaying.",
      "Write down the why, not just the what — future-me won't remember the alternatives that were rejected or the reason.",
      "If a decision is hard to explain in a short doc, that's a signal the design is still unclear — writing exposes it.",
    ],
  },
  {
    id: "less-code-isnt-always-better",
    title: "Less Code Isn't Automatically Better Code",
    category: "Craft",
    readingTime: "3 min",
    summary:
      "It's tempting to treat a smaller line count as a win, but fewer lines can hide real costs: a dense one-liner that nobody can read, a clever abstraction that's harder to change than the repetition it replaced, or a 'shorter' version that quietly does more work. The goal isn't the least code — it's the clearest code that does the right thing. Optimize for the next person reading it (often future-me), not for brevity.",
    takeaways: [
      "Short and clever isn't the same as good — code that's hard to read is hard to change and hard to trust.",
      "Fewer lines can mean worse performance: a compact expression may allocate, re-run, or loop more than a plain, longer version.",
      "Deduplicate for the right reason — a premature abstraction to remove repetition can couple things that should stay separate.",
      "Optimize for clarity and correctness first; concise is a nice side effect of clear, not a goal to chase on its own.",
    ],
  },
  {
    id: "teaching-forces-understanding",
    title: "Teaching Forces Real Understanding",
    category: "Growth",
    readingTime: "3 min",
    summary:
      "Speaking at and helping organize a hands-on Framer workshop — running live demos and answering questions in real time — was a different kind of pressure than building alone. You can't hand-wave in front of a room. Live demos punish anything you only half-understand, and unscripted questions map the exact edges of your knowledge. Explaining something in the moment turned out to be the fastest way to find out how well I actually knew it.",
    takeaways: [
      "If you can't explain it live, you don't fully understand it yet — teaching is a test you can't fake.",
      "Live demos fail on the parts you only half-know; rehearsing to teach hardens your own understanding.",
      "Unscripted questions reveal the boundaries of your knowledge better than any solo study session.",
      "Preparing under a tight timeline forces you to find the essential core of a topic and drop the rest.",
    ],
  },
  {
    id: "understanding-hydration",
    title: "Understanding Hydration",
    category: "Rendering",
    readingTime: "4 min",
    summary:
      "Hydration is the moment server-rendered HTML and client React have to agree. When they disagree, you get a mismatch — and the fix is almost never in the component that logs the warning. It's in the input that differed between server and client: a date, a random id, a value read from the window. Treat the server render as a contract the first client render has to honor.",
    takeaways: [
      "A hydration mismatch is a symptom of divergent input, not divergent code — chase the value that differed.",
      "Anything non-deterministic at render (time, randomness, browser-only globals) is a hydration hazard; defer it to an effect.",
      "The server render is a contract; the first client render must honor it byte-for-byte before it's allowed to change.",
    ],
  },
  {
    id: "micro-frontend-learnings",
    title: "Micro Frontends Trade Deploys for Contracts",
    category: "Architecture",
    readingTime: "5 min",
    summary:
      "Micro frontends don't remove coordination, they relocate it: you stop coordinating deploys and start coordinating contracts. The shared component library quietly becomes the most important code in the estate, because it's the one thing every team depends on. Independence between teams is only as real as the stability of the interface they all build against.",
    takeaways: [
      "Independent deployment is the goal; a stable shared contract is the price you pay for it.",
      "Version the shared library like a public API — a breaking change ripples across every consumer at once.",
      "Every cross-package change needs a story for how it lands, or 'independent' teams quietly become tightly coupled.",
      "Consistency should be structural (a shared library teams consume), not something enforced by review after the fact.",
    ],
  },
  {
    id: "git-reflog-and-merge-strategies",
    title: "Git: Reflog and Merge Strategies",
    category: "Tooling",
    readingTime: "5 min",
    summary:
      "Two things worth keeping straight in Git. First, reflog is the safety net: it records where HEAD has been, so a 'lost' commit after a bad reset, rebase, or branch delete is almost always still recoverable. Second, how history reads depends entirely on the merge strategy — fast-forward vs. no-ff, merge vs. rebase — and each makes a different trade between a clean line and an honest record of what actually happened.",
    takeaways: [
      "reflog logs every move of HEAD — after a bad reset/rebase/checkout, find the old SHA in `git reflog` and `git reset --hard`/`git checkout` back to it. Commits are rarely truly gone until garbage collection.",
      "Fast-forward (ff): with no divergence, the branch pointer just slides forward — no merge commit, linear history. Git does this by default when it can.",
      "--no-ff: forces a merge commit even when a fast-forward was possible, preserving the fact that a branch existed (useful for grouping a feature's commits).",
      "Merge (--no-rebase): keeps both histories and ties them with a merge commit — non-destructive and truthful, but can produce a tangled graph.",
      "Rebase: replays your commits on top of the target for a clean, linear history — but it rewrites SHAs, so never rebase shared/pushed branches (the golden rule).",
      "squash: collapses many commits into one for a tidy summary; interactive rebase (`rebase -i`) lets you reorder, edit, squash, or drop commits before sharing.",
    ],
  },
  {
    id: "how-the-browser-renders",
    title: "How the Browser Renders a Page",
    category: "Rendering",
    readingTime: "5 min",
    summary:
      "A quick mental model of the path from URL to pixels, and what happens when an event fires later. The browser requests the document, streams and parses HTML into the DOM while CSS becomes the CSSOM and JS chunks load and execute. DOM + CSSOM combine into the render tree, which is laid out (geometry) and then painted (pixels), often across composited layers. After that, an event can mutate the DOM/CSSOM and trigger only the stages that are actually needed again.",
    takeaways: [
      "Request → response: the browser fetches the HTML document, then discovers and loads sub-resources (CSS, JS chunks, fonts, images), often in parallel.",
      "Parse: HTML → DOM tree; CSS → CSSOM tree. CSS is render-blocking; a synchronous script can block parsing unless marked async/defer.",
      "Render tree = DOM + CSSOM (visible nodes only) → Layout/reflow computes each box's size and position → Paint fills in pixels → Composite assembles layers on the GPU.",
      "DOM = document structure; CSSOM = computed styles; BOM = browser objects around the page (window, location, history, navigator) that aren't part of the document.",
      "On an event: the handler runs (often via event delegation up the DOM), state/DOM changes, and the browser re-runs only what's needed — a style change may just repaint; a size/position change forces a reflow (layout), which is the more expensive path.",
      "Practical rule: layout is costlier than paint, and paint is costlier than compositing — animate transform/opacity (composite-only) instead of properties that trigger reflow.",
    ],
  },
];
