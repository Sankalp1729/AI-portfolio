"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { skillCategories } from "@/data/skills";
import { fadeUp, sectionStagger, viewportReveal } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const tabOrder = [
  "Languages",
  "ML",
  "AI/ML",
  "LLMs",
  "Vision",
  "Deploy",
  "Data",
  "DB",
  "Viz",
  "Tools",
] as const;

type TabKey = (typeof tabOrder)[number];

const tabLabels: Record<TabKey, string> = {
  Languages: "Languages",
  ML: "ML",
  "AI/ML": "AI/ML",
  LLMs: "LLMs & Agents",
  Vision: "Vision & Speech",
  Deploy: "Deployment",
  Data: "Data Engineering",
  DB: "Databases",
  Viz: "Visualization",
  Tools: "Tools",
};

function SkillChip({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.div
      className="rounded-2xl border border-[var(--border)] bg-black/25 px-4 py-3 text-sm text-[var(--text-primary)]"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: index * 0.04,
      }}
    >
      <span>{skill}</span>
    </motion.div>
  );
}

export default function SkillsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState<TabKey>("LLMs");

  const activeCategory = useMemo(
    () =>
      skillCategories.find((category) => category.label === activeTab) ??
      skillCategories[0],
    [activeTab],
  );

  return (
    <section
      id="skills"
      aria-label="Technical skills"
      className="relative overflow-hidden bg-[var(--bg-base)] px-6 py-24 text-[var(--text-primary)] sm:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_30%)]"
        aria-hidden
      />

      <motion.div
        className="mx-auto max-w-7xl space-y-10"
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
      >
        <div className="space-y-4">
          <motion.h2
            className="font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight sm:text-5xl"
            variants={fadeUp}
          >
            Technical Arsenal
          </motion.h2>
          <motion.p
            className="max-w-2xl text-lg text-[var(--text-secondary)]"
            variants={fadeUp}
          >
            Everything I use to build, train, and ship AI systems.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="glass-panel p-4">
            <div
              className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1"
              role="tablist"
              aria-label="Skill categories"
            >
              {tabOrder.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  data-hoverable="true"
                  className={`rounded-2xl border px-4 py-3 text-left text-sm uppercase tracking-[0.24em] transition ${
                    activeTab === tab
                      ? "border-blue-400/40 bg-blue-500/10 text-white"
                      : "border-[var(--border)] bg-black/20 text-[var(--text-secondary)] hover:border-white/12 hover:bg-white/5"
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div
              className="glass-panel p-5"
              role="tabpanel"
              aria-label={tabLabels[activeTab]}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.34em] text-[var(--text-muted)]">
                    {activeCategory.group}
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-syne)] text-2xl font-bold">
                    {tabLabels[activeTab]}
                  </h3>
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
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

            {/* Floating skill orbs — spring entrance on tab change */}
            <motion.div
              key={activeCategory.label}
              className="relative min-h-[300px] overflow-hidden glass-panel p-5"
            >
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
                          : { opacity: 0, scale: 0.4, y: 20 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1, scale: 1, y: 0 }
                          : { opacity: 1, scale: 1, y: [-6, 6, -6] }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        delay: orb.delay,
                        y: {
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        },
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
