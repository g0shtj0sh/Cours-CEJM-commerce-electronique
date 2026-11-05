"use client";

import Link from "next/link";
import { useState } from "react";
import { euros, findModel, tvaCents } from "@/content/catalogue";
import { precontractuel } from "@/content/legal";
import { livraison, vendeur } from "@/content/vendeur";
import { useCart } from "@/lib/stores";

type Step = "coordonnees" | "verification" | "paiement" | "confirmation";

const steps: { id: Step; label: string }[] = [
  { id: "coordonnees", label: "Coordonnées" },
  { id: "verification", label: "Vérification" },
  { id: "paiement", label: "Paiement" },
  { id: "confirmation", label: "Confirmation" },
];

type Customer = {
  prenom: string;
  nom: string;
  email: string;
  adresse: string;
  codePostal: string;
  ville: string;
};

const emptyCustomer: Customer = {
  prenom: "",
  nom: "",
  email: "",
  adresse: "",
  codePostal: "",
  ville: "",
};

const fields: { key: keyof Customer; label: string; type?: string; auto: string; wide?: boolean }[] = [
  { key: "prenom", label: "Prénom", auto: "given-name" },
  { key: "nom", label: "Nom", auto: "family-name" },
  { key: "email", label: "Adresse e-mail", type: "email", auto: "email", wide: true },
  { key: "adresse", label: "Adresse", auto: "street-address", wide: true },
  { key: "codePostal", label: "Code postal", auto: "postal-code" },
  { key: "ville", label: "Ville", auto: "address-level2" },
];

type Order = {
  number: string;
  date: string;
  items: { id: string; name: string; ref: string; strapSize: string; priceCents: number }[];
  total: number;
};

