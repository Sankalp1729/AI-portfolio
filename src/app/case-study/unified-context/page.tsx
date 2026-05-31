"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import SectionLabel from "@/components/case-study/SectionLabel";
import TradeOffTable from "@/components/case-study/TradeOffTable";
import CalloutBox from "@/components/case-study/CalloutBox";
import { unifiedContextCaseStudy } from "@/data/case-studies";

const defaultSections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "solution", label: "Key Decisions" },
  { id: "architecture", label: "Architecture" },
  { id: "tradeoffs", label: "Trade-offs" },
  { id: "metrics", label: "Outcomes" },
  { id: "reflection", label: "Reflection" },
];

export default function UnifiedContextCaseStudy() {
  const [activeStep, setActiveStep] = useState(0);
  const data = unifiedContextCaseStudy;

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const pipelineSteps = [
    {
      title: "Ingestion",
      subtitle: "Signal capture",
      desc: "Ingests streams from WhatsApp, Instagram webhooks, and Gmail batch polling, standardizing varying API payloads.",
      color: "from-teal-500/20 to-teal-600/10 border-teal-500/30 text-teal-300",
    },
    {
      title: "Summarisation",
      subtitle: "Context pruning",
      desc: "Condenses raw thread text into structured conversational snippets, saving LLM token contexts and memory buffers.",
      color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300",
    },
    {
      title: "Intent Classifier",
      subtitle: "Route mapping",
      desc: "Determines if incoming signal requests actions, information queries, or general sentiment updates via quick intent routing.",
      color: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300",
    },
    {
      title: "Response Synth",
      subtitle: "Context aware reply",
      desc: "Drafts tailored messaging based on target SQLite history records and platform style requirements.",
      color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-300",
    },
    {
      title: "Visual Memory",
      subtitle: "Image metadata",
      desc: "Extracts image features and tags them to the SQLite relational context directly for contextual referencing.",
      color: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300",
    },
    {
      title: "Cognitive Scoring",
      subtitle: "Priority check",
      desc: "Scores response confidence and priority before triggering any automated reply pipelines, preventing hallucinations.",
      color: "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-300",
    },
    {
      title: "Synthetic Data",
      subtitle: "Self evaluation",
      desc: "Generates contrast testing pairs in the background to continuously evaluate classifier drift and agent precision.",
      color: "from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-300",
    },
    {
      title: "RL Decision Loop",
      subtitle: "Dynamic rewards",
      desc: "Fine-tunes response selections based on user acceptance and rejection feedback rewards for personalized tuning.",
      color: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-300",
    },
  ];

  return (
    <CaseStudyLayout sections={defaultSections}>
      <div className="space-y-32">
        {/* HERO SECTION */}
        <CaseStudyHero
          title={data.title}
          tagline={data.tagline}
          tags={data.tags}
          stats={data.stats}
          accentColor={data.accentColor}
        />

        {/* SECTION 1: OVERVIEW */}
        <section id="overview" className="scroll-margin-top space-y-8">
          <SectionLabel number="01 / PRODUCT OVERVIEW" title="Decoupled Multi-Agent Ingestion" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] pt-4"
          >
            <div className="space-y-6">
              <p className="text-base leading-8 text-slate-300 font-medium">
                {data.overview.description}
              </p>
              <p className="text-base leading-8 text-slate-300">
                {data.overview.fullDescription}
              </p>
            </div>

            <div className="glass-panel p-6 self-start space-y-4 border border-white/5 bg-white/2 backdrop-blur-md rounded-2xl">
              <div className="text-xs uppercase tracking-[0.3em] font-semibold text-slate-500">
                Details & Context
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-slate-400">My Role</div>
                  <div className="text-white font-medium">{data.overview.role}</div>
                </div>
                <div>
                  <div className="text-slate-400">Timeline</div>
                  <div className="text-white font-medium">{data.overview.timeline}</div>
                </div>
                <div>
                  <div className="text-slate-400">Stack</div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {data.overview.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded bg-white/5 border border-white/5 px-2.5 py-1 text-[10px] text-slate-300 font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: PROBLEM */}
        <section id="problem" className="scroll-margin-top space-y-10">
          <SectionLabel number="02 / PROBLEM SPACE" title={data.problem.heading} />

          <CalloutBox type="quote" content={data.problem.quote} />

          {/* 3 Problem Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="grid gap-5 sm:grid-cols-3"
          >
            {data.problem.cards.map((card, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 flex flex-col gap-4 border border-white/5 bg-white/2 backdrop-blur-md rounded-2xl"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 font-bold font-[family-name:var(--font-syne)] text-base">
                  0{idx + 1}
                </div>
                <h3 className="font-semibold text-white text-sm">{card.title}</h3>
                <p className="text-xs leading-relaxed text-slate-400">{card.desc}</p>
              </div>
            ))}
          </motion.div>

          <CalloutBox type="tradeoff" content={data.problem.whyBuilt} />
        </section>

        {/* SECTION 3: RESEARCH */}
        <section id="research" className="scroll-margin-top space-y-10">
          <SectionLabel number="03 / COGNITIVE RESEARCH" title={data.research.heading} />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="space-y-6"
          >
            <p className="text-base leading-8 text-slate-300">
              {data.research.approach}
            </p>

            {/* 3 Insight Cards */}
            <div className="grid gap-5 sm:grid-cols-3">
              {data.research.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 border border-white/5 bg-white/2 backdrop-blur-md rounded-2xl space-y-3"
                >
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400 block border-b border-white/5 pb-2">
                    {insight.title}
                  </span>
                  <p className="text-xs leading-relaxed text-slate-300">
                    {insight.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Visual Persona Flow Contrast (No specific user personas requested but Rohan/Priya style is very premium) */}
            <div className="grid gap-6 md:grid-cols-2 pt-6">
              {data.research.personas.map((persona, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 border border-white/5 bg-white/2 backdrop-blur-md rounded-2xl space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div>
                      <h4 className="font-bold text-white text-sm">{persona.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{persona.role}</p>
                    </div>
                    <span className="rounded bg-teal-500/10 px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-teal-300 font-semibold border border-teal-500/25">
                      {persona.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    &ldquo;{persona.quote}&rdquo;
                  </p>
                  <ul className="text-xs text-slate-300 space-y-2 border-t border-white/5 pt-3">
                    <li className="flex gap-2">
                      <strong className="text-slate-400">Pain:</strong> {persona.pain}
                    </li>
                    <li className="flex gap-2">
                      <strong className="text-slate-400">Need:</strong> {persona.need}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 4: SOLUTION */}
        <section id="solution" className="scroll-margin-top space-y-10">
          <SectionLabel number="04 / PRODUCT STRATEGY" title={data.solution.heading} />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="space-y-8"
          >
            {data.solution.decisions.map((dec, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-teal-400 font-mono">Decision 0{idx + 1}:</span>
                  {dec.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  <strong>Choice:</strong> {dec.choice}
                </p>
                <div className="rounded-xl border border-white/5 bg-white/2 p-4 text-xs text-slate-400 space-y-2 backdrop-blur-sm">
                  <span className="font-semibold text-slate-300 block border-b border-white/5 pb-1">
                    Product Rationale:
                  </span>
                  <p className="leading-relaxed">{dec.rationale}</p>
                  <span className="font-semibold text-teal-400 block pt-1">
                    Trade-off: {dec.tradeoff}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 5: ARCHITECTURE */}
        <section id="architecture" className="scroll-margin-top space-y-10">
          <SectionLabel number="05 / AGENT ARCHITECTURE" title="8-Agent Coordinated Ingestion Map" />

          {/* Interactive Agent Flow Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="space-y-6"
          >
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Interactive Workflow Pipeline (Click agent nodes to inspect context)
            </div>

            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
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
                    <span className="text-[10px] text-slate-500 font-mono">Agent 0{idx + 1}</span>
                    <div>
                      <h4 className="font-bold text-xs text-white leading-tight">{step.title}</h4>
                      <p className="text-[9px] text-slate-400 mt-1">{step.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive pipeline step details */}
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
                  <h5 className="font-bold text-white text-xs uppercase tracking-wider">
                    Agent 0{activeStep + 1} Core Job: {pipelineSteps[activeStep].title} ({pipelineSteps[activeStep].subtitle})
                  </h5>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                    {pipelineSteps[activeStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* SHARED SQLITE Memory Visual Substrate Callout Box */}
            <div className="glass-panel p-6 border border-teal-500/15 bg-teal-500/2 rounded-2xl space-y-4">
              <h4 className="font-bold text-white text-sm font-[family-name:var(--font-syne)] uppercase tracking-wider flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                Shared Memory Substrate (State Synchronization)
              </h4>
              
              <div className="grid gap-6 md:grid-cols-3 text-xs items-center text-center">
                <div className="p-3 bg-white/3 border border-white/5 rounded-xl space-y-1">
                  <span className="text-slate-400 font-semibold block">Platform Inputs (Left)</span>
                  <p className="text-teal-300 font-mono">Email · WhatsApp · Instagram</p>
                </div>
                
                <div className="p-3 bg-teal-500/5 border border-teal-500/20 rounded-xl space-y-1">
                  <span className="text-teal-300 font-semibold block">Shared Central Layer</span>
                  <p className="text-white font-mono font-bold">Stateful Relational SQLite DB</p>
                </div>

                <div className="p-3 bg-white/3 border border-white/5 rounded-xl space-y-1">
                  <span className="text-slate-400 font-semibold block">Output Endpoints (Right)</span>
                  <p className="text-purple-300 font-mono">Flask APIs + Streamlit Panel</p>
                </div>
              </div>
              
              <p className="text-[11px] text-slate-400 leading-relaxed pt-2 text-center">
                SQLite manages ACID transactions in real-time, aligning context state triggers across ingestion agents instantaneously.
              </p>
            </div>
          </motion.div>
        </section>

        {/* SECTION 6: TRADE-OFFS */}
        <section id="tradeoffs" className="scroll-margin-top space-y-10">
          <SectionLabel number="06 / TRADE-offs TABLE" title="Coordinated Architectural Trade-offs" />
          <TradeOffTable rows={data.tradeoffs} />
        </section>

        {/* SECTION 7: METRICS */}
        <section id="metrics" className="scroll-margin-top space-y-10">
          <SectionLabel number="07 / METRICS & OUTCOMES" title="Multi-Agent Execution Metrics" />

          {/* 4 Metrics Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="grid gap-4 grid-cols-2 sm:grid-cols-4"
          >
            {data.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 text-center flex flex-col justify-center border border-white/5 bg-white/2 backdrop-blur-md rounded-2xl"
              >
                <span className="text-2xl sm:text-3xl font-extrabold font-[family-name:var(--font-syne)] text-teal-400">
                  {metric.value}
                </span>
                <span className="mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-tight">
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 8: REFLECTION */}
        <section id="reflection" className="scroll-margin-top space-y-10">
          <SectionLabel number="08 / PM REFLECTION" title={data.reflection.heading} />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="space-y-8"
          >
            {/* Future Scope cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {data.reflection.future.map((fut, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-5 border border-white/5 bg-white/2 backdrop-blur-md rounded-2xl space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-xs font-mono font-semibold text-teal-300">V2.0{idx + 1}</span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded border border-rose-500/20">
                      {fut.priority} Priority
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-xs">{fut.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {fut.desc}
                  </p>
                </div>
              ))}
            </div>

            <CalloutBox type="insight" content={data.reflection.closing} />

            {/* Closing call to action buttons */}
            <div className="text-center py-10 space-y-6 border-t border-white/5 pt-10">
              <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold tracking-tight text-white sm:text-2xl max-w-lg mx-auto">
                Ready to review the systems repository or discuss multi-agent pipelines?
              </h3>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://github.com/Sankalp1729/Unified-Context-AI-System"
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
          </motion.div>
        </section>
      </div>
    </CaseStudyLayout>
  );
}
