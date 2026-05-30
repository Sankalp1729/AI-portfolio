"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface AnimatedParagraphProps {
  text: string;
  className?: string;
}

function CharReveal({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute top-0 left-0">
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedParagraph({ text, className }: AnimatedParagraphProps) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.3"],
  });

  const characters = text.split("");
  const total = characters.length;

  return (
    <p ref={containerRef} className={className}>
      {characters.map((char, index) => {
        if (char === " ") {
          return <span key={index}> </span>;
        }

        // Define a staggered window for this character
        // The animation window starts at index / total and spans over a fraction
        const start = index / total;
        const end = Math.min(1, start + 0.1); // 10% progress window stagger

        return (
          <CharReveal
            key={index}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}
