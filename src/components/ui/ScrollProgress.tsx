"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const updateProgress = () => {
			const documentElement = document.documentElement;
			const maxScroll = documentElement.scrollHeight - window.innerHeight;
			const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
			setProgress(Math.min(Math.max(nextProgress, 0), 1));
		};

		updateProgress();
		window.addEventListener("scroll", updateProgress, { passive: true });
		window.addEventListener("resize", updateProgress);

		return () => {
			window.removeEventListener("scroll", updateProgress);
			window.removeEventListener("resize", updateProgress);
		};
	}, []);

	return (
		<div
			aria-hidden="true"
			className="fixed left-0 top-0 z-[80] h-1 w-full bg-white/5"
		>
			<motion.div
				className="h-full origin-left bg-[linear-gradient(90deg,#3b82f6,#60a5fa,#8b5cf6)] shadow-[0_0_18px_rgba(59,130,246,0.55)]"
				style={{ scaleX: progress }}
				transition={{ ease: "easeOut", duration: 0.12 }}
			/>
		</div>
	);
}