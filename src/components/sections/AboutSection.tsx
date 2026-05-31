"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Counter from "@/components/animations/Counter";
import { aboutStats } from "@/data/site";
import { cardLift, fadeUp, sectionStagger, viewportReveal } from "@/lib/animations";
import { useMagnet } from "@/hooks/useMagnet";
import { useParallax } from "@/hooks/useParallax";

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

export default function AboutSection() {
  const { ref: parallaxRef, y: backgroundY } = useParallax(0.15);
  const { ref: magnetRef, x: magnetX, y: magnetY } = useMagnet(0.3, 80);
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="about"
      ref={parallaxRef}
      aria-label="About Sankalp Pingalwad"
      className="relative overflow-hidden bg-[var(--bg-surface)] px-6 py-24 text-[var(--text-primary)] sm:px-10 lg:px-16"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1),transparent_42%)]"
        aria-hidden
      />

      <motion.div
        className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[45fr_55fr] lg:items-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
      >
        <motion.div className="relative h-[520px] sm:h-[580px] md:h-[620px]" variants={fadeUp}>
          <div className="absolute inset-0 -z-10 rounded-[36px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_54%)] blur-3xl" />
          <motion.div
            ref={magnetRef}
            style={{ x: magnetX, y: magnetY }}
            className="overflow-hidden rounded-[36px] border border-[var(--accent-blue)]/30 bg-[var(--glass-bg)] p-4 shadow-[0_0_42px_rgba(59,130,246,0.18)] backdrop-blur-2xl"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/25" style={{ aspectRatio: "3/4" }}>
              <div className="relative w-full h-full">
                {!imageError ? (
                  <Image
                    src="/profile/sankalp-coat.jpeg"
                    alt="Sankalp Pingalwad — AI Product Builder"
                    width={1200}
                    height={1400}
                    priority={true}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ objectPosition: "center 15%" }}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#0a0a1a,rgba(59,130,246,0.2))]"
                  >
                    <span className="font-[family-name:var(--font-syne)] text-[4rem] font-bold text-[#3B82F6]">
                      SP
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.45))]" />
              <span className="absolute left-4 top-4 rounded-full border border-blue-400/35 bg-[rgba(5,5,5,0.65)] px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/85 backdrop-blur-xl">
                AI Product Builder
              </span>
              <span className="absolute right-4 top-16 rounded-full border border-blue-400/35 bg-[rgba(5,5,5,0.65)] px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/85 backdrop-blur-xl">
                Open to Work
              </span>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-blue-400/35 bg-[rgba(5,5,5,0.72)] px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/85 backdrop-blur-xl">
                Mumbai
              </span>
            </div>
          </motion.div>
        </motion.div>

        <div className="space-y-8">
          <div className="space-y-4">
            <motion.p
              className="text-sm uppercase tracking-[0.42em] text-[var(--accent-blue)]"
              variants={fadeUp}
            >
              About Me
            </motion.p>
            <motion.h2
              className="font-[family-name:var(--font-syne)] max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl"
              variants={fadeUp}
            >
              I don&apos;t just study AI. I ship it.
            </motion.h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            <motion.p
              className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg"
              variants={fadeUp}
            >
              Final-year B.E. student in Artificial Intelligence & Data Science at VPPCE Mumbai, graduating 2026. I&apos;ve spent the last year building and deploying real production AI systems — not toy demos.
            </motion.p>
            <motion.p
              className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg"
              variants={fadeUp}
            >
              At Blackhole Inferverse, I contributed to a production News-AI pipeline processing 500+ articles per run, achieving 88%+ labelling accuracy. I&apos;ve independently designed DocuMind AI and MailMind AI — publicly deployed, end-to-end owned systems.
            </motion.p>
            <motion.p
              className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg"
              variants={fadeUp}
            >
              My focus: multi-agent architectures, RAG systems, and multimodal AI. I care about ownership, production readiness, and building things that actually work.
            </motion.p>
          </div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            variants={sectionStagger}
          >
            {aboutStats.map((stat) => (
              <motion.div
                key={stat.label}
                className="glass-panel p-5"
                variants={cardLift}
                whileHover={{ y: -4 }}
              >
                <div className="font-[family-name:var(--font-syne)] text-3xl font-bold text-white">
                  <Counter target={Number(stat.value)} suffix={String(stat.suffix)} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
