import type { Metadata } from "next";
import "./globals.css";
import AvatarIntroClient from "@/components/layout/AvatarIntroClient";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { siteConfig } from "@/lib/data";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Sankalp Pingalwad — AI Product Builder",
  description:
    "Final-year AI student in Mumbai who builds and ships AI products — email AI, RAG systems, multi-agent architectures. Thinking about product, not just code.",
  metadataBase: new URL("https://sankalppingalwad.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sankalp Pingalwad — AI Product Builder",
    description:
      "Final-year AI student in Mumbai who builds and ships AI products — email AI, RAG systems, multi-agent architectures. Thinking about product, not just code.",
    url: "/",
    siteName: "Sankalp Pingalwad",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sankalp Pingalwad portfolio Open Graph image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sankalp Pingalwad — AI Product Builder",
    description:
      "Final-year AI student in Mumbai who builds and ships AI products — email AI, RAG systems, multi-agent architectures. Thinking about product, not just code.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
        <ScrollProgress />
        <Navbar />
        <AvatarIntroClient />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.name,
              jobTitle: "AI Product Builder",
              email: siteConfig.email,
              url: "https://sankalppingalwad.vercel.app",
              sameAs: [siteConfig.github, siteConfig.linkedin],
              address: {
                "@type": "PostalAddress",
                addressLocality: siteConfig.location,
                addressCountry: "IN",
              },
            }),
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
