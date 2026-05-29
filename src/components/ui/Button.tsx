"use client";

import { motion } from "framer-motion";

export default function Button({
  text,
}: {
  text: string;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
      className="inline-flex items-center justify-center rounded-full border border-cyan-300/35 bg-white/5 px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_0_rgba(34,211,238,0)] backdrop-blur-xl transition-colors duration-300 ease-out hover:border-cyan-200/80 hover:bg-cyan-300/10 hover:shadow-[0_0_28px_rgba(34,211,238,0.34)] focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
    >
      {text}
    </motion.button>
  );
}