"use client";

import Image from "next/image";
import { useState } from "react";
import LegalPage, { GuaranteeBox, LegalSection } from "@/components/LegalPage";
import { legalContent } from "@/content/legal";
import { garantie, livraison, vendeur } from "@/content/vendeur";
import { useSettings, useT } from "@/lib/settings";

/** Contenu des pages d'information, dans la langue choisie. */

/** Opt-out : retirer son accord doit être aussi simple que l'avoir donné. */
function UnsubscribeButton({ en }: { en: boolean }) {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <p role="status" className="font-semibold text-ink">
        {en
          ? "Unsubscribed. Simulation: this site sends no email."
          : "Désinscription enregistrée. Simulation : ce site n'envoie aucun e-mail."}
      </p>
    );
  }
  return (
    <button type="button" className="button-ghost" onClick={() => setDone(true)}>
      {en ? "Unsubscribe from offers" : "Me désinscrire des offres"}
    </button>
  );
}

export function TermsContent() {
  const { lang } = useSettings();
  const t = useT();
  const legal = legalContent(lang);
  return (
    <LegalPage title={t.pages.termsTitle} wide={<GuaranteeBox lines={legal.encadre} />}>
      {legal.cgv.map(([title, text]) => (
        <LegalSection key={title} title={title}>
          <p>{text}</p>
        </LegalSection>
      ))}
    </LegalPage>
  );
}

