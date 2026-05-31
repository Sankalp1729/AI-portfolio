import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MailMind AI — Product Case Study | Sankalp Pingalwad",
  description:
    "How I designed and built MailMind AI — the product decisions, user problems, trade-offs, and architecture behind an AI email intelligence system.",
  alternates: {
    canonical: "/case-study/mailmind",
  },
};

export default function MailMindLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
