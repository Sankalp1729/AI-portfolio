"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type AssistantAvatarProps = {
	imageSrc: string;
	name: string;
	message: string;
};

export default function AssistantAvatar({ imageSrc, name, message }: AssistantAvatarProps) {
	const prefersReducedMotion = useReducedMotion();
	const [open, setOpen] = useState(true);
	const [muted, setMuted] = useState(true);

	useEffect(() => {
		const timeout = window.setTimeout(() => setOpen(false), 8500);
		return () => window.clearTimeout(timeout);
	}, []);

	if (!open) {
		return (
			<motion.button
				type="button"
				aria-label="Open assistant intro"
				onClick={() => setOpen(true)}
				className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-cyan-200/15 bg-black/70 px-3 py-2 text-left text-white shadow-[0_0_28px_rgba(34,211,238,0.18)] backdrop-blur-2xl"
				whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
				whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
			>
				<span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-cyan-200/20 bg-cyan-200/10">
					<Image src={imageSrc} alt={name} fill sizes="40px" className="object-cover" />
				</span>
				<span className="pr-2">
					<span className="block text-xs uppercase tracking-[0.28em] text-cyan-100/55">Assistant</span>
					<span className="block text-sm text-white/90">Open intro</span>
				</span>
			</motion.button>
		);
	}

	return (
		<motion.div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
			initial={prefersReducedMotion ? false : { opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-cyan-200/12 bg-[linear-gradient(180deg,rgba(8,15,24,0.96),rgba(3,8,15,0.92))] p-6 text-white shadow-[0_0_120px_rgba(34,211,238,0.12)] sm:p-8"
				initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				transition={{ type: "spring", stiffness: 120, damping: 18 }}
			>
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_46%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_30%)]" />
				<div className="relative flex items-start gap-4 sm:gap-5">
					<motion.div
						className="relative h-20 w-20 overflow-hidden rounded-[28px] border border-cyan-200/25 bg-cyan-200/10 sm:h-24 sm:w-24"
						animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
						transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
					>
						<Image src={imageSrc} alt={name} fill sizes="96px" className="object-cover" priority />
					</motion.div>

					<div className="flex-1">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-[0.35em] text-cyan-100/60">AI Avatar Intro</p>
								<h2 className="mt-2 text-2xl font-semibold text-white">{name}</h2>
							</div>
							<button
								type="button"
								onClick={() => setOpen(false)}
								className="rounded-full border border-cyan-200/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-50/80 transition hover:bg-cyan-300/10"
							>
								Skip
							</button>
						</div>

						<p className="mt-5 max-w-xl text-sm leading-7 text-slate-200/85 sm:text-base">
							{message}
						</p>

						<div className="mt-5 flex flex-wrap items-center gap-3">
							<span className="rounded-full border border-cyan-200/15 bg-cyan-200/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-100/70">
								Muted by default
							</span>
							<button
								type="button"
								onClick={() => setMuted((value) => !value)}
								className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/75 transition hover:border-cyan-200/30 hover:text-white"
							>
								{muted ? "Audio muted" : "Audio on"}
							</button>
						</div>

						<div className="mt-6 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.32em] text-cyan-100/45">
							<span>8 second intro</span>
							<span>Press skip anytime</span>
						</div>
					</div>
				</div>
				<motion.div
					className="absolute left-6 top-6 h-12 w-12 rounded-full bg-cyan-200/10 blur-2xl"
					animate={prefersReducedMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
					transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
				/>
				<motion.div
					className="absolute right-8 top-8 h-16 w-16 rounded-full bg-purple-400/10 blur-3xl"
					animate={prefersReducedMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.25, 0.6, 0.25] }}
					transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
				/>
			</motion.div>
		</motion.div>
	);
}