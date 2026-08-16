import type { Metadata, Viewport } from "next";
import { Poppins, Archivo_Black } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { site } from "@/content/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Premium Car Detailing in Melrose Park, IL`,
    template: `%s | ${site.name}`,
  },
  description:
    "Premium auto detailing in Melrose Park, IL. Interior & exterior details, ceramic coating, paint correction and mobile detailing across the Chicago West suburbs. By appointment only.",
  keywords: [
    "car detailing Melrose Park IL",
    "auto detailing near me Chicago",
    "ceramic coating Melrose Park",
    "interior detailing Chicago suburbs",
    "mobile detailing Melrose Park",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Premium Car Detailing in Melrose Park, IL`,
    description:
      "Your car, showroom new. Premium detailing in Melrose Park, by appointment only.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Premium Car Detailing in Melrose Park, IL`,
    description:
      "Your car, showroom new. Premium detailing in Melrose Park, by appointment only.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${archivoBlack.variable}`}>
      <body className="font-sans">
        {/* Mount point: custom logo entrance animation (see components/IntroAnimation.tsx) */}
        <IntroAnimation />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
