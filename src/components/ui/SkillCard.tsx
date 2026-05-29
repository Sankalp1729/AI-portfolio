"use client";

import { motion } from "framer-motion";
import type { SkillGroup } from "../../lib/data";

type SkillCardProps = {
	group: SkillGroup;
	index: number;
};

export default function SkillCard({ group, index }: SkillCardProps) {
	return (
		<motion.article
			className="group relative overflow-hidden rounded-[28px] border border-cyan-200/10 bg-[linear-gradient(180deg,rgba(8,15,24,0.94),rgba(0,0,0,0.82))] p-5 backdrop-blur-xl sm:p-6"
			whileHover={{ y: -6, scale: 1.01 }}
			transition={{ type: "spring", stiffness: 140, damping: 18 }}
			initial={{ opacity: 0, y: 22 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.25 }}
		>
			<div className={`absolute inset-0 bg-gradient-to-br ${group.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25`} />
			<div className="relative flex items-start justify-between gap-4">
				<div>
					<div className="text-xs uppercase tracking-[0.35em] text-cyan-100/50">0{index + 1}</div>
					<h3 className="mt-3 text-lg font-semibold text-white">{group.name}</h3>
				</div>
				<div className="text-right text-xs uppercase tracking-[0.28em] text-cyan-100/45">{group.level}%</div>
			</div>

			<div className="relative mt-5 h-2 overflow-hidden rounded-full bg-white/5">
				<motion.div
					className={`h-full rounded-full bg-gradient-to-r ${group.accent}`}
					initial={{ width: 0 }}
					whileInView={{ width: `${group.level}%` }}
					viewport={{ once: true }}
					transition={{ duration: 1.1, ease: "easeOut" }}
				/>
			</div>

			<div className="mt-5 flex flex-wrap gap-2">
				{group.skills.map((skill) => (
					<motion.span
						key={skill}
						whileHover={{ y: -2, scale: 1.02 }}
						className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs text-slate-200/90"
					>
						{skill}
					</motion.span>
				))}
			</div>
		</motion.article>
	);
}