import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Themed back-to-top control. Fades in past the first viewport, wraps the
 * button in a lime scroll-progress ring, and returns to the top.
 */
export function ScrollToTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={toTop}
          aria-label="Scroll to top"
          className="group fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-border bg-surface/80 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors duration-300 hover:border-accent/50"
        >
          {/* scroll progress ring */}
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 48 48"
            aria-hidden
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              className="stroke-border"
              strokeWidth="2"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              className="stroke-accent"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>

          <ArrowUp
            className="relative h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-accent"
            strokeWidth={2}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
