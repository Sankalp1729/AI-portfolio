import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "64px",
				background:
					"radial-gradient(circle at 20% 20%, rgba(59,130,246,0.35), transparent 30%), radial-gradient(circle at 80% 20%, rgba(124,58,237,0.3), transparent 28%), linear-gradient(135deg, #050505 0%, #0b1020 55%, #050505 100%)",
				color: "#f8fafc",
				fontFamily: "sans-serif",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 760 }}>
				<div
					style={{
						display: "inline-flex",
						alignItems: "center",
						justifyContent: "center",
						width: 96,
						height: 96,
						borderRadius: 999,
						background: "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(124,58,237,0.9))",
						boxShadow: "0 0 48px rgba(59,130,246,0.28)",
						fontSize: 34,
						fontWeight: 700,
						letterSpacing: "0.2em",
					}}
				>
					SP
				</div>
				<div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.05em" }}>
					Sankalp Pingalwad
				</div>
				<div style={{ fontSize: 28, color: "rgba(226,232,240,0.8)", lineHeight: 1.35, maxWidth: 700 }}>
					AI Product Builder building production RAG systems, multi-agent architectures, and deployed AI products.
				</div>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-end",
					justifyContent: "space-between",
					height: "100%",
				}}
			>
				<div style={{ fontSize: 20, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(148,163,184,0.86)" }}>
					Mumbai
				</div>
				<div style={{ fontSize: 22, color: "rgba(248,250,252,0.72)" }}>
					Final-year AI student
				</div>
			</div>
		</div>,
		size,
	);
}