import type { Metadata } from "next";
import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import { Surface } from "@/components/Shared";
import { shopModels } from "@/lib/catalogue.server";

export const metadata: Metadata = { title: "Montres" };

export default function MontresPage() {
  return (
    <>
      <div className="relative overflow-x-clip">
        <Surface fixed />
        <Collection models={shopModels()} />
      </div>
      <Footer />
    </>
  );
}
