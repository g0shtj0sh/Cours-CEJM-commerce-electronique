import Link from "next/link";
import { SeriesBadge, WatchImage, ambientStyle } from "@/components/Shared";
import { euros } from "@/content/catalogue";
import type { ShopModel } from "@/lib/catalogue.server";

/** Carte d'une montre, partagée par la collection et les favoris. */
export default function ProductCard({ model }: { model: ShopModel }) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-2 p-5 pb-0">
        <SeriesBadge serie={model.serie} muted={!model.ready} />
        {model.ready && model.stock === 0 ? (
          <p className="label text-muted">Épuisé</p>
        ) : null}
      </div>
      <div className="relative mx-6 aspect-[5/4]">
        {model.ready ? (
          <WatchImage
            slug={model.slug}
            name={model.name}
            sizes="(min-width: 768px) 28vw, 80vw"
          />
        ) : (
          <p className="matrix absolute inset-0 flex items-center justify-center text-4xl text-dim">
            Bientôt
          </p>
        )}
      </div>
      <div className="flex items-end justify-between gap-4 p-6 pt-3">
        <div>
          <p className="label text-muted">{model.ref}</p>
          <p className="label mt-1">{model.name}</p>
        </div>
        <p className="label whitespace-nowrap text-accent">
          {model.ready ? `${euros(model.priceCents)} TTC` : "Prochainement"}
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
