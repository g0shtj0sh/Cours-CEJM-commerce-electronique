"use client";

import Link from "next/link";
import { CloseIcon, PhoneIcon, ShieldIcon } from "@/components/Icons";
import { SeriesBadge, WatchImage, ambientStyle } from "@/components/Shared";
import {
  euros,
  findModel,
  strapSizes,
  tvaCents,
} from "@/content/catalogue";
import { garantie, vendeur } from "@/content/vendeur";
import { useCart } from "@/lib/stores";

export default function Cart() {
  const { lines, remove, setStrapSize } = useCart();
  const items = lines.flatMap((line) => {
    const model = findModel(line.slug);
    return model ? [{ line, model }] : [];
  });
  const total = items.reduce((sum, item) => sum + item.model.priceCents, 0);
  const tva = tvaCents(total);

  return (
    <main className="pad relative pt-10 pb-14">
      <h1 className="matrix text-[clamp(2.5rem,5vw,4rem)]">Panier</h1>

      {items.length === 0 ? (
        <div className="mt-10">
          <p className="copy">Votre panier est vide. Choisissez une montre pour commencer.</p>
          <Link className="button mt-6" href="/montres">
            Voir les montres
          </Link>
        </div>
      ) : (
        <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div className="grid gap-6 md:grid-cols-2">
            {items.map(({ line, model }) => (
              <article key={line.id} className="card relative" style={ambientStyle(model)}>
                <div className="flex items-center justify-between p-5 pb-0">
                  <SeriesBadge serie={model.serie} />
                  <button
                    type="button"
                    aria-label={`Retirer ${model.name} du panier`}
                    onClick={() => remove(line.id)}
                    className="text-muted hover:text-ink"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div className="relative mx-6 aspect-[5/4]">
                  <WatchImage slug={model.slug} name={model.name} sizes="(min-width: 768px) 28vw, 80vw" />
                </div>
                <div className="p-6 pt-3">
                  <p className="label text-muted">{model.ref}</p>
                  <p className="label mt-1">{model.name}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <dt className="label text-muted">Bracelet</dt>
                      <dd className="label mt-1">{model.bracelet}</dd>
                    </div>
                    <div>
                      <dt className="label text-muted">Fermoir</dt>
                      <dd className="label mt-1">{model.fermoir}</dd>
                    </div>
                  </dl>
                  <label className="mt-5 block max-w-44">
                    <span className="label text-muted">Taille du bracelet</span>
                    <select
                      className="field mt-1.5"
                      value={line.strapSize}
                      onChange={(event) => setStrapSize(line.id, event.target.value)}
                    >
                      {strapSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="mt-5 font-semibold text-accent">{euros(model.priceCents)} TTC</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="lg:pt-6">
            <Link href="/garantie" className="label flex items-center justify-end gap-3 text-muted hover:text-ink">
              <ShieldIcon /> Garantie {garantie.commerciale}
            </Link>
            <dl className="mt-10 space-y-4">
              <div className="flex justify-between text-sm text-muted">
                <dt>TVA (20 %)</dt>
                <dd>{euros(tva)}</dd>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <dt>Total hors taxes</dt>
                <dd>{euros(total - tva)}</dd>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <dt>Livraison</dt>
                <dd>Offerte</dd>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <dt>Total TTC</dt>
                <dd>{euros(total)}</dd>
              </div>
            </dl>
            <div className="mt-8 flex justify-end">
              <Link href="/commande" className="button">
                Passer commande
              </Link>
            </div>
            <a
              href={`tel:${vendeur.telephoneLien}`}
              className="label mt-14 flex items-center justify-end gap-3 text-muted hover:text-ink"
            >
              <PhoneIcon /> Contact direct {vendeur.telephone}
            </a>
          </aside>
        </div>
      )}
    </main>
  );
}
