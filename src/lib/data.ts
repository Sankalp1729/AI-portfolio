export type NavItem = {
  label: string;
  href: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  metrics: string[];
  badges: string[];
  image: string;
  github: string;
  demo: string;
  problem: string;
  architecture: string;
};

export type ShowcaseProject = {
  number: string;
  title: string;
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

export type SkillGroup = {
  name: string;
  skills: string[];
  level: number;
  accent: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  metric: string;
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

export type SkillCategory = {
  label: string;
  group: string;
  skills: string[];
  orbs: Array<{
    label: string;
    x: number;
    y: number;
    delay: number;
    size: number;
  }>;
};

export type CertificationItem = {
  issuer: string;
  title: string;
  description: string;
  year: string;
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

export const siteConfig = {
  name: "Sankalp Pingalwad",
  title: "AI Engineer",
  description:
    "Final-year AI Engineering student building production RAG systems, multi-agent architectures, and deployed AI products. Based in Mumbai.",
  home: "/",
  resume: "/resume/resume.pdf",
  github: "https://github.com/Sankalp1729",
  linkedin: "https://www.linkedin.com/in/pingalwadsankalp",
  email: "mailto:pingalwadsankalp1729@gmail.com",
  location: "Mumbai, India",
  education:
    "B.E. Artificial Intelligence & Data Science, VPPCE Mumbai (2022–2026)",
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Timeline", href: "#timeline" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const navDrawerItems: NavItem[] = navItems;

export const heroRoles = [
  "AI Engineer",
  "ML Engineer",
  "Data Scientist",
  "Builder of Intelligent Systems",
];

export const aboutHighlights = [
  "Final year AI student",
  "Production systems focus",
  "End-to-end ownership mindset",
  "Deployable product thinking",
];

export const aboutStats = [
  { label: "Systems shipped", value: "12+" },
  { label: "Production pipelines", value: "5" },
  { label: "Focus areas", value: "AI / ML / DS" },
];

export const projectItems: ProjectItem[] = [
  {
    title: "DocuMind AI",
    description:
      "Document intelligence platform for retrieval, answer synthesis, and semantic exploration.",
    metrics: ["RAG", "FAISS", "FastAPI"],
    badges: ["Docker", "Semantic Retrieval", "Deployment"],
    image: "/images/projects/documind.png",
    github: "https://github.com/Sankalp1729/DocuMind-AI",
    demo: "#",
    problem: "Turn dense documents into a fast, reliable knowledge interface.",
    architecture:
      "Pipeline spans ingestion, chunking, vector search, reranking, and grounded answers.",
  },
  {
    title: "MailMind AI",
    description:
      "Intelligent inbox workflow for triage, drafting, and response automation.",
    metrics: ["RL", "Gmail API", "Transformers"],
    badges: ["Production Deployment", "Automation", "Assistive UX"],
    image: "/images/projects/mailmind.png",
    github: "https://github.com/Sankalp1729/MailMind-AI",
    demo: "#",
    problem:
      "Reduce inbox friction while keeping user control and context intact.",
    architecture:
      "Signals are ranked, summarized, and converted into action-ready workflows.",
  },
  {
    title: "Unified Context AI System",
    description:
      "Cross-platform shared memory layer for multi-agent assistants and connected tools.",
    metrics: ["Multi Agent", "Shared Memory", "Context Layer"],
    badges: ["Cross Platform Intelligence", "Orchestration", "Runtime Memory"],
    image: "/images/projects/unified-context.png",
    github: "https://github.com/Sankalp1729/Unified-Context-AI-System",
    demo: "#",
    problem:
      "Keep agents coordinated with a common memory and decision context.",
    architecture:
      "Connectors, embeddings, policies, and memory routes are orchestrated in one layer.",
  },
  {
    title: "Multimodal Emotion Recognition",
    description:
      "Emotion recognition system across vision and speech signals for richer understanding.",
    metrics: ["CNN", "LSTM", "CV"],
    badges: ["Speech Processing", "Real-time Inference", "Research-to-Product"],
    image: "/images/projects/emotion-ai.png",
    github: "https://github.com/Sankalp1729/Multimodal-Emotion-Recognition",
    demo: "#",
    problem:
      "Fuse multiple signals into a stable, usable inference experience.",
    architecture:
      "Visual and audio features are synchronized before classification and scoring.",
  },
];

export const showcaseProjects: ShowcaseProject[] = [
  {
    number: "01",
    title: "DocuMind AI",
    tagline: "RAG-powered multi-document intelligence platform",
    description:
      "Production RAG system with semantic retrieval over 100+ page PDFs. Sub-800ms query latency, 94%+ semantic relevance on factual queries. Full FastAPI REST backend, Dockerized, deployed on HuggingFace Spaces.",
    fullDescription:
      "Production RAG system built for long-form documents, grounded retrieval, and fast answer synthesis across dense PDF collections. The workflow emphasizes low-latency semantic search, chunk scoring, and deployment reliability rather than prototype behavior.",
    metrics: ["<800ms latency", "94%+ relevance", "100+ page PDFs"],
    tech: [
      "LangChain",
      "FAISS",
      "HuggingFace",
      "FastAPI",
      "Docker",
      "Streamlit",
    ],
    accent: "blue",
    github: "https://github.com/Sankalp1729/DocuMind-AI",
    demo: "#",
    architectureNotes: [
      "FastAPI backend handles ingestion, retrieval, and answer orchestration.",
      "Chunking and semantic retrieval are optimized for factual recall across large PDFs.",
      "Dockerized deployment keeps the pipeline portable across environments.",
    ],
  },
  {
    number: "02",
    title: "MailMind AI",
    tagline: "AI email intelligence with RL-powered urgency scoring",
    description:
      "Gmail API integration with OAuth 2.0, NLP-based 3-class action classification, custom RL reward model. Full CI/CD via GitHub Actions. Lazy-loaded Transformers reduced cold-start memory 40%. Real-time Plotly sentiment dashboard.",
    fullDescription:
      "An inbox intelligence workflow that combines Gmail integration, prioritization logic, and action automation with a clean operational pipeline. The system balances email triage, response assistance, and runtime efficiency.",
    metrics: [
      "40% memory reduction",
      "3-class NLP classifier",
      "Full CI/CD pipeline",
    ],
    tech: [
      "HuggingFace",
      "Gmail API",
      "RL",
      "Streamlit",
      "Plotly",
      "GitHub Actions",
    ],
    accent: "purple",
    github: "https://github.com/Sankalp1729/MailMind-AI",
    demo: "#",
    architectureNotes: [
      "OAuth 2.0 flow connects Gmail securely to the classification pipeline.",
      "Lazy-loaded transformer models reduce cold-start overhead on deployment.",
      "Plotly dashboards surface urgency and sentiment signals in real time.",
    ],
  },
  {
    number: "03",
    title: "Unified Context AI System",
    tagline: "8-agent cross-platform AI with shared memory",
    description:
      "8-agent pipeline spanning ingestion, summarisation, intent classification, context-aware response, visual memory tagging, cognitive scoring, synthetic data generation, and RL decision-making — unified across Email, WhatsApp, Instagram via shared SQLite memory.",
    fullDescription:
      "A cross-platform orchestration layer for agentic assistants, designed around a shared memory substrate and coordinated decision pipeline. It emphasizes consistent context across messaging surfaces and explicit modular responsibilities.",
    metrics: [
      "8 specialized agents",
      "3 platform integration",
      "Microservice architecture",
    ],
    tech: ["Multi-Agent", "Flask", "SQLite", "HuggingFace", "RL", "Streamlit"],
    accent: "teal",
    github: "https://github.com/Sankalp1729/Unified-Context-AI-System",
    demo: "#",
    architectureNotes: [
      "Shared SQLite memory keeps agents aligned across platform contexts.",
      "Each agent owns a narrow task boundary, reducing coupling.",
      "Designed for cross-platform orchestration across messaging and inbox flows.",
    ],
  },
  {
    number: "04",
  github: "https://github.com/Sankalp1729/Multimodal-Emotion-Recognition",
    tagline: "Three-modal deep learning fusion system",
    description:
      "CNN facial expression + MFCC speech features + LSTM text sentiment fused for 6-class emotion recognition. Ablation study across early, late, and hybrid fusion strategies. Late-fusion outperformed all single-modality baselines.",
    fullDescription:
      "A multimodal deep learning system that fuses visual, audio, and textual signals to infer emotion in a more stable way than any single modality alone. The work includes a clear ablation story across fusion approaches.",
    metrics: ["6-class recognition", "3 modality fusion", "Ablation tested"],
    tech: ["TensorFlow", "CNN", "LSTM", "OpenCV", "Librosa", "NLP"],
    accent: "coral",
    github: "https://github.com/Sankalp1729",
    demo: "#",
    architectureNotes: [
      "CNN, MFCC, and LSTM branches are evaluated as separate signal streams.",
      "Late-fusion consistently beats weaker single-modality baselines.",
      "Ablation testing documents where the model gains reliability.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    skills: ["TypeScript", "Python", "SQL", "C++"],
    level: 92,
    accent: "from-cyan-300/70 to-blue-500/60",
  },
  {
    name: "ML",
    skills: [
      "Modeling",
      "Evaluation",
      "Experimentation",
      "Feature Engineering",
    ],
    level: 88,
    accent: "from-sky-300/70 to-cyan-400/60",
  },
  {
    name: "LLMs",
    skills: ["RAG", "Agents", "Prompting", "Fine-tuning"],
    level: 90,
    accent: "from-indigo-300/70 to-cyan-400/60",
  },
  {
    name: "Computer Vision",
    skills: ["CNNs", "Detection", "OCR", "Multimodal"],
    level: 83,
    accent: "from-purple-300/70 to-blue-400/60",
  },
  {
    name: "Deployment",
    skills: ["Docker", "FastAPI", "CI/CD", "Vercel"],
    level: 85,
    accent: "from-blue-300/70 to-cyan-400/60",
  },
  {
    name: "Data Engineering",
    skills: ["Pipelines", "ETL", "Vector DBs", "Scheduling"],
    level: 87,
    accent: "from-cyan-300/70 to-teal-400/60",
  },
  {
    name: "APIs",
    skills: ["REST", "Auth", "Webhooks", "Integrations"],
    level: 90,
    accent: "from-sky-300/70 to-indigo-400/60",
  },
  {
    name: "Databases",
    skills: ["Postgres", "FAISS", "Redis", "MongoDB"],
    level: 84,
    accent: "from-cyan-300/70 to-purple-400/60",
  },
  {
    name: "Visualizations",
    skills: ["D3", "Three.js", "Dashboards", "Storytelling"],
    level: 80,
    accent: "from-blue-300/70 to-cyan-500/60",
  },
];

export const timelineItems: TimelineItem[] = [
  {
    year: "2022",
    title: "Started AI Journey",
    description:
      "Built a foundation in data, machine learning, and applied product thinking.",
  },
  {
    year: "2023",
    title: "Projects",
    description:
      "Moved from experiments to portfolio-grade systems with better UX and stronger architecture.",
  },
  {
    year: "2024",
    title: "Internship",
    description:
      "Shipped practical AI pipelines, classification systems, and deployment-ready workflows.",
  },
  {
    year: "2025",
    title: "Production Systems",
    description:
      "Focused on multi-agent workflows, retrieval, and reliable product integrations.",
  },
  {
    year: "2026",
    title: "AI Engineer Goal",
    description:
      "Building the profile of a high-trust AI engineer with product ownership and depth.",
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    company: "Blackhole Inferverse",
    role: "AI / ML Engineer Intern",
    period: "Production AI",
    description:
      "Built a production AI pipeline spanning ingestion, classification, retrieval, and multi-agent orchestration.",
    highlights: [
      "Production AI pipeline",
      "Multi-agent systems",
      "Classification systems",
      "500+ articles processing",
    ],
    metric: "500+",
  },
];

export const experienceShowcase: ExperienceShowcaseItem = {
  company: "Blackhole Inferverse",
  role: "AI / ML Engineering Intern",
  period: "Sep 2025 – March 2026",
  location: "Remote",
  logo: "BI",
  bullets: [
    "Built production News-AI pipeline (4-person team): NLP classification + multi-agent summarisation, 500+ articles/run at 88%+ accuracy",
    "Trained Random Forest, XGBoost, SVM with Grid Search — improved AUC-ROC by 12% over baseline",
    "Engineered full feature pipelines: imputation, encoding, normalization, reproducible via Jupyter + Git",
  ],
  highlights: ["Production AI", "Multi-Agent", "NLP Pipeline", "88% Accuracy"],
};

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
    skills: ["OpenCV", "CNN", "MFCC", "Librosa", "Facial Emotion Recognition"],
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
];

export const certificationItems: CertificationItem[] = [
  {
    issuer: "Infosys",
    title: "AI / Cloud Learning Track",
    description:
      "Structured training across engineering fundamentals and modern deployment practices.",
    year: "2024",
  },
  {
    issuer: "Deloitte",
    title: "Technology / Analytics Challenge",
    description:
      "Applied problem solving with product-minded analysis and delivery.",
    year: "2024",
  },
  {
    issuer: "SIH",
    title: "Smart India Hackathon",
    description:
      "Team-based build experience with real-world problem framing and execution.",
    year: "2023",
  },
];

export const journeyTimeline: TimelineShowcaseItem[] = [
  {
    year: "2022",
    title: "Started the AI Journey",
    description:
      "Enrolled in AI & Data Science at VPPCE Mumbai. First lines of Python. First ML model.",
  },
  {
    year: "2023",
    title: "Deep Learning Foundations",
    description:
      "Built first CNNs and NLP models. Discovered the power of transformers.",
  },
  {
    year: "2024",
    title: "Multimodal Research",
    description:
      "Designed 3-modal emotion recognition system. Ablation studies, fusion architectures.",
  },
  {
    year: "2025",
    title: "Production AI",
    description:
      "Joined Blackhole Inferverse. Shipped to production. DocuMind AI and MailMind AI deployed publicly.",
  },
  {
    year: "2026",
    title: "AI Engineer",
    description:
      "Graduating. Seeking full-time AI engineering roles. Building the future of intelligent systems.",
  },
];

export const recognitionItems: CertificationShowcaseItem[] = [
  {
    issuer: "Infosys Springboard",
    title: "Deep Learning for Developers",
    date: "June 2025",
    icon: "neural",
  },
  {
    issuer: "Deloitte Australia (Forage)",
    title: "Data Analytics Job Simulation",
    date: "June 2025",
    icon: "bars",
  },
  {
    issuer: "Smart India Hackathon 2025",
    title: "Internal Qualifier — Fasal Rakshak AI",
    date: "December 2025",
    org: "VPP College of Engineering",
    icon: "trophy",
  },
];

export const contactLinks = [
  { label: "Email", href: "mailto:hello@sankalppingalwad.com" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Resume", href: "/resume/resume.pdf" },
];
