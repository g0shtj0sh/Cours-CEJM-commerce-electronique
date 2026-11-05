"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import DotText from "@/components/DotText";
import Header from "@/components/Header";
import {
  ModelSwitcher,
  SeriesBadge,
  Surface,
  Swap,
  WatchImage,
  ambientStyle,
} from "@/components/Shared";
import { accroche } from "@/content/catalogue";
import type { ShopModel } from "@/lib/catalogue.server";
import { EASE_OUT } from "@/lib/motion";
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

  // Les montres voisines sont chargées d'avance : le passage de l'une à l'autre ne doit pas attendre le réseau.
  useEffect(() => {
    for (const { slug } of [previous, next]) {
      const image = new window.Image();
      image.src = `/images/${slug}.webp`;
    }
  }, [previous, next]);

  return (
    <div className="tint relative overflow-x-clip" style={ambientStyle(model)}>
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
          <div className="rise flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <Swap id={model.slug}>
              <SeriesBadge serie={model.serie} />
            </Swap>
            <p className="label text-accent">
              {model.stock > 0 ? <span aria-hidden className="live" /> : null}
              {model.stock > 0 ? t.common.available : t.common.soldOut}
            </p>
          </div>

          <div className="rise relative z-10 mt-6 [--i:1] lg:mt-[clamp(2rem,9vh,5.5rem)]">
            {/* Le titre sort vers la gauche et le suivant arrive de la droite, comme sur la maquette. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={model.slug}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24, transition: { duration: 0.18, ease: "easeIn" } }}
                transition={{ duration: 0.34, ease: EASE_OUT }}
              >
                <p className="label text-muted">{model.ref}</p>
                <DotText
                  as="h1"
                  hover
                  text={model.name}
                  className="matrix mt-4 max-w-[9ch] text-[clamp(2.5rem,5vw,4.5rem)] lg:min-h-[2lh]"
                />
                <p className="mt-4 max-w-[17rem] text-[0.9375rem] leading-snug text-ink/80 lg:min-h-[2lh]">
                  {accroche(model, lang)}
                </p>
                <DotText
                  as="p"
                  digits
                  duration={620}
                  className="mt-2 text-sm font-semibold text-accent tabular-nums"
                  text={
                    price.isUsd
                      ? `${price.usd(model.priceCents)} (${price.eur(model.priceCents)} ${t.common.vat})`
                      : `${price.eur(model.priceCents)} ${t.common.vat}`
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="rise-blur relative mx-auto my-4 aspect-square w-full max-w-md lg:absolute lg:top-[-1rem] lg:bottom-20 lg:left-1/2 lg:my-0 lg:aspect-auto lg:w-[min(46vw,42rem)] lg:max-w-none lg:-translate-x-1/2">
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
                  transition: { duration: 0.22, ease: "easeIn" },
                }}
                transition={{ duration: 0.46, ease: EASE_OUT }}
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

          <div className="rise relative z-10 flex items-end justify-between gap-6 [--i:2] lg:mt-7 lg:flex-1 lg:items-start">
            <Link href={`/montres/${model.slug}`} className="button">
              {t.common.discover}
            </Link>

            <div className="hidden aspect-[3/2] w-[clamp(9rem,14vw,12.5rem)] lg:block">
              <Swap id={model.slug} className="size-full">
                {model.hasScene ? (
                  <Link
                    href={`/montres/${model.slug}`}
                    aria-label={`${t.common.seeCloser} : ${model.name}`}
                    className="relative block size-full overflow-hidden rounded-2xl"
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
              </Swap>
            </div>
          </div>

          <div className="rise relative z-10 mt-8 [--i:3]">
            <ModelSwitcher
              count={models.length}
              active={index}
              previous={previous.name}
              next={next.name}
              onSelect={setIndex}
            />
          </div>
        </main>

        <div className="rise [--i:4]">{children}</div>
      </div>
    </div>
  );
}
