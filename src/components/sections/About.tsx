"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { aboutHighlights, aboutStats } from "../../lib/data";
import { cardLift, chipStagger, fadeUp, sectionStagger, viewportReveal } from "../../lib/animations";

function Counter({ target }: { target: number }) {
	const [value, setValue] = useState(0);

	useEffect(() => {
		const start = performance.now();
		const duration = 1200;
		let frameId = 0;

		const animate = (time: number) => {
			const progress = Math.min((time - start) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setValue(Math.round(target * eased));

			if (progress < 1) {
				frameId = window.requestAnimationFrame(animate);
			}
		};

		frameId = window.requestAnimationFrame(animate);
		return () => window.cancelAnimationFrame(frameId);
	}, [target]);

	return <span>{value}</span>;
}

export default function About() {
	return (
		<section id="about" className="relative overflow-hidden bg-[linear-gradient(to_bottom,#000000,#020617)] px-6 py-24 text-white sm:px-10 lg:px-16">
			<motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_42%),radial-gradient(circle_at_80%_15%,rgba(168,85,247,0.08),transparent_30%)]" animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
			<motion.div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={viewportReveal}>
				<motion.div className="relative" variants={fadeUp}>
					<div className="absolute inset-0 -z-10 rounded-[36px] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_54%)] blur-3xl" />
					<div className="overflow-hidden rounded-[36px] border border-cyan-200/10 bg-white/5 p-4 backdrop-blur-2xl">
						<div className="relative overflow-hidden rounded-[28px] border border-white/5 bg-black/25">
							<Image src="/images/profile.svg" alt="Sankalp Pingalwad" width={1200} height={1400} className="h-full w-full object-cover object-top" priority />
							<div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.6))]" />
							<div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
								<div className="inline-flex rounded-full border border-cyan-200/15 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-100/70 backdrop-blur-xl">Final Year AI Student</div>
								<p className="mt-4 max-w-md text-sm leading-7 text-slate-200/85">Building deployed AI systems with product ownership, clean architecture, and a bias toward useful shipping work.</p>
							</div>
						</div>
					</div>
				</motion.div>

				<div className="space-y-8">
					<div className="space-y-4">
						<motion.p className="text-sm uppercase tracking-[0.42em] text-cyan-200/70" variants={fadeUp}>About</motion.p>
						<motion.h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl" variants={fadeUp}>
							I build intelligent products that feel like production AI company software.
						</motion.h2>
						<motion.p className="max-w-3xl text-base leading-8 text-slate-300/90 sm:text-lg" variants={fadeUp}>
							My work centers on end-to-end ownership: product framing, model integration, retrieval, orchestration, deployment, and the small interaction details that make the experience feel premium.
						</motion.p>
					</div>

					<motion.div className="grid gap-4 sm:grid-cols-3" variants={chipStagger}>
						{aboutStats.map((stat) => (
							<motion.div key={stat.label} className="rounded-[26px] border border-cyan-200/10 bg-white/5 p-5 backdrop-blur-xl" variants={cardLift} whileHover={{ y: -4 }}>
								<div className="text-3xl font-semibold text-white">
									{stat.label === "Focus areas" ? stat.value : <><Counter target={Number.parseInt(stat.value, 10) || 0} />{stat.value.includes("+") ? "+" : ""}</>}
								</div>
								<div className="mt-2 text-xs uppercase tracking-[0.3em] text-cyan-100/50">{stat.label}</div>
							</motion.div>
						))}
					</motion.div>

					<motion.div className="flex flex-wrap gap-3" variants={chipStagger}>
						{aboutHighlights.map((item) => (
							<motion.span key={item} className="rounded-full border border-cyan-200/10 bg-white/5 px-4 py-2 text-sm text-cyan-50/84 backdrop-blur-xl" variants={cardLift} whileHover={{ y: -2, scale: 1.02 }}>
								{item}
							</motion.span>
						))}
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}