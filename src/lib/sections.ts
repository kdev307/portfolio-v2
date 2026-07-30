import type { LucideIcon } from "lucide-react";
import {
  Home,
  Brain,
  Briefcase,
  Layers,
  FileText,
  Compass,
  Award,
  AtSign,
} from "lucide-react";

export interface SectionMeta {
  id: string;
  label: string;
  icon: LucideIcon;
  dock: boolean;
}

export const sections: SectionMeta[] = [
  { id: "landing", label: "Home", icon: Home, dock: true },
  { id: "how-i-think", label: "How I Think", icon: Brain, dock: true },
  { id: "experience", label: "Experience", icon: Briefcase, dock: true },
  { id: "case-studies", label: "Case Studies", icon: Layers, dock: true },
  { id: "notes", label: "Engineering Notes", icon: FileText, dock: true },
  { id: "exploring", label: "Currently Exploring", icon: Compass, dock: true },
  { id: "achievements", label: "Beyond the Code", icon: Award, dock: false },
  { id: "contact", label: "Contact", icon: AtSign, dock: true },
];

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
}
