"use client";

import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

interface CaseStudyHeroProps {
  title: string;
  tagline: string;
  tags: string[];
  stats: Stat[];
  accentColor: string;
}

export default function CaseStudyHero({
  title,
  tagline,
  tags,
  stats,
  accentColor,
}: CaseStudyHeroProps) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      className="space-y-10"
    >
      <div className="space-y-4">
        {/* Tag pills row: glass style border badges */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] font-semibold text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title: Syne font, 64px desktop / 40px mobile, gradient white→accentColor */}
        <h1
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff, ${accentColor})`,
          }}
          className="font-[family-name:var(--font-syne)] text-[40px] font-extrabold leading-tight tracking-tight sm:text-[64px] bg-clip-text text-transparent"
        >
          {title}
        </h1>

        {/* Tagline: text-xl text-secondary max-w-2xl */}
        <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-300">
          {tagline}
        </p>
      </div>

      {/* Stats: 2x2 grid of glass cards, value in Syne 32px accentColor, label text-xs muted */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 pt-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 text-center flex flex-col justify-center border border-white/5 bg-white/2 backdrop-blur-md rounded-2xl"
          >
            <span
              style={{ color: accentColor }}
              className="text-2xl sm:text-3xl font-extrabold font-[family-name:var(--font-syne)]"
            >
              {stat.value}
            </span>
            <span className="mt-2 text-[11px] uppercase tracking-[0.16em] text-slate-400 leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
