import type { Metadata } from "next";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Surface } from "@/components/Shared";

export const metadata: Metadata = { title: "Panier" };

export default function PanierPage() {
  return (
    <>
      <div className="relative min-h-svh overflow-hidden" style={{ "--ambient": "42 72 92" } as React.CSSProperties}>
        <Surface />
        <div className="relative">
          <Header />
          <Cart />
        </div>
      </div>
      <Footer />
    </>
  );
}
