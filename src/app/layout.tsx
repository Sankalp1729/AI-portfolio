import type { Metadata } from "next";
import { DM_Sans, Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import AvatarIntro from "../components/avatar/AvatarIntro";
import ScrollProgress from "../components/ui/ScrollProgress";
import Navbar from "../components/ui/Navbar";
import { siteConfig } from "../lib/data";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

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
      className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-black text-white">
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
        {children}
      </body>
    </html>
  );
}
