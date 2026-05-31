"use client";

import { motion } from "framer-motion";

interface CalloutBoxProps {
  type: "tradeoff" | "insight" | "quote";
  content: string;
}

export default function CalloutBox({ type, content }: CalloutBoxProps) {
  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  if (type === "quote") {
    return (
      <motion.blockquote
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="text-center py-6 px-4 max-w-2xl mx-auto"
      >
        <p className="font-[family-name:var(--font-syne)] text-xl sm:text-2xl italic font-medium leading-relaxed text-slate-200">
          &ldquo;{content}&rdquo;
        </p>
      </motion.blockquote>
    );
  }

  const styles = {
    tradeoff: {
      border: "border-l-4 border-blue-500",
      bg: "bg-blue-500/5",
      icon: "⚖",
      textColor: "text-blue-300",
      label: "Product Trade-off Decisions",
    },
    insight: {
      border: "border-l-4 border-purple-500",
      bg: "bg-purple-500/5",
      icon: "💡",
      textColor: "text-purple-300",
      label: "User Insight Callouts",
    },
  }[type];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      className={`rounded-r-2xl ${styles.border} ${styles.bg} p-6 backdrop-blur-xl border border-y-white/5 border-r-white/5`}
    >
      <div className="flex gap-4">
        <span className={`text-2xl shrink-0 ${styles.textColor}`}>{styles.icon}</span>
        <div>
          <h4 className={`font-semibold ${styles.textColor} text-xs uppercase tracking-wider`}>
            {styles.label}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {content}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
