import type { Metadata } from "next";
import { BrandContent } from "@/components/LegalContent";

export const metadata: Metadata = { title: "La marque" };

export default function Page() {
  return <BrandContent />;
}
