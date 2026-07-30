import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "./sections";

/**
 * Navigate to a home-page section from anywhere. If we're not on "/", route
 * home first and carry the target in router state; Home scrolls on mount.
 */
export function useSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id: string) => {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: id } });
      } else {
        scrollToSection(id);
      }
    },
    [navigate, location.pathname]
  );
}
