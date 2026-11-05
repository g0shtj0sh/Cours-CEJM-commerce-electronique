import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import { vendeur } from "@/content/vendeur";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  const { hebergeur, mediateur } = vendeur;

  return (
    <LegalPage title="Mentions légales">
      <LegalSection title="Éditeur du site et vendeur">
        <p>
          {vendeur.denomination}, {vendeur.formeJuridique.toLowerCase()} au capital de{" "}
          {vendeur.capital}.
          <br />
          Siège social : {vendeur.siege}.
          <br />
          {vendeur.rcs}. TVA intracommunautaire : {vendeur.tva}.
          <br />
          Téléphone : {vendeur.telephone}, {vendeur.horaires}.
          <br />
          E-mail : {vendeur.email}.
          <br />
          Directrice de la publication : {vendeur.directeurPublication}.
        </p>
      </LegalSection>

      <LegalSection title="Hébergeur">
        <p>
          {hebergeur.nom}, {hebergeur.adresse}. Téléphone : {hebergeur.telephone}.
        </p>
      </LegalSection>

      <LegalSection title="Médiation de la consommation">
        <p>
          En cas de litige non résolu avec notre service client, vous pouvez saisir
          gratuitement {mediateur.nom}, {mediateur.adresse}.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          {vendeur.denomination} est responsable du traitement. Vos nom, adresse et
          e-mail servent uniquement à exécuter votre commande. Ils sont conservés le
          temps de la relation commerciale, puis archivés pendant les durées légales.
        </p>
        <p>
          Vous pouvez demander l&apos;accès, la rectification, l&apos;effacement ou
          la portabilité de vos données, et vous opposer à leur traitement, au{" "}
          {vendeur.telephone} ou à {vendeur.email}. Vous pouvez aussi saisir la CNIL.
        </p>
      </LegalSection>

      <LegalSection title="Offres par e-mail">
        <p>
          Nous ne vous envoyons d&apos;offres par e-mail qu&apos;avec votre accord
          préalable : la case prévue à la commande est décochée par défaut. Vous
          pouvez retirer cet accord à tout moment, gratuitement, par le lien de
          désinscription présent dans chaque e-mail ou par téléphone.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Ce site ne dépose aucun cookie publicitaire ni de mesure d&apos;audience.
          Votre panier et vos favoris sont gardés dans votre navigateur, uniquement
          pour faire fonctionner le site.
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          La marque POINT, les visuels et les textes de ce site sont protégés.
          Toute reproduction sans autorisation est interdite.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
