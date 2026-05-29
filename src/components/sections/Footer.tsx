"use client";

import { motion } from "framer-motion";
import { siteConfig } from "../../lib/data";

export default function Footer() {
	return (
		<footer className="border-t border-cyan-200/10 bg-black px-6 py-8 text-white sm:px-10 lg:px-16">
			<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
				<p>Built for recruiters, engineers, and product teams.</p>
				<p>{siteConfig.name} · AI Engineer</p>
			</motion.div>
		</footer>
	);
}