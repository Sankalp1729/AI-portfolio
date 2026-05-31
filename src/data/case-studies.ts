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
  tagline: "A three-modal deep learning pipeline that fuses facial expression, speech features, and textual sentiment.",
  tags: ["Product Case Study", "Deep Learning", "2025", "Solo Project"],
  stats: [
    { value: "6-class", label: "Emotion recognition" },
    { value: "3", label: "Modalities fused" },
    { value: "3", label: "Fusion strategies tested" },
    { value: "1", label: "Winner: late fusion" },
  ],
  accentColor: "#F97316",
  overview: {
    description:
      "A three-modal deep learning pipeline that fuses facial expression (CNN + OpenCV), speech features (MFCC + Librosa), and textual sentiment (LSTM) to classify human emotion into 6 categories: happy, sad, angry, fearful, disgusted, surprised.",
    fullDescription:
      "This is a research-grade system with a rigorous ablation study across early, late, and hybrid fusion strategies. Late fusion consistently outperformed all single-modality baselines.",
    role: "Lead Deep Learning Architect",
    timeline: "4 Weeks (Q1 2025)",
    stack: ["TensorFlow", "CNN", "LSTM", "OpenCV", "Librosa", "NLP"],
  },
  problem: {
    heading: "Single-modal emotion AI is confidently wrong.",
    quote: "Text sentiment analysis says 'I'm fine' is positive. Voice analysis hears the flat tone and thinks neutral. Facial analysis sees the forced smile and says happy. The truth: the person is sad. Only fusion gets this right.",
    cards: [
      {
        title: "The User Problem",
        desc: "Emotion AI that relies on one signal fails constantly in the real world. Humans communicate emotion across face, voice, and words simultaneously.",
      },
      {
        title: "The Business Problem",
        desc: "Mental health apps, interview coaching tools, accessibility software, and customer service AI all need reliable emotion detection. Unreliable detection is worse than none.",
      },
      {
        title: "The Research Gap",
        desc: "Most papers test one modality. Multi-modal fusion papers often skip ablation studies — making it hard to understand which combinations actually help.",
      },
    ],
    whyBuilt:
      "I was studying computer vision and kept seeing emotion recognition demos that worked perfectly on clean lab data and failed immediately on real-world input. I wanted to understand why — and the answer was single-modal overconfidence.",
  },
  research: {
    heading: "What humans actually do when they read emotion.",
    approach:
      "Psychologists call it multi-channel communication. Albert Mehrabian's research suggests emotion is conveyed 55% through body language and facial expression, 38% through vocal tone, and only 7% through words. Building emotion AI that ignores 93% of the signal is not a model problem — it's a design problem.",
    insights: [
      {
        title: "Visual (CNN)",
        desc: "Facial muscle movements — micro-expressions that happen in 1/25th of a second. High temporal resolution. Sensitive to lighting and occlusion.",
      },
      {
        title: "Audio (MFCC)",
        desc: "Mel-frequency cepstral coefficients capture the tonal and rhythmic patterns of speech. Works even when face is not visible.",
      },
      {
        title: "Text (LSTM)",
        desc: "Semantic content of words. Weakest standalone signal but adds crucial context when visual and audio are ambiguous.",
      },
    ],
    personas: [
      {
        name: "Sarah, 24 (The Assistive Developer)",
        role: "Builds classroom feedback aids for neurodiverse children",
        pain: "Traditional tools drop accuracy completely when children turn away from camera feeds.",
        need: "Resilient multimodal fusion that dynamically delegates confidence to audio streams.",
        quote: "Our assistive aids must be reliable. We cannot afford a false negative in emotional distress signals.",
        tag: "Accessibility",
      },
    ],
  },
  solution: {
    heading: "I didn't guess which fusion strategy was best. I tested all three.",
    decisions: [
      {
        title: "Decision 1: Early Fusion Strategy",
        choice: "Concatenate all features before the classifier",
        rationale:
          "Simple and fast. Concatenates raw speech coefficients, visual feature maps, and text vectors directly. However, it loses temporal synchronization between modalities.",
        tradeoff: "Moderate accuracy. Performed well on clean data, degraded significantly on noisy inputs.",
      },
      {
        title: "Decision 2: Late Fusion Strategy (WINNER)",
        choice: "Decomposed parallel branches with decision-level combines",
        rationale:
          "Train separate models per modality. Combine predictions at the decision layer. Each modality can be strong independently, ensuring resilience if one stream fails.",
        tradeoff: "Outperformed all single-modality baselines and both other fusion strategies. Absolutely optimal.",
      },
      {
        title: "Decision 3: Hybrid Fusion Strategy",
        choice: "Mix early shared layers and late decision bounds",
        rationale:
          "Combine early and late fusion. Share some layers, keep others separate. Most complex architectural representation.",
        tradeoff: "Marginally better than early fusion, worse than late fusion. Complexity not justified by performance gain.",
      },
    ],
  },
  architecture: {
    heading: "Multimodal Fusion Workflow",
    steps: [
      {
        title: "Visual Branch",
        subtitle: "CNN capture",
        desc: "Video Frames ➔ OpenCV Face Detection ➔ CNN Feature Extractor ➔ Emotion Vector.",
      },
      {
        title: "Audio Branch",
        subtitle: "MFCC capture",
        desc: "Audio Signal ➔ Librosa MFCC ➔ CNN on Spectrogram ➔ Emotion Vector.",
      },
      {
        title: "Textual Branch",
        subtitle: "LSTM capture",
        desc: "Transcript ➔ Tokenization ➔ LSTM Sequence Model ➔ Emotion Vector.",
      },
      {
        title: "Late Fusion Layer",
        subtitle: "Decision merge",
        desc: "Combines emotion probability arrays from all 3 independent branches.",
      },
      {
        title: "6-class Softmax",
        subtitle: "Output tag",
        desc: "Runs a final softmax over the fused vector to yield emotional tags in under 100ms.",
      },
    ] as any,
  },
  tradeoffs: [
    {
      decision: "Fusion strategy",
      chose: "Late fusion",
      rejected: "Early / Hybrid",
      why: "Independent modality strength wins over shared representation.",
    },
    {
      decision: "Visual model",
      chose: "CNN (custom)",
      rejected: "Pretrained ResNet",
      why: "Smaller, faster, controllable on our dataset size.",
    },
    {
      decision: "Audio features",
      chose: "MFCC (Librosa)",
      rejected: "Raw waveform",
      why: "MFCC is proven for emotion — raw adds noise.",
    },
    {
      decision: "Text model",
      chose: "LSTM",
      rejected: "Transformer (BERT)",
      why: "LSTM sufficient for short emotional utterances at lower cost.",
    },
    {
      decision: "Class count",
      chose: "6 emotions",
      rejected: "27 (full Ekman)",
      why: "6 basic emotions cover 90% of real-world cases.",
    },
    {
      decision: "Evaluation",
      chose: "Per-class confusion matrix",
      rejected: "Overall accuracy only",
      why: "Per-class reveals which emotions are actually hard.",
    },
  ],
  metrics: [
    { value: "6-class", label: "Emotion categories: happy, sad, angry, fearful, disgusted, surprised" },
    { value: "3", label: "Modalities fused: visual, audio, text" },
    { value: "Late fusion", label: "Winner across all ablation conditions" },
    { value: "3", label: "Fusion strategies tested: early, late, hybrid" },
  ],
  reflection: {
    heading: "What this research suggests for real products.",
    future: [
      {
        title: "Real-time inference",
        desc: "Current system processes video clips. Real-time streaming with sub-100ms latency would unlock live applications: interview coaching, therapy tools.",
        priority: "High",
      },
      {
        title: "Personalization",
        desc: "Emotion expression varies by culture and individual. A model that adapts to one person's baseline would dramatically outperform a generic model.",
        priority: "High",
      },
      {
        title: "Weak signal handling",
        desc: "What happens when one modality is unavailable (audio-only call, text-only chat)? The architecture should gracefully degrade.",
        priority: "Medium",
      },
    ],
    closing:
      "Multimodal emotion recognition taught me that the ablation study is not just a research method. It's a product decision framework. Remove features one by one and measure. Only keep what earns its place.",
  },
};
