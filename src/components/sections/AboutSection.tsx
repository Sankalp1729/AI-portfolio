"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cardLift, fadeUp } from "../../lib/animations";

const stats = [
  { value: 500, suffix: "+", label: "Articles processed" },
  { value: 88, suffix: "%+", label: "Classification accuracy" },
  { value: 4, suffix: "", label: "Deployed AI systems" },
  { value: 2026, suffix: "", label: "Graduating" },
] as const;

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

function CountUp({
  value,
  suffix,
  active,
  forceComplete,
}: {
  value: number;
  suffix: string;
  active: boolean;
  forceComplete: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (forceComplete || prefersReducedMotion) {
      setCurrent(value);
      return;
    }

    if (!active) {
      setCurrent(0);
      return;
    }

    let frameId = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(value * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [active, forceComplete, prefersReducedMotion, value]);

  return (
    <span>
      {current}
      {suffix}
    </span>
  );
}

function StatCard({ value, suffix, label }: (typeof stats)[number]) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.45 });
  const [active, setActive] = useState(false);
  const [forceComplete, setForceComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setActive(true);
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      setForceComplete(true);
      setActive(true);
    }, 2000);

    return () => window.clearTimeout(fallbackTimer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (isInView) {
      setActive(true);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={cardRef}
      className="rounded-[26px] border border-cyan-200/10 bg-white/5 p-5 backdrop-blur-xl"
      variants={cardLift}
      whileHover={{ y: -4 }}
    >
      <div className="text-3xl font-semibold text-white">
        <CountUp
          value={value}
          suffix={suffix}
          active={active}
          forceComplete={forceComplete}
        />
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.3em] text-cyan-100/50">
        {label}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,#000000,#020617)] px-6 py-24 text-white sm:px-10 lg:px-16"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1),transparent_42%),radial-gradient(circle_at_80%_15%,rgba(124,58,237,0.08),transparent_30%)]"
        animate={
          prefersReducedMotion
            ? { opacity: 0.75 }
            : { opacity: [0.55, 1, 0.55] }
        }
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
      >
        <motion.div className="relative" variants={fadeUp}>
          <div className="absolute inset-0 -z-10 rounded-[36px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_54%)] blur-3xl" />
          <div className="overflow-hidden rounded-[36px] border border-cyan-300/25 bg-[rgba(255,255,255,0.04)] p-4 shadow-[0_0_42px_rgba(59,130,246,0.14)] backdrop-blur-2xl">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/25">
              <Image
                src="/images/profile.jpg"
                alt="Sankalp Pingalwad"
                width={1200}
                height={1400}
                className="h-full w-full object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.55))]" />
              <div className="absolute left-4 top-4 rounded-full border border-blue-400/35 bg-[rgba(5,5,5,0.65)] px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-100/85 backdrop-blur-xl">
                AI Engineer
              </div>
              <div className="absolute right-4 top-16 rounded-full border border-blue-400/35 bg-[rgba(5,5,5,0.65)] px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-100/85 backdrop-blur-xl">
                Open to Work
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-blue-400/35 bg-[rgba(5,5,5,0.72)] px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-100/85 backdrop-blur-xl">
                Mumbai
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <div className="space-y-4">
            <motion.p
              className="text-sm uppercase tracking-[0.42em] text-cyan-200/70"
              variants={fadeUp}
            >
              About Me
            </motion.p>
            <motion.h2
              className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              variants={fadeUp}
            >
              I don't just study AI. I ship it.
            </motion.h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-slate-300/90 sm:text-lg">
            <motion.p variants={fadeUp}>
              Final-year B.E. student in Artificial Intelligence & Data Science
              at VPPCE Mumbai, graduating 2026. I've spent the last year
              building and deploying real production AI systems — not toy demos.
            </motion.p>
            <motion.p variants={fadeUp}>
              At Blackhole Inferverse, I contributed to a production News-AI
              pipeline processing 500+ articles per run, achieving 88%+
              labelling accuracy. I've independently designed DocuMind AI and
              MailMind AI — publicly deployed, end-to-end owned systems.
            </motion.p>
            <motion.p variants={fadeUp}>
              My focus: multi-agent architectures, RAG systems, and multimodal
              AI. I care about ownership, production readiness, and building
              things that actually work.
            </motion.p>
          </div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.08 },
              },
            }}
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
