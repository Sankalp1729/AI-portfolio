"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type FloatingOrbProps = {
  onClick: () => void;
  layoutId?: string;
};

export default function FloatingOrb({ onClick, layoutId = "avatar-orb" }: FloatingOrbProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.button
      type="button"
      layoutId={layoutId}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-blue-400/35 bg-[radial-gradient(circle,#3b82f6,#1e1b4b)]"
      style={{
        boxShadow:
          "0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.2)",
      }}
      aria-label="Replay avatar intro"
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.88 }}
      animate={
        prefersReducedMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: [1, 1.1, 1] }
      }
      whileHover={
        prefersReducedMotion
          ? undefined
          : { scale: 1.08, transition: { type: "spring", stiffness: 400, damping: 25 } }
      }
      whileTap={
        prefersReducedMotion
          ? undefined
          : { scale: 0.94, transition: { type: "spring", stiffness: 400, damping: 25 } }
      }
      transition={
        prefersReducedMotion
          ? { type: "spring", stiffness: 400, damping: 25, duration: 0.5 }
          : { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
      }
    >
      <span className="relative h-3 w-3 rounded-full bg-white/95 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_40%,rgba(59,130,246,0.25)_100%)]" />
    </motion.button>
  );
}
