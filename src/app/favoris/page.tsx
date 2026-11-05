import type { Metadata } from "next";
import Favorites from "@/components/Favorites";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Surface } from "@/components/Shared";
import { shopModels } from "@/lib/catalogue.server";

export const metadata: Metadata = { title: "Favoris" };

export default function FavorisPage() {
  return (
    <>
      <div className="relative min-h-svh overflow-hidden">
        <Surface />
        <div className="relative">
          <Header />
          <Favorites models={shopModels()} />
        </div>
      </div>
      <Footer />
    </>
  );
}
