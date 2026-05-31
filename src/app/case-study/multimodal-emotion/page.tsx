"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import SectionLabel from "@/components/case-study/SectionLabel";
import TradeOffTable from "@/components/case-study/TradeOffTable";
import CalloutBox from "@/components/case-study/CalloutBox";
import { emotionCaseStudy } from "@/data/case-studies";

const defaultSections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "solution", label: "Ablation Study" },
  { id: "architecture", label: "Architecture" },
  { id: "tradeoffs", label: "Trade-offs" },
  { id: "metrics", label: "Outcomes" },
  { id: "reflection", label: "Reflection" },
];

export default function MultimodalEmotionCaseStudy() {
  const [activeStep, setActiveStep] = useState(0);
  const data = emotionCaseStudy;

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
      title: "Visual Branch",
      subtitle: "CNN Feature Capture",
      desc: "Video Frames ➔ OpenCV Face Detection ➔ CNN Feature Extractor ➔ Emotion Vector. Extracts micro-expressions with high temporal resolution, sensitive to facial occlusions.",
      color: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-300",
    },
    {
      title: "Audio Branch",
      subtitle: "Librosa MFCC extraction",
      desc: "Audio Signal ➔ Librosa MFCC ➔ CNN on Spectrogram ➔ Emotion Vector. Captures tone, pitch, and rhythmic cycles natively in under 8ms, functioning if visual is completely blocked.",
      color: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-300",
    },
    {
      title: "Textual Branch",
      subtitle: "LSTM Sequence parsing",
      desc: "Transcript ➔ Tokenization ➔ LSTM Sequence Model ➔ Emotion Vector. Leverages linguistic parameters, resolving contextual ambiguities when visual and audio are subtle.",
      color: "from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-300",
    },
    {
      title: "Late Fusion Layer",
      subtitle: "Decision Level Concatenation",
      desc: "Decomposed parallel combination step. Takes the three distinct branches' output confidence arrays and concatenates them dynamically based on channel noise parameters.",
      color: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300",
    },
    {
      title: "6-class Softmax",
      subtitle: "Final Emotion Tags",
      desc: "Outputs Happy, Sad, Angry, Fearful, Disgusted, and Surprised micro-expressions. Runs under 100ms real-world inference loop latency on standard CPUs.",
      color: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300",
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
          <SectionLabel number="01 / RESEARCH OVERVIEW" title="Decoupled Decision-Level Fusion Research" />

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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold font-[family-name:var(--font-syne)] text-base">
                  0{idx + 1}
                </div>
                <h3 className="font-semibold text-white text-sm">{card.title}</h3>
                <p className="text-xs leading-relaxed text-slate-400">{card.desc}</p>
              </div>
            ))}
          </motion.div>

          <CalloutBox type="tradeoff" content={data.problem.whyBuilt} />
        </section>

        {/* SECTION 3: RESEARCH BACKGROUND */}
        <section id="research" className="scroll-margin-top space-y-10">
          <SectionLabel number="03 / RESEARCH BACKGROUND" title={data.research.heading} />

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

            {/* 3 Modality Analysis Cards */}
            <div className="grid gap-5 sm:grid-cols-3">
              {data.research.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 border border-white/5 bg-white/2 backdrop-blur-md rounded-2xl space-y-3"
                >
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-orange-400 block border-b border-white/5 pb-2 font-[family-name:var(--font-syne)]">
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
                    <span className="rounded bg-orange-500/10 px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-orange-300 font-semibold border border-orange-500/25">
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

        {/* SECTION 4: SOLUTION (Ablation Study as Product Framework) */}
        <section id="solution" className="scroll-margin-top space-y-10">
          <SectionLabel number="04 / PRODUCT FRAMEWORK" title={data.solution.heading} />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="space-y-6"
          >
            <p className="text-base leading-8 text-slate-300">
              An ablation study removes one component at a time to measure its contribution. In product terms: it&apos;s a controlled experiment that tells you which features actually matter.
            </p>

            {/* 3 Strategy results comparison cards */}
            <div className="grid gap-5 sm:grid-cols-3 pt-2">
              {data.solution.decisions.map((dec, idx) => {
                const isWinner = idx === 1; // Late Fusion
                return (
                  <div
                    key={idx}
                    className={`glass-panel p-6 border rounded-2xl flex flex-col justify-between min-h-[220px] transition duration-300 ${
                      isWinner
                        ? "border-orange-500/35 bg-orange-500/5 hover:border-orange-500/50"
                        : "border-white/5 bg-white/2 hover:border-white/10"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <h4 className="font-bold text-white text-xs uppercase tracking-wider font-[family-name:var(--font-syne)]">
                          {idx === 0 ? "Early Fusion" : idx === 1 ? "Late Fusion" : "Hybrid Fusion"}
                        </h4>
                        {isWinner && (
                          <span className="rounded bg-orange-500 text-white font-black text-[8px] uppercase tracking-widest px-2 py-0.5 shadow-[0_0_12px_rgba(249,115,22,0.4)]">
                            WINNER
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                        Choice: {dec.choice}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {dec.rationale}
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-3 mt-4 text-[10px] text-orange-400 font-semibold uppercase tracking-wider">
                      Result: {dec.tradeoff}
                    </div>
                  </div>
                );
              })}
            </div>

            <CalloutBox
              type="insight"
              content="The ablation study is the most honest part of this project. I went in expecting hybrid fusion to win — it didn't. Late fusion won because modality independence matters more than shared representation at this dataset scale."
            />
          </motion.div>
        </section>

        {/* SECTION 5: ARCHITECTURE */}
        <section id="architecture" className="scroll-margin-top space-y-10">
          <SectionLabel number="05 / PIPELINE ARCHITECTURE" title="3-Branch Late-Fusion Architecture" />

          {/* Interactive Agent Flow Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="space-y-6"
          >
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Interactive Workflow Pipeline (Click nodes to inspect channels)
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
                    Pipeline Node 0{activeStep + 1}: {pipelineSteps[activeStep].title} ({pipelineSteps[activeStep].subtitle})
                  </h5>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                    {pipelineSteps[activeStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* SECTION 6: TRADE-OFFS */}
        <section id="tradeoffs" className="scroll-margin-top space-y-10">
          <SectionLabel number="06 / TRADE-offs TABLE" title="Rigorous Ablation & Model Trade-offs" />
          <TradeOffTable rows={data.tradeoffs} />
        </section>

        {/* SECTION 7: METRICS */}
        <section id="metrics" className="scroll-margin-top space-y-10">
          <SectionLabel number="07 / OUTCOMES & METRICS" title="Research Evaluation Outcomes" />

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
                <span className="text-2xl sm:text-3xl font-extrabold font-[family-name:var(--font-syne)] text-orange-400">
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
                    <span className="text-xs font-mono font-semibold text-orange-300">V2.0{idx + 1}</span>
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

            <CalloutBox type="tradeoff" content={data.reflection.closing} />

            {/* Closing call to action buttons */}
            <div className="text-center py-10 space-y-6 border-t border-white/5 pt-10">
              <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold tracking-tight text-white sm:text-2xl max-w-lg mx-auto">
                Ready to review the fusion training configurations or discuss deep learning?
              </h3>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://github.com/Sankalp1729/Multimodal-Emotion-Recognition"
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
