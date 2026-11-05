"use client";

import { useState } from "react";
import { euros, product, vatPortionCents } from "@/content/product";
import { useFinish } from "@/components/FinishContext";

type Step = "panier" | "verification" | "confirme";

const vat = vatPortionCents(product.priceCents, product.vatRate);

export default function Order() {
  const { finish } = useFinish();
  const [step, setStep] = useState<Step>("panier");
  const [acceptsTerms, setAcceptsTerms] = useState(false);

  return (
    <section id="commander" className="rule-b">
      <div className="shell py-14 md:grid md:grid-cols-12 md:gap-8 md:py-20">
        <div className="md:col-span-4">
          <h2 className="d-l">Commander</h2>
          <p className="body mt-4">
            Le contrat ne se forme pas au clic sur « Commander ». L&apos;acheteur
            doit d&apos;abord pouvoir vérifier le détail et le prix total, puis
            corriger une erreur, avant de confirmer. Ce bloc applique cette
            règle en deux temps.
          </p>
          <p className="t-data mt-3 text-blue">Code civil, art. 1127-2</p>

          <p className="hair-t t-data mt-6 pt-4 text-ink-soft">
            Démonstration pédagogique. Aucun paiement n&apos;est traité, aucune
            donnée n&apos;est collectée ni transmise.
          </p>
        </div>

        <div className="mt-8 md:col-span-7 md:col-start-6 md:mt-0">
          <div className="border border-ink">
            {/* Récapitulatif, toujours visible */}
            <div className="hair-b flex items-start justify-between gap-6 p-6">
              <div>
                <p className="d-m">{product.name}</p>
                <p className="t-data mt-1.5 text-ink-soft">
                  {finish.label} — réf. {product.reference}
                </p>
              </div>
              <p className="d-m whitespace-nowrap">
                {euros(product.priceCents)}
              </p>
            </div>

            <dl className="hair-b p-6">
              {[
                ["Dont TVA au taux de 20 %", euros(vat)],
                ["Livraison", "offerte"],
                ["Expédition", product.shipping.delayText],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-6 py-1"
                >
                  <dt className="text-[0.9375rem]">{label}</dt>
                  <dd className="t-data text-right">{value}</dd>
                </div>
              ))}
            </dl>

            {step === "panier" ? (
              <div className="p-6">
                <button
                  type="button"
                  onClick={() => setStep("verification")}
                  className="w-full border border-ink bg-ink px-5 py-3 text-alu-hi transition-colors hover:bg-blue"
                >
                  Vérifier ma commande
                </button>
              </div>
            ) : null}

            {step === "verification" ? (
              <div className="p-6">
                <p className="t-data text-ink-soft">
                  Deuxième écran — vérification avant engagement
                </p>

                <ul className="mt-4 space-y-2.5">
                  {[
                    "Vous disposez de quatorze jours après la réception pour vous rétracter, sans motif. Le remboursement intervient sous quatorze jours, frais de livraison aller inclus.",
                    "Le produit est couvert deux ans par la garantie légale de conformité. Pendant ces vingt-quatre mois, un défaut est présumé exister depuis la livraison.",
                    "Le paiement est validé par authentification forte auprès de votre banque.",
                  ].map((line) => (
                    <li
                      key={line}
                      className="hair-t pt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft"
                    >
                      {line}
                    </li>
                  ))}
                </ul>

                <label className="mt-5 flex cursor-pointer items-start gap-3 text-[0.9375rem]">
                  <input
                    type="checkbox"
                    checked={acceptsTerms}
                    onChange={(event) => setAcceptsTerms(event.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[var(--color-blue)]"
                  />
                  <span>
                    J&apos;ai lu et j&apos;accepte les conditions générales de
                    vente.
                  </span>
                </label>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={!acceptsTerms}
                    onClick={() => setStep("confirme")}
                    className="border border-ink bg-ink px-5 py-3 text-alu-hi transition-colors hover:bg-blue disabled:cursor-not-allowed disabled:border-alu-lo disabled:bg-alu-lo disabled:text-alu-hi"
                  >
                    Confirmer la commande
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("panier")}
                    className="border border-ink px-5 py-3 transition-colors hover:bg-alu-hi"
                  >
                    Corriger
                  </button>
                </div>
              </div>
            ) : null}

            {step === "confirme" ? (
              <div className="p-6">
                <p className="t-data text-blue">
                  Accusé de réception — Code de la consommation, art. L221-13
                </p>
                <p className="body-l mt-3">
                  Commande confirmée. Le récapitulatif est envoyé sur un support
                  durable, et le délai de rétractation de quatorze jours court à
                  compter de la réception du colis.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStep("panier");
                    setAcceptsTerms(false);
                  }}
                  className="mt-5 border border-ink px-5 py-3 transition-colors hover:bg-alu-hi"
                >
                  Recommencer la démonstration
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
