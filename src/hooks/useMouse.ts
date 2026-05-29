"use client";

import { useEffect, useState } from "react";

export function useMouse() {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [hovering, setHovering] = useState(false);

	useEffect(() => {
		const handleMove = (event: PointerEvent) => {
			setPosition({ x: event.clientX, y: event.clientY });
		};

		const handleOver = (event: Event) => {
			const target = event.target as HTMLElement | null;
			setHovering(Boolean(target?.closest("a, button, [data-hoverable='true']")));
		};

		window.addEventListener("pointermove", handleMove);
		document.addEventListener("pointerover", handleOver, true);

		return () => {
			window.removeEventListener("pointermove", handleMove);
			document.removeEventListener("pointerover", handleOver, true);
		};
	}, []);

	return { ...position, hovering };
}