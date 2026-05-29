"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { fadeUp, sectionStagger } from "../../lib/animations";
import { heroRoles, siteConfig } from "../../lib/data";
import Loader from "../ui/Loader";

const Scene = dynamic(() => import("../3d/Scene"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const activeRole = heroRoles[roleIndex] ?? heroRoles[0];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % heroRoles.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  const roleVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    }),
    [],
  );

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cyan-950/10 to-black text-white"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14)_0%,rgba(34,211,238,0.07)_18%,transparent_45%)] blur-2xl"
        animate={
          prefersReducedMotion
            ? { opacity: 0.72 }
            : { opacity: [0.55, 1, 0.55], scale: [1, 1.03, 1] }
        }
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,15,24,0.16),rgba(0,0,0,0.76))]" />

      <motion.div
        className="absolute inset-0"
        animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Scene />
      </motion.div>

      <motion.div
        className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28 sm:px-10 lg:px-16"
        variants={sectionStagger}
        initial="hidden"
        animate="visible"
      >
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="max-w-3xl">
            <motion.p
              className="mb-5 text-sm uppercase tracking-[0.42em] text-cyan-200/70"
              variants={fadeUp}
            >
              Premium AI Engineer Portfolio
            </motion.p>

            <motion.h1
              className="max-w-5xl text-6xl font-semibold leading-[0.92] tracking-tight text-white drop-shadow-[0_0_30px_rgba(103,232,249,0.22)] sm:text-7xl lg:text-[5.6rem]"
              variants={fadeUp}
            >
              Sankalp Pingalwad
            </motion.h1>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-cyan-200/12 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.34em] text-cyan-100/60 backdrop-blur-xl">
                AI systems
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.34em] text-slate-200/65 backdrop-blur-xl">
                Multi-agent architectures
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.34em] text-slate-200/65 backdrop-blur-xl">
                RAG
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.34em] text-slate-200/65 backdrop-blur-xl">
                Production AI products
              </span>
            </div>

            <motion.div
              className="mt-8 text-base leading-8 text-slate-300/92 sm:text-lg"
              variants={fadeUp}
            >
              <p>
                I build intelligent products that combine AI systems, retrieval,
                and clean product execution. The focus is always
                production-grade delivery, not prototypes.
              </p>
            </motion.div>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRole}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={roleVariants}
                  transition={{ type: "spring", stiffness: 110, damping: 18 }}
                  className="inline-flex rounded-full border border-cyan-200/12 bg-black/25 px-5 py-3 text-sm uppercase tracking-[0.32em] text-cyan-50/80"
                >
                  {activeRole}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              className="mt-12 flex flex-col gap-4 sm:flex-row"
              variants={fadeUp}
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-200/12 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition hover:border-cyan-200/70 hover:bg-cyan-200/20"
              >
                View Projects
              </a>
              <a
                href={siteConfig.resume}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10"
              >
                Download Resume
              </a>
            </motion.div>
          </div>

          <motion.div className="relative hidden lg:block" variants={fadeUp}>
            <div className="absolute inset-0 -z-10 rounded-[36px] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_46%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)] blur-3xl" />
            <div className="rounded-[36px] border border-cyan-200/10 bg-white/5 p-5 backdrop-blur-2xl">
              <div className="rounded-[28px] border border-white/5 bg-black/25 p-4">
                <div className="text-xs uppercase tracking-[0.35em] text-cyan-100/55">
                  AI product surface
                </div>
                <p className="mt-3 max-w-md text-sm leading-7 text-slate-300/80">
                  A premium showcase for recruiters and technical teams,
                  designed to communicate production ownership, architecture
                  clarity, and high-trust engineering.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-cyan-200/10 bg-white/5 p-4">
                    <div className="text-2xl font-semibold text-white">RAG</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.32em] text-slate-400">
                      Search + reason
                    </div>
                  </div>
                  <div className="rounded-2xl border border-cyan-200/10 bg-white/5 p-4">
                    <div className="text-2xl font-semibold text-white">
                      Agents
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.32em] text-slate-400">
                      Multi-step systems
                    </div>
                  </div>
                  <div className="rounded-2xl border border-cyan-200/10 bg-white/5 p-4">
                    <div className="text-2xl font-semibold text-white">
                      Deploy
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.32em] text-slate-400">
                      Production ready
                    </div>
                  </div>
                  <div className="rounded-2xl border border-cyan-200/10 bg-white/5 p-4">
                    <div className="text-2xl font-semibold text-white">UX</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.32em] text-slate-400">
                      Polished surfaces
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
