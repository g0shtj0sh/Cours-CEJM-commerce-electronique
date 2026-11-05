"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DocumentIcon, HeartIcon, ShareIcon } from "@/components/Icons";
import Header from "@/components/Header";
import {
  ModelSwitcher,
  SeriesBadge,
  Surface,
  WatchImage,
  ambientStyle,
} from "@/components/Shared";
import {
  descriptif,
  euros,
  specs,
  strapSizes,
} from "@/content/catalogue";
import { precontractuel } from "@/content/legal";
import { livraison } from "@/content/vendeur";
import type { ShopModel } from "@/lib/catalogue.server";
import { useCart, useFavorites } from "@/lib/stores";

export default function ProductView({
  model,
  models,
}: {
  model: ShopModel;
  models: ShopModel[];
}) {
  const router = useRouter();
  const { add } = useCart();
  const { slugs, toggle } = useFavorites();
  const [strapSize, setStrapSize] = useState<string>(strapSizes[1]);
  const [shared, setShared] = useState(false);

  const available = model.stock > 0;
  const index = models.findIndex((item) => item.slug === model.slug);
  const previous = models[(index - 1 + models.length) % models.length];
  const next = models[(index + 1) % models.length];
  const others = models.filter(
    (item) => item.slug !== model.slug && item.family === model.family,
  );
  const suggestions = (others.length ? others : models.filter((item) => item.slug !== model.slug)).slice(0, 3);
  const text = descriptif(model);
  const firstStop = text.indexOf(". ") + 1;

  const buy = () => {
    add(model.slug, strapSize);
    router.push("/panier");
  };

  const share = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setShared(true);
    window.setTimeout(() => setShared(false), 1800);
  };

  return (
    <div style={ambientStyle(model)}>
      <div className="relative overflow-hidden">
        <section className="relative z-10 overflow-hidden rounded-b-panel bg-night">
          <Surface />
          <div className="relative">
            <Header active="montres" />
            <main className="pad relative flex flex-col pt-8 pb-8 lg:min-h-[calc(100svh-15rem)] lg:pt-10">
              <div className="flex items-center justify-between gap-4">
                <SeriesBadge serie={model.serie} />
                <p className="label text-accent">
                  {available ? "En stock" : "Épuisé"}
                </p>
              </div>

              <div className="relative z-10 mt-8 lg:mt-[clamp(1.5rem,6vh,4rem)]">
                <p className="label text-muted">{model.ref}</p>
                <h1 className="matrix mt-4 max-w-[9ch] text-[clamp(2.75rem,5vw,4.5rem)]">
                  {model.name}
                </h1>
              </div>

              <div className="relative mx-auto my-4 aspect-square w-full max-w-md lg:absolute lg:top-[-1rem] lg:bottom-16 lg:left-1/2 lg:my-0 lg:aspect-auto lg:w-[min(46vw,42rem)] lg:max-w-none lg:-translate-x-1/2">
                <WatchImage
                  slug={model.slug}
                  name={model.name}
                  sizes="(min-width: 1024px) 46vw, 90vw"
                  priority
                />
              </div>

              <div className="relative z-10 flex flex-wrap items-end justify-between gap-6 lg:mt-auto">
                <div className="lg:mt-8">
                  <p className="text-lg font-semibold text-accent">
                    {euros(model.priceCents)} TTC
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Livraison incluse, sous {livraison.delai}
                  </p>
                  <label className="mt-4 block w-44">
                    <span className="label text-muted">Taille du bracelet</span>
                    <select
                      className="field mt-1.5"
                      value={strapSize}
                      onChange={(event) => setStrapSize(event.target.value)}
                    >
                      {strapSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    disabled={!available}
                    onClick={buy}
                    className="button mt-4"
                  >
                    {available ? "Acheter" : "Épuisé"}
                  </button>
                </div>

                <div className="flex gap-5 lg:flex-col">
                  <button
                    type="button"
                    aria-label="Ajouter aux favoris"
                    aria-pressed={slugs.includes(model.slug)}
                    onClick={() => toggle(model.slug)}
                  >
                    <HeartIcon filled={slugs.includes(model.slug)} />
                  </button>
                  <button
                    type="button"
                    aria-label={shared ? "Lien copié" : "Copier le lien"}
                    title={shared ? "Lien copié" : "Copier le lien"}
                    onClick={share}
                  >
                    <ShareIcon />
                  </button>
                  <a href="#fiche" aria-label="Lire la fiche détaillée">
                    <DocumentIcon />
                  </a>
                </div>
              </div>

              <div className="relative z-10 mt-8">
                <ModelSwitcher
                  count={models.length}
                  active={index}
                  previous={previous.name}
                  next={next.name}
                  onSelect={(target) => router.push(`/montres/${models[target].slug}`)}
                />
              </div>
            </main>
          </div>
        </section>

        <section className="surface pad relative -mt-8 grid gap-8 rounded-b-panel pt-16 pb-9 md:grid-cols-[1fr_1fr]">
          <div className="fade-out max-h-32 overflow-hidden">
            <p className="label">
              {model.name} <span className="ml-1 text-muted">{model.ref}</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed font-semibold">
              {text.slice(0, firstStop)}
            </p>
            <p className="text-sm leading-relaxed text-muted">{text.slice(firstStop)}</p>
          </div>

          <div className="flex justify-between gap-6">
            <div>
              <p className="label">
                Autres <span className="text-muted">modèles</span>
              </p>
              <ul className="mt-4 space-y-1.5">
                {suggestions.map((item) => (
                  <li key={item.slug}>
                    <Link className="label text-muted hover:text-ink" href={`/montres/${item.slug}`}>
                      {item.ref}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4">
              {suggestions.map((item) => (
                <Link
                  key={item.slug}
                  href={`/montres/${item.slug}`}
                  aria-label={item.name}
                  className="relative size-20 lg:size-24"
                >
                  <WatchImage slug={item.slug} name={item.name} sizes="96px" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="pad grid gap-12 py-16 lg:grid-cols-2 lg:gap-20">
        <section id="fiche" className="scroll-mt-8">
          <h2 className="matrix text-4xl">Descriptif</h2>
          <p className="copy mt-5">{text}</p>
          <p className="mt-4 text-sm font-semibold">
            Ce descriptif fait foi : les visuels sont non contractuels.
          </p>
          <dl className="mt-7 border-t border-line">
            {specs(model).map(([label, value]) => (
              <div key={label} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line py-3 text-sm">
                <dt className="text-muted">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="matrix text-4xl">Avant de commander</h2>
          <dl className="mt-5 space-y-5">
            {precontractuel(model.priceCents).map(([label, value]) => (
              <div key={label}>
                <dt className="label">{label}</dt>
                <dd className="copy mt-1">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="copy mt-6">
            Offre valable tant qu&apos;elle est en ligne, dans la limite des stocks.
            Voir les{" "}
            <Link className="link" href="/cgv">
              conditions générales de vente
            </Link>{" "}
            et le{" "}
            <Link className="link" href="/garantie#retractation">
              formulaire de rétractation
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
