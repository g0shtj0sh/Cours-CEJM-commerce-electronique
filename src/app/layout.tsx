import type { Metadata, Viewport } from "next";
import { Doto, Manrope } from "next/font/google";
import "./globals.css";
import Interactions from "@/components/Interactions";
import IntroDial from "@/components/IntroDial";
import SmoothScroll from "@/components/SmoothScroll";
import { LangSync } from "@/lib/settings";

/** Doto pour les titres en matrice de points, Manrope pour tout le reste. */
const doto = Doto({
  subsets: ["latin"],
  axes: ["ROND"],
  variable: "--font-doto",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const SITE_DESCRIPTION =
  "Montres numériques à écran matriciel, en séries limitées. Prix TTC, livraison incluse, 14 jours pour changer d'avis.";

export const metadata: Metadata = {
  metadataBase: new URL("https://cours-cejm-commerce-electronique.vercel.app"),
  title: { default: "POINT — Montres numériques", template: "%s | POINT" },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "POINT — Montres numériques",
    description: SITE_DESCRIPTION,
    siteName: "POINT",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#050403",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${doto.variable} ${manrope.variable}`}>
      <body>
        <LangSync />
        <IntroDial />
        <Interactions />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
