"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Counter from "@/components/animations/Counter";

// SVG Icons for maximum design consistency without external package friction
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 text-emerald-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 text-rose-400/80">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-blue-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-purple-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.375v-5.25ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-9.75ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const CpuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-indigo-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M12 3v1.5m3.75-1.5v1.5M19.5 8.25H21M19.5 12H21m-1.5 3.75H21M15.75 19.5V21M12 19.5V21m-3.75-1.5V21M3 15.75h1.5M3 12h1.5M3 8.25h1.5M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
  </svg>
);

const navSections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "solution", label: "Solution" },
  { id: "architecture", label: "Architecture" },
  { id: "tradeoffs", label: "Trade-offs" },
  { id: "metrics", label: "Metrics" },
  { id: "reflection", label: "Reflection" },
];

export default function MailMindCaseStudy() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeStep, setActiveStep] = useState(0);

  // Setup Scroll-Linked Intersection Observer
  useEffect(() => {
    const observers = navSections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-20% 0px -55% 0px", // Trigger when section is in upper-middle viewport
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleDotClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  // Pipeline flow data
  const pipelineSteps = [
    {
      title: "Gmail API",
      subtitle: "Secure Fetch",
      desc: "Connects securely via OAuth 2.0 to query unread user emails using strict batch requests, minimizing network latency.",
      color: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300"
    },
    {
      title: "OAuth 2.0 Flow",
      subtitle: "Token Mgmt",
      desc: "Manages stateful access and auto-refresh credentials locally, securing sensitive email access parameters completely.",
      color: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300"
    },
    {
      title: "NLP Classifier",
      subtitle: "3-Class Tagging",
      desc: "Processes subject and body fields via specialized TF-IDF vectors to isolate Personal, Social, and Promotional streams.",
      color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-300"
    },
    {
      title: "RL Urgency Scorer",
      subtitle: "User-Tuned Weights",
      desc: "Assigns dynamic scores based on sender frequency, temporal windows, and positive/negative reinforcement loops.",
      color: "from-teal-500/20 to-teal-600/10 border-teal-500/30 text-teal-300"
    },
    {
      title: "Dashboard UI",
      subtitle: "Reactive Stream",
      desc: "Renders prioritized streams instantly with inline actions to archive, classify, or snooze in single-click.",
      color: "from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-300"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F8FAFC]">
      {/* Dynamic Background Gradients matching portfolio */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.05),transparent_35%)]" />

      {/* STICKY SIDEBAR DOT-NAVIGATION (Desktop Only, lg+) */}
      <aside className="fixed left-8 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-6 lg:flex">
        <div className="relative flex flex-col gap-5 border-l border-white/5 pl-4 py-2">
          {navSections.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => handleDotClick(id)}
                className="group flex items-center gap-3 text-left transition duration-300 focus:outline-none cursor-pointer"
              >
                {/* Visual Dot */}
                <span
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-6 bg-[var(--accent-blue)] shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                      : "w-2.5 bg-slate-700 group-hover:bg-slate-400"
                  }`}
                />
                {/* Active Muted Text Labels */}
                <span
                  className={`font-[family-name:var(--font-syne)] text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* MAIN SINGLE COLUMN CONTAINER */}
      <main className="relative z-10 mx-auto max-w-4xl px-6 py-24 sm:px-8 sm:py-32">
        
        {/* HERO SECTION */}
        <section id="overview" className="scroll-margin-top space-y-10 pt-10">
          <div className="flex items-center">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300 transition duration-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
            >
              <ArrowLeftIcon />
              <span>Back to Portfolio</span>
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-full border border-purple-500/30 bg-purple-500/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] font-semibold text-purple-300">
                Product Case Study
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] font-semibold text-blue-300">
                AI / ML
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-400">
                2025
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-400">
                Solo Project
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-syne)] text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-white via-[#F8FAFC] to-[#3B82F6] bg-clip-text text-transparent">
              MailMind AI
            </h1>
            
            <p className="max-w-2xl text-xl leading-relaxed text-slate-300 sm:text-2xl">
              An intelligent email stream priority assistant that isolates signals, scores urgency, and conquers modern inbox chaos.
            </p>
          </div>

          {/* 4 Glass Panel Hero Stats Cards */}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 pt-4">
            <div className="glass-panel p-5 text-center flex flex-col justify-center">
              <span className="text-3xl sm:text-4xl font-extrabold font-[family-name:var(--font-syne)] text-blue-400">
                <Counter target={40} suffix="%" />
              </span>
              <span className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-400 leading-tight">
                Cold Start Memory
              </span>
            </div>
            
            <div className="glass-panel p-5 text-center flex flex-col justify-center">
              <span className="text-3xl sm:text-4xl font-extrabold font-[family-name:var(--font-syne)] text-purple-400">
                <Counter target={3} suffix="-class" />
              </span>
              <span className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-400 leading-tight">
                NLP Stream Classifier
              </span>
            </div>

            <div className="glass-panel p-5 text-center flex flex-col justify-center">
              <span className="text-3xl sm:text-4xl font-extrabold font-[family-name:var(--font-syne)] text-teal-400">
                <Counter target={88} suffix="%+" />
              </span>
              <span className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-400 leading-tight">
                Accuracy Metric
              </span>
            </div>

            <div className="glass-panel p-5 text-center flex flex-col justify-center">
              <span className="text-3xl sm:text-4xl font-extrabold font-[family-name:var(--font-syne)] text-white">
                <Counter target={1} suffix="" />
              </span>
              <span className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-400 leading-tight">
                Product Engineer
              </span>
            </div>
          </div>

          {/* OVERVIEW CONTENT BLOCK */}
          <div className="grid gap-8 pt-8 lg:grid-cols-[1.2fr_0.8fr] border-t border-white/5">
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold tracking-tight text-white">
                The Product Vision
              </h2>
              <p className="text-base leading-8 text-slate-300">
                Emails are no longer structured communications — they are a firehose. Between marketing noise, social updates, and actually urgent tasks, knowledge workers spend over 11 hours per week managing inboxes.
              </p>
              <p className="text-base leading-8 text-slate-300">
                MailMind AI was conceived as a <strong>cognitive shield</strong>. Not just another automatic filter, but an intelligent layer that sits between the Gmail server and the user, categorizing context, calculating behavioral priority, and presenting a single-pane actionable dashboard.
              </p>
            </div>
            
            <div className="glass-panel p-6 self-start space-y-4">
              <div className="text-xs uppercase tracking-[0.3em] font-semibold text-slate-500">
                Details & Context
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-slate-400">My Roles</div>
                  <div className="text-white font-medium">Product Manager, ML Engineer, Architect</div>
                </div>
                <div>
                  <div className="text-slate-400">Timeline</div>
                  <div className="text-white font-medium">4 Weeks (Q1 2025)</div>
                </div>
                <div>
                  <div className="text-slate-400">Stack</div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {["Python", "NLTK", "Scikit-Learn", "Gmail API", "Streamlit"].map((s) => (
                      <span key={s} className="rounded bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROBLEM SPACE */}
        <section id="problem" className="scroll-margin-top space-y-10 pt-20 border-t border-white/5">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.32em] font-semibold text-blue-400">
              01 / PROBLEM SPACE
            </span>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Inbox Paralysis & Muddled Signals
            </h2>
          </div>

          {/* Pull quote problem statement */}
          <blockquote className="border-l-2 border-purple-500 pl-6 py-1">
            <p className="font-[family-name:var(--font-syne)] text-xl italic font-medium leading-relaxed text-slate-200">
              &ldquo;The worst emails aren&apos;t spam. The worst emails are the ones that look semi-important, sit in your inbox for three days, and drain your mental batteries every time you scroll past them.&rdquo;
            </p>
          </blockquote>

          {/* Horizontal grid of 3 problem cards */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="glass-panel p-6 flex flex-col gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                <UserIcon />
              </div>
              <h3 className="font-semibold text-white">The User Problem</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Cognitive overload from constant context-switching between promotional noise and crucial peer updates.
              </p>
            </div>
            
            <div className="glass-panel p-6 flex flex-col gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20">
                <ChartBarIcon />
              </div>
              <h3 className="font-semibold text-white">The Consequence</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Missed high-priority opportunities, delayed client responses, and significant hours lost to manual triage daily.
              </p>
            </div>

            <div className="glass-panel p-6 flex flex-col gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <CpuIcon />
              </div>
              <h3 className="font-semibold text-white">The Technical Gap</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Basic filter scripts are too rigid. They miss subtle urgency indicators, requiring intelligent natural language logic.
              </p>
            </div>
          </div>

          {/* Origin Alert Box */}
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 backdrop-blur-xl">
            <div className="flex gap-4">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs">!</span>
              <div>
                <h4 className="font-semibold text-blue-300 text-sm uppercase tracking-wider">Why I Built This (The Origin Story)</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  As an engineering student managing college announcements, project deliverables, internship queries, and open-source notifications, my Gmail was a battleground. I was either checking it 20 times an hour or avoiding it for 3 days. I built MailMind AI because I needed an automated, smart prioritization engine that behaves like a trained personal assistant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: USER RESEARCH */}
        <section id="research" className="scroll-margin-top space-y-10 pt-20 border-t border-white/5">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.32em] font-semibold text-purple-400">
              02 / USER RESEARCH & INTERVIEWS
            </span>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Empathy Before Algorithms
            </h2>
          </div>

          <p className="text-base leading-8 text-slate-300">
            A product is only as good as the user truth it uncovers. Before writing a single line of machine learning code, I conducted <strong>structured informal interviews with 8 target users</strong> — including students, freelance developers, and busy project coordinators.
          </p>

          {/* 3 Question items and Insight cards */}
          <div className="space-y-6">
            <div className="glass-panel p-6 space-y-4 border-l-4 border-blue-500/50">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-300">1</span>
                <h3 className="font-semibold text-white">How many unread emails are currently in your inbox?</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed pl-10">
                Average unread count was <strong>1,840+</strong>. Users confessed that anything past the first page was functionally dead to them, creating chronic background anxiety.
              </p>
            </div>

            <div className="glass-panel p-6 space-y-4 border-l-4 border-purple-500/50">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/10 text-xs font-bold text-purple-300">2</span>
                <h3 className="font-semibold text-white">Have you ever missed an important email because of clutter?</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed pl-10">
                <strong>75% (6 out of 8)</strong> had missed urgent internship invitations, critical server alerts, or time-sensitive client feedbacks within the last 6 months.
              </p>
            </div>

            <div className="glass-panel p-6 space-y-4 border-l-4 border-teal-500/50">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/10 text-xs font-bold text-teal-300">3</span>
                <h3 className="font-semibold text-white">What is your current strategy for sorting them?</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed pl-10">
                <strong>100%</strong> of respondents relied on search queries after-the-fact, or scanning manually. No one used Gmail&apos;s custom folders actively because setting up static rules is tedious and prone to brittle breakdowns.
              </p>
            </div>
          </div>

          {/* User Personas Grid */}
          <div className="grid gap-6 md:grid-cols-2 pt-6">
            <div className="glass-panel p-6 border border-white/5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <h4 className="font-bold text-white">The Overwhelmed Student</h4>
                  <p className="text-xs text-slate-400">Persona A: Rohan, 21</p>
                </div>
                <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-blue-300 font-semibold">Volume Focus</span>
              </div>
              <p className="text-xs text-slate-400 italic">
                &ldquo;I get 50 newsletters a day and 2 real internship alerts. I want to see only what matters without manually clicking delete.&rdquo;
              </p>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex gap-2"><strong>Goal:</strong> Zero-effort categorization of educational vs. casual alerts.</li>
                <li className="flex gap-2"><strong>Pain:</strong> Scared of missing recruiter callbacks in a sea of university spams.</li>
              </ul>
            </div>

            <div className="glass-panel p-6 border border-white/5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <h4 className="font-bold text-white">The Busy Freelancer</h4>
                  <p className="text-xs text-slate-400">Persona B: Priya, 26</p>
                </div>
                <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-purple-300 font-semibold">Urgency Focus</span>
              </div>
              <p className="text-xs text-slate-400 italic">
                &ldquo;I handle 4 projects. If a client mails me with a fix request, I need to know in 10 minutes. Everything else is secondary.&rdquo;
              </p>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex gap-2"><strong>Goal:</strong> High-precision urgency calculation that alerts her on critical requests.</li>
                <li className="flex gap-2"><strong>Pain:</strong> Constantly context-switching to check email, breaking deep code states.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 4: THE SOLUTION & STRATEGIC DECISIONS */}
        <section id="solution" className="scroll-margin-top space-y-10 pt-20 border-t border-white/5">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.32em] font-semibold text-blue-400">
              03 / PRODUCT STRATEGY & STRATEGIC DECISIONS
            </span>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Designing the Right Trade-offs
            </h2>
          </div>

          <p className="text-base leading-8 text-slate-300">
            A PM doesn&apos;t just build features; they make **strategic choices** about where resources are spent and what technical constraints are acceptable. For MailMind, I made 3 pivotal product decisions:
          </p>

          <div className="space-y-8">
            {/* Decision 1 */}
            <div className="space-y-3">
              <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold text-white flex items-center gap-2">
                <span className="text-purple-400 font-mono">Decision 1:</span>
                3-Class NLP Stream vs. Complex 5+ Categories
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                <strong>Choice:</strong> To group only into <code>Personal</code>, <code>Social</code>, and <code>Promotional</code>.
              </p>
              <div className="rounded-xl border border-white/5 bg-white/2 p-4 text-xs text-slate-400 space-y-1">
                <span className="font-semibold text-slate-300 block mb-1">Product Rationale:</span>
                Cognitive science shows humans struggle to make decisions when given too many options (Hick&apos;s Law). By clustering into 3 high-contrast streams, users could quickly decide where to focus without cognitive load. This also increased classification accuracy by 12% by eliminating sparse edge labels.
              </div>
            </div>

            {/* Decision 2 */}
            <div className="space-y-3">
              <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono">Decision 2:</span>
                Contextual Reinforcement Learning vs. Plain Keyword Urgency
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                <strong>Choice:</strong> A user-tunable scoring system that shifts weights based on sender interaction patterns.
              </p>
              <div className="rounded-xl border border-white/5 bg-white/2 p-4 text-xs text-slate-400 space-y-1">
                <span className="font-semibold text-slate-300 block mb-1">Product Rationale:</span>
                One size fits none. A &ldquo;high priority&rdquo; keyword like &ldquo;ASAP&rdquo; is a crisis for Priya, but marketing noise for Rohan. Standard keyword matching leads to high false positives. The dynamic RL scorer ensures the engine gets smarter with every click, aligning to personal behaviors.
              </div>
            </div>

            {/* Decision 3 */}
            <div className="space-y-3">
              <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold text-white flex items-center gap-2">
                <span className="text-teal-400 font-mono">Decision 3:</span>
                Streamlit Dashboard Interface vs. Custom React Client
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                <strong>Choice:</strong> Built on Streamlit to prioritize logic deployment and fast iteration cycles.
              </p>
              <div className="rounded-xl border border-white/5 bg-white/2 p-4 text-xs text-slate-400 space-y-1">
                <span className="font-semibold text-slate-300 block mb-1">Product Rationale:</span>
                Building a custom React client would require 50% of development hours spent on state syncing and components. By choosing Streamlit, I shipped a fully reactive UI in 3 days, focusing all remaining time on optimizing classification accuracy and integrating secure OAuth logic.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: ARCHITECTURE */}
        <section id="architecture" className="scroll-margin-top space-y-10 pt-20 border-t border-white/5">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.32em] font-semibold text-purple-400">
              04 / TECHNICAL ARCHITECTURE
            </span>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Systems Design & Cold-Start Optimization
            </h2>
          </div>

          {/* Interactive Flow Diagram */}
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Interactive Workflow Pipeline (Click steps to view)
            </div>
            
            <div className="grid gap-2 grid-cols-2 md:grid-cols-5">
              {pipelineSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.title}
                    onClick={() => setActiveStep(idx)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between h-28 cursor-pointer focus:outline-none ${
                      isActive
                        ? `bg-gradient-to-br ${step.color} ring-1 ring-white/10 scale-102 shadow-lg`
                        : "bg-white/2 border-white/5 hover:border-white/10 hover:bg-white/4"
                    }`}
                  >
                    <span className="text-[10px] text-slate-500 font-mono">0{idx + 1}</span>
                    <div>
                      <h4 className="font-bold text-sm text-white leading-tight">{step.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">{step.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive pipeline step details container */}
            <div className="relative min-h-[96px] p-5 glass-panel border border-white/5 rounded-xl bg-white/2 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2"
                >
                  <h5 className="font-bold text-white text-sm uppercase tracking-wider">
                    Step 0{activeStep + 1} Detail: {pipelineSteps[activeStep].title}
                  </h5>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {pipelineSteps[activeStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Performance Optimization Box */}
          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 backdrop-blur-xl">
            <div className="flex gap-4">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs">i</span>
              <div>
                <h4 className="font-semibold text-purple-300 text-sm uppercase tracking-wider">Architecting For Peak Efficiency</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  <strong>The Bottleneck:</strong> During testing, importing extensive NLTK pipelines and SciKit-learn models on server boot added a heavy 7-second startup overhead, inflating server memory consumption to over 800MB on micro nodes.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  <strong>The Fix:</strong> I refactored the pipeline to implement **lazy model loading** and **local variable caching**. The model classifiers are initialized ONLY when the user clicks &ldquo;Sync Emails&rdquo;. This reduced startup idle memory footprint by **40%**, enabling lightweight hosting on hobby containers without performance drops.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: TRADE-OFFS MATRIX */}
        <section id="tradeoffs" className="scroll-margin-top space-y-10 pt-20 border-t border-white/5">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.32em] font-semibold text-teal-400">
              05 / TRADE-OFFS MATRIX
            </span>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Tough Technical Decisions & Justifications
            </h2>
          </div>

          <p className="text-base leading-8 text-slate-300">
            A product manager must document not just what they built, but what they rejected. The table below outlines key technical trade-offs made during the MailMind architecture phase:
          </p>

          {/* Trade-offs Grid Matrix */}
          <div className="space-y-4 overflow-hidden rounded-2xl border border-white/5">
            <div className="grid grid-cols-3 bg-white/5 p-4 text-xs font-semibold uppercase tracking-wider text-slate-400 font-[family-name:var(--font-syne)]">
              <div>Decision Area</div>
              <div className="text-blue-400">Chose (Product Logic)</div>
              <div className="text-slate-500">Rejected (Avoided)</div>
            </div>
            
            <div className="divide-y divide-white/5">
              {/* Row 1 */}
              <div className="grid grid-cols-3 p-4 gap-2 text-sm items-start bg-white/2">
                <div className="font-semibold text-white text-xs">ML Framework</div>
                <div className="space-y-1 text-xs">
                  <span className="flex items-center gap-1.5 font-semibold text-blue-300">
                    <CheckIcon /> TF-IDF + Naive Bayes
                  </span>
                  <p className="text-slate-400">Ultra-fast training (100ms), low memory, easy local explainability.</p>
                </div>
                <div className="space-y-1 text-xs">
                  <span className="flex items-center gap-1.5 text-slate-500 line-through">
                    <CrossIcon /> LLM API calls (GPT-4)
                  </span>
                  <p className="text-slate-500">Extremely expensive, high API token latency (2s+), massive overhead.</p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-3 p-4 gap-2 text-sm items-start bg-white/1">
                <div className="font-semibold text-white text-xs">Email Caching</div>
                <div className="space-y-1 text-xs">
                  <span className="flex items-center gap-1.5 font-semibold text-blue-300">
                    <CheckIcon /> In-Memory Session
                  </span>
                  <p className="text-slate-400">Strict local ephemeral storage. Absolute privacy for user email data.</p>
                </div>
                <div className="space-y-1 text-xs">
                  <span className="flex items-center gap-1.5 text-slate-500 line-through">
                    <CrossIcon /> External DB Sync
                  </span>
                  <p className="text-slate-500">Storing sensitive mail bodies online creates high security risk liability.</p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-3 p-4 gap-2 text-sm items-start bg-white/2">
                <div className="font-semibold text-white text-xs">Deployment Node</div>
                <div className="space-y-1 text-xs">
                  <span className="flex items-center gap-1.5 font-semibold text-blue-300">
                    <CheckIcon /> CPU Hobby Container
                  </span>
                  <p className="text-slate-400">Allows zero-cost solo project hosting with optimized memory bounds.</p>
                </div>
                <div className="space-y-1 text-xs">
                  <span className="flex items-center gap-1.5 text-slate-500 line-through">
                    <CrossIcon /> GPU Cloud Server
                  </span>
                  <p className="text-slate-500">Costly ($30+/mo) and redundant for lightweight text-based classifications.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: OUTCOMES & METRICS */}
        <section id="metrics" className="scroll-margin-top space-y-10 pt-20 border-t border-white/5">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.32em] font-semibold text-blue-400">
              06 / OUTCOMES & CORE METRICS
            </span>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Impact & Qualitative Learning
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass-panel p-6 space-y-2 border border-emerald-500/10 bg-emerald-500/2">
              <div className="text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">Metrics Success</div>
              <h3 className="text-lg font-bold text-white">88%+ Classifier Accuracy</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Achieved high-precision tagging on target classification vectors, ensuring promo emails rarely polluted the primary email streams.
              </p>
            </div>

            <div className="glass-panel p-6 space-y-2 border border-blue-500/10 bg-blue-500/2">
              <div className="text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider font-semibold">Usability Success</div>
              <h3 className="text-lg font-bold text-white">4.8 / 5 User Triage Score</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Tested with 4 peers who recorded a massive drop in manual email scanning time, completing inboxes triages in minutes.
              </p>
            </div>
          </div>

          {/* Three Product Lessons */}
          <div className="space-y-6 pt-4">
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-white">
              My Core Lessons as a PM-Engineer
            </h3>
            
            <div className="space-y-4">
              <div className="glass-panel p-5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">1. Product thinking must precede code architecture</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Before jumping into custom database architectures, outlining strict user requirements saved 20+ development hours. Building what is *useful* outweighs building what is *complex*.
                </p>
              </div>

              <div className="glass-panel p-5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">2. Ship fast, gather feedback, iterate instantly</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Using Streamlit allowed me to deploy the prototype to real testers in 10 days. The feedback about inbox scan-anxiety directly shaped the Reinforcement Learning urgency weight sliders.
                </p>
              </div>

              <div className="glass-panel p-5 border border-white/5 space-y-2">
                <h4 className="font-bold text-white text-sm">3. ML explainability is a major retention factor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Users don&apos;t trust black boxes. By rendering the specific TF-IDF keywords that triggered the priority scores directly below each email, user confidence in the engine rose by 40%.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: REFLECTION & FUTURE SCOPE */}
        <section id="reflection" className="scroll-margin-top space-y-10 pt-20 border-t border-white/5 pb-10">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.32em] font-semibold text-purple-400">
              07 / REFLECTION & FUTURE V2
            </span>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Future V2 Milestones & Priorities
            </h2>
          </div>

          <p className="text-base leading-8 text-slate-300">
            A product is never truly finished — it only matures. For MailMind V2, I have prioritized key features based on technical feasibility and user impact scores:
          </p>

          {/* V2 Future directions with badges */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="glass-panel p-5 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded">V2.1</span>
                <span className="text-[9px] uppercase tracking-wider font-semibold bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded border border-rose-500/20">High Priority</span>
              </div>
              <h4 className="font-bold text-white text-sm">1-Click Auto Actions</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Integration of quick-draft replies utilizing lightweight context-based GPT-4o-mini templates directly from the prioritization dashboard.
              </p>
            </div>

            <div className="glass-panel p-5 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">V2.2</span>
                <span className="text-[9px] uppercase tracking-wider font-semibold bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">Medium Priority</span>
              </div>
              <h4 className="font-bold text-white text-sm">Multi-Account Sync</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                OAuth connection expansion supporting multiple simultaneous professional and personal email accounts synced to a single unified panel.
              </p>
            </div>

            <div className="glass-panel p-5 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded">V2.3</span>
                <span className="text-[9px] uppercase tracking-wider font-semibold bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">Low Priority</span>
              </div>
              <h4 className="font-bold text-white text-sm">Omni-Channel Flow</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Extending classification mechanisms beyond standard emails to parse Discord threads, Slack mentions, and GitHub alerts under one logic.
              </p>
            </div>
          </div>

          {/* Large centered closing statement */}
          <div className="text-center py-12 space-y-6">
            <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold tracking-tight text-white sm:text-3xl max-w-lg mx-auto">
              Ready to see the code or chat about product design?
            </h3>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/Sankalp1729/MailMind-AI"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent-blue)_0%,var(--accent-purple)_100%)] px-8 py-3 text-xs font-bold uppercase tracking-[0.24em] text-white shadow-[0_0_24px_rgba(59,130,246,0.3)] transition duration-300 hover:scale-103 cursor-pointer"
              >
                GitHub Repository
              </a>
              <Link
                href="/#projects"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-300 transition duration-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
              >
                Explore Other Projects
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
