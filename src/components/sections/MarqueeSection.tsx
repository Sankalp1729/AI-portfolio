"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { showcaseProjects } from "@/data/projects";
import type { ShowcaseProject } from "@/types";

function MarqueeTile({ project }: { project: ShowcaseProject }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative h-[220px] w-[340px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg-card)] shadow-lg">
      {!imageError ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="340px"
          className="object-cover transition-transform duration-500 hover:scale-105"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--bg-card),rgba(59,130,246,0.15))]">
          <span className="select-none font-[family-name:var(--font-syne)] text-sm uppercase tracking-[0.3em] text-white/45 text-center px-4">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Track scroll position of this section relative to viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Row 1 scrolls RIGHT: -200px to 0px
  const x1 = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  // Row 2 scrolls LEFT: 0px to -200px
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Tripled list for seamless looping look
  const row1Projects = [...showcaseProjects, ...showcaseProjects, ...showcaseProjects];
  const row2Projects = [...showcaseProjects, ...showcaseProjects, ...showcaseProjects].reverse();

  return (
    <section
      ref={sectionRef}
      id="marquee-work"
      aria-label="Work showcase marquee"
      className="relative overflow-hidden bg-[#050505] py-16 w-full"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 mb-8">
        <span className="text-xs uppercase tracking-[0.42em] text-[var(--text-muted)] font-semibold">
          Work
        </span>
      </div>

      <div className="flex flex-col gap-6 w-full overflow-hidden">
        {/* Row 1 */}
        <motion.div
          style={{ x: x1, willChange: "transform" }}
          className="flex gap-6 w-max whitespace-nowrap pl-4"
        >
          {row1Projects.map((project, idx) => (
            <MarqueeTile key={`row1-${project.number}-${idx}`} project={project} />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div
          style={{ x: x2, willChange: "transform" }}
          className="flex gap-6 w-max whitespace-nowrap pl-4"
        >
          {row2Projects.map((project, idx) => (
            <MarqueeTile key={`row2-${project.number}-${idx}`} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
