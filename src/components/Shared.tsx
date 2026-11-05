"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Model } from "@/content/catalogue";
import { SwitchIcon } from "@/components/Icons";
import { usePrice, useT } from "@/lib/settings";

export function ambientStyle(model?: Pick<Model, "ambient" | "accent">) {
  if (!model) return undefined;
  return { "--ambient": model.ambient, "--accent": model.accent } as CSSProperties;
}

/** Fond teinté commun à toutes les pages. */
export function Surface({ fixed }: { fixed?: boolean }) {
  const position = fixed ? "fixed" : "absolute";
  return (
    <>
      <div aria-hidden className={`surface ${position} inset-0`} />
      <div aria-hidden className={`dots ${position} inset-0`} />
    </>
  );
}

/** Fondu rapide quand le contenu change de modèle. */
export function Swap({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function SeriesBadge({ serie, muted }: { serie: number; muted?: boolean }) {
  const t = useT();
  return (
    <p className="pill label">
      <span className={muted ? "text-muted" : "text-accent"}>{t.common.seriesBefore}</span>
      <span>
        {serie} {t.common.seriesAfter}
      </span>
    </p>
  );
}

/** Prix d'une carte. En dollars, le prix en euros reste affiché : c'est lui qui est facturé. */
export function PriceTag({ cents, from }: { cents: number; from?: boolean }) {
  const t = useT();
  const price = usePrice();
  if (!price.isUsd) {
    return (
      <span className="whitespace-nowrap tabular-nums">
        {from ? `${t.common.from} ` : null}
        {price.eur(cents)} {t.common.vat}
      </span>
    );
  }
  return (
    <span className="text-right whitespace-nowrap tabular-nums">
      {from ? `${t.common.from} ` : null}
      {price.usd(cents)}
      <span className="block text-muted">
        {price.eur(cents)} {t.common.vat}
      </span>
    </span>
  );
}

export function WatchImage({
  slug,
  name,
  sizes,
  priority,
}: {
  slug: string;
  name: string;
  sizes: string;
  priority?: boolean;
}) {
  const t = useT();
  return (
    <Image
      src={`/images/${slug}.webp`}
      alt={`${t.common.watch} ${name}`}
      fill
      sizes={sizes}
      priority={priority}
      decoding="sync"
      unoptimized
      className="object-contain"
    />
  );
}

/** Nombre de numéros visibles de chaque côté du numéro actif. */
const RULER_REACH = 4;

/** Règle graduée de la maquette : elle glisse pour garder le modèle actif au centre. */
export function Ruler({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (index: number) => void;
}) {
  const t = useT();
  return (
    <div
      className="ruler relative mx-auto h-7 w-full overflow-clip lg:w-[min(30rem,42vw)]"
      role="group"
      aria-label={t.common.chooseModel}
    >
      {Array.from({ length: count }, (_, index) => {
        // La règle boucle : on prend le plus court chemin autour du modèle actif.
        let offset = (index - active + count) % count;
        if (offset > count / 2) offset -= count;
        const distance = Math.abs(offset);
        const visible = distance <= RULER_REACH;
        return (
          <button
            key={index}
            type="button"
            tabIndex={visible ? undefined : -1}
            aria-label={`${t.common.modelN} ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => onSelect(index)}
            style={{
              opacity: visible ? 1 - distance * 0.16 : 0,
              transform: `translate(calc(-50% + ${offset} * var(--step)), -50%)`,
            }}
            className={[
              "absolute top-1/2 left-1/2 flex min-h-6 items-center gap-1.5 text-[0.6875rem] font-bold tabular-nums transition-[transform,opacity,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              index === active ? "text-ink" : "text-muted hover:text-ink",
              visible ? "" : "pointer-events-none",
            ].join(" ")}
          >
            {String(index + 1).padStart(2, "0")}
            <Ticks bright={index === active} />
          </button>
        );
      })}
    </div>
  );
}

function Ticks({ bright }: { bright?: boolean }) {
  return (
    <span aria-hidden className="flex items-center gap-1.5">
      {[0, 1, 2].map((tick) => (
        <span key={tick} className={["h-2 w-px", bright ? "bg-ink" : "bg-dim/70"].join(" ")} />
      ))}
    </span>
  );
}

/** Rangée du bas de l'accueil : modèle précédent, règle, modèle suivant. */
export function ModelSwitcher({
  count,
  active,
  previous,
  next,
  onSelect,
}: {
  count: number;
  active: number;
  previous: string;
  next: string;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 items-center gap-x-4 gap-y-4 lg:grid-cols-[1fr_auto_1fr]">
      <button
        type="button"
        onClick={() => onSelect((active - 1 + count) % count)}
        className="label flex items-center gap-3 text-left text-muted hover:text-ink"
      >
        <SwitchIcon className="size-5 shrink-0" />
        <Swap id={previous}>{previous}</Swap>
      </button>
      <div className="order-last col-span-2 lg:order-none lg:col-span-1">
        <Ruler count={count} active={active} onSelect={onSelect} />
      </div>
      <button
        type="button"
        onClick={() => onSelect((active + 1) % count)}
        className="label flex items-center justify-end gap-3 text-right text-muted hover:text-ink"
      >
        <Swap id={next}>{next}</Swap>
        <SwitchIcon className="size-5 shrink-0" flip />
      </button>
    </div>
  );
}