export default function Checkout() {
  const { lines, clear } = useCart();
  const [step, setStep] = useState<Step>("coordonnees");
  const [customer, setCustomer] = useState(emptyCustomer);
  const [newsletter, setNewsletter] = useState(false);
  const [acceptsTerms, setAcceptsTerms] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const items = lines.flatMap((line) => {
    const model = findModel(line.slug);
    return model
      ? [
          {
            id: line.id,
            name: model.name,
            ref: model.ref,
            strapSize: line.strapSize,
            priceCents: model.priceCents,
          },
        ]
      : [];
  });

  const shown = order?.items ?? items;
  const total = order?.total ?? items.reduce((sum, item) => sum + item.priceCents, 0);
  const tva = tvaCents(total);

  const go = (next: Step) => {
    setStep(next);
    window.scrollTo({ top: 0 });
  };

  const pay = () => {
    const now = new Date();
    setOrder({
      number: `PT-${String(now.getTime()).slice(-6)}`,
      date: now.toLocaleDateString("fr-FR", { dateStyle: "long" }),
      items,
      total,
    });
    clear();
    go("confirmation");
  };

  if (items.length === 0 && !order) {
    return (
      <main className="pad relative pt-10 pb-14">
        <h1 className="matrix text-[clamp(2.5rem,5vw,4rem)]">Commande</h1>
        <p className="copy mt-8">Votre panier est vide : il n&apos;y a rien à commander.</p>
        <Link className="button mt-6" href="/montres">
          Voir les montres
        </Link>
      </main>
    );
  }

  return (
    <main className="pad relative pt-10 pb-14">
      <h1 className="matrix text-[clamp(2.5rem,5vw,4rem)]">Commande</h1>

      <ol className="mt-7 flex flex-wrap gap-2.5">
        {steps.map((item, index) => (
          <li
            key={item.id}
            aria-current={item.id === step ? "step" : undefined}
            className={[
              "pill label",
              item.id === step ? "text-accent" : "text-muted",
            ].join(" ")}
          >
            {index + 1}. {item.label}
          </li>
        ))}
      </ol>

      <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div>
          {step === "coordonnees" ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                go("verification");
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.key} className={field.wide ? "sm:col-span-2" : undefined}>
                    <span className="label text-muted">{field.label}</span>
                    <input
                      required
                      className="field mt-1.5"
                      type={field.type ?? "text"}
                      autoComplete={field.auto}
                      value={customer[field.key]}
                      onChange={(event) =>
                        setCustomer({ ...customer, [field.key]: event.target.value })
                      }
                    />
                  </label>
                ))}
              </div>

              <p className="mt-4 text-sm text-muted">
                Livraison en {livraison.zone} uniquement.
              </p>

              <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 accent-[var(--accent)]"
                  checked={newsletter}
                  onChange={(event) => setNewsletter(event.target.checked)}
                />
                <span>
                  J&apos;accepte de recevoir les offres de POINT par e-mail. Facultatif :
                  vous pourrez vous désinscrire à tout moment.
                </span>
              </label>

              <div className="mt-7 flex flex-wrap gap-3">
                <button type="submit" className="button">
                  Vérifier ma commande
                </button>
                <Link href="/panier" className="button-ghost">
                  Retour au panier
                </Link>
              </div>
            </form>
          ) : null}

          {step === "verification" ? (
            <div>
              <h2 className="text-xl font-semibold">Vérifiez votre commande</h2>
              <p className="copy mt-2">
                Rien n&apos;est encore commandé. Vérifiez le détail et le prix total,
                et corrigez si besoin avant de confirmer.
              </p>

              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="label text-muted">Livraison à</dt>
                  <dd className="mt-1 text-sm leading-relaxed">
                    {customer.prenom} {customer.nom}
                    <br />
                    {customer.adresse}
                    <br />
                    {customer.codePostal} {customer.ville}
                  </dd>
                </div>
                <div>
                  <dt className="label text-muted">Contact</dt>
                  <dd className="mt-1 text-sm leading-relaxed">
                    {customer.email}
                    <br />
                    Offres par e-mail : {newsletter ? "oui" : "non"}
                  </dd>
                </div>
              </dl>

              <h3 className="label mt-8">Informations avant commande</h3>
              <dl className="mt-3 space-y-3">
                {precontractuel(total).map(([label, value]) => (
                  <div key={label} className="grid gap-1 border-t border-line pt-3 text-sm sm:grid-cols-[8rem_1fr]">
                    <dt className="text-muted">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 accent-[var(--accent)]"
                  checked={acceptsTerms}
                  onChange={(event) => setAcceptsTerms(event.target.checked)}
                />
                <span>
                  J&apos;ai lu et j&apos;accepte les{" "}
                  <Link className="link" href="/cgv" target="_blank">
                    conditions générales de vente
                  </Link>
                  .
                </span>
              </label>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={!acceptsTerms}
                  onClick={() => go("paiement")}
                  className="button"
                >
                  Commander avec obligation de paiement
                </button>
                <button type="button" onClick={() => go("coordonnees")} className="button-ghost">
                  Corriger
                </button>
              </div>
            </div>
          ) : null}

          {step === "paiement" ? (
            <div>
              <h2 className="text-xl font-semibold">Paiement par carte bancaire</h2>
              <p className="copy mt-2">
                Votre banque vous demanderait ici de valider le paiement par
                authentification forte, par exemple dans son application.
              </p>
              <p className="mt-5 rounded-2xl border border-line p-4 text-sm leading-relaxed">
                Simulation : aucun numéro de carte n&apos;est demandé et aucun
                paiement n&apos;est effectué.
              </p>
              <button type="button" onClick={pay} className="button mt-6">
                Simuler le paiement de {euros(total)}
              </button>
            </div>
          ) : null}

          {step === "confirmation" && order ? (
            <div>
              <h2 className="text-xl font-semibold">Commande confirmée</h2>
              <p className="copy mt-2">
                Merci {customer.prenom}. Votre commande {order.number} du {order.date} est
                enregistrée. Un récapitulatif est envoyé à {customer.email}.
              </p>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="border-t border-line pt-3">
                  <dt className="text-muted">Livraison</dt>
                  <dd className="mt-1">
                    {livraison.transporteur}, sous {livraison.delai}.
                  </dd>
                </div>
                <div className="border-t border-line pt-3">
                  <dt className="text-muted">Rétractation</dt>
                  <dd className="mt-1">
                    Vous avez 14 jours à compter de la réception pour changer d&apos;avis,
                    sans motif. Le{" "}
                    <Link className="link" href="/garantie#retractation">
                      formulaire de rétractation
                    </Link>{" "}
                    est à votre disposition.
                  </dd>
                </div>
                <div className="border-t border-line pt-3">
                  <dt className="text-muted">Une question</dt>
                  <dd className="mt-1">
                    Appelez le{" "}
                    <a className="link" href={`tel:${vendeur.telephoneLien}`}>
                      {vendeur.telephone}
                    </a>
                    , {vendeur.horaires}.
                  </dd>
                </div>
              </dl>
              <p className="mt-6 rounded-2xl border border-line p-4 text-sm leading-relaxed">
                Simulation : aucun e-mail n&apos;est envoyé et aucune donnée
                n&apos;a quitté votre navigateur.
              </p>
              <Link className="button mt-6" href="/">
                Retour à l&apos;accueil
              </Link>
            </div>
          ) : null}
        </div>

        <aside className="h-fit rounded-panel bg-black/45 p-6">
          <h2 className="label">Récapitulatif</h2>
          <ul className="mt-4 space-y-3">
            {shown.map((item) => (
              <li key={item.id} className="flex justify-between gap-4 text-sm">
                <span>
                  {item.name}
                  <span className="block text-xs text-muted">
                    {item.ref}, bracelet {item.strapSize}
                  </span>
                </span>
                <span className="whitespace-nowrap">{euros(item.priceCents)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <dt>Dont TVA (20 %)</dt>
              <dd>{euros(tva)}</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>Livraison</dt>
              <dd>Offerte</dd>
            </div>
            <div className="flex justify-between text-base font-bold">
              <dt>Total TTC</dt>
              <dd>{euros(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  );
}
