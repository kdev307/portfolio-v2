export interface CaseStudySection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  year: string;
  kind: string;
  accent: "blue" | "green" | "orange";
  stack: string[];
  summary: string;
  sections: CaseStudySection[];
  metrics: Metric[];
  future: string[];
  links?: { label: string; href: string }[];
  /** Set true to keep the data but hide it from all UI (lists, routes, palette). */
  hidden?: boolean;
}

export const projects: Project[] = [
  {
    id: "aem-platform",
    // Temporarily hidden from the UI. Flip to false (or delete) to show again.
    hidden: true,
    name: "Enterprise AEM Platform",
    tagline:
      "Keeping dozens of independently-owned packages fast, consistent, and shippable — inside enterprise AEM",
    year: "Present",
    kind: "Professional · Auriga IT",
    accent: "orange",
    stack: [
      "AEM",
      "React",
      "TypeScript",
      "Micro Frontends",
      "Shared Component Library",
      "Critical CSS",
      "Dispatcher",
      "Akamai",
    ],
    summary:
      "My day-to-day at Auriga IT: building and maintaining production Adobe Experience Manager applications where many teams ship independently yet compose into one coherent, fast experience. The client specifics live under NDA — what follows is the engineering shape of the work.",
    sections: [
      {
        heading: "Problem",
        body: "At enterprise scale, an AEM front end isn't one app — it's dozens of independently-owned packages that have to render as a single, consistent page. Every team wants to move on its own schedule, but the user sees one product: one design language, one performance budget, one broken component away from a support ticket. The problem is coordination without a bottleneck — letting teams stay independent while the composed experience stays coherent and quick.",
      },
      {
        heading: "Architecture",
        body: "A micro-frontend estate where independently-deployed packages compose into AEM-authored pages, with a shared component library acting as the contract every team builds against. Rendering spans server and client, so the SSR/hydration boundary is a first-class surface; delivery spans Dispatcher and Akamai, so caching is reasoned about per layer rather than as an afterthought.",
        bullets: [
          "Shared component library as the single source of UI truth — teams consume it instead of re-implementing, so consistency is structural, not enforced by review.",
          "Cross-package composition: features span multiple packages and must land without breaking downstream consumers.",
          "Layered caching — Dispatcher and Akamai — where the right response is served from the right layer and invalidated when it should be.",
        ],
      },
      {
        heading: "Interesting Decisions",
        body: "Treating the shared library like a public API. A change there ripples across every consumer at once, so it's versioned and reasoned about the way you'd reason about a breaking API change — not a casual edit. And treating the hydration boundary as a contract: the server render is a promise the first client render has to honour byte-for-byte before it's allowed to change.",
        bullets: [
          "Version the shared library like an API — breaking changes are deliberate and communicated, not discovered in production.",
          "Critical CSS on authored pages so first paint isn't blocked on the full stylesheet.",
          "Cache strategy chosen per layer — what belongs at the edge (Akamai) versus the Dispatcher versus the app.",
        ],
      },
      {
        heading: "Challenges",
        body: "The hard problems are the ones that only show up at scale: a cross-package change that quietly breaks a consumer three teams away, an SSR/hydration mismatch where server markup and client render disagree, and cache invalidation that serves stale content — or misses the cache entirely. Each one is a debugging problem before it's a fix: find the exact boundary that drifted, then make it not drift.",
        bullets: [
          "Trace hydration mismatches to the precise input that differed between server and client, not the component that logged the warning.",
          "Ship cross-package changes with a story for how they land, so 'independent' teams don't become silently coupled.",
          "Tune Dispatcher and Akamai so caching helps rather than hides bugs — correct invalidation over aggressive caching.",
        ],
      },
      {
        heading: "Outcome",
        body: "A platform where teams ship independently and the composed experience still reads as one product — consistent because the shared library makes it so, and fast because performance is treated as a feature at every layer from critical CSS to the edge cache. The work is ongoing; the shape holds because the contracts hold.",
      },
      {
        heading: "Lessons Learned",
        body: "At scale, contracts beat coordination — a stable shared interface lets more people move safely than any amount of process. Performance is a feature you design for, not a cleanup pass. And the most valuable debugging skill is finding the exact boundary where two things that should agree stopped agreeing — in hydration, in caching, in a shared component's API.",
      },
    ],
    metrics: [
      { value: "1", label: "Shared library — the contract every team builds on" },
      { value: "MFE", label: "Independently-deployed packages, one composed page" },
      { value: "Edge", label: "Cached at the right layer — Dispatcher to Akamai" },
    ],
    future: [
      "Design tokens beneath the shared library so theming changes propagate without touching component internals.",
      "Automated visual regression on the shared components to catch cross-package breakage before it ships.",
      "Explicit performance budgets in CI so time-to-interactive can't quietly regress.",
    ],
  },
  {
    id: "connect-4",
    name: "Connect 4",
    tagline: "Realtime multiplayer, built on a synchronized source of truth",
    year: "2024",
    kind: "Realtime Multiplayer Game",
    accent: "blue",
    stack: ["React", "TypeScript", "Firebase", "Realtime Database"],
    summary:
      "A two-player Connect 4 you can share with a link. The engineering challenge was never the game — it was making two browsers agree on one board, instantly, with no accounts and no server of my own to run.",
    sections: [
      {
        heading: "Problem",
        body: "Turn-based games look trivial until two people play them at once. The moment both clients hold their own copy of the board, they drift: a dropped update, a double-tap, a reconnect, and suddenly the two players disagree about who won. I wanted a game a person could open, share a link, and play with a friend in seconds — no sign-up, no lobby, no divergence.",
      },
      {
        heading: "Architecture",
        body: "One authoritative board state lives in Firebase Realtime Database, keyed by a room id. Both clients subscribe to that node and render from it — the local UI is a pure projection of shared state, never a second source of truth. A move is a write, not a message; every client converges on the same board because they all read the same node.",
        bullets: [
          "Room-per-game model: a short room id namespaces the entire match, so a link is all two players need to share.",
          "Anonymous authentication gives every player a stable identity with zero friction — no email, no password.",
          "Presence and turn ownership are derived from the shared node, so the board itself decides whose move it is.",
        ],
      },
      {
        heading: "Interesting Decisions",
        body: "Treating the database as the game engine rather than a sync layer. Instead of clients exchanging moves and each replaying them, a move mutates one shared board and everyone re-renders from the result. That collapsed a whole class of ordering bugs — there is no ordering to get wrong when there is only one board.",
        bullets: [
          "State-first, not message-first: writes describe the world, not events to replay.",
          "Server-authoritative win detection so a tampered client can't declare victory.",
          "Custom rule configuration (board size / win length) kept in the same room document so both players share one ruleset.",
        ],
      },
      {
        heading: "Challenges",
        body: "The hard parts were the edges of realtime: a player reconnecting mid-game, both players tapping the same column in the same instant, and making a piece feel like it falls without letting animation desync the board. I let the shared state settle first, then animated toward it — the render follows the truth, never leads it.",
        bullets: [
          "Race on simultaneous moves resolved by validating turn ownership against shared state before committing a write.",
          "Reconnect handled by re-subscribing and rendering current state — no replay, no catch-up log.",
          "Drop animation decoupled from state so a slow frame never desyncs the board.",
        ],
      },
      {
        heading: "Outcome",
        body: "A game you open and play with a friend over a link, that stays consistent across two devices, survives a refresh, and needs no account. It runs entirely on client plus managed backend — no server for me to operate — and the realtime model kept the two boards identical through every reconnect I could throw at it.",
      },
      {
        heading: "Lessons Learned",
        body: "The cleanest realtime systems minimize what's shared and make that shared thing authoritative. Every piece of state I could derive instead of store was one fewer thing to keep in sync. And UI motion should chase confirmed state, never predict it — prediction is where multiplayer bugs are born.",
      },
    ],
    metrics: [
      { value: "1", label: "Shared source of truth per room" },
      { value: "0", label: "Accounts required to play" },
      { value: "2", label: "Devices kept in exact sync" },
    ],
    future: [
      "Optimistic move rendering with reconciliation for sub-frame responsiveness on high-latency links.",
      "Spectator mode as a read-only subscription to the room node.",
      "Reconnection grace window with a rejoin token so a refresh never forfeits a match.",
    ],
    links: [
      {
        label: 'Source Code',
        href: 'github link'
      },
      {
        label: 'Live Demo',
        href: 'live link'
      }
    ]
  },
  {
    id: "woody",
    name: "Woody",
    tagline: "A furniture store where the cart is never wrong",
    year: "2023",
    kind: "E-commerce Platform",
    accent: "green",
    stack: ["React", "Redux", "Django", "DRF", "PostgreSQL"],
    summary:
      "A full-stack furniture storefront with authentication, a product catalog, filtering, an admin dashboard, and a cart that stays correct whether you're logged in, logged out, or somewhere in between. The interesting engineering lived at the seam between client state and server state.",
    sections: [
      {
        heading: "Problem",
        body: "E-commerce is a state-synchronization problem wearing a storefront. A cart exists in the browser before a user logs in and in the database after — and the moment those two disagree, you either lose a sale or charge for the wrong thing. I wanted a catalog that filters instantly, a dashboard to manage it, and a cart that survives login, logout, and refresh without ever silently dropping an item.",
      },
      {
        heading: "Architecture",
        body: "A Django + Django REST Framework backend over PostgreSQL owns the durable truth: products, users, orders, carts. A React + Redux frontend owns interaction state and mirrors server state through a normalized store. The REST API is the contract between them — the frontend never guesses what the server knows, it asks.",
        bullets: [
          "DRF serializers define the API surface; the Redux store is shaped to consume it without per-component reshaping.",
          "PostgreSQL models the relationships that matter — users to carts, carts to line items, orders to history.",
          "Token authentication gates the write paths; the same identity resolves both the session and the persisted cart.",
        ],
      },
      {
        heading: "Interesting Decisions",
        body: "Making cart synchronization explicit rather than incidental. A guest cart lives in client state; on login it merges into the server cart under clear rules instead of blindly overwriting. Filtering runs against the API so results stay authoritative for large catalogs, rather than shipping the whole catalog to the client and filtering in memory.",
        bullets: [
          "Deterministic merge on login: quantities reconcile by product, so nothing is silently lost or doubled.",
          "Server-side filtering keeps the client light and results correct as the catalog grows.",
          "Normalized Redux state so a product updates in one place and every view reflects it.",
        ],
      },
      {
        heading: "Challenges",
        body: "The cart was the whole game. Guest-to-user transition, concurrent updates from two tabs, and keeping the Redux store from drifting from the database all had to resolve to one correct quantity. I treated the server as authoritative and the store as a cache that reconciles against it, rather than two peers negotiating.",
        bullets: [
          "Guest cart persisted client-side, then merged server-side on authentication under explicit rules.",
          "Redux normalization to prevent duplicated or stale product state across catalog, detail, and cart views.",
          "Consistent API error handling so a failed write surfaces to the user instead of corrupting local state.",
        ],
      },
      {
        heading: "Outcome",
        body: "A working storefront: browse and filter a catalog, authenticate, build a cart that persists across sessions, and manage inventory from a dashboard — backed by a relational schema that models the real relationships instead of flattening them. The cart behaved correctly across the transitions that usually break it.",
      },
      {
        heading: "Lessons Learned",
        body: "Decide early which side owns the truth. Once the server was authoritative and the client was a reconciling cache, a dozen ambiguous 'which value wins' questions had one answer. Scalable state management isn't a bigger store — it's a normalized one with clear ownership and clear merge rules.",
      },
    ],
    metrics: [
      { value: "5", label: "Layers, one contract (React → DRF → PostgreSQL)" },
      { value: "1", label: "Authoritative cart across guest + auth" },
      { value: "100%", label: "Server-side filtered results" },
    ],
    future: [
      "Optimistic cart updates with rollback on API failure for snappier interaction.",
      "Caching layer in front of catalog reads to cut repeat query load.",
      "Order lifecycle states (pending → fulfilled) surfaced in the dashboard.",
    ],
    links: [
      {
        label: 'Source Code',
        href: 'github link'
      }
    ]
  },
];

// What the UI renders — everything not explicitly hidden. Toggle a project's
// `hidden` flag above to add/remove it without touching any component.
export const visibleProjects = projects.filter((p) => !p.hidden);
