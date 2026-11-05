"use client";

import Link from "next/link";
import { PriceTag, SeriesBadge, WatchImage, ambientStyle } from "@/components/Shared";
import { SERIE_RARE, nomModele } from "@/content/catalogue";
import type { ShopModel } from "@/lib/catalogue.server";
import { useT } from "@/lib/settings";

/**
 * Carte d'une montre, partagée par la collection et les favoris. Avec `variants`,
 * elle présente le modèle entier : les variantes se choisissent sur sa fiche.
 * `wide` limite la hauteur de l'image quand la carte occupe une grande largeur.
 */
export default function ProductCard({
  model,
  variants = [],
  wide,
}: {
  model: ShopModel;
  variants?: ShopModel[];
  wide?: boolean;
}) {
  const t = useT();
  const grouped = variants.length > 1;
  const lowest = Math.min(model.priceCents, ...variants.map((variant) => variant.priceCents));
  const severalPrices = variants.some((variant) => variant.priceCents !== lowest);
  const body = (
    <>
      <div className="flex min-h-14 flex-wrap items-center justify-between gap-2 p-4 pb-0 sm:min-h-[3.75rem] sm:p-5 sm:pb-0">
        {model.serie <= SERIE_RARE ? <SeriesBadge serie={model.serie} muted={!model.ready} /> : <span />}
        {model.ready && model.stock === 0 ? (
          <p className="label text-muted">{t.common.soldOut}</p>
        ) : null}
      </div>
      <div
        className={[
          "relative mx-4 aspect-[5/4] sm:mx-6",
          wide ? "md:aspect-auto md:h-[clamp(18rem,44vh,28rem)]" : "",
        ].join(" ")}
      >
        {model.ready ? (
          <WatchImage
            slug={model.slug}
            name={model.name}
            sizes={wide ? "(min-width: 768px) 45vw, 80vw" : "(min-width: 768px) 28vw, 80vw"}
          />
        ) : (
          <p className="matrix absolute inset-0 flex items-center justify-center text-4xl text-dim">
            {t.common.soon}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 p-4 pt-3 sm:p-6 sm:pt-3">
        <div className="min-w-0">
          {grouped ? (
            <p className="label flex items-center gap-2 whitespace-nowrap text-muted">
              <span aria-hidden className="flex gap-1">
                {variants.map((variant) => (
                  <span
                    key={variant.slug}
                    className="size-2.5 rounded-full ring-1 ring-white/25"
                    style={{ backgroundColor: variant.pastille }}
                  />
                ))}
              </span>
              {t.common.variants(variants.length)}
            </p>
          ) : (
            <p className="label text-muted">{model.ref}</p>
          )}
          <p className="label mt-1">{grouped ? nomModele(model) : model.name}</p>
        </div>
        <p className="label text-accent">
          {model.ready ? <PriceTag cents={lowest} from={severalPrices} /> : t.common.comingSoon}
        </p>
      </div>
    </>
  );

  return model.ready ? (
    <Link href={`/montres/${model.slug}`} className="card block" style={ambientStyle(model)}>
      {body}
    </Link>
  ) : (
    <div className="card" style={ambientStyle(model)}>
      {body}
    </div>
  );
}
