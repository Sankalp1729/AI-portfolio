"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const started = useRef(false);

  useEffect(() => {
    const mountTimer = window.setTimeout(() => {
      if (!started.current) {
        started.current = true;
        animateTo(target, duration);
      }
    }, 400);

    const fallback = window.setTimeout(() => {
      if (!started.current) {
        started.current = true;
        animateTo(target, duration);
      }
    }, 2500);

    return () => {
      window.clearTimeout(mountTimer);
      window.clearTimeout(fallback);
    };
  }, [target, duration]);

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      animateTo(target, duration);
    }
  }, [inView, target, duration]);

  function animateTo(end: number, dur: number) {
    const startTime = performance.now();
    const startVal = 0;

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / dur, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(startVal + (end - startVal) * eased));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
