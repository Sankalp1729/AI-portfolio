"use client";

import { motion } from "framer-motion";
import Counter from "@/components/animations/Counter";
import { experienceShowcase } from "@/data/experience";
import {
  cardLift,
  fadeUp,
  sectionStagger,
  viewportReveal,
} from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function AchievementBullet({ text, index }: { text: string; index: number }) {
  return (
    <motion.li
      className="flex gap-3 text-sm leading-7 text-[var(--text-secondary)]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <span className="shrink-0 font-[family-name:var(--font-space-mono)] text-[var(--accent-blue)]">
        →
      </span>
      <span>{text}</span>
    </motion.li>
  );
}

function HexLogo({ initials }: { initials: string }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="relative flex h-24 w-24 items-center justify-center bg-[linear-gradient(180deg,rgba(59,130,246,0.35),rgba(124,58,237,0.2))] text-2xl font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.28)]"
      style={{
        clipPath:
          "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
      }}
      animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.04, 1] }}
      transition={{
        duration: 3.2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {initials}
    </motion.div>
  );
}

export default function ExperienceSection() {
  const showcase = experienceShowcase;

  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="relative overflow-hidden bg-[var(--bg-surface)] px-6 py-24 text-[var(--text-primary)] sm:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_38%)]"
        aria-hidden
      />

      <motion.div
        className="mx-auto max-w-7xl space-y-10"
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
      >
        <motion.h2
          className="font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight sm:text-5xl"
          variants={fadeUp}
        >
          Where I&apos;ve Worked
        </motion.h2>

        <motion.article
          className="grid gap-8 glass-panel p-6 lg:grid-cols-[240px_1fr] lg:p-8"
          variants={cardLift}
        >
          <div className="flex gap-5 lg:flex-col lg:items-center lg:gap-6">
            <div className="relative flex flex-col items-center">
              <HexLogo initials={showcase.logo} />
              <div
                className="mt-4 h-28 w-px bg-gradient-to-b from-[var(--accent-blue)]/60 via-white/10 to-transparent"
                aria-hidden
              />
              <div
                className="absolute -bottom-1 h-4 w-4 rounded-full border border-blue-300/70 bg-[var(--accent-blue)] shadow-[0_0_18px_rgba(59,130,246,0.55)]"
                aria-hidden
              />
            </div>
            <div className="pt-1 text-xs uppercase tracking-[0.34em] text-[var(--text-muted)] lg:text-center">
              {showcase.location}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-3xl font-bold">
                  {showcase.company}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                  {showcase.role}
                </p>
              </div>
              <div className="rounded-full border border-[var(--border)] bg-black/25 px-4 py-2 text-sm text-[var(--text-secondary)]">
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
                  className="rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-blue-100"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="glass-panel p-4">
                <div className="font-[family-name:var(--font-syne)] text-2xl font-bold">
                  <Counter target={500} suffix="+" />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
                  Articles processed
                </div>
              </div>
              {[
                { label: "Accuracy", value: "88%+" },
                { label: "Team", value: "4 people" },
                { label: "Location", value: showcase.location },
              ].map((item) => (
                <div key={item.label} className="glass-panel p-4">
                  <div className="font-[family-name:var(--font-syne)] text-2xl font-bold">
                    {item.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
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
