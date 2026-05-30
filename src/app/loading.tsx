"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Loader from "../components/ui/Loader";

export default function Loading() {
	const [phase, setPhase] = useState<"visible" | "fading" | "hidden">("visible");

	useEffect(() => {
		const hideAfterMaxTimeout = window.setTimeout(() => {
			setPhase("fading");
		}, 1500);

		const unmountAfterFade = window.setTimeout(() => {
			setPhase("hidden");
		}, 1900);

		return () => {
			window.clearTimeout(hideAfterMaxTimeout);
			window.clearTimeout(unmountAfterFade);
		};
	}, []);

	if (phase === "hidden") {
		return null;
	}

	return (
		<motion.div
			className="transition-[opacity,visibility] duration-[400ms] ease-out"
			style={{
				opacity: phase === "fading" ? 0 : 1,
				visibility: phase === "fading" ? "hidden" : "visible",
			}}
		>
			<Loader />
		</motion.div>
	);
}