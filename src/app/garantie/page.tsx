import type { Metadata } from "next";
import { WarrantyContent } from "@/components/LegalContent";

export const metadata: Metadata = { title: "Garantie et service" };

export default function Page() {
  return <WarrantyContent />;
}
