"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";
import type { ShowcaseProject } from "@/types";
import Link from "next/link";

type ProjectCardProps = {
  project: ShowcaseProject;
  index: number;
  active: boolean;
  onToggle: (index: number) => void;
};

const accentStyles = {
  blue: {
    line: "from-[var(--accent-blue)] to-[var(--accent-purple)]",
    badge: "border-blue-400/25 text-[var(--text-secondary)]",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    watermark: "text-white/5",
  },
  purple: {
    line: "from-violet-400 to-fuchsia-500",
    badge: "border-violet-400/25 text-[var(--text-secondary)]",
    glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    watermark: "text-white/5",
  },
  teal: {
    line: "from-cyan-400 to-blue-500",
    badge: "border-cyan-400/25 text-[var(--text-secondary)]",
    glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
    watermark: "text-white/5",
  },
  coral: {
    line: "from-orange-400 to-rose-500",
    badge: "border-orange-400/25 text-[var(--text-secondary)]",
    glow: "hover:shadow-[0_0_30px_rgba(251,146,60,0.2)]",
    watermark: "text-white/5",
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
  const rotateX = useSpring(tiltX, { stiffness: 400, damping: 25 });
  const rotateY = useSpring(tiltY, { stiffness: 400, damping: 25 });
  const styles = accentStyles[project.accent];
  const number = String(index + 1).padStart(2, "0");

  useEffect(() => {
    if (prefersReducedMotion) {
      tiltX.set(0);
      tiltY.set(0);
    }
  }, [prefersReducedMotion, tiltX, tiltY]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;

    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

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
      className={`group relative overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--bg-card)] p-6 backdrop-blur-xl transition-shadow duration-300 ${styles.glow}`}
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
      {/* Accent line — animates width on hover */}
      <motion.div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r ${styles.line}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      {/* Watermark project number */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-2 top-10 select-none font-[family-name:var(--font-syne)] text-[7rem] font-bold leading-none ${styles.watermark}`}
      >
        {number}
      </span>

      <div className="relative">
        <h3 className="font-[family-name:var(--font-syne)] text-[22px] font-semibold leading-tight text-white">
          {project.title}
        </h3>
      </div>

      <p className="relative mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
        {project.tagline}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className={`rounded-full border bg-[var(--glass-bg)] px-3 py-1 text-[11px] uppercase tracking-[0.24em] ${styles.badge}`}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="relative mt-6 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-5">
        <div className="flex gap-4 items-center">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            data-hoverable="true"
            className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--accent-blue)]"
          >
            GitHub
          </a>
          {(project.title === "MailMind AI" || project.title === "DocuMind AI" || project.title === "Unified Context AI System" || project.title === "Multimodal Emotion Recognition") && (
            <Link
              href={
                project.title === "MailMind AI"
                  ? "/case-study/mailmind"
                  : project.title === "DocuMind AI"
                  ? "/case-study/documind"
                  : project.title === "Unified Context AI System"
                  ? "/case-study/unified-context"
                  : "/case-study/multimodal-emotion"
              }
              data-hoverable="true"
              className={`text-sm font-medium transition duration-300 ${
                project.accent === "purple"
                  ? "text-[var(--accent-purple)] hover:text-purple-300"
                  : project.accent === "teal"
                  ? "text-[#14B8A6] hover:text-teal-300"
                  : project.accent === "coral"
                  ? "text-[#FB923C] hover:text-orange-300"
                  : "text-[var(--accent-blue)] hover:text-blue-300"
              }`}
            >
              Case Study ➔
            </Link>
          )}
        </div>
        <button
          type="button"
          data-hoverable="true"
          onClick={() => onToggle(index)}
          className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--accent-blue)]"
          aria-expanded={active}
        >
          {active ? "Collapse Details ↑" : "View Details →"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {active ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 grid gap-4 border-t border-[var(--border)] pt-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  {project.description}
                </p>
                <p className="text-sm leading-7 text-[var(--text-muted)]">
                  {project.fullDescription}
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="glass-panel px-4 py-4 text-sm text-[var(--text-primary)]"
                    >
                      {metric}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-5">
                <div className="text-xs uppercase tracking-[0.32em] text-[var(--text-muted)]">
                  Architecture notes
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {project.architectureNotes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-blue)]" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    data-hoverable="true"
                    className="rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-blue-100 transition hover:bg-blue-500/20"
                  >
                    GitHub
                  </a>
                  {project.title === "MailMind AI" || project.title === "DocuMind AI" || project.title === "Unified Context AI System" || project.title === "Multimodal Emotion Recognition" ? (
                    <Link
                      href={
                        project.title === "MailMind AI"
                          ? "/case-study/mailmind"
                          : project.title === "DocuMind AI"
                          ? "/case-study/documind"
                          : project.title === "Unified Context AI System"
                          ? "/case-study/unified-context"
                          : "/case-study/multimodal-emotion"
                      }
                      data-hoverable="true"
                      className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em] transition ${
                        project.accent === "purple"
                          ? "border-purple-400/40 bg-purple-500/10 text-purple-100 hover:bg-purple-500/20"
                          : project.accent === "teal"
                          ? "border-teal-400/40 bg-teal-500/10 text-teal-100 hover:bg-teal-500/20"
                          : project.accent === "coral"
                          ? "border-orange-400/40 bg-orange-500/10 text-orange-100 hover:bg-orange-500/20"
                          : "border-blue-400/40 bg-blue-500/10 text-blue-100 hover:bg-blue-500/20"
                      }`}
                    >
                      Case Study
                    </Link>
                  ) : (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      data-hoverable="true"
                      className="rounded-full border border-[var(--border)] bg-[var(--glass-bg)] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[var(--text-primary)] transition hover:border-white/20"
                    >
                      Live / Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
