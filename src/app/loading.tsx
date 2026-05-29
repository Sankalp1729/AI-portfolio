"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Loader from "../components/ui/Loader";

export default function Loading() {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setVisible(false);
		}, 1500);

		return () => window.clearTimeout(timeoutId);
	}, []);

	if (!visible) {
		return null;
	}

	return (
		<motion.div
			initial={{ opacity: 1 }}
			animate={{ opacity: [1, 1, 0] }}
			transition={{ duration: 1.8, times: [0, 0.82, 1], ease: "easeOut" }}
		>
			<Loader />
		</motion.div>
	);
}