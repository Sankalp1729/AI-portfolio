import type { CaseStudyData } from "@/types";

export const documindCaseStudy: CaseStudyData = {
  title: "DocuMind AI",
  tagline: "RAG-powered multi-document intelligence platform for sub-800ms semantic retrieval.",
  tags: ["Product Case Study", "AI / RAG", "2025", "Solo Project"],
  stats: [
    { value: "<800ms", label: "Query latency" },
    { value: "94%+", label: "Semantic relevance" },
    { value: "100+", label: "Page PDFs handled" },
    { value: "1", label: "Engineer, end to end" },
  ],
  accentColor: "#3B82F6",
  overview: {
    description:
      "DocuMind AI is a RAG-powered multi-document Q&A platform that lets users upload large PDFs and ask natural language questions, receiving source-attributed answers in under 800 milliseconds.",
    fullDescription:
      "It is deployed publicly on HuggingFace Spaces, built with a FastAPI REST backend, FAISS vector store, and sentence-transformers for semantic retrieval — production grade, not a prototype.",
    role: "Product Manager & Full-Stack AI Engineer",
    timeline: "4 Weeks (Q1 2025)",
    stack: ["FastAPI", "FAISS", "Sentence-Transformers", "LangChain", "HuggingFace"],
  },
  problem: {
    heading: "Nobody actually reads a 100-page document. They search it.",
    quote: "The average knowledge worker spends 2.5 hours per day searching for information. Most of that search is inside documents that are too long to skim and too important to ignore.",
    cards: [
      {
        title: "The User Problem",
        desc: "Reading a 100-page PDF to find one fact is not a knowledge problem. It's a tooling problem. Ctrl+F finds keywords, not meaning.",
      },
      {
        title: "The Business Problem",
        desc: "Legal documents, research papers, compliance manuals, financial reports — every professional domain drowns in long-form documents that can't be quickly queried.",
      },
      {
        title: "The Technical Gap",
        desc: "Existing RAG demos are toy examples. They fail on real documents: formatting noise, long context windows, retrieval quality degradation, and slow inference.",
      },
    ],
    whyBuilt:
      "I was helping a friend study for an exam using a 240-page textbook. We spent 20 minutes finding a single definition. I knew this was a solved problem technically — it just hadn't been packaged properly.",
  },
  research: {
    heading: "Who actually has this problem — and how bad is it?",
    approach:
      "I didn't run formal user studies. Instead I looked at real behavior: Stack Overflow questions about PDF parsing, Reddit threads about research paper workflows, and ProductHunt comments on competing tools like ChatPDF and Adobe AI Assistant.",
    insights: [
      {
        title: "Scale Failure",
        desc: "Most competing tools fail on PDFs over 50 pages — context window limits cause hallucination on long documents.",
      },
      {
        title: "Trust is Cited",
        desc: "Users report trusting AI answers more when the source page is cited — attribution is a product feature, not a nice-to-have.",
      },
      {
        title: "Latency Ceiling",
        desc: "Sub-second latency is the threshold for 'feels instant' — above 1 second, users start doubting the quality.",
      },
    ],
    personas: [
      {
        name: "Rohan, 23 (The Research Student)",
        role: "Final year engineering / science student",
        pain: "Reading 15 papers for a literature review and losing context.",
        need: "Ask questions across multiple documents at once to cross-reference theories.",
        quote: "I spend more time organizing open tabs than actually reading content.",
        tag: "Academic",
      },
      {
        name: "Priya, 30 (The Legal Professional)",
        role: "Works with contracts, reports, and compliance docs",
        pain: "Manually finding one sub-clause inside a 200-page contract under time pressure.",
        need: "Source-attributed answers they can verify, extract, and cite in court.",
        quote: "An answer is completely useless to me if I can't double-check the exact page.",
        tag: "Enterprise",
      },
    ],
  },
  solution: {
    heading: "Three decisions that shaped the product.",
    decisions: [
      {
        title: "Why FAISS over ChromaDB?",
        choice: "Selected FAISS vector store index",
        rationale:
          "ChromaDB is easier to set up. FAISS is harder but 3–5x faster at retrieval on large document sets. For a product where latency is a core metric, FAISS was the right trade-off.",
        tradeoff: "More setup complexity. Accepted. Users feel the speed difference. They don't see the setup complexity.",
      },
      {
        title: "Why source attribution?",
        choice: "Grounding and page-level citations mapping pass",
        rationale:
          "I could have returned answers without citing source pages. It would have been simpler. But testing showed users didn't trust uncited AI answers on factual documents. Citation is not a feature — it's a trust mechanism.",
        tradeoff: "Extra retrieval pass to map answers to source chunks. Adds ~80ms. Worth it for trust.",
      },
      {
        title: "Why sentence-transformers over OpenAI embeddings?",
        choice: "Self-hosted Sentence-Transformers embeddings model",
        rationale:
          "OpenAI embeddings are better. They're also $0.0001 per 1K tokens, which adds up fast on large document sets. Sentence-transformers are free, self-hosted, and good enough at 94%+ relevance. For a public free tool, cost-free inference was non-negotiable.",
        tradeoff: "Slightly lower embedding quality. Accepted. The free deployment tier made the product accessible.",
      },
    ],
  },
  architecture: {
    heading: "How it works.",
    steps: [
      {
        title: "PDF Upload",
        subtitle: "FastAPI endpoint",
        desc: "FastAPI /upload endpoint. Handles multi-file, validates format, extracts raw text preserving structure.",
      },
      {
        title: "Chunking",
        subtitle: "Text splitting",
        desc: "512-token chunks with 50-token overlap. Overlap prevents losing context at chunk boundaries — a common RAG failure mode.",
      },
      {
        title: "FAISS Index",
        subtitle: "Dense encoding",
        desc: "sentence-transformers encode chunks into dense vectors. FAISS indexes them for sub-millisecond nearest-neighbor search.",
      },
      {
        title: "Semantic Search",
        subtitle: "Top-K retrieval",
        desc: "User query → embedding → top-k chunk retrieval. k=5 by default. Tuned to balance recall vs context window size.",
      },
      {
        title: "Answer + Citation",
        subtitle: "Grounded response",
        desc: "Retrieved chunks → LLM synthesis → answer with source page numbers. Users can verify every claim.",
      },
    ],
  },
  tradeoffs: [
    {
      decision: "Vector store",
      chose: "FAISS",
      rejected: "ChromaDB",
      why: "3-5x faster retrieval at scale.",
    },
    {
      decision: "Embeddings",
      chose: "sentence-transformers (free)",
      rejected: "OpenAI ada-002",
      why: "Zero cost = accessible public deployment.",
    },
    {
      decision: "Chunk size",
      chose: "512 tokens + 50 overlap",
      rejected: "1024 tokens no overlap",
      why: "Overlap prevents boundary context losses.",
    },
    {
      decision: "Answer style",
      chose: "Source-attributed",
      rejected: "Direct answer only",
      why: "Users trust cited answers more.",
    },
    {
      decision: "Deployment",
      chose: "HuggingFace Spaces",
      rejected: "Self-hosted VPS",
      why: "Free tier, zero infra management.",
    },
    {
      decision: "Context window",
      chose: "Top-5 chunks",
      rejected: "Top-10 chunks",
      why: "Fewer chunks = less noise in synthesis.",
    },
  ],
  metrics: [
    { value: "<800ms", label: "End-to-end query latency" },
    { value: "94%+", label: "Semantic relevance on held-out tests" },
    { value: "100+", label: "Page PDFs handled without degradation" },
    { value: "3", label: "API endpoints: /upload /query /summarise" },
  ],
  reflection: {
    heading: "What I'd do with 3 more months.",
    future: [
      {
        title: "Streaming responses",
        desc: "Stream tokens as they generate. Perceived latency drops from 800ms to near-instant.",
        priority: "High",
      },
      {
        title: "Multi-document cross-referencing",
        desc: "Ask questions that span 5 documents simultaneously. Current: one doc at a time.",
        priority: "High",
      },
      {
        title: "Fine-tuned domain embeddings",
        desc: "Legal, medical, financial domain-specific embedding models for higher relevance.",
        priority: "Medium",
      },
    ],
    closing:
      "DocuMind taught me that RAG is not a technology problem. It's a trust problem. The entire architecture is designed around one question: why would a user trust this answer?",
  },
};

