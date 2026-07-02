import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL, businessInfo } from "@/lib/site-config";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nettuno Gold — Poker Room a Bologna",
    template: "%s — Nettuno Gold",
  },
  description:
    "Nettuno Gold, poker room a Villanova di Castenaso (Bologna): tornei di Texas Hold'em quasi ogni giorno, 18 tavoli, staff professionale. Scopri il calendario tornei e vieni a giocare.",
  keywords: [
    "poker Bologna",
    "poker room Bologna",
    "tornei poker Bologna",
    "Texas Hold'em Bologna",
    "Nettuno Gold",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "Nettuno Gold",
    title: "Nettuno Gold — Poker Room a Bologna",
    description:
      "Tornei di Texas Hold'em quasi ogni giorno a Villanova di Castenaso (Bologna). 18 tavoli, staff professionale, area di 500 m².",
    images: [{ url: "/logo/nettuno-gold-full.png", width: 1200, height: 1708 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nettuno Gold — Poker Room a Bologna",
    description:
      "Tornei di Texas Hold'em quasi ogni giorno a Villanova di Castenaso (Bologna).",
  },
  icons: {
    icon: "/favicon-emblem.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: businessInfo.name,
    image: `${SITE_URL}/logo/nettuno-gold-full.png`,
    url: SITE_URL,
    telephone: businessInfo.phone,
    email: businessInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.street,
      addressLocality: businessInfo.address.city,
      postalCode: businessInfo.address.postalCode,
      addressRegion: businessInfo.address.region,
      addressCountry: "IT",
    },
    sameAs: [businessInfo.social.instagram, businessInfo.social.facebook],
  };

  return (
    <html
      lang="it"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-background"
        >
          Vai al contenuto
        </a>
        <Header />
        <main id="contenuto" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
