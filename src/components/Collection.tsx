"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/Icons";
import { SeriesBadge, WatchImage, ambientStyle } from "@/components/Shared";
import { euros, families, type FamilyId, type Model } from "@/content/catalogue";
import type { ShopModel } from "@/lib/catalogue.server";
import { useFavorites } from "@/lib/stores";

const shapes: { id: FamilyId; label: string; path: React.ReactNode }[] = [
  { id: "carre", label: "Carré", path: <rect x="7" y="7" width="10" height="10" rx="2.5" /> },
  { id: "octo", label: "Octogonal", path: <path d="M9.5 6h5L18 9.5v5L14.5 18h-5L6 14.5v-5L9.5 6Z" /> },
  { id: "rond", label: "Rond", path: <circle cx="12" cy="12" r="6" /> },
];

const sizes = [40, 42, 44];

const materials: { id: Model["matiere"]; color: string }[] = [
  { id: "Fluoroélastomère", color: "#e6e1da" },
  { id: "Nylon", color: "#5f6b3c" },
  { id: "Acier", color: "#9b9ea3" },
  { id: "Titane", color: "#55524f" },
];

function FilterLabel({ name, value }: { name: string; value?: string }) {
  return (
    <p className="label">
      {name} {value ? <span className="ml-1 text-accent">{value}</span> : null}
    </p>
  );
}

function ProductCard({ model }: { model: ShopModel }) {
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

export default function Collection({ models }: { models: ShopModel[] }) {
  const [shape, setShape] = useState<FamilyId | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [material, setMaterial] = useState<Model["matiere"] | null>(null);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const { slugs } = useFavorites();

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return models.filter((model) => {
      const family = families.find((item) => item.id === model.family);
      return (
        (!shape || model.family === shape) &&
        (!size || family?.tailleMm === size) &&
        (!material || model.matiere === material) &&
        (!query || `${model.name} ${model.ref}`.toLowerCase().includes(query))
      );
    });
  }, [models, shape, size, material, search]);

  const favorites = models.filter((model) => slugs.includes(model.slug));

  return (
    <main className="pad relative pt-8 pb-16">
      <h1 className="sr-only">Toutes les montres POINT</h1>

      <div className="flex flex-wrap items-end gap-x-14 gap-y-6">
        <div>
          <FilterLabel name="Forme" value={shapes.find((item) => item.id === shape)?.label} />
          <div className="mt-3 flex gap-2.5">
            {shapes.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                aria-pressed={shape === item.id}
                onClick={() => setShape(shape === item.id ? null : item.id)}
                className={[
                  "flex size-10 items-center justify-center rounded-full transition-colors",
                  shape === item.id ? "bg-[var(--accent)] text-night" : "bg-white/10 text-ink",
                ].join(" ")}
              >
                <svg viewBox="5 5 14 14" className="size-5" fill="currentColor" aria-hidden>
                  {item.path}
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div>
          <FilterLabel name="Taille" value={size ? `${size} mm` : undefined} />
          <div className="mt-3 flex gap-2.5">
            {sizes.map((item) => (
              <button
                key={item}
                type="button"
                aria-label={`${item} millimètres`}
                aria-pressed={size === item}
                onClick={() => setSize(size === item ? null : item)}
                className={[
                  "flex size-10 items-center justify-center rounded-full border border-dashed text-xs font-bold transition-colors",
                  size === item
                    ? "border-[var(--accent)] bg-[var(--accent)] text-night"
                    : "border-dim bg-white/10",
                ].join(" ")}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <FilterLabel name="Bracelet" value={material ?? undefined} />
          <div className="mt-3 flex gap-2.5">
            {materials.map((item) => (
              <button
                key={item.id}
                type="button"
                title={item.id}
                aria-label={item.id}
                aria-pressed={material === item.id}
                onClick={() => setMaterial(material === item.id ? null : item.id)}
                className="flex size-10 items-center justify-center rounded-full bg-white/10"
              >
                <span
                  className={[
                    "rounded-full transition-all",
                    material === item.id ? "size-9" : "size-5",
                  ].join(" ")}
                  style={{ backgroundColor: item.color }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5 md:ml-auto">
          {searching ? (
            <input
              autoFocus
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nom ou référence"
              aria-label="Rechercher une montre"
              className="field w-48 rounded-full"
            />
          ) : null}
          <button
            type="button"
            aria-label="Rechercher"
            aria-expanded={searching}
            onClick={() => setSearching((value) => !value)}
            className="flex size-10 items-center justify-center rounded-full bg-white/10"
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      {favorites.length > 0 ? (
        <section id="favoris" className="mt-14">
          <h2 className="matrix text-[clamp(2.25rem,4vw,3.25rem)]">Favoris</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((model) => (
              <ProductCard key={model.slug} model={model} />
            ))}
          </div>
        </section>
      ) : null}

      {families.map((family) => {
        const rows = visible.filter((model) => model.family === family.id);
        if (rows.length === 0) return null;
        return (
          <section key={family.id} className="mt-14">
            <h2 className="matrix text-[clamp(2.25rem,4vw,3.25rem)]">{family.label}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rows.map((model) => (
                <ProductCard key={model.slug} model={model} />
              ))}
            </div>
          </section>
        );
      })}

      {visible.length === 0 ? (
        <p className="copy mt-14">
          Aucune montre ne correspond à ces filtres. Retirez un filtre pour voir
          plus de modèles.
        </p>
      ) : null}
    </main>
  );
}
