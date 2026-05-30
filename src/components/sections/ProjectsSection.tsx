"use client";

import { motion } from "framer-motion";
import { fadeUp, sectionStagger, viewportReveal } from "@/lib/animations";
import { showcaseProjects } from "@/data/projects";
import StickyProjectStack from "@/components/sections/StickyProjectStack";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-label="Projects and shipped systems"
      className="relative bg-[var(--bg-base)] px-6 py-24 text-[var(--text-primary)] sm:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1),transparent_34%)]"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl space-y-10">
        <motion.div
          className="space-y-4"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          <motion.h2
            className="font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight sm:text-5xl"
            variants={fadeUp}
          >
            Systems I&apos;ve Shipped
          </motion.h2>
          <motion.p
            className="max-w-2xl text-lg text-[var(--text-secondary)]"
            variants={fadeUp}
          >
            Production deployments, not demos.
          </motion.p>
        </motion.div>

        <StickyProjectStack projects={showcaseProjects} />
      </div>
    </section>
  );
}

