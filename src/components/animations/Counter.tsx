"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type CounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Animated count-up triggered when element enters viewport. */
export default function Counter({
  value,
  suffix = "",
  duration = 1200,
  className,
}: CounterProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const [current, setCurrent] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrent(value);
      return;
    }

    if (!isInView) {
      return;
    }

    let frameId = 0;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(value * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [duration, isInView, prefersReducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      {current}
      {suffix}
    </span>
  );
}
