"use client";

import { motion } from "framer-motion";
import { fadeUp, sectionStagger, viewportReveal } from "@/lib/animations";
import { journeyTimeline } from "@/data/timeline";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const cardVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 48 : -48,
    y: 18,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;

export default function TimelineSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="timeline"
      aria-label="Career timeline"
      className="relative overflow-hidden bg-[var(--bg-surface)] px-6 py-24 text-[var(--text-primary)] sm:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.08),transparent_36%)]"
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
            The Journey
          </motion.h2>
          <motion.p
            className="max-w-2xl text-lg text-[var(--text-secondary)]"
            variants={fadeUp}
          >
            From first Python script to production AI systems.
          </motion.p>
        </div>

        <div className="relative pl-5 sm:pl-8">
          <div
            className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-[var(--accent-blue)] via-[var(--accent-purple)] to-transparent sm:left-4"
            aria-hidden
          />
          <ol className="space-y-8">
            {journeyTimeline.map((item, index) => {
              const side = index % 2 === 0 ? -1 : 1;

              return (
                <li key={item.year} className="relative list-none">
                  <motion.div
                    className="absolute left-[-2px] top-7 z-10 flex h-5 w-5 items-center justify-center sm:left-[2px]"
                    animate={
                      prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.18, 1] }
                    }
                    transition={{
                      duration: 2.8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    aria-hidden
                  >
                    <span className="absolute h-5 w-5 rounded-full bg-blue-400/30 blur-[2px]" />
                    <span className="relative h-3 w-3 rounded-full bg-[var(--accent-blue)] shadow-[0_0_18px_rgba(59,130,246,0.8)]" />
                  </motion.div>

                  <motion.article
                    custom={side}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportReveal}
                    className={`ml-8 glass-panel p-6 sm:ml-12 ${index % 2 === 0 ? "lg:mr-24" : "lg:ml-24"}`}
                  >
                    <div className="inline-flex rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-xs uppercase tracking-[0.34em] text-blue-100">
                      {item.year}
                    </div>
                    <h3 className="mt-4 font-[family-name:var(--font-syne)] text-2xl font-bold sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                      {item.description}
                    </p>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
