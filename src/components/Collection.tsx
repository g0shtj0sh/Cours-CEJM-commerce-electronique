"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import { SearchIcon } from "@/components/Icons";
import ProductCard from "@/components/ProductCard";
import Tip from "@/components/Tip";
import {
  catalogue,
  families,
  matiereLabels,
  silhouetteOf,
  tailleOf,
  type FamilyId,
  type Matiere,
} from "@/content/catalogue";
import type { ShopModel } from "@/lib/catalogue.server";
import { useSettings, useT } from "@/lib/settings";

type Shape = Exclude<FamilyId, "parcours">;

const shapes: { id: Shape; path: React.ReactNode }[] = [
  { id: "carre", path: <rect x="7" y="7" width="10" height="10" rx="2.5" /> },
  { id: "octo", path: <path d="M9.5 6h5L18 9.5v5L14.5 18h-5L6 14.5v-5L9.5 6Z" /> },
  { id: "rond", path: <circle cx="12" cy="12" r="6" /> },
  { id: "ligne", path: <rect x="9" y="5.5" width="6" height="13" rx="3" /> },
];

const sizes = [...new Set(catalogue.map(tailleOf))].sort((a, b) => a - b);

const materials: { id: Matiere; color: string }[] = [
  { id: "Fluoroélastomère", color: "#e6e1da" },
  { id: "Nylon", color: "#5f6b3c" },
  { id: "Acier", color: "#9b9ea3" },
  { id: "Titane", color: "#55524f" },
  { id: "Cuir", color: "#6b4226" },
];

function FilterLabel({ name, value }: { name: string; value?: string }) {
  return (
    <p className="label">
      {name} {value ? <span className="ml-1 text-accent">{value}</span> : null}
    </p>
  );
}

/** Présente la montre Parcours et ses variantes. */
function ParcoursBanner() {
  const t = useT();
  return (
    <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-panel bg-card md:aspect-[21/9]">
      <Image
        src="/images/parcours-collection.webp"
        alt={t.collection.bannerAlt}
        fill
        decoding="sync"
        sizes="90vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute inset-x-5 bottom-4 md:inset-x-8 md:bottom-7">
        <p className="label text-accent">{t.collection.bannerTag}</p>
        <p className="mt-1 text-lg font-semibold">{t.collection.bannerTitle}</p>
        <p className="mt-1 max-w-xl text-sm text-ink/80">{t.collection.bannerText}</p>
      </div>
    </div>
  );
}

/** Rangée à défilement horizontal, avec une barre aux couleurs du site. */
function CardRow({ models }: { models: ShopModel[] }) {
  return (
    <div className="rail -mr-[var(--pad)] mt-6 flex snap-x gap-4 overflow-x-auto pr-[var(--pad)] pb-5 sm:gap-6">
      {models.map((model, index) => (
        <div
          key={model.slug}
          style={{ "--i": Math.min(index, 4) + 1 } as React.CSSProperties}
          className="rise w-[85%] shrink-0 snap-start md:w-[46%] lg:w-[31%]"
        >
          <ProductCard model={model} />
        </div>
      ))}
    </div>
  );
}

export default function Collection({ models }: { models: ShopModel[] }) {
  const t = useT();
  const { lang } = useSettings();
  const [shape, setShape] = useState<Shape | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [material, setMaterial] = useState<Matiere | null>(null);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return models.filter(
      (model) =>
        (!shape || silhouetteOf(model) === shape) &&
        (!size || tailleOf(model) === size) &&
        (!material || model.matiere === material) &&
        (!query || `${model.name} ${model.ref}`.toLowerCase().includes(query)),
    );
  }, [models, shape, size, material, search]);

  return (
    <>
      <div className="pin z-30">
        <div aria-hidden className="pin-veil" />
        <Header active="montres" />
        <div className="pad rise relative flex flex-wrap items-end gap-x-14 gap-y-6 pt-8 pb-5">
          <div>
            <FilterLabel name={t.collection.shape} value={shape ? t.collection.shapes[shape] : undefined} />
            <div className="mt-3 flex flex-wrap gap-2.5">
              {shapes.map((item) => (
                <Tip key={item.id} label={t.collection.shapes[item.id]}>
                  <button
                    type="button"
                    aria-label={t.collection.shapes[item.id]}
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
                </Tip>
              ))}
            </div>
          </div>

          <div>
            <FilterLabel name={t.collection.size} value={size ? `${size} mm` : undefined} />
            <div className="mt-3 flex flex-wrap gap-2.5">
              {sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-label={`${item} ${t.collection.millimetres}`}
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
            <FilterLabel name={t.collection.strap} value={material ? matiereLabels[material][lang] : undefined} />
            <div className="mt-3 flex flex-wrap gap-2.5">
              {materials.map((item) => (
                <Tip key={item.id} label={matiereLabels[item.id][lang]}>
                  <button
                    type="button"
                    aria-label={matiereLabels[item.id][lang]}
                    aria-pressed={material === item.id}
                    onClick={() => setMaterial(material === item.id ? null : item.id)}
                    className="flex size-10 items-center justify-center rounded-full bg-white/10"
                  >
                    <span
                      className={[
                        "size-8 rounded-full transition-transform duration-150",
                        material === item.id ? "scale-110" : "scale-[0.625]",
                      ].join(" ")}
                      style={{ backgroundColor: item.color }}
                    />
                  </button>
                </Tip>
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
                placeholder={t.collection.searchPlaceholder}
                aria-label={t.collection.searchLabel}
                className="field w-48 rounded-full"
              />
            ) : null}
            <Tip label={t.collection.search} side="bottom-end">
              <button
                type="button"
                aria-label={t.collection.search}
                aria-expanded={searching}
                onClick={() => setSearching((value) => !value)}
                className="flex size-10 items-center justify-center rounded-full bg-white/10"
              >
                <SearchIcon />
              </button>
            </Tip>
          </div>
        </div>
      </div>

      <main className="pad relative pb-16">
        <h1 className="sr-only">{t.collection.title}</h1>

        {families.map((family) => {
          const rows = visible.filter((model) => model.family === family.id);
          if (rows.length === 0) return null;
          return (
            <section key={family.id} className="mt-9 scroll-mt-52 first-of-type:mt-6 lg:mt-14">
              <h2 className="matrix text-[clamp(2.25rem,4vw,3.25rem)]">{family.label[lang]}</h2>
              {family.id === "parcours" ? <ParcoursBanner /> : null}
              <CardRow models={rows} />
            </section>
          );
        })}

        {visible.length === 0 ? <p className="copy mt-14">{t.collection.noResult}</p> : null}
      </main>
    </>
  );
}
