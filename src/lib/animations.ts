import type { Variants } from "framer-motion";

export const viewportReveal = {
	once: true,
	amount: 0.28,
};

export const sectionStagger: Variants = {
	hidden: {
		opacity: 0,
		y: 30,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
			staggerChildren: 0.12,
			delayChildren: 0.08,
		},
	},
};

export const fadeUp: Variants = {
	hidden: {
		opacity: 0,
		y: 30,
		filter: "blur(10px)",
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

export const fadeScale: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.96,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 140,
			damping: 18,
		},
	},
};

export const cardLift: Variants = {
	hidden: {
		opacity: 0,
		y: 28,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 120,
			damping: 16,
		},
	},
};

export const chipStagger: Variants = {
	hidden: {
		opacity: 0,
		y: 14,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 180,
			damping: 20,
		},
	},
};

export const softFloat = {
	y: [0, -6, 0],
	transition: {
		duration: 6,
		repeat: Number.POSITIVE_INFINITY,
		ease: "easeInOut" as const,
	},
} as const;
