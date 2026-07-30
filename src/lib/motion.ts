import type { Variants } from "framer-motion";

// Shared easing — a calm, product-grade curve.
export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease } },
};

// Line-by-line text reveal.
export const lineReveal: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.06 },
  }),
};

export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" };
