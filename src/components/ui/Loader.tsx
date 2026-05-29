"use client";

import { motion } from "framer-motion";

export default function Loader() {
	return (
		<div className="flex min-h-[100svh] items-center justify-center bg-[linear-gradient(to_bottom,#050505,#020617)] px-6">
			<div className="relative flex flex-col items-center gap-5 rounded-[32px] border border-white/8 bg-[rgba(255,255,255,0.04)] px-8 py-10 backdrop-blur-2xl">
				<motion.div
					className="relative flex h-20 w-20 items-center justify-center rounded-full border border-blue-400/25 bg-[linear-gradient(135deg,rgba(59,130,246,0.95),rgba(124,58,237,0.85))] text-2xl font-semibold tracking-[0.2em] text-white shadow-[0_0_40px_rgba(59,130,246,0.28)]"
					animate={{ scale: [1, 1.08, 1], opacity: [0.84, 1, 0.84] }}
					transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
				>
					SP
				</motion.div>
				<p className="text-xs uppercase tracking-[0.45em] text-slate-300/70">
					Loading portfolio
				</p>
			</div>
		</div>
	);
}