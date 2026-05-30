import type { AchievementItem } from "@/types";

export const achievements: AchievementItem[] = [
  {
    id: "infosys",
    title: "Deep Learning for Developers",
    organization: "Infosys Springboard",
    year: "2025",
    month: "June",
    image: "/achievements/infosys.webp",
    description:
      "Completed advanced deep learning curriculum covering CNNs, RNNs, transfer learning, and deployment.",
    credentialLink: "#",
    icon: "neural" as const,
  },
  {
    id: "deloitte",
    title: "Data Analytics Job Simulation",
    organization: "Deloitte Australia (Forage)",
    year: "2025",
    month: "June",
    image: "/achievements/deloitte.webp",
    description:
      "Completed real-world data analytics simulation - data cleaning, visualization, and insight generation.",
    credentialLink: "#",
    icon: "bars" as const,
  },
  {
    id: "sih",
    title: "Internal Qualifier - Fasal Rakshak AI",
    organization: "Smart India Hackathon 2025",
    year: "2025",
    month: "December",
    image: "/achievements/sih.webp",
    description:
      "Qualified internally at VPP College of Engineering for Smart India Hackathon 2025 with Fasal Rakshak AI - an agricultural AI system.",
    credentialLink: "#",
    icon: "trophy" as const,
  },
];
