import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { product } from "@/content/product";
import SmoothScroll from "@/components/SmoothScroll";

/**
 * Une seule famille, exploitée sur son axe de largeur (wdth 62 → 125).
 * Le display, le texte courant et les données techniques sont la même
 * police à des largeurs différentes.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${product.name} — enceinte large bande`,
  description: product.tagline,
  authors: [{ name: "Cours CEJM" }],
  other: {
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  themeColor: "#c6c8c3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={archivo.variable}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
