"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, sectionStagger, viewportReveal } from "@/lib/animations";
import { showcaseProjects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="projects"
      aria-label="Projects and shipped systems"
      className="relative overflow-hidden bg-[var(--bg-base)] px-6 py-24 text-[var(--text-primary)] sm:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1),transparent_34%)]"
        aria-hidden
      />

      <motion.div
        className="mx-auto max-w-7xl space-y-10"
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
      >
        <div className="space-y-4">
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
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {showcaseProjects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              active={activeIndex === index}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
