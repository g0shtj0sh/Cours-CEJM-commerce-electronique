import type { Metadata } from "next";
import LegalPage, { GuaranteeBox, LegalSection } from "@/components/LegalPage";
import { encadreGarantie, exceptionsRetractation } from "@/content/legal";
import { garantie, livraison, vendeur } from "@/content/vendeur";

export const metadata: Metadata = { title: "Garantie et service" };

export default function GarantiePage() {
  return (
    <LegalPage title="Garantie & service" active="garantie">
      <LegalSection title="Livraison">
        <p>
          Livraison incluse dans le prix, par {livraison.transporteur}, en{" "}
          {livraison.zone}, sous {livraison.delai}, et au plus tard 30 jours après
          la commande.
        </p>
      </LegalSection>

      <LegalSection id="retractation" title="Droit de rétractation">
        <p>
          Vous disposez de 14 jours à compter de la réception de votre montre pour
          vous rétracter, sans donner de motif et sans pénalité.
        </p>
        <p>
          Pour l&apos;exercer, envoyez-nous le formulaire ci-dessous ou toute
          déclaration claire, puis renvoyez la montre dans les 14 jours : nous
          prenons les frais de retour à notre charge. Nous vous remboursons au plus
          tard 14 jours après avoir été informés de votre décision, frais de
          livraison inclus, par le même moyen de paiement. Le remboursement peut
          être différé jusqu&apos;à la réception de la montre ou la preuve de son
          expédition.
        </p>
        <p>
          Les montres POINT ne sont concernées par aucune exception. La loi écarte
          ce droit notamment pour :
        </p>
        <ul className="list-disc space-y-1 pl-5">
          {exceptionsRetractation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="Modèle de formulaire de rétractation">
        <div className="space-y-2 rounded-panel border border-line p-6 text-sm leading-relaxed">
          <p>
            (Veuillez compléter et renvoyer le présent formulaire uniquement si vous
            souhaitez vous rétracter du contrat.)
          </p>
          <p>
            A l&apos;attention de {vendeur.denomination}, {vendeur.siege},{" "}
            {vendeur.email} :
          </p>
          <p>
            Je/nous (*) vous notifie/notifions (*) par la présente ma/notre (*)
            rétractation du contrat portant sur la vente du bien (*)/pour la
            prestation de services (*) ci-dessous :
          </p>
          <p>Commandé le (*)/reçu le (*) :</p>
          <p>Nom du (des) consommateur(s) :</p>
          <p>Adresse du (des) consommateur(s) :</p>
          <p>
            Signature du (des) consommateur(s) (uniquement en cas de notification du
            présent formulaire sur papier) :
          </p>
          <p>Date :</p>
          <p>(*) Rayez la mention inutile.</p>
        </div>
      </LegalSection>

      <LegalSection title="Garantie commerciale POINT">
        <p>
          Chaque montre est garantie {garantie.commerciale} contre tout défaut de
          fabrication, en plus des garanties légales et sans les remplacer. Pour en
          bénéficier, appelez le {vendeur.telephone}, {vendeur.horaires}.
        </p>
      </LegalSection>

      <LegalSection title="Garanties légales">
        <GuaranteeBox lines={encadreGarantie} />
      </LegalSection>
    </LegalPage>
  );
}
