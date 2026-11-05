"use client";

import Link from "next/link";
import { PriceTag, SeriesBadge, WatchImage, ambientStyle } from "@/components/Shared";
import type { ShopModel } from "@/lib/catalogue.server";
import { useT } from "@/lib/settings";

/** Carte d'une montre, partagée par la collection et les favoris. */
export default function ProductCard({ model }: { model: ShopModel }) {
  const t = useT();
  const body = (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 p-4 pb-0 sm:p-5 sm:pb-0">
        <SeriesBadge serie={model.serie} muted={!model.ready} />
        {model.ready && model.stock === 0 ? (
          <p className="label text-muted">{t.common.soldOut}</p>
        ) : null}
      </div>
      <div className="relative mx-4 aspect-[5/4] sm:mx-6">
        {model.ready ? (
          <WatchImage
            slug={model.slug}
            name={model.name}
            sizes="(min-width: 768px) 28vw, 80vw"
          />
        ) : (
          <p className="matrix absolute inset-0 flex items-center justify-center text-4xl text-dim">
            {t.common.soon}
          </p>
        )}
      </div>
      <div className="flex items-end justify-between gap-4 p-4 pt-3 sm:p-6 sm:pt-3">
        <div className="min-w-0">
          <p className="label text-muted">{model.ref}</p>
          <p className="label mt-1">{model.name}</p>
        </div>
        <p className="label text-accent">
          {model.ready ? <PriceTag cents={model.priceCents} /> : t.common.comingSoon}
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