export const mailmindCaseStudy: CaseStudyData = {
  title: "MailMind AI",
  tagline: "An intelligent email stream priority assistant that isolates signals, scores urgency, and conquers inbox chaos.",
  tags: ["Product Case Study", "AI / ML", "2025", "Solo Project"],
  stats: [
    { value: "40%", label: "Cold Start Memory" },
    { value: "3-class", label: "NLP Stream Classifier" },
    { value: "88%+", label: "Accuracy Metric" },
    { value: "1", label: "Product Engineer" },
  ],
  accentColor: "#7C3AED",
  overview: {
    description:
      "Emails are no longer structured communications — they are a firehose. Between marketing noise, social updates, and actually urgent tasks, knowledge workers spend over 11 hours per week managing inboxes.",
    fullDescription:
      "MailMind AI was conceived as a cognitive shield. Not just another automatic filter, but an intelligent layer that sits between the Gmail server and the user, categorizing context, calculating behavioral priority, and presenting a single-pane actionable dashboard.",
    role: "Product Manager & ML Engineer",
    timeline: "4 Weeks (Q1 2025)",
    stack: ["Python", "NLTK", "Scikit-Learn", "Gmail API", "Streamlit"],
  },
  problem: {
    heading: "Inbox Paralysis & Muddled Signals",
    quote: "The worst emails aren't spam. The worst emails are the ones that look semi-important, sit in your inbox for three days, and drain your mental batteries every time you scroll past them.",
    cards: [
      {
        title: "The User Problem",
        desc: "Cognitive overload from constant context-switching between promotional noise and crucial peer updates.",
      },
      {
        title: "The Consequence",
        desc: "Missed high-priority opportunities, delayed client responses, and significant hours lost to manual triage daily.",
      },
      {
        title: "The Technical Gap",
        desc: "Basic filter scripts are too rigid. They miss subtle urgency indicators, requiring intelligent natural language logic.",
      },
    ],
    whyBuilt:
      "As an engineering student managing college announcements, project deliverables, internship queries, and open-source notifications, my Gmail was a battleground. I was either checking it 20 times an hour or avoiding it for 3 days. I built MailMind AI because I needed an automated, smart prioritization engine that behaves like a trained personal assistant.",
  },
  research: {
    heading: "Empathy Before Algorithms",
    approach:
      "A product is only as good as the user truth it uncovers. Before writing a single line of machine learning code, I conducted structured informal interviews with 8 target users — including students, freelance developers, and busy project coordinators.",
    insights: [
      {
        title: "Paralyzing Volume",
        desc: "Average unread count was 1,840+. Users confessed that anything past the first page was functionally dead to them, creating chronic background anxiety.",
      },
      {
        title: "Severe Consequences",
        desc: "75% (6 out of 8) had missed urgent internship invitations, critical server alerts, or time-sensitive client feedbacks within the last 6 months.",
      },
      {
        title: "Tedious Static Rules",
        desc: "100% of respondents relied on search queries after-the-fact, or scanning manually. No one used Gmail's custom folders actively because static rules are too brittle.",
      },
    ],
    personas: [
      {
        name: "Rohan, 21 (The Overwhelmed Student)",
        role: "Needs to balance college spam and recruiter callbacks.",
        pain: "Recruiter emails drown in a sea of promotional updates.",
        need: "Zero-effort categorization of educational vs. casual alerts.",
        quote: "I get 50 newsletters a day and 2 real internship alerts. I want to see only what matters without manually clicking delete.",
        tag: "Volume Focus",
      },
      {
        name: "Priya, 26 (The Busy Freelancer)",
        role: "Handles multiple concurrent client projects.",
        pain: "Checking email continuously breaks her deep coding states.",
        need: "High-precision urgency calculation that alerts her on critical requests.",
        quote: "I handle 4 projects. If a client mails me with a fix request, I need to know in 10 minutes. Everything else is secondary.",
        tag: "Urgency Focus",
      },
    ],
  },
  solution: {
    heading: "Designing the Right Trade-offs",
    decisions: [
      {
        title: "Decision 1: 3-Class NLP Stream vs. Complex 5+ Categories",
        choice: "Group emails into Personal, Social, and Promotional streams",
        rationale:
          "Cognitive science shows humans struggle to make decisions when given too many options (Hick's Law). By clustering into 3 high-contrast streams, users could quickly decide where to focus without cognitive load.",
        tradeoff: "Simpler categorical separation. Accepted. This also increased classification accuracy by 12% by eliminating sparse labels.",
      },
      {
        title: "Decision 2: Contextual RL vs. Plain Keyword Urgency",
        choice: "User-tunable reinforcement learning weights",
        rationale:
          "One size fits none. A 'high priority' keyword is a crisis for Priya, but marketing noise for Rohan. Standard keyword matching leads to high false positives.",
        tradeoff: "User configuration inputs required. Accepted. The dynamic RL scorer ensures the engine gets smarter with every interaction.",
      },
      {
        title: "Decision 3: Streamlit Interface vs. Custom React Client",
        choice: "Built dashboard UI on Streamlit",
        rationale:
          "Building a custom React client would require 50% of development hours spent on state syncing and components. By choosing Streamlit, I shipped a fully reactive UI in 3 days.",
        tradeoff: "UI customization is bounded by Streamlit constraints. Accepted. Allowed focus on model and OAuth logic.",
      },
    ],
  },
  architecture: {
    heading: "Systems Design & Cold-Start Optimization",
    steps: [
      {
        title: "Gmail API",
        subtitle: "Secure Fetch",
        desc: "Connects securely via OAuth 2.0 to query unread user emails using strict batch requests, minimizing network latency.",
      },
      {
        title: "OAuth 2.0 Flow",
        subtitle: "Token Mgmt",
        desc: "Manages stateful access and auto-refresh credentials locally, securing sensitive email access parameters completely.",
      },
      {
        title: "NLP Classifier",
        subtitle: "3-Class Tagging",
        desc: "Processes subject and body fields via specialized TF-IDF vectors to isolate Personal, Social, and Promotional streams.",
      },
      {
        title: "RL Urgency Scorer",
        subtitle: "User-Tuned Weights",
        desc: "Assigns dynamic scores based on sender frequency, temporal windows, and positive/negative reinforcement loops.",
      },
      {
        title: "Dashboard UI",
        subtitle: "Reactive Stream",
        desc: "Renders prioritized streams instantly with inline actions to archive, classify, or snooze in single-click.",
      },
    ],
    optimization: {
      title: "Lazy Model Loading & Caching",
      bottleneck:
        "Importing extensive NLTK pipelines and SciKit-learn models on server boot added a heavy 7-second startup overhead, inflating server memory consumption to over 800MB.",
      avatarFix: "", // Legacy support
      fix: "I refactored the pipeline to implement lazy model loading and local variable caching. The model classifiers are initialized ONLY when the user clicks 'Sync Emails'. This reduced startup idle memory footprint by 40%.",
    } as any,
  },
  tradeoffs: [
    {
      decision: "ML Framework",
      chose: "TF-IDF + Naive Bayes",
      rejected: "LLM API calls (GPT-4)",
      why: "Ultra-fast training (100ms), low memory, easy local explainability.",
    },
    {
      decision: "Email Caching",
      chose: "In-Memory Session",
      rejected: "External DB Sync",
      why: "Strict local ephemeral storage. Absolute privacy for user email data.",
    },
    {
      decision: "Deployment Node",
      chose: "CPU Hobby Container",
      rejected: "GPU Cloud Server",
      why: "Allows zero-cost solo project hosting with optimized memory bounds.",
    },
  ],
  metrics: [
    { value: "88%+", label: "Classifier Accuracy" },
    { value: "4.8/5", label: "User Triage Score" },
    { value: "40%", label: "Memory Reduced" },
    { value: "3", label: "Categorical Streams" },
  ],
  reflection: {
    heading: "Future V2 Milestones & Priorities",
    future: [
      {
        title: "1-Click Auto Actions",
        desc: "Integration of quick-draft replies utilizing lightweight context-based GPT-4o-mini templates directly from the prioritization dashboard.",
        priority: "High",
      },
      {
        title: "Multi-Account Sync",
        desc: "OAuth connection expansion supporting multiple simultaneous professional and personal email accounts synced to a single unified panel.",
        priority: "Medium",
      },
      {
        title: "Omni-Channel Flow",
        desc: "Extending classification mechanisms beyond standard emails to parse Discord threads, Slack mentions, and GitHub alerts under one logic.",
        priority: "Low",
      },
    ],
    closing:
      "MailMind AI proved that product thinking must precede code architecture. The entire application is built around explaining recommendations clearly to establish user trust.",
  },
};

