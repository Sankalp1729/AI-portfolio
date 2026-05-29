"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { fadeUp } from "../../lib/animations";
import { heroRoles, siteConfig } from "../../lib/data";

const ParticleField = dynamic(() => import("../3d/ParticleField"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

const HeroSphere = dynamic(() => import("../3d/HeroSphere"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-[32px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_50%)]" />
  ),
});

const name = "Sankalp Pingalwad";

const sectionVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
} as const;

const nameContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08,
    },
  },
} as const;

const nameLetterVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  const activeRole = heroRoles[roleIndex] ?? heroRoles[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % heroRoles.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, []);

  const letters = useMemo(() => {
    const counts = new Map<string, number>();

    return Array.from(name).map((letter) => {
      const occurrence = counts.get(letter) ?? 0;
      counts.set(letter, occurrence + 1);

      return {
        letter,
        key: `${letter}-${occurrence}`,
      };
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#050505] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(124,58,237,0.11),transparent_28%),linear-gradient(to_bottom,rgba(5,5,5,0.96),rgba(5,5,5,0.92))]" />
      <div className="absolute inset-0 opacity-85">
        <ParticleField />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-28 sm:px-10 lg:px-16">
        <motion.div
          className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-3xl">
            <motion.p
              className="mb-5 text-sm uppercase tracking-[0.42em] text-cyan-200/70"
              variants={fadeUp}
            >
              Available for opportunities · Mumbai, India
            </motion.p>

            <motion.h1
              className="text-[48px] font-bold leading-[0.92] tracking-tight text-white sm:text-[64px] lg:text-[80px]"
              variants={nameContainerVariants}
            >
              {letters.map(({ letter, key }) => (
                <motion.span
                  key={key}
                  className={
                    letter === " " ? "inline-block w-[0.28em]" : "inline-block"
                  }
                  variants={nameLetterVariants}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h1>

            <div className="mt-7 h-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRole}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="inline-flex rounded-full border border-cyan-200/12 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.32em] text-cyan-50/80 backdrop-blur-xl"
                >
                  {activeRole}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.p
              className="mt-8 max-w-2xl text-base leading-8 text-slate-300/92 sm:text-lg"
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
                className="inline-flex items-center justify-center rounded-full border border-blue-500 bg-blue-500 px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(59,130,246,0.22)] transition hover:translate-y-[-1px] hover:bg-blue-600"
              >
                View Projects →
              </a>
              <a
                href={siteConfig.resume}
                download
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-transparent px-8 py-3.5 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Download Resume
              </a>
            </motion.div>
          </div>

          <motion.div
          className="relative h-[360px] sm:h-[420px] lg:h-[560px]"
            variants={fadeUp}
          >
            <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.12),transparent_35%)] blur-2xl" />
          <div className="relative h-full overflow-hidden rounded-[36px] border border-white/10 bg-[rgba(255,255,255,0.03)] backdrop-blur-xl">
            <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="h-56 w-56 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(96,165,250,0.9),rgba(59,130,246,0.38)_36%,rgba(124,58,237,0.18)_68%,transparent_100%)] blur-[2px]" />
            </div>
            <div className="absolute inset-0 hidden lg:block">
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
        >
          <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-300/70">
            <span>Scroll to explore</span>
            <motion.span
              className="inline-flex h-5 w-5 rotate-45 border-b border-r border-cyan-200/80"
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
