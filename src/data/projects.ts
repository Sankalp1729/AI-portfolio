import type { ShowcaseProject } from "@/types";

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
    demo: "https://huggingface.co/spaces",
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
    demo: "https://github.com/Sankalp1729/MailMind-AI",
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
    demo: "https://github.com/Sankalp1729/Unified-Context-AI-System",
    architectureNotes: [
      "Shared SQLite memory keeps agents aligned across platform contexts.",
      "Each agent owns a narrow task boundary, reducing coupling.",
      "Designed for cross-platform orchestration across messaging and inbox flows.",
    ],
  },
  {
    number: "04",
    title: "Multimodal Emotion Recognition",
    tagline: "Three-modal deep learning fusion system",
    description:
      "CNN facial expression + MFCC speech features + LSTM text sentiment fused for 6-class emotion recognition. Ablation study across early, late, and hybrid fusion strategies. Late-fusion outperformed all single-modality baselines.",
    fullDescription:
      "A multimodal deep learning system that fuses visual, audio, and textual signals to infer emotion in a more stable way than any single modality alone. The work includes a clear ablation story across fusion approaches.",
    metrics: ["6-class recognition", "3 modality fusion", "Ablation tested"],
    tech: ["TensorFlow", "CNN", "LSTM", "OpenCV", "Librosa", "NLP"],
    accent: "coral",
    github: "https://github.com/Sankalp1729/Multimodal-Emotion-Recognition",
    demo: "https://github.com/Sankalp1729/Multimodal-Emotion-Recognition",
    architectureNotes: [
      "CNN, MFCC, and LSTM branches are evaluated as separate signal streams.",
      "Late-fusion consistently beats weaker single-modality baselines.",
      "Ablation testing documents where the model gains reliability.",
    ],
  },
];
