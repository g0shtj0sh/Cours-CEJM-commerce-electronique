import type { Metadata } from "next";
import LegalPage, { GuaranteeBox, LegalSection } from "@/components/LegalPage";
import { cgv, encadreGarantie } from "@/content/legal";

export const metadata: Metadata = { title: "Conditions générales de vente" };

export default function CgvPage() {
  return (
    <LegalPage title="Conditions générales de vente">
      {cgv.map(([title, text]) => (
        <LegalSection key={title} title={title}>
          <p>{text}</p>
        </LegalSection>
      ))}
      <LegalSection title="Garanties légales">
        <GuaranteeBox lines={encadreGarantie} />
      </LegalSection>
    </LegalPage>
  );
}
