"use client";

import { useEffect, useState } from "react";

export function useScroll() {
	const [scrollY, setScrollY] = useState(0);
	const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

	useEffect(() => {
		let previousScroll = window.scrollY;

		const handleScroll = () => {
			const currentScroll = window.scrollY;
			setScrollY(currentScroll);
			setScrollDirection(currentScroll > previousScroll ? "down" : "up");
			previousScroll = currentScroll;
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return { scrollY, scrollDirection };
}