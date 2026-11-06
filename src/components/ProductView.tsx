"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import DotText from "@/components/DotText";
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
import { EASE_OUT, showVariantInAddress } from "@/lib/motion";
import { usePrice, useSettings, useT } from "@/lib/settings";
import { useCart, useFavorites } from "@/lib/stores";

export default function ProductView({
  model: initialModel,
  models,
}: {
  model: ShopModel;
  models: ShopModel[];
}) {
  // La variante change sur place : la page n'est pas rechargée, seule l'adresse suit.
  const [slug, setSlug] = useState(initialModel.slug);
  const model = models.find((item) => item.slug === slug) ?? initialModel;
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

  // Les autres variantes sont chargées d'avance : le changement est immédiat.
  useEffect(() => {
    for (const variant of variants) {
      const image = new window.Image();
      image.src = `/images/${variant.slug}.webp`;
    }
  }, [variants]);

  /** Un clic normal change la variante ; Ctrl ou Maj gardent l'ouverture dans un onglet. */
  const chooseVariant = (event: React.MouseEvent, variant: { slug: string; name: string }) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setSlug(variant.slug);
    showVariantInAddress(variant);
  };

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
          <AnimatePresence initial={false}>
            <motion.div
              key={model.slug}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Surface />
            </motion.div>
          </AnimatePresence>
          <div className="relative">
            <Header active="montres" />
            <main className="pad relative flex flex-col pt-6 pb-8 lg:min-h-[calc(100svh-15rem)] lg:pt-10">
              <div className="rise flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <SeriesBadge serie={model.serie} />
                <p className="label text-accent">
                  {available ? <span aria-hidden className="live" /> : null}
                  {available ? t.common.inStock : t.common.soldOut}
                </p>
              </div>

              <div className="rise relative z-10 mt-6 [--i:1] lg:mt-[clamp(1.5rem,6vh,4rem)]">
                <p className="label text-muted">{model.ref}</p>
                <DotText
                  as="h1"
                  hover
                  text={model.name}
                  className="matrix mt-4 max-w-[9ch] text-[clamp(2.5rem,5vw,4.5rem)]"
                />
              </div>

              <div className="rise-blur relative mx-auto my-4 aspect-square w-full max-w-md lg:absolute lg:top-[-1rem] lg:bottom-6 lg:left-1/2 lg:my-0 lg:aspect-auto lg:w-[min(46vw,42rem)] lg:max-w-none lg:-translate-x-1/2">
                <div className="parallax absolute inset-0">
                  <div className="drift absolute inset-0">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={model.slug}
                        className="absolute inset-0"
                        initial={{ opacity: 0, filter: "blur(22px)", scale: 0.965 }}
                        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                        exit={{
                          opacity: 0,
                          filter: "blur(22px)",
                          scale: 0.985,
                          transition: { duration: 0.18, ease: "easeIn" },
                        }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                      >
                        <WatchImage
                          slug={model.slug}
                          name={model.name}
                          sizes="(min-width: 1024px) 46vw, 90vw"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="rise relative z-10 flex flex-wrap items-end justify-between gap-6 [--i:3] lg:mt-auto">
                <div className="lg:mt-8 lg:max-w-[17rem]">
                  <DotText
                    as="p"
                    digits
                    duration={620}
                    className="text-lg font-semibold text-accent tabular-nums"
                    text={
                      price.isUsd
                        ? price.usd(model.priceCents)
                        : `${price.eur(model.priceCents)} ${t.common.vat}`
                    }
                  />
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
                            onClick={(event) => chooseVariant(event, variant)}
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
                      <span key={String(isFavorite)} className="heart-pop block">
                        <HeartIcon filled={isFavorite} />
                      </span>
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
                      <Link className="slide-link label text-muted hover:text-ink" href={`/montres/${item.slug}`}>
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
                    className="relative size-20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-105 lg:size-24"
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
          <DotText as="h2" onView hover text={t.product.description} className="matrix text-4xl" />
          <p className="copy mt-5">{text}</p>
          <p className="mt-4 text-sm font-semibold">{t.product.binding}</p>
          <dl className="mt-7 border-t border-line">
            {specs(model, lang).map(([label, value]) => (
              <div key={label} className="reveal grid gap-1 border-b border-line py-3 text-sm sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="text-muted">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="min-w-0">
          <DotText as="h2" onView hover text={t.product.beforeOrder} className="matrix text-4xl" />
          <dl className="mt-5 space-y-5">
            {legal.precontractuel(model.priceCents).map(([label, value]) => (
              <div key={label} className="reveal">
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
