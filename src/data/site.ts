import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Sankalp Pingalwad",
  title: "AI Product Builder",
  description:
    "Final-year AI student in Mumbai who builds and ships AI products — email AI, RAG systems, multi-agent architectures. Thinking about product, not just code.",
  home: "/",
  resume: "/resume/resume.pdf",
  github: "https://github.com/Sankalp1729",
  linkedin: "https://www.linkedin.com/in/pingalwadsankalp",
  email: "mailto:pingalwadsankalp1729@gmail.com",
  location: "Mumbai, India",
  education:
    "B.E. Artificial Intelligence & Data Science, VPPCE Mumbai (2022–2026)",
};

export const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Projects", href: "/#projects" },
  { label: "Case Studies", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Timeline", href: "/#timeline" },
  { label: "Contact", href: "/#contact" },
] as const;

export const heroRoles = [
  "AI Product Builder",
  "ML Engineer",
  "Data Scientist",
  "Builder of AI Products",
] as const;

export const aboutStats = [
  { value: 500, suffix: "+", label: "Articles processed" },
  { value: 88, suffix: "%+", label: "Classification accuracy" },
  { value: 3, suffix: "", label: "Deployed AI systems" },
  { value: 2026, suffix: "", label: "Graduating" },
];
