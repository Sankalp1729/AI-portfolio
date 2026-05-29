"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";
import type { ShowcaseProject } from "../../lib/data";

type ProjectCardProps = {
  project: ShowcaseProject;
  index: number;
  active: boolean;
  onToggle: (index: number) => void;
};

const accentStyles = {
  blue: {
    line: "from-blue-400 to-purple-500",
    badge: "border-blue-400/25 text-blue-100",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
  },
  purple: {
    line: "from-violet-400 to-fuchsia-500",
    badge: "border-violet-400/25 text-violet-100",
    glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
  },
  teal: {
    line: "from-cyan-400 to-blue-500",
    badge: "border-cyan-400/25 text-cyan-100",
    glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
  },
  coral: {
    line: "from-orange-400 to-rose-500",
    badge: "border-orange-400/25 text-orange-100",
    glow: "hover:shadow-[0_0_30px_rgba(251,146,60,0.2)]",
  },
} as const;

export default function ProjectCard({
  project,
  index,
  active,
  onToggle,
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 18, mass: 0.7 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 18, mass: 0.7 });
  const styles = accentStyles[project.accent];
  const number = project.number ?? String(index + 1).padStart(2, "0");

  useEffect(() => {
    if (prefersReducedMotion) {
      tiltX.set(0);
      tiltY.set(0);
    }
  }, [prefersReducedMotion, tiltX, tiltY]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) {
      return;
    }

    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (event.clientX - centerX) / (rect.width / 2);
    const offsetY = (event.clientY - centerY) / (rect.height / 2);
    const maxTilt = 8;

    tiltY.set(Math.max(Math.min(offsetX * maxTilt, maxTilt), -maxTilt));
    tiltX.set(Math.max(Math.min(-offsetY * maxTilt, maxTilt), -maxTilt));
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      data-hoverable="true"
      layout
      className={`group relative overflow-hidden rounded-[30px] border border-[rgba(255,255,255,0.06)] bg-[#0f0f1a] p-6 text-white backdrop-blur-xl transition-all duration-300 ${styles.glow} will-change-transform`}
      style={{
        perspective: 1200,
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <motion.div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r ${styles.line}`}
        animate={{ scaleX: active ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      <div className="pointer-events-none absolute -right-2 top-2 select-none text-[92px] font-semibold leading-none tracking-[-0.08em] text-white/4 sm:text-[108px]">
        {number}
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div className="max-w-[80%]">
          <div className="text-xs uppercase tracking-[0.34em] text-slate-400">
            {number}
          </div>
          <h3 className="mt-3 font-[family-name:var(--font-syne)] text-[22px] font-semibold leading-tight text-white">
            {project.title}
          </h3>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.26em] ${styles.badge} bg-white/5 backdrop-blur-xl`}
        >
          {project.accent}
        </span>
      </div>

      <p className="relative mt-5 max-w-2xl text-sm leading-7 text-slate-300/88">
        {project.tagline}
      </p>

      <p className="relative mt-3 max-w-3xl text-sm leading-7 text-slate-400">
        {project.description}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-200/80"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="relative mt-6 flex items-center justify-between gap-4 border-t border-white/6 pt-5">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-slate-300/80 transition hover:text-white"
        >
          GitHub
        </a>
        <button
          type="button"
          onClick={() => onToggle(index)}
          className="text-sm text-blue-300 transition hover:text-blue-200"
        >
          {active ? "Collapse Details ↑" : "View Details →"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {active ? (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 grid gap-4 border-t border-white/6 pt-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <p className="text-sm leading-7 text-slate-300/90">
                  {project.fullDescription}
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="rounded-2xl border border-white/6 bg-black/25 px-4 py-4 text-sm text-slate-200/90"
                    >
                      {metric}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/6 bg-black/25 p-5">
                <div className="text-xs uppercase tracking-[0.32em] text-slate-400">
                  Architecture notes
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300/88">
                  {project.architectureNotes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-blue-100 transition hover:bg-blue-500/20"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-100 transition hover:border-white/20 hover:bg-white/10"
                  >
                    Live / Demo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
