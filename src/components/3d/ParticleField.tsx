"use client";

import type { Engine } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

const initParticles = async (engine: Engine) => {
	await loadSlim(engine);
};

export default function ParticleField() {
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const updateViewport = () => {
			setIsDesktop(window.innerWidth >= 768);
		};

		updateViewport();
		window.addEventListener("resize", updateViewport);

		return () => window.removeEventListener("resize", updateViewport);
	}, []);

	if (!isDesktop) {
		return null;
	}

	return (
		<ParticlesProvider init={initParticles}>
			<Particles
				id="hero-particles"
				className="absolute inset-0"
				options={{
					fullScreen: {
						enable: false,
					},
					background: {
						color: {
							value: "#050505",
						},
					},
					fpsLimit: 60,
					interactivity: {
						events: {
							onHover: {
								enable: true,
								mode: "repulse",
							},
						},
						modes: {
							repulse: {
								distance: 90,
								duration: 0.4,
							},
						},
					},
					particles: {
						color: {
							value: ["#3b82f6", "#60a5fa", "#8b5cf6"],
						},
						links: {
							enable: true,
							color: "#2563eb",
							distance: 160,
							opacity: 0.3,
							width: 1,
						},
						move: {
							enable: true,
							direction: "none",
							random: false,
							speed: 0.45,
							straight: false,
							outModes: {
								default: "bounce",
							},
						},
						number: {
							value: 72,
							density: {
								enable: true,
								width: 900,
								height: 900,
							},
						},
						opacity: {
							value: 0.45,
						},
						size: {
							value: { min: 1, max: 3 },
						},
					},
					detectRetina: true,
				}}
			/>
		</ParticlesProvider>
	);
}