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

  // Map progress [0, 1] to a subtle vertical translation (e.g., -15% to 15%)
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return { ref, y };
}
