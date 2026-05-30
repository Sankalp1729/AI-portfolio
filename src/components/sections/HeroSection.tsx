"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { fadeUp } from "@/lib/animations";
import { heroRoles } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useParallax } from "@/hooks/useParallax";

const ParticleField = dynamic(() => import("@/components/3d/ParticleField"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[var(--bg-base)]" aria-hidden />,
});

const HeroSphere = dynamic(() => import("@/components/3d/HeroSphere"), {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full rounded-[32px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_50%)]"
      aria-hidden
    />
  ),
});

const sectionVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
} as const;

const nameContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
} as const;

const nameLetterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

const displayName = "Sankalp Pingalwad";

export default function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const activeRole = heroRoles[roleIndex] ?? heroRoles[0];
  const { ref: parallaxRef, y: backgroundY } = useParallax(0.15);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % heroRoles.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, []);

  const words = displayName.split(" ");

  return (
    <section
      id="home"
      ref={parallaxRef}
      aria-label="Hero introduction"
      className="relative min-h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(124,58,237,0.11),transparent_28%)]"
        aria-hidden
      />
      <div className="absolute inset-0 opacity-90" aria-hidden>
        <ParticleField />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-28 sm:px-10 lg:px-16">
        <motion.div
          className="grid w-full items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-14"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left content — 60% */}
          <div className="max-w-3xl">
            <motion.p
              className="mb-5 text-sm uppercase tracking-[0.42em] text-[var(--text-secondary)]"
              variants={fadeUp}
            >
              Available for opportunities · Mumbai, India
            </motion.p>

            <motion.h1
              className="font-[family-name:var(--font-syne)] text-[48px] font-bold leading-[0.92] tracking-tight text-white sm:text-[64px] lg:text-[80px]"
              variants={nameContainerVariants}
            >
              {words.map((word, wordIndex) => (
                <span key={word} className="inline-block whitespace-nowrap">
                  {Array.from(word).map((letter, letterIndex) => (
                    <motion.span
                      key={`${word}-${letter}-${letterIndex}`}
                      className="inline-block"
                      variants={nameLetterVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  {wordIndex < words.length - 1 ? (
                    <span aria-hidden className="inline-block w-[0.28em]" />
                  ) : null}
                </span>
              ))}
            </motion.h1>

            <div className="mt-7 h-12 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeRole}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-sm font-medium uppercase tracking-[0.32em] text-[var(--accent-blue)]"
                  aria-live="polite"
                >
                  {activeRole}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.p
              className="mt-8 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg"
              variants={fadeUp}
            >
              I design and deploy production AI systems — from RAG pipelines and
              multi-agent architectures to multimodal deep learning. End-to-end,
              from architecture to CI/CD.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-col gap-4 sm:flex-row"
              variants={fadeUp}
            >
              <a
                href="#projects"
                data-hoverable="true"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent-blue)] px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(59,130,246,0.22)] transition hover:bg-[var(--accent-blue-glow)]"
              >
                View Projects →
              </a>
              <a
                href="/resume/resume.pdf"
                download="Sankalp_Pingalwad_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                data-hoverable="true"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-transparent px-8 py-3.5 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/5"
              >
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* Right content — 40% */}
          <motion.div
            className="relative h-[360px] sm:h-[420px] lg:h-[560px]"
            variants={fadeUp}
            aria-hidden
          >
            <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.12),transparent_35%)] blur-2xl" />
            <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[36px] border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <HeroSphere />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">
            <span>Scroll to explore</span>
            <motion.span
              className="inline-flex h-5 w-5 rotate-45 border-b border-r border-[var(--accent-blue)]"
              animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
              transition={{
                duration: 1.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