export const unifiedContextCaseStudy: CaseStudyData = {
  title: "Unified Context AI System",
  tagline: "An 8-agent pipeline that maintains a single coherent understanding of a user's digital life across Email, WhatsApp, and Instagram.",
  tags: ["Product Case Study", "Multi-Agent", "2025", "Solo Project"],
  stats: [
    { value: "8", label: "Specialized agents" },
    { value: "3", label: "Platforms unified" },
    { value: "1", label: "Shared memory substrate" },
    { value: "4", label: "Test scenarios, all passing" },
  ],
  accentColor: "#10B981",
  overview: {
    description:
      "Unified Context AI is an 8-agent pipeline that maintains a single coherent understanding of a user's digital life across Email, WhatsApp, and Instagram — using a shared SQLite memory substrate so context never gets lost when switching platforms.",
    fullDescription:
      "Each agent owns a narrow task: ingestion, summarisation, intent classification, context-aware response, visual memory tagging, cognitive scoring, synthetic data generation, and RL decision-making.",
    role: "Lead Systems Architect & Product Lead",
    timeline: "4 Weeks (Q1 2025)",
    stack: ["Multi-Agent", "Flask", "SQLite", "HuggingFace", "RL", "Streamlit"],
  },
  problem: {
    heading: "Your AI assistant forgets everything the moment you switch apps.",
    quote: "The average person uses 9 different apps to communicate. Each one is an island. Your email assistant doesn't know about your WhatsApp conversation. Your calendar doesn't know about your Slack DMs. The result: you are the context layer. You do the integration manually.",
    cards: [
      {
        title: "The User Problem",
        desc: "People repeat context constantly. Tell Gmail something, then repeat it to WhatsApp, then again to your calendar. AI tools that forget are AI tools you stop using.",
      },
      {
        title: "The Business Problem",
        desc: "For professionals managing relationships across platforms, fragmented AI means fragmented action. Opportunities fall through the cracks between apps.",
      },
      {
        title: "The Technical Gap",
        desc: "Multi-agent systems exist in research. Production multi-agent systems with shared memory and cross-platform reach are rare — especially open-source.",
      },
    ],
    whyBuilt:
      "I was interning at Blackhole Inferverse building a News-AI pipeline. I kept thinking: what if this agent architecture applied to personal productivity instead of news? What if your agents actually talked to each other?",
  },
  research: {
    heading: "The fragmented digital life is a design problem.",
    approach:
      "I mapped my own cross-platform communication for one week — noting every time I had to repeat context between apps, every missed follow-up, every 'I thought I told you that' moment.",
    insights: [
      {
        title: "Repetitions",
        desc: "11 times I repeated the same context across different apps in a single week — calendar, email, WhatsApp, Slack.",
      },
      {
        title: "Friction Ratio",
        desc: "0 of 9 major communication apps I used had any awareness of what I'd said in another app.",
      },
      {
        title: "The Core Solution",
        desc: "The fix is not one super-app. It's a shared memory layer that sits underneath all your existing apps.",
      },
    ],
    personas: [
      {
        name: "Alex, 29 (The Digital Agency Lead)",
        role: "Coordinates client work across Instagram DMs, WhatsApp chats, and Email.",
        pain: "Loses track of task agreements made during casual social discussions.",
        need: "Stateful coordination that links email drafts to chat histories.",
        quote: "If my assistant has SQLite shared memory, it saves me 3 hours of copying chat snippets into final emails.",
        tag: "Agency Focus",
      },
    ],
  },
  solution: {
    heading: "Why 8 agents? Why not one?",
    decisions: [
      {
        title: "Decision 1: Why 8 agents instead of 1 large model?",
        choice: "8 specialized micro-agents with narrow responsibilities",
        rationale:
          "A single large model doing everything fails in two ways: it's slow, and when something goes wrong, you don't know which part failed. 8 agents with narrow responsibilities means: faster parallel processing, clear failure boundaries, and independent upgradeability.",
        tradeoff: "More orchestration complexity. Accepted. Debuggability is worth the architecture overhead.",
      },
      {
        title: "Decision 2: Why SQLite for shared memory?",
        choice: "Relational SQLite database instance",
        rationale:
          "Vector databases are better for semantic search. SQLite is better for structured relational context that agents need to read/write transactionally. Agents don't just search memory — they update it, flag it, and cross-reference it. SQLite handles this correctly.",
        tradeoff: "Less semantic search capability. Accepted. Correctness of memory operations matters more than retrieval elegance.",
      },
      {
        title: "Decision 3: Why Email + WhatsApp + Instagram?",
        choice: "Connectors covering 80% of communication surfaces",
        rationale:
          "These 3 cover the full communication spectrum: professional (email), personal (WhatsApp), and public-facing (Instagram DMs). A unified context across these 3 covers 80% of a typical professional's communication surface.",
        tradeoff: "No Slack, no LinkedIn. Accepted for V1. Architecture is platform-agnostic — adding connectors is additive.",
      },
    ],
  },
  architecture: {
    heading: "How it works.",
    steps: [
      {
        title: "Ingestion",
        subtitle: "Signal capture",
        desc: "Ingests streams from WhatsApp, Instagram webhooks, and Gmail batch polling, standardizing payloads.",
      },
      {
        title: "Summarisation",
        subtitle: "Context pruning",
        desc: "Condenses raw thread text into structured conversational snippets, saving LLM token contexts.",
      },
      {
        title: "Intent Classifier",
        subtitle: "Route mapping",
        desc: "Determines if incoming signal requests actions, information queries, or general sentiment updates.",
      },
      {
        title: "Response Synthesis",
        subtitle: "Context aware reply",
        desc: "Drafts tailored messaging based on target SQLite history records and platform style requirements.",
      },
      {
        title: "Visual Memory Tagging",
        subtitle: "Image metadata",
        desc: "Extracts image features and tags them to the SQLite relational context directly.",
      },
      {
        title: "Cognitive Scoring",
        subtitle: "Priority check",
        desc: "Scores response confidence and priority before triggering any automated reply pipelines.",
      },
      {
        title: "Synthetic Data Gen",
        subtitle: "Self evaluation",
        desc: "Generates contrast testing pairs in the background to continuously evaluate classifier drift.",
      },
      {
        title: "RL Decision Loop",
        subtitle: "Dynamic rewards",
        desc: "Fine-tunes response selections based on user acceptance and rejection feedback rewards.",
      },
    ] as any,
  },
  tradeoffs: [
    {
      decision: "Agent count",
      chose: "8 specialized",
      rejected: "1 generalist model",
      why: "Narrow agents = debuggable, upgradeable.",
    },
    {
      decision: "Shared memory",
      chose: "SQLite (relational)",
      rejected: "ChromaDB (vector)",
      why: "Transactional correctness over semantic search.",
    },
    {
      decision: "Platform scope",
      chose: "Email + WhatsApp + Instagram",
      rejected: "All platforms",
      why: "Cover 80% of use cases in V1.",
    },
    {
      decision: "Orchestration",
      chose: "Flask microservices",
      rejected: "Monolith",
      why: "Independent scaling and failure isolation.",
    },
    {
      decision: "Testing",
      chose: "4 scenario test suite",
      rejected: "Unit tests only",
      why: "End-to-end scenarios catch agent interaction bugs.",
    },
    {
      decision: "Response style",
      chose: "Context-aware",
      rejected: "Generic LLM reply",
      why: "Memory-grounded responses feel personal.",
    },
  ],
  metrics: [
    { value: "8", label: "Specialized agents" },
    { value: "3", label: "Platforms unified" },
    { value: "4", label: "Test scenarios, all passing" },
    { value: "6", label: "Microservice endpoints" },
  ],
  reflection: {
    heading: "What I'd do with 3 more months.",
    future: [
      {
        title: "Real-time sync",
        desc: "Live webhook listeners instead of polling. Agents react to new messages instantly.",
        priority: "High",
      },
      {
        title: "Agent learning",
        desc: "RL model improves based on which agent responses the user acts on vs ignores.",
        priority: "High",
      },
      {
        title: "Plugin architecture",
        desc: "Open up the platform connector layer. Any developer can add a new platform integration.",
        priority: "Medium",
      },
    ],
    closing:
      "Unified Context AI taught me that intelligence is not about one model being smarter. It's about many agents sharing the right information at the right time.",
  },
};

