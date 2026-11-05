"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Header from "@/components/Header";
import {
  ModelSwitcher,
  SeriesBadge,
  Surface,
  WatchImage,
  ambientStyle,
} from "@/components/Shared";
import { accroche } from "@/content/catalogue";
import type { ShopModel } from "@/lib/catalogue.server";
import { usePrice, useSettings, useT } from "@/lib/settings";

/** Accueil : un carrousel dont l'ambiance suit le modèle affiché. */
export default function HomeHero({
  models,
  children,
}: {
  models: ShopModel[];
  children: React.ReactNode;
}) {
  const t = useT();
  const { lang } = useSettings();
  const price = usePrice();
  const [index, setIndex] = useState(0);
  const model = models[index];
  const previous = models[(index - 1 + models.length) % models.length];
  const next = models[(index + 1) % models.length];

  return (
    <div className="relative overflow-hidden" style={ambientStyle(model)}>
      <AnimatePresence initial={false}>
        <motion.div
          key={model.slug}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Surface />
        </motion.div>
      </AnimatePresence>

      <div className="relative">
        <Header />

        <main className="pad relative flex flex-col pt-6 pb-8 lg:min-h-[calc(100svh-12.5rem)] lg:pt-10">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <SeriesBadge serie={model.serie} />
            <p className="label text-accent">
              {model.stock > 0 ? t.common.available : t.common.soldOut}
            </p>
          </div>

          <div className="relative z-10 mt-6 lg:mt-[clamp(2rem,9vh,5.5rem)]">
            <p className="label text-muted">{model.ref}</p>
            <h1 className="matrix mt-4 max-w-[9ch] text-[clamp(2.5rem,5vw,4.5rem)]">
              {model.name}
            </h1>
            <p className="mt-4 max-w-[17rem] text-[0.9375rem] leading-snug text-ink/80">
              {accroche(model, lang)}
            </p>
            <p className="mt-2 text-sm font-semibold text-accent tabular-nums">
              {price.isUsd
                ? `${price.usd(model.priceCents)} (${price.eur(model.priceCents)} ${t.common.vat})`
                : `${price.eur(model.priceCents)} ${t.common.vat}`}
            </p>
          </div>

          <div className="relative mx-auto my-4 aspect-square w-full max-w-md lg:absolute lg:top-[-1rem] lg:bottom-20 lg:left-1/2 lg:my-0 lg:aspect-auto lg:w-[min(46vw,42rem)] lg:max-w-none lg:-translate-x-1/2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={model.slug}
                className="absolute inset-0"
                initial={{ opacity: 0, filter: "blur(18px)", scale: 0.96 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(18px)", scale: 0.98 }}
                transition={{ duration: 0.35 }}
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

          <div className="relative z-10 flex items-end justify-between gap-6 lg:mt-7 lg:flex-1 lg:items-start">
            <Link href={`/montres/${model.slug}`} className="button">
              {t.common.discover}
            </Link>

            {model.hasScene ? (
              <Link
                href={`/montres/${model.slug}`}
                aria-label={`${t.common.seeCloser} : ${model.name}`}
                className="relative hidden aspect-[3/2] w-[clamp(9rem,14vw,12.5rem)] overflow-hidden rounded-2xl lg:block"
              >
                <Image
                  src={`/images/${model.slug}-scene.webp`}
                  alt=""
                  fill
                  decoding="sync"
                  sizes="14vw"
                  className="object-cover"
                />
              </Link>
            ) : null}
          </div>

          <div className="relative z-10 mt-8">
            <ModelSwitcher
              count={models.length}
              active={index}
              previous={previous.name}
              next={next.name}
              onSelect={setIndex}
            />
          </div>
        </main>

        {children}
      </div>
    </div>
  );
}
