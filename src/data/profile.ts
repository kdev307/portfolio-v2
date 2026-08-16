export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface Principle {
  title: string;
  body: string;
  accent: "blue" | "green" | "orange";
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  status: "current" | "past";
  summary: string;
  highlights: string[];
  stack: string[];
}

export const profile = {
  name: "Dev Kumar",
  role: "Software Development Engineer",
  company: "Auriga IT",
  location: "India",
  email: "kr30.dev@gmail.com",
  headline: "Building thoughtful web experiences.",
  subhead:
    "An engineer who enjoys understanding systems, building maintainable software, and continuously learning.",
  status: {
    label: "Currently Building",
    detail: "Production AEM Applications",
  },
  // Editable placeholder handles — drop in your real URLs.
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/kdev307",
      handle: "github.com/kdev307",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/kdev307",
      handle: "linkedin.com/in/kdev307",
    },
    {
      label: "CodePen",
      href: "https://codepen.io/kdev307",
      handle: "codepen.io/kdev307",
    },
    // Competitive-coding profiles — hidden for now (not my focus). Uncomment to restore.
    // {
    //   label: "LeetCode",
    //   href: "https://leetcode.com/u/kdev307",
    //   handle: "leetcode.com/u/kdev307/",
    // },
    // {
    //   label: "GeeksForGeeks",
    //   href: "https://www.geeksforgeeks.org/profile/kdev307",
    //   handle: "geeksforgeeks.org/kdev307",
    // },
    // {
    //   label: "Hackerrank",
    //   href: "https://www.hackerrank.com/profile/kdev_307",
    //   handle: "hackerrank.com/profile/kdev_307",
    // },
    {
      label: "Email",
      href: "kr30.dev@gmail.com",
      handle: "kr30.dev@gmail.com",
    },
  ] as SocialLink[],



  // Résumé: Google Drive link is primary; the bundled PDF is the backup.
  // Set driveUrl to your Drive share link. Leave it "" to use the local PDF.
  resume: {
    driveUrl: "https://drive.google.com/file/d/19nutUTr_vxiIEiiBq32UeEDGQyQ_K86r/view?usp=sharing",
    fallback: "/DevKumar_Resume_07-26.pdf",
  },
} as const;

/**
 * Resolved résumé link — Drive if provided, otherwise the bundled PDF.
 * The local file is prefixed with Vite's BASE_URL so it resolves under a
 * subpath deploy (e.g. GitHub Pages /portfolio-v2/) as well as at root.
 */
export const resumeHref: string =
  profile.resume.driveUrl ||
  `${import.meta.env.BASE_URL}${profile.resume.fallback.replace(/^\//, "")}`;

export const principles: Principle[] = [
  {
    title: "Systems before syntax",
    body: "I try to understand why a thing behaves the way it does — the render path, the cache layer, the hydration boundary — before I touch it. A fix I can't explain is a bug I'll ship again.",
    accent: "blue",
  },
  {
    title: "Maintainable beats clever",
    body: "The best code is the code the next person reads in one pass. I optimize for boundaries that are obvious and changes that stay local. Shared component libraries live or die on this.",
    accent: "green",
  },
  {
    title: "Performance is a feature",
    body: "Critical CSS, careful hydration, the right cache at the right layer. Users feel milliseconds. I treat the waterfall as a design surface, not an afterthought.",
    accent: "orange",
  },
  {
    title: "Learn in public, teach on purpose",
    body: "I write things down to find out whether I actually understand them. Explaining a system to someone else is the fastest way to discover what I got wrong.",
    accent: "blue",
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "Auriga IT",
    role: "Software Development Engineer",
    period: "Present",
    status: "current",
    summary:
      "Building and maintaining production Adobe Experience Manager applications inside a micro-frontend architecture — where dozens of independently-owned packages compose into one coherent, fast experience.",
    highlights: [
      "Ship features across a micro-frontend estate, coordinating changes that span multiple packages without breaking downstream consumers.",
      "Maintain shared component libraries — the contracts that let independent teams move without stepping on each other.",
      "Debug SSR and hydration mismatches where server markup and client render diverge, tracing the exact boundary that drifts.",
      "Cut time-to-interactive with critical CSS and disciplined asset loading on AEM-authored pages.",
      "Tune Dispatcher and Akamai caching so the right response is served from the right layer — and invalidated when it should be.",
    ],
    stack: [
      "AEM",
      "React",
      "TypeScript",
      "Micro Frontends",
      "Critical CSS",
      "Dispatcher",
      "Akamai",
    ],
  },
];

export interface Achievement {
  label: string;
  detail: string;
}

export const achievements: Achievement[] = [
  {
    label: "Hackathons",
    detail:
      "Build complete products under time pressure — the discipline of scoping ruthlessly and still shipping something that works.",
  },
  {
    label: "Public speaking",
    detail:
      "Present technical topics to peers. Talking through a system forces the clarity that a slide alone never will.",
  },
  {
    label: "Mentoring & teaching",
    detail:
      "Help other engineers reason about frontend architecture and debugging — the fastest way to sharpen my own mental models.",
  },
  {
    label: "Continuous learning",
    detail:
      "Read technical content deliberately, then rebuild the idea from scratch to confirm I actually understood it.",
  },
];
