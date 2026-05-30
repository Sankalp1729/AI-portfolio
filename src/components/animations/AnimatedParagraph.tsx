"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  text: string;
  className?: string;
}

export default function AnimatedParagraph({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <p
      ref={ref}
      className={className}
      aria-label={text}
      style={{ position: "relative" }}
    >
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = start + 1 / chars.length + 0.1;
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        return (
          <span key={i} style={{ position: "relative", display: "inline" }}>
            <span style={{ opacity: 0, userSelect: "none" }} aria-hidden>
              {char}
            </span>
            <motion.span
              style={{ opacity, position: "absolute", left: 0, top: 0 }}
              aria-hidden
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}
