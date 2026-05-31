import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DocuMind AI — Product Case Study | Sankalp Pingalwad",
  description:
    "How I built a RAG-powered document intelligence platform — the product decisions, user research, and trade-offs behind sub-800ms semantic retrieval.",
  alternates: {
    canonical: "/case-study/documind",
  },
};

export default function DocuMindLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
