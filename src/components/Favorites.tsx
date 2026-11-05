"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { ShopModel } from "@/lib/catalogue.server";
import { useFavorites } from "@/lib/stores";

export default function Favorites({ models }: { models: ShopModel[] }) {
  const { slugs, toggle } = useFavorites();
  const favorites = models.filter((model) => slugs.includes(model.slug));

  return (
    <main className="pad relative pt-10 pb-16">
      <h1 className="matrix text-[clamp(2.5rem,5vw,4rem)]">Favoris</h1>

      {favorites.length === 0 ? (
        <div className="mt-8">
          <p className="copy">
            Vous n&apos;avez pas encore de favori. Touchez le cœur sur la fiche
            d&apos;une montre pour la retrouver ici.
          </p>
          <Link className="button mt-6" href="/montres">
            Voir les montres
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
                className="label mt-3 ml-2 text-muted hover:text-ink"
              >
                Retirer des favoris
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
