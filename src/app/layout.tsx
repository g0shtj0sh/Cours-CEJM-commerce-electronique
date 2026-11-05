import type { Metadata, Viewport } from "next";
import { Doto, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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

export const metadata: Metadata = {
  title: { default: "POINT — Montres numériques", template: "%s | POINT" },
  description:
    "Montres numériques à écran matriciel, en séries limitées. Prix TTC, livraison incluse, 14 jours pour changer d'avis.",
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
