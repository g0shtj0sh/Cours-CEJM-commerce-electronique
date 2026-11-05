import type { Metadata } from "next";
import { NoticeContent } from "@/components/LegalContent";

export const metadata: Metadata = { title: "Mentions légales" };

export default function Page() {
  return <NoticeContent />;
}
