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

  return (
    <div ref={containerRef} className="relative flex flex-col gap-0">
      {projects.map((project, index) => {
        const targetScale = 0.88 + (index / projects.length) * 0.12;
        
        // Scale formula: card scales down from 1.0 to its targetScale starting from its sticky point
        // Card starts scaling down when scroll progress reaches its starting ratio index / N
        const startProgress = index / projects.length;
        const scale = useTransform(
          scrollYProgress,
          [startProgress, 1],
          [1, targetScale]
        );

        return (
          <div
            key={project.number}
            className="sticky top-[80px] flex h-[100vh] items-center justify-center"
          >
            <motion.div
              style={{
                scale,
                transformOrigin: "top center",
                top: `${index * 24}px`,
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
