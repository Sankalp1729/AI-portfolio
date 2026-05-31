"use client";

import { motion } from "framer-motion";

interface Row {
  decision: string;
  chose: string;
  rejected: string;
  why: string;
}

interface TradeOffTableProps {
  rows: Row[];
}

export default function TradeOffTable({ rows }: TradeOffTableProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  return (
    <div className="space-y-4">
      {/* Header columns */}
      <div className="grid grid-cols-3 bg-white/5 p-4 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 font-[family-name:var(--font-syne)] rounded-xl border border-white/5 mb-2">
        <div>Decision Area</div>
        <div className="text-blue-400">Chose</div>
        <div className="text-slate-500">Rejected</div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-4"
      >
        {rows.map((row, idx) => (
          <motion.div
            key={idx}
            variants={rowVariants}
            className="glass-panel p-5 border border-white/5 bg-white/2 backdrop-blur-md rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 items-start transition duration-300 hover:border-white/10"
          >
            {/* Decision Column */}
            <div className="font-semibold text-white text-sm">
              {row.decision}
            </div>

            {/* Chose Column */}
            <div className="space-y-1">
              <span className="flex items-center gap-1.5 font-semibold text-xs text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-4 w-4 text-emerald-400 shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {row.chose}
              </span>
            </div>

            {/* Rejected Column */}
            <div className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 line-through decoration-slate-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-4 w-4 text-rose-500/80 shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                {row.rejected}
              </span>
            </div>

            {/* Why Column: Spannig full width at the bottom of the row card */}
            <div className="md:col-span-3 border-t border-white/5 pt-3 mt-1">
              <p className="text-xs italic text-slate-400 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                {row.why}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