export const emotionCaseStudy: CaseStudyData = {
  title: "Multimodal Emotion Recognition",
  tagline: "A deep learning fusion pipeline processing facial expression, voice features, and textual sentiments.",
  tags: ["Product Case Study", "Deep Learning", "2025", "Solo Project"],
  stats: [
    { value: "3", label: "Modality Fusion" },
    { value: "6-class", label: "Emotion Outputs" },
    { value: "91%+", label: "Ablation Accuracy" },
    { value: "100ms", label: "Real-time Inference" },
  ],
  accentColor: "#FB923C",
  overview: {
    description:
      "A three-modal deep learning fusion system that combines CNN facial expressions, MFCC speech features, and LSTM text sentiment for 6-class emotion recognition.",
    fullDescription:
      "Features a comprehensive ablation study across early, late, and hybrid fusion strategies. The late-fusion architecture consistently outperformed all single-modality baselines under noisy real-world conditions.",
    role: "Deep Learning Research & Systems Developer",
    timeline: "4 Weeks (Q1 2025)",
    stack: ["TensorFlow", "CNN", "LSTM", "OpenCV", "Librosa", "NLP"],
  },
  problem: {
    heading: "Single-Modality Sentiment Blindspots",
    quote: "A person might speak with an angry tone but keep a calm visual face, or write a positive text while exhibiting stressed audio pitches. Relying on a single signal leads to severe sentiment misinterpretation.",
    cards: [
      {
        title: "Visual Occlusion",
        desc: "Camera angles, bad lighting, and movement obscure visual emotion classifiers, causing visual model outputs to break down.",
      },
      {
        title: "Audio Noise",
        desc: "Microphone clipping, background hums, and static interfere with frequency coefficients, degrading acoustic sentiment scoring.",
      },
      {
        title: "Textual Ambiguity",
        desc: "Sarcasm and metaphor are notoriously difficult for standard text NLP models to decode without acoustic voice signals.",
      },
    ],
    whyBuilt:
      "I was researching assistive feedback interfaces for neurodiverse children. Traditional sentiment systems kept flagging frustration when users spoke quickly, ignoring their happy visual expressions. I wanted to design a resilient fusion classifier that mirrors how humans organically parse emotion.",
  },
  research: {
    heading: "Ablation & Fusion Strategy Insights",
    approach:
      "Conducted extensive ablation testing across early (feature-level), late (decision-level), and hybrid fusion models using standard academic speech/facial datasets.",
    insights: [
      {
        title: "Late Fusion Beats All",
        desc: "Late-fusion networks consistently outperform early-fusion because they prevent one strong noisy signal from corrupting other clean channels.",
      },
      {
        title: "Missing Signal Resiliency",
        desc: "Designing the channels as decoupled parallel branches allows the system to make confident emotion classifications even if video or audio is missing.",
      },
      {
        title: "Feature Latency Contrast",
        desc: "Extracting speech coefficients (MFCCs) takes under 8ms, whereas massive neural text translation models introduce severe UI lag.",
      },
    ],
    personas: [
      {
        name: "Sarah, 24 (The Assistive Tech Developer)",
        role: "Builds communication helper tools for classroom settings.",
        pain: "Frustrated by sentiment software that drops classification accuracy when children turn away from the camera.",
        need: "A multi-modal fusion model that shifts confidence to the voice channel when the face is occluded.",
        quote: "Our tools must be absolute. We cannot afford a false negative in emotional distress signals.",
        tag: "Accessibility",
      },
    ],
  },
  solution: {
    heading: "Key Deep Learning Architecture Decisions",
    decisions: [
      {
        title: "Decision 1: Late-Fusion vs. Early-Fusion Strategy",
        choice: "Decomposed parallel branches with late decision fusion",
        rationale:
          "Late-fusion lets us train visual CNNs, vocal MFCC feature-extractors, and textual LSTMs separately, multiplying baseline accuracy on noisy streams.",
        tradeoff: "Redundant computational pipelines at runtime. Accepted. Late fusion guarantees 100% resilience when video or audio fails completely.",
      },
      {
        title: "Decision 2: CNN + MFCC vs. High-Overhead ViT Transformers",
        choice: "Lightweight convolutional visual and vocal networks",
        rationale:
          "To achieve fluid 30fps video processing on ordinary consumer laptops without expensive cloud GPUs, lightweight architectures were mandatory.",
        tradeoff: "Slight drop in peak raw accuracy on clean static benchmarks. Accepted. Real-time inference on edge devices is a primary metric.",
      },
    ],
  },
  architecture: {
    heading: "Multimodal Fusion Workflow",
    steps: [
      {
        title: "Visual Branch",
        subtitle: "CNN Facial Capture",
        desc: "OpenCV isolates coordinates, feeding facial bounding frames to a customized CNN for micro-expression classification.",
      },
      {
        title: "Vocal Branch",
        subtitle: "Librosa Speech Parsing",
        desc: "Extracts Mel-Frequency Cepstral Coefficients (MFCCs) in real time, scoring vocal pitch, frequency, and static patterns.",
      },
      {
        title: "Textual Branch",
        subtitle: "LSTM Sentiment Stream",
        desc: "Processes verbal transcripts through a recurrent LSTM network to capture linguistic context and word order relationships.",
      },
      {
        title: "Fusion Layer",
        subtitle: "Decision Concatenation",
        desc: "Fuses normalized confidence probability arrays from all three branches, weighting them based on signal-to-noise metrics.",
      },
      {
        title: "Emotion Tag Output",
        subtitle: "6-Class Classification",
        desc: "Outputs emotional states (Happy, Sad, Angry, Fear, Surprise, Neutral) at sub-100ms speeds for reactive interface triggers.",
      },
    ],
  },
  tradeoffs: [
    {
      decision: "Fusion Strategy",
      chose: "Late-Fusion",
      rejected: "Early-Fusion",
      why: "Ensures model resiliency when visual or voice tracks are temporarily cut off.",
    },
    {
      decision: "Visual Processing",
      chose: "Lightweight CNN",
      rejected: "ViT (Visual Transformer)",
      why: "Maintains a fluid 30fps processing speed on mid-range consumer laptops.",
    },
    {
      decision: "Vocal Extraction",
      chose: "Librosa MFCCs (8ms)",
      rejected: "Wav2Vec 2.0 (1.2s)",
      why: "Reduces processing loop delay from 1.2s to sub-10ms, eliminating audio delays.",
    },
  ],
  metrics: [
    { value: "3", label: "Modality Fusion channels" },
    { value: "6-class", label: "Outputs mapped" },
    { value: "91%+", label: "Late-fusion classification accuracy" },
    { value: "<100ms", label: "Real-time inference delay" },
  ],
  reflection: {
    heading: "Future DL Research Milestones",
    future: [
      {
        title: "Attention-Based Hybrid Fusion",
        desc: "Develop cross-attention layers that dynamically weight signal channels (e.g. if noise is high, visually attend more) rather than static late-fusion averages.",
        priority: "High",
      },
      {
        title: "Mobile TensorRT Export",
        desc: "Export model weights using ONNX / TensorRT optimizations for responsive, offline sentiment processing directly on iOS/Android devices.",
        priority: "Medium",
      },
    ],
    closing:
      "Multimodal emotion recognition demonstrates that emotional intent is a combination of visual, vocal, and textual signals. De-coupling and late-fusing them is the most robust way to build sentiment systems.",
  },
};
