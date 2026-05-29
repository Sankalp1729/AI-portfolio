"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  cardLift,
  fadeUp,
  sectionStagger,
  viewportReveal,
} from "../../lib/animations";
import { experienceShowcase } from "../../lib/data";

function useVisibleCount(target: number, active: boolean) {
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!active || prefersReducedMotion) {
      setValue(target);
      return;
    }

    let frameId = 0;
    const start = performance.now();
    const duration = 1200;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [active, prefersReducedMotion, target]);

  return value;
}

function AchievementBullet({ text, index }: { text: string; index: number }) {
  return (
    <motion.li
      className="flex gap-4 rounded-2xl border border-white/6 bg-black/25 p-4 text-sm leading-7 text-slate-200/90"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-200/15 bg-cyan-200/10 text-xs text-cyan-100/80">
        {index + 1}
      </span>
      <span>{text}</span>
    </motion.li>
  );
}

export default function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const showcase = experienceShowcase;
  const count = useVisibleCount(500, true);

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,#020617,#000000)] px-6 py-24 text-white sm:px-10 lg:px-16"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.08),transparent_26%)]"
        animate={
          prefersReducedMotion ? { opacity: 0.75 } : { opacity: [0.6, 1, 0.6] }
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
            Where I've Worked
          </motion.p>
          <motion.h2
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            variants={fadeUp}
          >
            Production AI systems with measurable impact.
          </motion.h2>
        </div>

        <motion.article
          className="grid gap-8 rounded-[34px] border border-white/8 bg-[rgba(255,255,255,0.04)] p-6 backdrop-blur-2xl lg:grid-cols-[240px_1fr] lg:p-8"
          variants={cardLift}
        >
          <div className="flex gap-5 lg:flex-col lg:items-center lg:gap-6">
            <div className="relative flex flex-col items-center">
              <motion.div
                className="flex h-24 w-24 items-center justify-center rounded-[24px] border border-blue-400/30 bg-[linear-gradient(180deg,rgba(59,130,246,0.35),rgba(124,58,237,0.2))] text-2xl font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.28)]"
                animate={
                  prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.04, 1] }
                }
                transition={{
                  duration: 3.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                BI
              </motion.div>
              <div className="mt-4 h-28 w-px bg-gradient-to-b from-blue-400/60 via-white/10 to-transparent" />
              <div className="absolute -bottom-1 h-4 w-4 rounded-full border border-blue-300/70 bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.55)]" />
            </div>
            <div className="pt-1 text-xs uppercase tracking-[0.34em] text-slate-400 lg:text-center">
              {showcase.location}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-3xl font-semibold text-white">
                  {showcase.company}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-cyan-100/70">
                  {showcase.role}
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-slate-300/90">
                {showcase.period}
              </div>
            </div>

            <ul className="space-y-4">
              {showcase.bullets.map((bullet, index) => (
                <AchievementBullet key={bullet} text={bullet} index={index} />
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              {showcase.highlights.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-cyan-200/15 bg-cyan-200/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-50/80"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Articles processed", value: `${count}+` },
                { label: "Accuracy", value: "88%+" },
                { label: "Team", value: "4 people" },
                { label: "Location", value: showcase.location },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/6 bg-black/25 p-4"
                >
                  <div className="text-2xl font-semibold text-white">
                    {item.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.28em] text-slate-400">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
}
