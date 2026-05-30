/** Barrel re-export — legacy imports from @/lib/data continue to work. */
export {
  aboutStats,
  heroRoles,
  navItems,
  siteConfig,
} from "@/data/site";

export { showcaseProjects } from "@/data/projects";
export { experienceShowcase } from "@/data/experience";
export { achievements } from "@/data/achievements";
export { journeyTimeline, recognitionItems } from "@/data/timeline";
export { getSkillIcon, skillCategories } from "@/data/skills";

export type {
  AchievementItem,
  CertificationShowcaseItem,
  ExperienceShowcaseItem,
  NavItem,
  ShowcaseProject,
  SiteConfig,
  SkillCategory,
  TimelineShowcaseItem,
} from "@/types";

import { navItems } from "@/data/site";

/** @deprecated Use navItems */
export const navDrawerItems = navItems;
