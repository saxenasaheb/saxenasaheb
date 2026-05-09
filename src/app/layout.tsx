import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { generateMedicalBusinessJsonLd } from "@/lib/seo";
import { practitioner } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${practitioner.name} | Advanced MSK Physiotherapist, London`,
    template: `%s | ${practitioner.name}`,
  },
  description:
    "Expert musculoskeletal physiotherapy in London. NHS-trained Advanced MSK Physiotherapist and Clinical Lead offering evidence-based specialist care. HCPC registered, CSP member.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sueellenpereira.co.uk"
  ),
  keywords: [
    "MSK physiotherapist London",
    "musculoskeletal physiotherapy London",
    "private physiotherapy London",
    "sports injury London",
    "advanced physiotherapist",
    "first contact practitioner",
    "injection therapy London",
    "running gait analysis London",
    "HCPC physiotherapist",
  ],
  authors: [{ name: practitioner.name }],
  creator: practitioner.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: `${practitioner.name} — Advanced MSK Physiotherapist`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateMedicalBusinessJsonLd();

  return (
    <html lang="en-GB">
      <head>
        {/* Google Fonts — preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Inter:wght@100..900&family=Caveat:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Plausible Analytics — uncomment and add your domain after GDPR consent */}
        {/* <script defer data-domain="sueellenpereira.co.uk" src="https://plausible.io/js/script.js"></script> */}
      </head>
      <body className="font-body bg-cream text-charcoal antialiased">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
