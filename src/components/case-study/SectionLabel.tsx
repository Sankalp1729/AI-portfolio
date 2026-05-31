"use client";

import { motion } from "framer-motion";

interface SectionLabelProps {
  number: string;
  title: string;
}

export default function SectionLabel({ number, title }: SectionLabelProps) {
  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      className="space-y-2 mb-8"
    >
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-semibold text-slate-500 block">
        {number}
      </span>
      <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
        {title}
      </h2>
    </motion.div>
  );
}
