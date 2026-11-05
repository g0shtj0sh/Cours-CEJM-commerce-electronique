import type { Metadata } from "next";
import { TermsContent } from "@/components/LegalContent";

export const metadata: Metadata = { title: "Conditions générales de vente" };

export default function Page() {
  return <TermsContent />;
}
