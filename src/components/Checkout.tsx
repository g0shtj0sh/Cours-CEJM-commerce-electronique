"use client";

import Link from "next/link";
import { useState } from "react";
import DotText from "@/components/DotText";
import { findModel, tvaCents } from "@/content/catalogue";
import { legalContent } from "@/content/legal";
import { livraison, vendeur } from "@/content/vendeur";
import { usePrice, useSettings, useT } from "@/lib/settings";
import { useCart } from "@/lib/stores";

type Step = "coordonnees" | "verification" | "paiement" | "confirmation";

const stepIds: Step[] = ["coordonnees", "verification", "paiement", "confirmation"];

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

/** Codes postaux de France métropolitaine, Corse comprise : la vente s'arrête là. */
const POSTCODE_PATTERN = "(0[1-9]|[1-8][0-9]|9[0-5])[0-9]{3}";

const fields: { key: keyof Customer; type?: string; auto: string; wide?: boolean }[] = [
  { key: "prenom", auto: "given-name" },
  { key: "nom", auto: "family-name" },
  { key: "email", type: "email", auto: "email", wide: true },
  { key: "adresse", auto: "street-address", wide: true },
  { key: "codePostal", auto: "postal-code" },
  { key: "ville", auto: "address-level2" },
];

type Order = {
  number: string;
  date: string;
  items: { id: string; name: string; ref: string; strapSize: string; priceCents: number }[];
  total: number;
};

