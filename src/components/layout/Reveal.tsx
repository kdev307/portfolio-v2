import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "span";
}

/**
 * Scroll-triggered fade-up. Respects reduced motion automatically because
 * Framer Motion reads the media query for transform/opacity transitions.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
