import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unified Context AI — Product Case Study | Sankalp Pingalwad",
  description:
    "How I designed an 8-agent cross-platform AI system with shared memory — the product decisions behind multi-agent architecture.",
  alternates: {
    canonical: "/case-study/unified-context",
  },
};

export default function UnifiedContextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
