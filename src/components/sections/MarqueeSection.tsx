"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ProjectTile {
  id: string;
  name: string;
}

const originalProjects: ProjectTile[] = [
  { id: "documind", name: "DocuMind AI" },
  { id: "mailmind", name: "MailMind AI" },
  { id: "unified-context", name: "Unified Context" },
  { id: "emotion-recognition", name: "Emotion Recognition" },
];

function MarqueeTile({ project }: { project: ProjectTile }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="relative h-[200px] w-[320px] shrink-0 overflow-hidden rounded-[14px] border border-[rgba(255,255,255,0.06)] shadow-lg"
      style={{
        background: "linear-gradient(135deg, #0a0a1a, rgba(59,130,246,0.1))",
      }}
    >
      {!imageError ? (
        <Image
          src={`/projects/${project.id}.webp`}
          alt={`${project.name} preview`}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="320px"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#0a0a1a,rgba(59,130,246,0.1))] px-6 text-center text-sm uppercase tracking-[0.25em] text-[var(--text-muted)]">
          {project.name}
        </div>
      )}

      {/* Project name badge */}
      <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm">
        {project.name}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Track scroll of the entire section relative to viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // scrollYProgress 0 -> 1 maps to:
  // Row 1 x: "0px" -> "-300px"
  // Row 2 x: "-300px" -> "0px"
  const x1 = useTransform(scrollYProgress, [0, 1], ["0px", "-300px"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-300px", "0px"]);

  // Tripled lists for seamless visual loop
  const row1Tiles = [...originalProjects, ...originalProjects, ...originalProjects];
  const row2Tiles = [...originalProjects, ...originalProjects, ...originalProjects].reverse();

  return (
    <section
      ref={sectionRef}
      id="marquee-showcase"
      aria-label="Horizontal project showcase"
      className="relative overflow-hidden bg-[var(--bg-base)] py-20 w-full"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 mb-8">
        <span className="text-xs uppercase tracking-[0.4em] text-[var(--text-muted)] font-semibold">
          Work
        </span>
      </div>

      <div className="flex flex-col gap-3 w-full overflow-hidden">
        {/* Row 1: Right -> Left */}
        <motion.div
          style={{ x: x1, willChange: "transform" }}
          className="flex gap-3 w-fit"
        >
          {row1Tiles.map((project, idx) => (
            <MarqueeTile key={`row1-${project.id}-${idx}`} project={project} />
          ))}
        </motion.div>

        {/* Row 2: Left -> Right */}
        <motion.div
          style={{ x: x2, willChange: "transform" }}
          className="flex gap-3 w-fit"
        >
          {row2Tiles.map((project, idx) => (
            <MarqueeTile key={`row2-${project.id}-${idx}`} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
