import type { Metadata } from "next";
import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Surface } from "@/components/Shared";
import { shopModels } from "@/lib/catalogue.server";

export const metadata: Metadata = { title: "Montres" };

export default function MontresPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <Surface />
        <div className="relative">
          <Header active="montres" />
          <Collection models={shopModels()} />
        </div>
      </div>
      <Footer />
    </>
  );
}
