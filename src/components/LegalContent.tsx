"use client";

import Image from "next/image";
import LegalPage, { GuaranteeBox, LegalSection } from "@/components/LegalPage";
import { legalContent } from "@/content/legal";
import { garantie, livraison, vendeur } from "@/content/vendeur";
import { useSettings, useT } from "@/lib/settings";

/** Contenu des pages d'information, dans la langue choisie. */

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
            ? "You have 14 days from receipt of your watch to withdraw, with no reason and no penalty."
            : "Vous disposez de 14 jours à compter de la réception de votre montre pour vous rétracter, sans donner de motif et sans pénalité."}
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

      <LegalSection title={en ? "Personal data" : "Données personnelles"}>
        <p>
          {en
            ? `${vendeur.denomination} is the data controller. Your name, address and email are used only to carry out your order. They are kept for the duration of the commercial relationship, then archived for the legal periods.`
            : `${vendeur.denomination} est responsable du traitement. Vos nom, adresse et e-mail servent uniquement à exécuter votre commande. Ils sont conservés le temps de la relation commerciale, puis archivés pendant les durées légales.`}
        </p>
        <p>
          {en
            ? `You can request access, rectification, erasure or portability of your data, and object to its processing, on ${vendeur.telephone} or at ${vendeur.email}. You can also contact the CNIL, the French data protection authority.`
            : `Vous pouvez demander l'accès, la rectification, l'effacement ou la portabilité de vos données, et vous opposer à leur traitement, au ${vendeur.telephone} ou à ${vendeur.email}. Vous pouvez aussi saisir la CNIL.`}
        </p>
      </LegalSection>

      <LegalSection title={en ? "Offers by email" : "Offres par e-mail"}>
        <p>
          {en
            ? "We only send you offers by email with your prior consent: the box at checkout is unticked by default. You can withdraw this consent at any time, free of charge, using the unsubscribe link in every email or by phone."
            : "Nous ne vous envoyons d'offres par e-mail qu'avec votre accord préalable : la case prévue à la commande est décochée par défaut. Vous pouvez retirer cet accord à tout moment, gratuitement, par le lien de désinscription présent dans chaque e-mail ou par téléphone."}
        </p>
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
