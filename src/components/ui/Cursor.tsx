"use client";

import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
} from "framer-motion";
import { useEffect } from "react";
import { useMouse } from "../../hooks/useMouse";

export default function Cursor() {
	const prefersReducedMotion = useReducedMotion();
	const { x, y, hovering } = useMouse();
	const dotX = useMotionValue(0);
	const dotY = useMotionValue(0);
	const ringX = useSpring(dotX, { stiffness: 160, damping: 18, mass: 0.45 });
	const ringY = useSpring(dotY, { stiffness: 160, damping: 18, mass: 0.45 });

	useEffect(() => {
		dotX.set(x);
		dotY.set(y);
	}, [dotX, dotY, x, y]);

	if (prefersReducedMotion) {
		return null;
	}

	return (
		<div className="pointer-events-none fixed inset-0 z-[60] hidden md:block" aria-hidden="true">
			<motion.div
				className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[1px] ${hovering ? "bg-blue-400" : "bg-cyan-200/80"}`}
				style={{ x: dotX, y: dotY, width: 8, height: 8 }}
				animate={{ scale: hovering ? 1.5 : 1 }}
				transition={{ type: "spring", stiffness: 240, damping: 20, mass: 0.25 }}
			/>
			<motion.div
				className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-sm ${hovering ? "border-blue-400/60 bg-blue-400/12 shadow-[0_0_34px_rgba(59,130,246,0.28)]" : "border-cyan-200/35 bg-cyan-200/10 shadow-[0_0_30px_rgba(34,211,238,0.25)]"}`}
				style={{ x: ringX, y: ringY, width: 30, height: 30 }}
				animate={{ scale: hovering ? 1.35 : 1 }}
				transition={{ type: "spring", stiffness: 90, damping: 14, mass: 0.7 }}
			/>
		</div>
	);
}