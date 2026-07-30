import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On route change, jump to top — unless we're navigating home to hit a section
 * (Home handles that scroll itself via router state).
 */
export function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const hasSectionTarget = Boolean(
      (location.state as { scrollTo?: string } | null)?.scrollTo
    );
    if (!hasSectionTarget) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.state]);

  return null;
}
