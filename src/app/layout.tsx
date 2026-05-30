import type { Metadata } from "next";
import "./globals.css";
import AvatarIntro from "@/components/avatar/AvatarIntro";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { siteConfig } from "@/lib/data";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Sankalp Pingalwad — AI Engineer",
  description:
    "Final-year AI Engineering student building production RAG systems, multi-agent architectures, and deployed AI products. Based in Mumbai.",
  metadataBase: new URL("https://sankalppingalwad.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sankalp Pingalwad — AI Engineer",
    description:
      "Final-year AI Engineering student building production RAG systems, multi-agent architectures, and deployed AI products. Based in Mumbai.",
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
    title: "Sankalp Pingalwad — AI Engineer",
    description:
      "Final-year AI Engineering student building production RAG systems, multi-agent architectures, and deployed AI products. Based in Mumbai.",
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
        <AvatarIntro />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.name,
              jobTitle: "AI Engineer",
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
