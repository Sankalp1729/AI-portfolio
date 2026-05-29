"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, sectionStagger, viewportReveal } from "../../lib/animations";
import { showcaseProjects } from "../../lib/data";
import ProjectCard from "../ui/ProjectCard";

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-black px-6 py-24 text-white sm:px-10 lg:px-16"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.08),transparent_30%)]"
        animate={{ opacity: [0.62, 1, 0.62] }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="mx-auto max-w-7xl space-y-10"
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
      >
        <div className="space-y-4">
          <motion.p
            className="text-sm uppercase tracking-[0.42em] text-cyan-200/70"
            variants={fadeUp}
          >
            Systems I've Shipped
          </motion.p>
          <motion.h2
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            variants={fadeUp}
          >
            Production deployments, not demos.
          </motion.h2>
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
