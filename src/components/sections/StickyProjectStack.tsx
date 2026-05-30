"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ShowcaseProject } from "@/types";
import ProjectCard from "@/components/ui/ProjectCard";

interface StickyProjectStackProps {
  projects: ShowcaseProject[];
}

export default function StickyProjectStack({ projects }: StickyProjectStackProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalCards = projects.length;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-0"
      style={{ paddingBottom: "5rem" }}
    >
      {projects.map((project, index) => {
        // targetScale = 1 - (n - 1 - i) * 0.04
        const targetScale = 1 - (totalCards - 1 - index) * 0.04;
        const startProgress = index / totalCards;
        const scale = useTransform(
          scrollYProgress,
          [startProgress, 1],
          [1, targetScale]
        );

        return (
          <div
            key={project.number}
            className="sticky h-[100vh] w-full flex items-start justify-center"
            style={{
              position: "sticky",
              top: "80px",
              paddingTop: `${index * 24}px`,
            }}
          >
            <motion.div
              style={{
                scale,
                transformOrigin: "top center",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                borderRadius: "30px",
              }}
              className="relative w-full max-w-5xl px-4"
            >
              <ProjectCard
                project={project}
                index={index}
                active={activeIndex === index}
                onToggle={handleToggle}
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
