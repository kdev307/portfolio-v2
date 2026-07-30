import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Landing } from "@/sections/Landing";
import { HowIThink } from "@/sections/HowIThink";
import { Experience } from "@/sections/Experience";
import { CaseStudies } from "@/sections/CaseStudies";
import { Notes } from "@/sections/Notes";
import { Exploring } from "@/sections/Exploring";
import { Achievements } from "@/sections/Achievements";
import { Contact } from "@/sections/Contact";
import { scrollToSection } from "@/lib/sections";

interface HomeProps {
  onOpenPalette: () => void;
}

export function Home({ onOpenPalette }: HomeProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Arriving from another route with a section target — scroll to it once.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      const id = requestAnimationFrame(() => scrollToSection(target));
      navigate(".", { replace: true, state: null });
      return () => cancelAnimationFrame(id);
    }
  }, [location.state, navigate]);

  return (
    <main className="relative z-10">
      <Landing onOpenPalette={onOpenPalette} />
      <HowIThink />
      <Experience />
      <CaseStudies />
      <Notes />
      <Exploring />
      <Achievements />
      <Contact />
    </main>
  );
}
