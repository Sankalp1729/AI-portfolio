"use client";

import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

export function useParallax(speed = 0.15) {
  const ref = useRef<HTMLElement | null>(null);

  // Track the scroll progress of the target element relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, (v) => {
    const val = Number.isNaN(v) ? 0.5 : v;
    const pct = -15 + val * 30;
    return `${pct}%`;
  });

  return { ref, y };
}
