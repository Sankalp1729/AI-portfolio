"use client";

import { motion } from "framer-motion";
import {
  cardLift,
  fadeUp,
  sectionStagger,
  viewportReveal,
} from "../../lib/animations";
import { recognitionItems } from "../../lib/data";

function NeuralIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-7 w-7 text-blue-100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 32h8m16 0h8M24 20l8 12m0 0 8-12M24 44l8-12m0 0 8 12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="32" r="3.5" fill="currentColor" opacity="0.9" />
      <circle cx="32" cy="20" r="3.5" fill="currentColor" opacity="0.9" />
      <circle cx="32" cy="32" r="4.4" fill="currentColor" opacity="0.9" />
      <circle cx="32" cy="44" r="3.5" fill="currentColor" opacity="0.9" />
      <circle cx="48" cy="32" r="3.5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function BarsIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-7 w-7 text-violet-100"
      fill="none"
      aria-hidden="true"
    >
      <rect x="14" y="34" width="8" height="16" rx="2" fill="currentColor" />
      <rect x="28" y="26" width="8" height="24" rx="2" fill="currentColor" />
      <rect x="42" y="18" width="8" height="32" rx="2" fill="currentColor" />
      <path
        d="M12 50h40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-7 w-7 text-orange-100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22 18h20v6a10 10 0 0 1-10 10h0a10 10 0 0 1-10-10v-6Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M26 34h12v4a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6v-4Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M24 22H16a6 6 0 0 0 6 8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 22h8a6 6 0 0 1-6 8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 44h8m-10 6h12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const icons = {
  neural: <NeuralIcon />,
  bars: <BarsIcon />,
  trophy: <TrophyIcon />,
} as const;

export default function CertificationsSection() {
  return (
    <section
      id="achievements"
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,#020617,#000000)] px-6 py-24 text-white sm:px-10 lg:px-16"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_38%)]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 9,
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
            Recognition
          </motion.p>
          <motion.h2
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            variants={fadeUp}
          >
            Awards and credentials with premium treatment.
          </motion.h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {recognitionItems.map((item, index) => (
            <motion.article
              key={item.title}
              className="relative overflow-hidden rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-6 backdrop-blur-2xl transition hover:border-blue-400/30 hover:shadow-[0_0_32px_rgba(59,130,246,0.14)]"
              variants={cardLift}
              whileHover={{ y: -4 }}
            >
              <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-slate-300/80">
                {item.issuer}
              </div>

              <div className="flex items-start justify-between gap-4 pr-14">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/25 shadow-[0_0_24px_rgba(59,130,246,0.15)]">
                  {icons[item.icon]}
                </div>
                <div className="text-right text-xs uppercase tracking-[0.3em] text-slate-400">
                  Card {index + 1}
                </div>
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-white">
                {item.title}
              </h3>
              <div className="mt-3 inline-flex rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-blue-100">
                {item.date}
              </div>
              {item.org ? (
                <p className="mt-4 text-sm uppercase tracking-[0.28em] text-slate-400">
                  {item.org}
                </p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
