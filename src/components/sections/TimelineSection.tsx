"use client";

import { motion } from "framer-motion";
import { fadeUp, sectionStagger, viewportReveal } from "../../lib/animations";
import { journeyTimeline } from "../../lib/data";

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
    transition: { duration: 0.55, ease: "easeOut" },
  },
} as const;

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-black px-6 py-24 text-white sm:px-10 lg:px-16"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.08),transparent_36%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.08),transparent_36%)]"
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{
          duration: 10,
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
            The Journey
          </motion.p>
          <motion.h2
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            variants={fadeUp}
          >
            From first Python script to production AI systems.
          </motion.h2>
        </div>

        <div className="relative pl-5 sm:pl-8">
          <div className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-blue-400 via-violet-400 to-transparent sm:left-4" />
          <div className="space-y-8">
            {journeyTimeline.map((item, index) => {
              const side = index % 2 === 0 ? -1 : 1;

              return (
                <div key={item.year} className="relative">
                  <motion.div
                    className="absolute left-[-2px] top-7 z-10 flex h-5 w-5 items-center justify-center sm:left-[2px]"
                    animate={{ scale: [1, 1.18, 1] }}
                    transition={{
                      duration: 2.8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="absolute h-5 w-5 rounded-full bg-blue-400/30 blur-[2px]" />
                    <span className="relative h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.8)]" />
                  </motion.div>

                  <motion.article
                    custom={side}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportReveal}
                    className={`ml-8 rounded-[28px] border border-white/8 bg-[rgba(255,255,255,0.04)] p-6 backdrop-blur-2xl sm:ml-12 ${index % 2 === 0 ? "lg:mr-24" : "lg:ml-24"}`}
                  >
                    <div className="inline-flex rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-xs uppercase tracking-[0.34em] text-blue-100">
                      {item.year}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300/88 sm:text-base">
                      {item.description}
                    </p>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
