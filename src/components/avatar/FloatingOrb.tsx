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
      className="orb-pulse fixed bottom-6 right-6 z-[75] flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-blue-400/35 bg-[radial-gradient(circle_at_30%_20%,rgba(147,197,253,0.95),rgba(59,130,246,0.88)_48%,rgba(37,99,235,0.72))]"
      aria-label="Replay avatar intro"
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
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
      transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.5 }}
    >
      <span className="relative h-3 w-3 rounded-full bg-white/95 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_40%,rgba(59,130,246,0.25)_100%)]" />
    </motion.button>
  );
}
