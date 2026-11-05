import type { Metadata } from "next";
import Checkout from "@/components/Checkout";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Surface } from "@/components/Shared";

export const metadata: Metadata = { title: "Commande" };

export default function CommandePage() {
  return (
    <>
      <div className="relative min-h-svh overflow-hidden" style={{ "--ambient": "42 72 92" } as React.CSSProperties}>
        <Surface />
        <div className="relative">
          <Header />
          <Checkout />
        </div>
      </div>
      <Footer />
    </>
  );
}
