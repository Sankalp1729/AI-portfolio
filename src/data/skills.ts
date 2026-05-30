import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    group: "Languages",
    skills: ["Python", "SQL"],
    orbs: [
      { label: "Py", x: 12, y: 18, delay: 0.05, size: 64 },
      { label: "SQL", x: 68, y: 16, delay: 0.12, size: 56 },
    ],
  },
  {
    label: "ML",
    group: "ML Frameworks",
    skills: ["TensorFlow", "Keras", "Scikit-learn", "XGBoost"],
    orbs: [
      { label: "TF", x: 10, y: 16, delay: 0.04, size: 58 },
      { label: "SK", x: 70, y: 12, delay: 0.1, size: 60 },
      { label: "XG", x: 42, y: 72, delay: 0.16, size: 54 },
    ],
  },
  {
    label: "AI/ML",
    group: "AI/ML",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Multimodal Learning",
      "Reinforcement Learning",
      "Feature Engineering",
    ],
    orbs: [
      { label: "ML", x: 14, y: 14, delay: 0.04, size: 62 },
      { label: "DL", x: 68, y: 18, delay: 0.1, size: 58 },
      { label: "RL", x: 40, y: 70, delay: 0.16, size: 56 },
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
    label: "Vision",
    group: "Vision & Speech",
    skills: [
      "OpenCV",
      "CNN",
      "MFCC",
      "Librosa",
      "Facial Emotion Recognition",
    ],
    orbs: [
      { label: "CV", x: 14, y: 16, delay: 0.05, size: 60 },
      { label: "SP", x: 70, y: 14, delay: 0.12, size: 56 },
      { label: "EM", x: 42, y: 72, delay: 0.2, size: 64 },
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
    label: "Data",
    group: "Data Engineering",
    skills: ["Pandas", "NumPy", "Data Preprocessing", "Pipeline Design"],
    orbs: [
      { label: "PD", x: 12, y: 18, delay: 0.04, size: 58 },
      { label: "NP", x: 70, y: 14, delay: 0.11, size: 56 },
      { label: "ETL", x: 44, y: 72, delay: 0.18, size: 64 },
    ],
  },
  {
    label: "DB",
    group: "Databases",
    skills: ["MySQL", "SQLite", "FAISS", "ChromaDB"],
    orbs: [
      { label: "DB", x: 13, y: 16, delay: 0.05, size: 60 },
      { label: "FS", x: 69, y: 15, delay: 0.12, size: 56 },
      { label: "SQ", x: 44, y: 72, delay: 0.18, size: 58 },
    ],
  },
  {
    label: "Viz",
    group: "Visualization",
    skills: ["Matplotlib", "Seaborn", "Plotly", "Power BI"],
    orbs: [
      { label: "PL", x: 12, y: 18, delay: 0.05, size: 58 },
      { label: "SB", x: 70, y: 16, delay: 0.12, size: 56 },
      { label: "PB", x: 44, y: 72, delay: 0.18, size: 62 },
    ],
  },
  {
    label: "Tools",
    group: "Tools",
    skills: ["Git", "GitHub", "Jupyter", "VS Code"],
    orbs: [
      { label: "Git", x: 16, y: 16, delay: 0.05, size: 58 },
      { label: "GH", x: 66, y: 14, delay: 0.1, size: 56 },
      { label: "IDE", x: 42, y: 72, delay: 0.16, size: 60 },
    ],
  },
];

/** Short icon label for skill chips (text-based stand-in for Devicons). */
export function getSkillIcon(skill: string): string {
  const map: Record<string, string> = {
    Python: "Py",
    SQL: "SQL",
    TensorFlow: "TF",
    Keras: "Ke",
    "Scikit-learn": "SK",
    XGBoost: "XG",
    LangChain: "LC",
    RAG: "RG",
    "HuggingFace Transformers": "HF",
    "Sentence Transformers": "ST",
    "Multi-Agent Systems": "MA",
    OpenCV: "CV",
    CNN: "CN",
    MFCC: "MF",
    Librosa: "LB",
    "Facial Emotion Recognition": "FE",
    FastAPI: "FA",
    Flask: "Fl",
    Streamlit: "ST",
    Docker: "DO",
    "GitHub Actions": "GA",
    "CI/CD": "CI",
    Pandas: "PD",
    NumPy: "NP",
    "Data Preprocessing": "DP",
    "Pipeline Design": "PL",
    MySQL: "MY",
    SQLite: "SQ",
    FAISS: "FS",
    ChromaDB: "CH",
    Matplotlib: "MP",
    Seaborn: "SB",
    Plotly: "PY",
    "Power BI": "BI",
    Git: "Gi",
    GitHub: "GH",
    Jupyter: "JP",
    "VS Code": "VS",
    "Machine Learning": "ML",
    "Deep Learning": "DL",
    NLP: "NL",
    "Multimodal Learning": "MM",
    "Reinforcement Learning": "RL",
    "Feature Engineering": "FE",
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
