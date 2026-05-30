"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type TextRevealProps = {
  text: string;
  className?: string;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/** Staggered letter fade + slide-up reveal for display headings. */
export default function TextReveal({
  text,
  className,
  stagger = 0.04,
  as: Tag = "span",
}: TextRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const letters = useMemo(() => {
    const counts = new Map<string, number>();
    return Array.from(text).map((letter) => {
      const occurrence = counts.get(letter) ?? 0;
      counts.set(letter, occurrence + 1);
      return { letter, key: `${letter}-${occurrence}` };
    });
  }, [text]);

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      {letters.map(({ letter, key }, index) => (
        <motion.span
          key={key}
          className={
            letter === " " ? "inline-block w-[0.28em]" : "inline-block"
          }
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * stagger }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </Tag>
  );
}
