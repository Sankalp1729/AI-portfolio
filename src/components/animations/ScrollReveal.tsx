"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { viewportReveal } from "@/lib/animations";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  delay?: number;
};

/** Standard section entrance: fade up from 30px, 0.6s duration. */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportReveal}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
