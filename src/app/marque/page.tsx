import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import { proprieteIndustrielle } from "@/content/legal";

export const metadata: Metadata = { title: "La marque" };

export default function MarquePage() {
  return (
    <LegalPage title="Marque et brevet" active="marque">
      <LegalSection title="Pourquoi POINT">
        <p>
          Un point est la plus petite unité de nos écrans : quelques centaines
          d&apos;entre eux suffisent à donner l&apos;heure. Nos montres portent un nom simple et un
          numéro de génération, entre parenthèses : Carré (1), Octo (1), Rond (1), Ligne (1).
        </p>
      </LegalSection>

      <div className="grid gap-5">
        {proprieteIndustrielle.map((item) => (
          <article key={item.titre} className="card p-6">
            <h2 className="text-lg font-semibold">{item.titre}</h2>
            <p className="label mt-1 text-accent">{item.numero}</p>
            <p className="copy mt-3">{item.texte}</p>
          </article>
        ))}
      </div>

      <LegalSection title="Contrefaçon">
        <p>
          Toute reproduction ou imitation de la marque, de l&apos;invention ou des
          boîtiers sans autorisation de POINT SAS constitue une contrefaçon.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
