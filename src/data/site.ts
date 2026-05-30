import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Sankalp Pingalwad",
  title: "AI Engineer",
  description:
    "Final-year AI Engineering student building production RAG systems, multi-agent architectures, and deployed AI products. Based in Mumbai.",
  home: "/",
  resume: "/assets/resume.pdf",
  github: "https://github.com/Sankalp1729",
  linkedin: "https://www.linkedin.com/in/pingalwadsankalp",
  email: "mailto:pingalwadsankalp1729@gmail.com",
  location: "Mumbai, India",
  education:
    "B.E. Artificial Intelligence & Data Science, VPPCE Mumbai (2022–2026)",
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Timeline", href: "#timeline" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroRoles = [
  "AI Engineer",
  "ML Engineer",
  "Data Scientist",
  "Builder of Intelligent Systems",
] as const;

export const aboutStats = [
  { value: 500, suffix: "+", label: "Articles processed" },
  { value: 88, suffix: "%+", label: "Classification accuracy" },
  { value: 4, suffix: "", label: "Deployed AI systems" },
  { value: 2026, suffix: "", label: "Graduating" },
];
