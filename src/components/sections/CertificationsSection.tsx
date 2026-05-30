"use client";

import { motion } from "framer-motion";
import {
  cardLift,
  fadeUp,
  sectionStagger,
  viewportReveal,
} from "@/lib/animations";
import { recognitionItems } from "@/data/timeline";

function NeuralIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-7 w-7 text-blue-100" fill="none" aria-hidden>
      <path d="M16 32h8m16 0h8M24 20l8 12m0 0 8-12M24 44l8-12m0 0 8 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="32" r="3.5" fill="currentColor" />
      <circle cx="32" cy="20" r="3.5" fill="currentColor" />
      <circle cx="32" cy="32" r="4.4" fill="currentColor" />
      <circle cx="32" cy="44" r="3.5" fill="currentColor" />
      <circle cx="48" cy="32" r="3.5" fill="currentColor" />
    </svg>
  );
}

function BarsIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-7 w-7 text-violet-100" fill="none" aria-hidden>
      <rect x="14" y="34" width="8" height="16" rx="2" fill="currentColor" />
      <rect x="28" y="26" width="8" height="24" rx="2" fill="currentColor" />
      <rect x="42" y="18" width="8" height="32" rx="2" fill="currentColor" />
      <path d="M12 50h40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-7 w-7 text-orange-100" fill="none" aria-hidden>
      <path d="M22 18h20v6a10 10 0 0 1-10 10h0a10 10 0 0 1-10-10v-6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M26 34h12v4a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6v-4Z" fill="currentColor" />
      <path d="M24 22H16a6 6 0 0 0 6 8M40 22h8a6 6 0 0 1-6 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M28 44h8m-10 6h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
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
      aria-label="Certifications and recognition"
      className="relative overflow-hidden bg-[var(--bg-base)] px-6 py-24 text-[var(--text-primary)] sm:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_38%)]"
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
          Recognition
        </motion.h2>

        <div className="grid gap-5 md:grid-cols-3">
          {recognitionItems.map((item) => (
            <motion.article
              key={item.title}
              data-hoverable="true"
              className="relative overflow-hidden glass-panel p-6 transition hover:border-blue-400/30 hover:shadow-[0_0_32px_rgba(59,130,246,0.14)]"
              variants={cardLift}
              whileHover={{ y: -4 }}
            >
              <div className="absolute right-5 top-5 rounded-full border border-[var(--border)] bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
                {item.issuer}
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-black/25 shadow-[0_0_24px_rgba(59,130,246,0.15)]">
                {icons[item.icon]}
              </div>

              <h3 className="mt-6 font-[family-name:var(--font-syne)] text-xl font-bold sm:text-2xl">
                {item.title}
              </h3>

              {"org" in item && item.org ? (
                <p className="mt-2 text-sm text-[var(--text-muted)]">{item.org}</p>
              ) : null}

              <div className="mt-4 inline-flex rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-blue-100">
                {item.date}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
