"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { fadeUp, sectionStagger, viewportReveal } from "../../lib/animations";
import { skillCategories } from "../../lib/data";

const tabOrder = [
  "Languages",
  "ML",
  "LLMs",
  "Vision",
  "Deploy",
  "Data",
  "DB",
  "Viz",
] as const;

const tabLabels: Record<(typeof tabOrder)[number], string> = {
  Languages: "Languages",
  ML: "ML",
  LLMs: "LLMs & Agents",
  Vision: "Vision & Speech",
  Deploy: "Deployment",
  Data: "Data Engineering",
  DB: "Databases",
  Viz: "Visualization",
};

function SkillChip({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.div
      className="flex items-center gap-3 rounded-2xl border border-white/6 bg-black/25 px-4 py-3 text-sm text-slate-200/90"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: "easeOut" }}
    >
      <span>{skill}</span>
    </motion.div>
  );
}

export default function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] =
    useState<(typeof tabOrder)[number]>("LLMs");
  const activeCategory = useMemo(
    () =>
      skillCategories.find((category) => category.label === activeTab) ??
      skillCategories[0],
    [activeTab],
  );

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,#020617,#000000)] px-6 py-24 text-white sm:px-10 lg:px-16"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(124,58,237,0.08),transparent_24%)]"
        animate={
          prefersReducedMotion
            ? { opacity: 0.75 }
            : { opacity: [0.65, 1, 0.65] }
        }
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="mx-auto max-w-7xl space-y-10"
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
      >
        <div className="space-y-4">
          <motion.p
            className="text-sm uppercase tracking-[0.42em] text-cyan-200/70"
            variants={fadeUp}
          >
            Technical Arsenal
          </motion.p>
          <motion.h2
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            variants={fadeUp}
          >
            Everything I use to build, train, and ship AI systems.
          </motion.h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-[32px] border border-white/8 bg-[rgba(255,255,255,0.04)] p-4 backdrop-blur-2xl">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {tabOrder.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-2xl border px-4 py-4 text-left text-sm uppercase tracking-[0.3em] transition ${activeTab === tab ? "border-blue-400/40 bg-blue-500/10 text-white" : "border-white/6 bg-black/20 text-slate-300/85 hover:border-white/12 hover:bg-white/5"}`}
                >
                  {tabLabels[tab]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/8 bg-[rgba(255,255,255,0.04)] p-5 backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.34em] text-cyan-100/60">
                    {activeCategory.group}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    {activeCategory.label}
                  </h3>
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {activeCategory.skills.length} skills
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {activeCategory.skills.map((skill, index) => (
                  <SkillChip
                    key={`${activeCategory.label}-${skill}`}
                    skill={skill}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <motion.div className="relative min-h-[300px] overflow-hidden rounded-[32px] border border-white/8 bg-[rgba(255,255,255,0.04)] p-5 backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_46%)]" />
              <div className="relative flex h-full items-center justify-center">
                <div className="relative h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]">
                  {activeCategory.orbs.map((orb) => (
                    <motion.div
                      key={`${activeCategory.label}-${orb.label}`}
                      className="absolute flex items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(59,130,246,0.22),rgba(124,58,237,0.12))] text-xs font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                      style={{
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        width: orb.size,
                        height: orb.size,
                      }}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.4 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 1, scale: 1, y: -8 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 18,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: orb.delay,
                      }}
                    >
                      {orb.label}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
