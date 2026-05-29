"use client";

import { useEffect, useState } from "react";

export function useDelayedBoolean(initialValue: boolean, delay: number) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		const timeout = window.setTimeout(() => setValue(initialValue), delay);
		return () => window.clearTimeout(timeout);
	}, [delay, initialValue]);

	return [value, setValue] as const;
}