export function WarrantyContent() {
  const { lang } = useSettings();
  const t = useT();
  const legal = legalContent(lang);
  const en = lang === "en";

  return (
    <LegalPage
      title={t.pages.warrantyTitle}
      active="garantie"
      wide={<GuaranteeBox lines={legal.encadre} />}
    >
      <LegalSection title={en ? "Delivery" : "Livraison"}>
        <p>
          {en
            ? `Delivery included in the price, by ${livraison.transporteur}, to mainland France, within ${legal.delayText}, and no later than 30 days after the order.`
            : `Livraison incluse dans le prix, par ${livraison.transporteur}, en ${livraison.zone}, sous ${livraison.delai}, et au plus tard 30 jours après la commande.`}
        </p>
      </LegalSection>

      <LegalSection id="retractation" title={en ? "Right of withdrawal" : "Droit de rétractation"}>
        <p>
          {en
            ? "You have 14 days from receipt of your watch to withdraw, with no reason and no penalty. This right applies to every order placed here because you are buying online. In a physical shop it does not exist, except after doorstep or similar solicitation."
            : "Vous disposez de 14 jours à compter de la réception de votre montre pour vous rétracter, sans donner de motif et sans pénalité. Ce droit s'applique à toutes les commandes passées ici, parce que vous achetez en ligne. En magasin, il n'existe qu'en cas de démarchage."}
        </p>
        <p>
          {en
            ? "To do so, send us the form below or any clear statement, then return the watch within 14 days: return shipping is on us. We refund you no later than 14 days after being informed of your decision, delivery costs included, using the same means of payment. The refund may be withheld until we receive the watch or proof of shipment."
            : "Pour l'exercer, envoyez-nous le formulaire ci-dessous ou toute déclaration claire, puis renvoyez la montre dans les 14 jours : nous prenons les frais de retour à notre charge. Nous vous remboursons au plus tard 14 jours après avoir été informés de votre décision, frais de livraison inclus, par le même moyen de paiement. Le remboursement peut être différé jusqu'à la réception de la montre ou la preuve de son expédition."}
        </p>
        <p>
          {en
            ? "POINT watches are not affected by any exception. The law excludes this right in particular for:"
            : "Les montres POINT ne sont concernées par aucune exception. La loi écarte ce droit notamment pour :"}
        </p>
        <ul className="list-disc space-y-1 pl-5">
          {legal.exceptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          {en
            ? "A POINT watch is not made to measure, is not perishable and is not sealed for hygiene reasons. Neither its price nor its rarity removes this right."
            : "Une montre POINT n'est ni faite sur mesure, ni périssable, ni scellée pour des raisons d'hygiène. Son prix ou sa rareté ne retirent pas ce droit."}
        </p>
      </LegalSection>

      <LegalSection title={en ? "Model withdrawal form" : "Modèle de formulaire de rétractation"}>
        {en ? <p className="text-xs">Official French form, reproduced as is. Fill it in French or in English.</p> : null}
        <div className="space-y-2 rounded-2xl border border-line p-5 text-sm leading-relaxed">
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

      <LegalSection title={en ? "POINT commercial warranty" : "Garantie commerciale POINT"}>
        <p>
          {en
            ? `Every watch is warranted for 3 years against manufacturing defects, in addition to the legal guarantees and without replacing them. To use it, call ${vendeur.telephone}, ${t.legalHours}.`
            : `Chaque montre est garantie ${garantie.commerciale} contre tout défaut de fabrication, en plus des garanties légales et sans les remplacer. Pour en bénéficier, appelez le ${vendeur.telephone}, ${t.legalHours}.`}
        </p>
      </LegalSection>
    </LegalPage>
  );
}

export function NoticeContent() {
  const { lang } = useSettings();
  const t = useT();
  const { hebergeur, mediateur } = vendeur;
  const en = lang === "en";

  return (
    <LegalPage title={t.pages.legalTitle}>
      <LegalSection title={en ? "Site publisher and seller" : "Éditeur du site et vendeur"}>
        <p>
          {en
            ? `${vendeur.denomination}, simplified joint-stock company with a capital of ${vendeur.capital}.`
            : `${vendeur.denomination}, ${vendeur.formeJuridique.toLowerCase()} au capital de ${vendeur.capital}.`}
          <br />
          {en ? "Registered office" : "Siège social"} : {vendeur.siege}.
          <br />
          {vendeur.rcs}. {en ? "EU VAT number" : "TVA intracommunautaire"} : {vendeur.tva}.
          <br />
          {en ? "Phone" : "Téléphone"} : {vendeur.telephone}, {t.legalHours}.
          <br />
          E-mail : {vendeur.email}.
          <br />
          {en ? "Publication director: Camille Rousseau, president." : `Directrice de la publication : ${vendeur.directeurPublication}.`}
        </p>
      </LegalSection>

      <LegalSection title={en ? "Host" : "Hébergeur"}>
        <p>
          {hebergeur.nom}, {hebergeur.adresse}. {en ? "Phone" : "Téléphone"} : {hebergeur.telephone}.
        </p>
      </LegalSection>

      <LegalSection title={en ? "Consumer mediation" : "Médiation de la consommation"}>
        <p>
          {en
            ? `If a dispute with our customer service remains unresolved, you can refer it free of charge to ${mediateur.nom}, ${mediateur.adresse}.`
            : `En cas de litige non résolu avec notre service client, vous pouvez saisir gratuitement ${mediateur.nom}, ${mediateur.adresse}.`}
        </p>
      </LegalSection>

      <LegalSection title={en ? "Language and currency" : "Langue et devise"}>
        <p>
          {en
            ? "POINT sells in mainland France only, under French law. The English version of this site is a courtesy translation: the French version prevails. Dollar prices are indicative, and only the price in euros is billed."
            : "POINT vend uniquement en France métropolitaine, selon le droit français. La version anglaise du site est une traduction de courtoisie : la version française fait foi. Les prix en dollars sont indicatifs, seul le prix en euros est facturé."}
        </p>
      </LegalSection>

      <LegalSection id="donnees" title={en ? "Personal data" : "Données personnelles"}>
        <p>
          {en
            ? `${vendeur.denomination}, ${vendeur.siege}, is the data controller. The surname, first name, postal address and email you enter at checkout are used to process and deliver your order and, only if you agree, to send you offers by email.`
            : `${vendeur.denomination}, ${vendeur.siege}, est responsable du traitement. Les nom, prénom, adresse postale et e-mail saisis à la commande servent à traiter et livrer votre commande et, seulement si vous l'acceptez, à vous envoyer des offres par e-mail.`}
        </p>
        <p>
          {en
            ? "Legal basis: performance of the contract for your order (without these details, the order cannot be delivered), your consent for offers by email."
            : "Base légale : l'exécution du contrat pour votre commande (sans ces informations, elle ne peut pas être livrée), votre consentement pour les offres par e-mail."}
        </p>
        <p>
          {en
            ? `Recipients: only ${vendeur.denomination} staff, the carrier (${livraison.transporteur}) for delivery, and the host. No data is sold or passed on for advertising.`
            : `Destinataires : seuls le personnel de ${vendeur.denomination}, le transporteur (${livraison.transporteur}) pour la livraison et l'hébergeur y ont accès. Aucune donnée n'est vendue ni cédée à des fins publicitaires.`}
        </p>
        <p>
          {en
            ? `Transfer outside the EU: the host, ${vendeur.hebergeur.nom}, is based in the United States. Technical data (such as your IP address in server logs) may be processed there, under the EU-US Data Privacy Framework and the European Commission's standard contractual clauses.`
            : `Transfert hors de l'Union européenne : l'hébergeur, ${vendeur.hebergeur.nom}, est établi aux États-Unis. Des données techniques (comme votre adresse IP dans les journaux du serveur) peuvent y être traitées, dans le cadre du Data Privacy Framework UE-États-Unis et des clauses contractuelles types de la Commission européenne.`}
        </p>
        <p>
          {en
            ? "Retention: order data for the duration of the commercial relationship, then 10 years for invoices (accounting obligation); data used for offers, 3 years after your last contact with us, or until you unsubscribe."
            : "Durée de conservation : les données de commande le temps de la relation commerciale, puis 10 ans pour les factures (obligation comptable) ; les données utilisées pour les offres, 3 ans après votre dernier contact avec nous, ou jusqu'à votre désinscription."}
        </p>
        <p>
          {en
            ? `Your rights: access, rectification, erasure, restriction, portability, objection, and withdrawal of your consent at any time, on ${vendeur.telephone} or at ${vendeur.email}. You can also lodge a complaint with the CNIL (3 place de Fontenoy, 75007 Paris, cnil.fr).`
            : `Vos droits : accès, rectification, effacement, limitation, portabilité, opposition, et retrait de votre consentement à tout moment, au ${vendeur.telephone} ou à ${vendeur.email}. Vous pouvez aussi adresser une réclamation à la CNIL (3 place de Fontenoy, 75007 Paris, cnil.fr).`}
        </p>
        <p>
          {en
            ? "No automated decision-making or profiling, and no artificial intelligence system is used on this site."
            : "Aucune décision automatisée ni aucun profilage, et aucun système d'intelligence artificielle n'est utilisé sur ce site."}
        </p>
      </LegalSection>

      <LegalSection id="offres" title={en ? "Offers by email" : "Offres par e-mail"}>
        <p>
          {en
            ? "Opt-in: we only send you offers by email with your prior consent. The box at checkout is unticked by default, and ticking it is up to you."
            : "Opt-in : nous ne vous envoyons d'offres par e-mail qu'avec votre accord préalable. La case prévue à la commande est décochée par défaut, et c'est à vous de la cocher."}
        </p>
        <p>
          {en
            ? "Opt-out: you can withdraw this consent at any time, free of charge, using the unsubscribe link in every email, by phone or with the button below."
            : "Opt-out : vous pouvez retirer cet accord à tout moment, gratuitement, par le lien de désinscription présent dans chaque e-mail, par téléphone ou avec le bouton ci-dessous."}
        </p>
        <p>
          {en
            ? "The law allows two exceptions to prior consent: messages to an existing customer about similar products, and non-commercial messages, such as those from charities. POINT uses neither: even if you are already a customer, we do not contact you without your consent."
            : "La loi prévoit deux exceptions à l'accord préalable : les messages adressés à une personne déjà cliente pour des produits analogues, et les messages non commerciaux, par exemple caritatifs. POINT n'utilise aucune de ces exceptions : même déjà client, vous n'êtes pas démarché sans votre accord."}
        </p>
        <UnsubscribeButton en={en} />
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          {en
            ? "This site sets no advertising or audience measurement cookies. Your cart, favourites, language and currency are kept in your browser, only to make the site work."
            : "Ce site ne dépose aucun cookie publicitaire ni de mesure d'audience. Votre panier, vos favoris, votre langue et votre devise sont gardés dans votre navigateur, uniquement pour faire fonctionner le site."}
        </p>
      </LegalSection>

      <LegalSection title={en ? "Intellectual property" : "Propriété intellectuelle"}>
        <p>
          {en
            ? "The POINT brand and the images and texts of this site are protected. Any reproduction without permission is prohibited."
            : "La marque POINT, les visuels et les textes de ce site sont protégés. Toute reproduction sans autorisation est interdite."}
        </p>
      </LegalSection>
    </LegalPage>
  );
}

export function BrandContent() {
  const { lang } = useSettings();
  const t = useT();
  const legal = legalContent(lang);
  const en = lang === "en";

  return (
    <LegalPage title={t.pages.brandTitle} active="marque" columns={false}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0 space-y-8">
          <LegalSection title={en ? "Why POINT" : "Pourquoi POINT"}>
            <p>
              {en
                ? "A dot is the smallest unit of our screens: a few hundred of them are enough to tell the time. Each watch has a name of its own, and each variant adds its name in brackets: Prisme (Neige), Parcours (Désert)."
                : "Un point est la plus petite unité de nos écrans : quelques centaines d'entre eux suffisent à donner l'heure. Chaque montre porte un nom propre, et chaque variante ajoute le sien entre parenthèses : Prisme (Neige), Parcours (Désert)."}
            </p>
          </LegalSection>
          <LegalSection title={en ? "Counterfeiting" : "Contrefaçon"}>
            <p>
              {en
                ? "Any reproduction or imitation of the brand, the invention or the cases without the permission of POINT SAS constitutes counterfeiting."
                : "Toute reproduction ou imitation de la marque, de l'invention ou des boîtiers sans autorisation de POINT SAS constitue une contrefaçon."}
            </p>
          </LegalSection>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-panel bg-card">
          <Image
            src="/images/editorial-marque.webp"
            alt={en ? "Black plate pierced with dots, with one dot lit in orange" : "Plaque noire percée de points, un seul point allumé en orange"}
            fill
            decoding="sync"
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {legal.propriete.map((item) => (
          <article key={item.titre} className="card p-5 sm:p-6">
            <h2 className="text-lg font-semibold">{item.titre}</h2>
            <p className="label mt-1 text-accent">{item.numero}</p>
            <p className="copy mt-3">{item.texte}</p>
          </article>
        ))}
      </div>
    </LegalPage>
  );
}
