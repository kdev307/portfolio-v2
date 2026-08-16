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
  Github,
  Linkedin,
  Mail,
  FileDown,
  Keyboard,
} from "lucide-react";
import { profile, resumeHref } from "@/data/profile";
import { visibleProjects as projects } from "@/data/projects";
import { notes } from "@/data/notes";

export interface CommandItem {
  id: string;
  title: string;
  hint?: string;
  group: string;
  icon: LucideIcon;
  keywords: string;
  run: () => void;
}

export function buildCommands(opts: {
  onShowShortcuts: () => void;
  goSection: (id: string) => void;
  goTo: (path: string) => void;
}): CommandItem[] {
  const nav = (id: string) => () => opts.goSection(id);

  const sectionCommands: CommandItem[] = [
    { id: "go-home", title: "Home", group: "Navigate", icon: Home, keywords: "top landing start", run: nav("landing") },
    { id: "go-think", title: "How I Think", group: "Navigate", icon: Brain, keywords: "about principles philosophy", run: nav("how-i-think") },
    { id: "go-exp", title: "Experience", group: "Navigate", icon: Briefcase, keywords: "work auriga job role", run: nav("experience") },
    { id: "go-cases", title: "Case Studies", group: "Navigate", icon: Layers, keywords: "projects work built", run: nav("case-studies") },
    { id: "go-notes", title: "Engineering Notes", group: "Navigate", icon: FileText, keywords: "writing blog docs", run: nav("notes") },
    { id: "go-explore", title: "Currently Exploring", group: "Navigate", icon: Compass, keywords: "learning roadmap interests", run: nav("exploring") },
    { id: "go-achieve", title: "Beyond the Code", group: "Navigate", icon: Award, keywords: "achievements hackathons speaking", run: nav("achievements") },
    { id: "go-contact", title: "Contact", group: "Navigate", icon: AtSign, keywords: "reach email social", run: nav("contact") },
  ];

  const projectCommands: CommandItem[] = [
    {
      id: "proj-all",
      title: "All case studies",
      hint: "/work",
      group: "Case Studies",
      icon: Layers,
      keywords: "work projects index all",
      run: () => opts.goTo("/work"),
    },
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      title: p.name,
      hint: p.kind,
      group: "Case Studies",
      icon: Layers,
      keywords: `${p.name} ${p.kind} ${p.stack.join(" ")}`,
      run: () => opts.goTo(`/work/${p.id}`),
    })),
  ];

  const noteCommands: CommandItem[] = [
    {
      id: "note-all",
      title: "All engineering notes",
      hint: "/notes",
      group: "Notes",
      icon: FileText,
      keywords: "notes writing index all docs",
      run: () => opts.goTo("/notes"),
    },
    ...notes.map((n) => ({
      id: `note-${n.id}`,
      title: n.title,
      hint: n.category,
      group: "Notes",
      icon: FileText,
      keywords: `${n.title} ${n.category}`,
      run: () => opts.goTo(`/notes/${n.id}`),
    })),
  ];

  const actionCommands: CommandItem[] = [
    {
      id: "act-resume",
      title: "View Résumé",
      hint: "résumé",
      group: "Actions",
      icon: FileDown,
      keywords: "cv resume download pdf",
      run: () => window.open(resumeHref, "_blank", "noopener"),
    },
    {
      id: "act-email",
      title: "Email me",
      hint: profile.email,
      group: "Actions",
      icon: Mail,
      keywords: "contact email mail write",
      run: () => (window.location.href = `mailto:${profile.email}`),
    },
    {
      id: "act-github",
      title: "GitHub",
      hint: profile.socials[0].handle,
      group: "Actions",
      icon: Github,
      keywords: "github code source repos",
      run: () => window.open(profile.socials[0].href, "_blank", "noopener"),
    },
    {
      id: "act-linkedin",
      title: "LinkedIn",
      hint: profile.socials[1].handle,
      group: "Actions",
      icon: Linkedin,
      keywords: "linkedin connect network",
      run: () => window.open(profile.socials[1].href, "_blank", "noopener"),
    },
    {
      id: "act-shortcuts",
      title: "Keyboard Shortcuts",
      hint: "?",
      group: "Actions",
      icon: Keyboard,
      keywords: "keys shortcuts help hotkeys",
      run: opts.onShowShortcuts,
    },
  ];

  return [
    ...sectionCommands,
    ...projectCommands,
    ...noteCommands,
    ...actionCommands,
  ];
}
