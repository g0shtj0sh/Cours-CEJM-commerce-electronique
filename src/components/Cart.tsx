"use client";

import Link from "next/link";
import { CloseIcon, PhoneIcon, ShieldIcon } from "@/components/Icons";
import Select from "@/components/Select";
import { SeriesBadge, WatchImage, ambientStyle } from "@/components/Shared";
import { SERIE_RARE, findModel, strapSizes, tvaCents } from "@/content/catalogue";
import { garantie, vendeur } from "@/content/vendeur";
import { usePrice, useSettings, useT } from "@/lib/settings";
import { useCart } from "@/lib/stores";

export default function Cart() {
  const t = useT();
  const { lang } = useSettings();
  const price = usePrice();
  const { lines, remove, setStrapSize } = useCart();
  const items = lines.flatMap((line) => {
    const model = findModel(line.slug);
    return model ? [{ line, model }] : [];
  });
  const total = items.reduce((sum, item) => sum + item.model.priceCents, 0);
  const tva = tvaCents(total);
  const warranty = lang === "en" ? "3 years" : garantie.commerciale;

  return (
    <main className="pad rise relative pt-10 pb-14">
      <h1 className="matrix text-[clamp(2.5rem,5vw,4rem)]">{t.cart.title}</h1>

      {items.length === 0 ? (
        <div className="mt-10">
          <p className="copy">{t.cart.empty}</p>
          <Link className="button mt-6" href="/montres">
            {t.common.viewWatches}
          </Link>
        </div>
      ) : (
        <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="grid gap-6 md:grid-cols-2">
            {items.map(({ line, model }) => (
              <article key={line.id} className="card relative min-w-0" style={ambientStyle(model)}>
                <div className="flex items-center justify-between gap-2 p-4 pb-0 sm:p-5 sm:pb-0">
                  {model.serie <= SERIE_RARE ? <SeriesBadge serie={model.serie} /> : <span />}
                  <button
                    type="button"
                    aria-label={`${t.cart.removeItem} ${model.name}`}
                    onClick={() => remove(line.id)}
                    className="flex size-8 shrink-0 items-center justify-center text-muted hover:text-ink"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div className="relative mx-6 aspect-[5/4]">
                  <WatchImage slug={model.slug} name={model.name} sizes="(min-width: 768px) 28vw, 80vw" />
                </div>
                <div className="p-4 pt-3 sm:p-6 sm:pt-3">
                  <p className="label text-muted">{model.ref}</p>
                  <p className="label mt-1">{model.name}</p>
                  <dl className="mt-6 grid gap-4 break-words hyphens-auto sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <dt className="label text-muted">{t.cart.strap}</dt>
                      <dd className="mt-1 text-sm">{model.bracelet[lang]}</dd>
                    </div>
                    <div>
                      <dt className="label text-muted">{t.cart.clasp}</dt>
                      <dd className="mt-1 text-sm">{model.fermoir[lang]}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 max-w-44">
                    <Select
                      label={t.cart.strapSize}
                      value={line.strapSize}
                      options={strapSizes}
                      onChange={(size) => setStrapSize(line.id, size)}
                    />
                  </div>
                  <p className="mt-5 font-semibold text-accent tabular-nums">
                    {price.eur(model.priceCents)} {t.common.vat}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <aside className="lg:pt-6">
            <Link href="/garantie" className="label flex items-center gap-3 text-muted hover:text-ink lg:justify-end">
              <ShieldIcon /> {t.cart.warranty} {warranty}
            </Link>
            <dl className="mt-10 space-y-4 tabular-nums">
              <div className="flex justify-between gap-4 text-sm text-muted">
                <dt>{t.cart.vat}</dt>
                <dd>{price.eur(tva)}</dd>
              </div>
              <div className="flex justify-between gap-4 text-sm text-muted">
                <dt>{t.cart.excl}</dt>
                <dd>{price.eur(total - tva)}</dd>
              </div>
              <div className="flex justify-between gap-4 text-sm text-muted">
                <dt>{t.cart.delivery}</dt>
                <dd>{t.cart.free}</dd>
              </div>
              <div className="flex justify-between gap-4 text-lg font-bold">
                <dt>{t.cart.total}</dt>
                <dd>{price.eur(total)}</dd>
              </div>
              {price.isUsd ? (
                <div className="text-sm text-muted">
                  <div className="flex justify-between gap-4">
                    <dt>{t.cart.usdTotal}</dt>
                    <dd>{price.usd(total)}</dd>
                  </div>
                  <p className="mt-1 text-xs">{t.cart.usdNote}</p>
                </div>
              ) : null}
            </dl>
            <div className="mt-8 flex lg:justify-end">
              <Link href="/commande" className="button">
                {t.cart.checkout}
              </Link>
            </div>
            <a
              href={`tel:${vendeur.telephoneLien}`}
              className="label mt-10 flex items-center gap-3 text-muted hover:text-ink lg:mt-14 lg:justify-end"
            >
              <PhoneIcon /> {t.cart.contact} {vendeur.telephone}
            </a>
          </aside>
        </div>
      )}
    </main>
  );
}
