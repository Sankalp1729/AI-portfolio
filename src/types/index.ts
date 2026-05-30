export type NavItem = {
  label: string;
  href: string;
};

export type ShowcaseProject = {
  number: string;
  title: string;
  image: string;
  tagline: string;
  description: string;
  fullDescription: string;
  metrics: string[];
  tech: string[];
  accent: "blue" | "purple" | "teal" | "coral";
  github: string;
  demo: string;
  architectureNotes: string[];
};

export type SkillOrb = {
  label: string;
  x: number;
  y: number;
  delay: number;
  size: number;
};

export type SkillCategory = {
  label: string;
  group: string;
  skills: string[];
  orbs: SkillOrb[];
};

export type ExperienceShowcaseItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  highlights: string[];
  logo: string;
};

export type TimelineShowcaseItem = {
  year: string;
  title: string;
  description: string;
};

export type CertificationShowcaseItem = {
  issuer: string;
  title: string;
  date: string;
  org?: string;
  icon: "neural" | "bars" | "trophy";
};

export type AchievementItem = {
  id: string;
  title: string;
  organization: string;
  year: string;
  month: string;
  image: string;
  description: string;
  credentialLink: string;
  icon: "neural" | "bars" | "trophy";
};

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  home: string;
  resume: string;
  github: string;
  linkedin: string;
  email: string;
  location: string;
  education: string;
};
