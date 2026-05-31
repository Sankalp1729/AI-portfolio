import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multimodal Emotion Recognition — Case Study | Sankalp Pingalwad",
  description:
    "How I built a 3-modal deep learning system and used ablation studies as a product decision framework — CNN, LSTM, MFCC fusion research.",
  alternates: {
    canonical: "/case-study/multimodal-emotion",
  },
};

export default function MultimodalEmotionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