export default function Checkout() {
  const t = useT();
  const { lang } = useSettings();
  const price = usePrice();
  const { lines, clear } = useCart();
  const [step, setStep] = useState<Step>("coordonnees");
  const [customer, setCustomer] = useState(emptyCustomer);
  const [newsletter, setNewsletter] = useState(false);
  const [acceptsTerms, setAcceptsTerms] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const legal = legalContent(lang);
  const delay = lang === "en" ? legal.delayText : livraison.delai;

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
      date: now.toLocaleDateString(t.checkout.dateLocale, { dateStyle: "long" }),
      items,
      total,
    });
    clear();
    go("confirmation");
  };

  if (items.length === 0 && !order) {
    return (
      <main className="pad rise relative pt-10 pb-14">
        <DotText as="h1" hover text={t.checkout.title} className="matrix text-[clamp(2.5rem,5vw,4rem)]" />
        <p className="copy mt-8">{t.checkout.empty}</p>
        <Link className="button mt-6" href="/montres">
          {t.common.viewWatches}
        </Link>
      </main>
    );
  }

  return (
    <main className="pad rise relative pt-10 pb-14">
      <DotText as="h1" hover text={t.checkout.title} className="matrix text-[clamp(2.5rem,5vw,4rem)]" />

      <ol className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-b border-line">
        {stepIds.map((id, index) => (
          <li
            key={id}
            aria-current={id === step ? "step" : undefined}
            className={[
              "label -mb-px border-b-2 pb-3",
              id === step ? "border-[var(--accent)] text-ink" : "border-transparent text-muted",
            ].join(" ")}
          >
            {index + 1}. {t.checkout.steps[id]}
          </li>
        ))}
      </ol>

      <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div key={step} className="rise min-w-0">
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
                    <span className="label text-muted">{t.checkout.fields[field.key]}</span>
                    <input
                      required
                      className="field mt-1.5"
                      type={field.type ?? "text"}
                      autoComplete={field.auto}
                      pattern={field.key === "codePostal" ? POSTCODE_PATTERN : undefined}
                      title={field.key === "codePostal" ? t.checkout.postalHint : undefined}
                      inputMode={field.key === "codePostal" ? "numeric" : undefined}
                      value={customer[field.key]}
                      onChange={(event) =>
                        setCustomer({ ...customer, [field.key]: event.target.value })
                      }
                    />
                  </label>
                ))}
              </div>

              <p className="mt-4 text-sm text-muted">{t.checkout.deliveryOnly}</p>

              <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
                  checked={newsletter}
                  onChange={(event) => setNewsletter(event.target.checked)}
                />
                <span>{t.checkout.newsletter}</span>
              </label>

              <div className="mt-7 flex flex-wrap gap-3">
                <button type="submit" className="button">
                  {t.checkout.verify}
                </button>
                <Link href="/panier" className="button-ghost">
                  {t.checkout.backToCart}
                </Link>
              </div>
            </form>
          ) : null}

          {step === "verification" ? (
            <div>
              <h2 className="text-xl font-semibold">{t.checkout.verifyTitle}</h2>
              <p className="copy mt-2">{t.checkout.verifyText}</p>
              <p className="copy mt-2">{t.checkout.twoClicks}</p>
              <p className="copy mt-2">{t.checkout.lawNote}</p>

              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="label text-muted">{t.checkout.deliverTo}</dt>
                  <dd className="mt-1 text-sm leading-relaxed break-words">
                    {customer.prenom} {customer.nom}
                    <br />
                    {customer.adresse}
                    <br />
                    {customer.codePostal} {customer.ville}
                  </dd>
                </div>
                <div>
                  <dt className="label text-muted">{t.checkout.contact}</dt>
                  <dd className="mt-1 text-sm leading-relaxed break-words">
                    {customer.email}
                    <br />
                    {t.checkout.offersByEmail} {newsletter ? t.checkout.yes : t.checkout.no}
                  </dd>
                </div>
              </dl>

              <h3 className="label mt-8">{t.checkout.infoTitle}</h3>
              <dl className="mt-3 space-y-3">
                {legal.precontractuel(total).map(([label, value]) => (
                  <div key={label} className="grid gap-1 border-t border-line pt-3 text-sm sm:grid-cols-[8rem_1fr]">
                    <dt className="text-muted">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
                  checked={acceptsTerms}
                  onChange={(event) => setAcceptsTerms(event.target.checked)}
                />
                <span>
                  {t.checkout.acceptBefore}{" "}
                  <Link className="link" href="/cgv" target="_blank">
                    {t.checkout.terms}
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
                  {t.checkout.order}
                </button>
                <button type="button" onClick={() => go("coordonnees")} className="button-ghost">
                  {t.checkout.correct}
                </button>
              </div>
            </div>
          ) : null}

          {step === "paiement" ? (
            <div>
              <h2 className="text-xl font-semibold">{t.checkout.payTitle}</h2>
              <p className="copy mt-2">{t.checkout.payText}</p>
              <p className="mt-5 rounded-2xl border border-line p-4 text-sm leading-relaxed">
                {t.checkout.payNote}
              </p>
              <button type="button" onClick={pay} className="button mt-6">
                {t.checkout.pay} {price.eur(total)}
              </button>
            </div>
          ) : null}

          {step === "confirmation" && order ? (
            <div>
              <h2 className="text-xl font-semibold">{t.checkout.confirmed}</h2>
              <p className="copy mt-2 break-words">
                {t.checkout.thanks(customer.prenom, order.number, order.date, customer.email)}
              </p>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="border-t border-line pt-3">
                  <dt className="text-muted">{t.checkout.delivery}</dt>
                  <dd className="mt-1">
                    {livraison.transporteur}, {t.checkout.deliveryIn} {delay}.
                  </dd>
                </div>
                <div className="border-t border-line pt-3">
                  <dt className="text-muted">{t.checkout.withdrawal}</dt>
                  <dd className="mt-1">
                    {t.checkout.withdrawalBefore}{" "}
                    <Link className="link" href="/garantie#retractation">
                      {t.checkout.withdrawalForm}
                    </Link>{" "}
                    {t.checkout.withdrawalAfter}
                  </dd>
                </div>
                {newsletter ? (
                  <div className="border-t border-line pt-3">
                    <dt className="text-muted">{t.checkout.optOutTitle}</dt>
                    <dd className="mt-1">
                      {t.checkout.optOutText}{" "}
                      <Link className="link" href="/mentions-legales#offres">
                        {t.checkout.optOutLink}
                      </Link>
                      .
                    </dd>
                  </div>
                ) : null}
                <div className="border-t border-line pt-3">
                  <dt className="text-muted">{t.checkout.question}</dt>
                  <dd className="mt-1">
                    {t.checkout.call}{" "}
                    <a className="link" href={`tel:${vendeur.telephoneLien}`}>
                      {vendeur.telephone}
                    </a>
                    , {t.legalHours}.
                  </dd>
                </div>
              </dl>
              <p className="mt-6 rounded-2xl border border-line p-4 text-sm leading-relaxed">
                {t.checkout.simNote}
              </p>
              <Link className="button mt-6" href="/">
                {t.checkout.home}
              </Link>
            </div>
          ) : null}
        </div>

        <aside className="h-fit min-w-0 rounded-panel bg-black/45 p-5 sm:p-6">
          <h2 className="label">{t.checkout.summary}</h2>
          <ul className="mt-4 space-y-3">
            {shown.map((item) => (
              <li key={item.id} className="flex justify-between gap-4 text-sm">
                <span className="min-w-0">
                  {item.name}
                  <span className="block text-xs text-muted">
                    {item.ref}, {t.checkout.strap} {item.strapSize}
                  </span>
                </span>
                <span className="whitespace-nowrap tabular-nums">{price.eur(item.priceCents)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm tabular-nums">
            <div className="flex justify-between gap-4 text-muted">
              <dt>{t.checkout.vat}</dt>
              <dd>{price.eur(tva)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-muted">
              <dt>{t.checkout.delivered}</dt>
              <dd>{t.checkout.free}</dd>
            </div>
            <div className="flex justify-between gap-4 text-base font-bold">
              <dt>{t.checkout.total}</dt>
              <dd>{price.eur(total)}</dd>
            </div>
            {price.isUsd ? (
              <div className="text-muted">
                <div className="flex justify-between gap-4">
                  <dt>{t.checkout.usdTotal}</dt>
                  <dd>{price.usd(total)}</dd>
                </div>
                <p className="mt-1 text-xs">{t.checkout.billed}</p>
              </div>
            ) : null}
          </dl>
        </aside>
      </div>
    </main>
  );
}
