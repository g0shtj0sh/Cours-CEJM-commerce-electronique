"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { ShopModel } from "@/lib/catalogue.server";
import { useT } from "@/lib/settings";
import { useFavorites } from "@/lib/stores";

export default function Favorites({ models }: { models: ShopModel[] }) {
  const t = useT();
  const { slugs, toggle } = useFavorites();
  const favorites = models.filter((model) => slugs.includes(model.slug));

  return (
    <main className="pad relative pt-10 pb-16">
      <h1 className="matrix text-[clamp(2.5rem,5vw,4rem)]">{t.favorites.title}</h1>

      {favorites.length === 0 ? (
        <div className="mt-8">
          <p className="copy">{t.favorites.empty}</p>
          <Link className="button mt-6" href="/montres">
            {t.common.viewWatches}
          </Link>
        </div>
      ) : (
        <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((model) => (
            <div key={model.slug}>
              <ProductCard model={model} />
              <button
                type="button"
                onClick={() => toggle(model.slug)}
                className="label mt-1 ml-2 py-2.5 text-muted hover:text-ink"
              >
                {t.favorites.remove}
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
