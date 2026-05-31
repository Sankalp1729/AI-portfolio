import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    group: "Languages",
    skills: ["Python", "SQL"],
    orbs: [
      { label: "Python", x: 12, y: 18, delay: 0.05, size: 64 },
      { label: "SQL", x: 68, y: 16, delay: 0.12, size: 56 },
    ],
  },
  {
    label: "LLMs",
    group: "LLMs & Agents",
    skills: [
      "LangChain",
      "RAG",
      "HuggingFace Transformers",
      "Sentence Transformers",
      "Multi-Agent Systems",
    ],
    orbs: [
      { label: "LC", x: 14, y: 18, delay: 0.05, size: 62 },
      { label: "RAG", x: 72, y: 16, delay: 0.12, size: 66 },
      { label: "AG", x: 44, y: 72, delay: 0.18, size: 58 },
    ],
  },
  {
    label: "Deploy",
    group: "Deployment",
    skills: [
      "FastAPI",
      "Flask",
      "Streamlit",
      "Docker",
      "GitHub Actions",
      "CI/CD",
    ],
    orbs: [
      { label: "API", x: 12, y: 14, delay: 0.05, size: 58 },
      { label: "DO", x: 68, y: 12, delay: 0.12, size: 56 },
      { label: "CI", x: 44, y: 72, delay: 0.18, size: 62 },
    ],
  },
  {
    label: "DB",
    group: "Databases",
    skills: ["MySQL", "SQLite", "FAISS", "ChromaDB"],
    orbs: [
      { label: "DB", x: 13, y: 16, delay: 0.05, size: 60 },
      { label: "FS", x: 69, y: 15, delay: 0.12, size: 56 },
      { label: "SQLite", x: 44, y: 72, delay: 0.18, size: 58 },
      { label: "Chroma", x: 28, y: 46, delay: 0.24, size: 54 },
    ],
  },
];

/** Short icon label for skill chips (text-based stand-in for Devicons). */
export function getSkillIcon(skill: string): string {
  const map: Record<string, string> = {
    Python: "Py",
    SQL: "SQL",
    LangChain: "LC",
    RAG: "RG",
    "HuggingFace Transformers": "HF",
    "Sentence Transformers": "ST",
    "Multi-Agent Systems": "MA",
    FastAPI: "FA",
    Flask: "Fl",
    Streamlit: "ST",
    Docker: "DO",
    "GitHub Actions": "GA",
    "CI/CD": "CI",
    MySQL: "MY",
    SQLite: "SQ",
    FAISS: "FS",
    ChromaDB: "CH",
  };

  if (map[skill]) {
    return map[skill];
  }

  return skill
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
