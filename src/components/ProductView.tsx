"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DocumentIcon, HeartIcon, ShareIcon } from "@/components/Icons";
import Header from "@/components/Header";
import Select from "@/components/Select";
import {
  SeriesBadge,
  Surface,
  WatchImage,
  ambientStyle,
} from "@/components/Shared";
import Tip from "@/components/Tip";
import {
  accroche,
  colorways,
  descriptif,
  groupByModel,
  nomModele,
  specs,
  strapSizes,
} from "@/content/catalogue";
import { legalContent } from "@/content/legal";
import { livraison } from "@/content/vendeur";
import type { ShopModel } from "@/lib/catalogue.server";
import { markNavigation } from "@/lib/motion";
import { usePrice, useSettings, useT } from "@/lib/settings";
import { useCart, useFavorites } from "@/lib/stores";

export default function ProductView({
  model,
  models,
}: {
  model: ShopModel;
  models: ShopModel[];
}) {
  const router = useRouter();
  const t = useT();
  const { lang } = useSettings();
  const price = usePrice();
  const { add } = useCart();
  const { slugs, toggle } = useFavorites();
  const [strapSize, setStrapSize] = useState<string>(strapSizes[1]);
  const [shared, setShared] = useState(false);

  const available = model.stock > 0;
  const isFavorite = slugs.includes(model.slug);
  const legal = legalContent(lang);
  const delay = lang === "en" ? legal.delayText : livraison.delai;

  /** Les variantes de ce modèle. */
  const variants = colorways(model).filter((variant) =>
    models.some((item) => item.slug === variant.slug),
  );

  /** D'autres montres de la même famille, sans refaire le tour de la gamme. */
  const suggestions = groupByModel(
    models.filter(
      (item) =>
        item.family === model.family &&
        !variants.some((variant) => variant.slug === item.slug),
    ),
  )
    .map(([first]) => first)
    .slice(0, 3);

  const text = descriptif(model, lang);

  const buy = () => {
    add(model.slug, strapSize);
    router.push("/panier");
  };

  const share = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setShared(true);
    window.setTimeout(() => setShared(false), 1800);
  };

  return (
    <div className="tint" style={ambientStyle(model)}>
      <div className="relative overflow-hidden">
        <section className="relative z-10 overflow-hidden rounded-b-panel bg-night">
          <Surface />
          <div className="relative">
            <Header active="montres" />
            <main className="pad relative flex flex-col pt-6 pb-8 lg:min-h-[calc(100svh-15rem)] lg:pt-10">
              <div className="rise flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <SeriesBadge serie={model.serie} />
                <p className="label text-accent">
                  {available ? t.common.inStock : t.common.soldOut}
                </p>
              </div>

              <div className="rise relative z-10 mt-6 [--i:1] lg:mt-[clamp(1.5rem,6vh,4rem)]">
                <p className="label text-muted">{model.ref}</p>
                <h1 className="matrix mt-4 max-w-[9ch] text-[clamp(2.5rem,5vw,4.5rem)]">
                  {model.name}
                </h1>
              </div>

              <div className="rise-blur relative mx-auto my-4 aspect-square w-full max-w-md lg:absolute lg:top-[-1rem] lg:bottom-6 lg:left-1/2 lg:my-0 lg:aspect-auto lg:w-[min(46vw,42rem)] lg:max-w-none lg:-translate-x-1/2">
                <WatchImage
                  slug={model.slug}
                  name={model.name}
                  sizes="(min-width: 1024px) 46vw, 90vw"
                  priority
                />
              </div>

              <div className="rise relative z-10 flex flex-wrap items-end justify-between gap-6 [--i:3] lg:mt-auto">
                <div className="lg:mt-8 lg:max-w-[17rem]">
                  <p className="text-lg font-semibold text-accent tabular-nums">
                    {price.isUsd
                      ? price.usd(model.priceCents)
                      : `${price.eur(model.priceCents)} ${t.common.vat}`}
                  </p>
                  {price.isUsd ? (
                    <p className="mt-1 text-xs text-ink">
                      {t.product.usdNote} {price.eur(model.priceCents)} {t.common.vat}.
                    </p>
                  ) : null}
                  <p className="mt-1 text-xs text-muted">
                    {t.product.deliveryIncluded} {delay}
                  </p>
                  <p className="mt-1 text-xs text-muted">{t.product.visualNote}</p>

                  <div className="mt-4">
                    <p className="label text-muted">
                      {model.groupe ? t.product.variant : t.product.color}{" "}
                      <span className="ml-1 text-ink">{model.coloris[lang]}</span>
                    </p>
                    <div role="group" aria-label={t.product.chooseVariant} className="mt-2 flex flex-wrap gap-2.5">
                      {variants.map((variant) => (
                        <Tip key={variant.slug} label={variant.coloris[lang]}>
                          <Link
                            href={`/montres/${variant.slug}`}
                            scroll={false}
                            onClick={() => markNavigation("variant")}
                            aria-label={`${t.product.variant} ${variant.coloris[lang]}`}
                            aria-current={variant.slug === model.slug ? "true" : undefined}
                            className={[
                              "flex size-9 items-center justify-center rounded-full border transition-colors",
                              variant.slug === model.slug
                                ? "border-[var(--accent)]"
                                : "border-transparent hover:border-muted",
                            ].join(" ")}
                          >
                            <span
                              className="size-6 rounded-full ring-1 ring-white/25"
                              style={{ backgroundColor: variant.pastille }}
                            />
                          </Link>
                        </Tip>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 w-44">
                    <Select
                      label={t.product.strapSize}
                      value={strapSize}
                      options={strapSizes}
                      onChange={setStrapSize}
                    />
                  </div>
                  <button
                    type="button"
                    disabled={!available}
                    onClick={buy}
                    className="button mt-4"
                  >
                    {available ? t.common.buy : t.common.soldOut}
                  </button>
                </div>

                <div className="flex gap-5 lg:flex-col">
                  <Tip label={isFavorite ? t.product.removeFavorite : t.product.addFavorite} side="left">
                    <button
                      type="button"
                      aria-label={isFavorite ? t.product.removeFavorite : t.product.addFavorite}
                      aria-pressed={isFavorite}
                      onClick={() => toggle(model.slug)}
                    >
                      <HeartIcon filled={isFavorite} />
                    </button>
                  </Tip>
                  <Tip label={shared ? t.product.linkCopied : t.product.copyLink} side="left">
                    <button
                      type="button"
                      aria-label={shared ? t.product.linkCopied : t.product.copyLink}
                      onClick={share}
                    >
                      <ShareIcon />
                    </button>
                  </Tip>
                  <Tip label={t.product.readDescription} side="left">
                    <a href="#fiche" aria-label={t.product.readDescription}>
                      <DocumentIcon />
                    </a>
                  </Tip>
                </div>
              </div>
            </main>
          </div>
        </section>

        <section className="surface rise pad relative -mt-8 grid gap-8 rounded-b-panel pt-16 pb-9 [--i:5] lg:grid-cols-2">
          <div>
            <p className="label">
              {model.name} <span className="ml-1 text-muted">{model.ref}</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed font-semibold">{accroche(model, lang)}</p>
            <a className="link mt-2 inline-block text-sm" href="#fiche">
              {t.product.readDescription}
            </a>
          </div>

          {suggestions.length > 0 ? (
            <div className="flex flex-wrap justify-between gap-6">
              <div>
                <p className="label">
                  {t.product.sameFamily[0]} <span className="text-muted">{t.product.sameFamily[1]}</span>
                </p>
                <ul className="mt-4 space-y-1.5">
                  {suggestions.map((item) => (
                    <li key={item.slug}>
                      <Link className="label text-muted hover:text-ink" href={`/montres/${item.slug}`}>
                        {nomModele(item)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {suggestions.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/montres/${item.slug}`}
                    aria-label={nomModele(item)}
                    className="relative size-20 lg:size-24"
                  >
                    <WatchImage slug={item.slug} name={item.name} sizes="96px" />
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </div>

      <div className="pad grid gap-12 py-16 lg:grid-cols-2 lg:gap-20">
        <section id="fiche" className="min-w-0 scroll-mt-8">
          <h2 className="matrix text-4xl">{t.product.description}</h2>
          <p className="copy mt-5">{text}</p>
          <p className="mt-4 text-sm font-semibold">{t.product.binding}</p>
          <dl className="mt-7 border-t border-line">
            {specs(model, lang).map(([label, value]) => (
              <div key={label} className="grid gap-1 border-b border-line py-3 text-sm sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="text-muted">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="min-w-0">
          <h2 className="matrix text-4xl">{t.product.beforeOrder}</h2>
          <dl className="mt-5 space-y-5">
            {legal.precontractuel(model.priceCents).map(([label, value]) => (
              <div key={label}>
                <dt className="label">{label}</dt>
                <dd className="copy mt-1">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="copy mt-6">
            {t.product.offer}{" "}
            <Link className="link" href="/cgv">
              {t.product.terms}
            </Link>{" "}
            {t.product.and}{" "}
            <Link className="link" href="/garantie#retractation">
              {t.product.withdrawalForm}
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
