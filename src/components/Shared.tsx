import Image from "next/image";
import type { CSSProperties } from "react";
import type { Model } from "@/content/catalogue";
import { SwitchIcon } from "@/components/Icons";

export function ambientStyle(model?: Pick<Model, "ambient" | "accent">) {
  if (!model) return undefined;
  return { "--ambient": model.ambient, "--accent": model.accent } as CSSProperties;
}

/** Fond teinté commun à toutes les pages. */
export function Surface() {
  return (
    <>
      <div aria-hidden className="surface absolute inset-0" />
      <div aria-hidden className="dots absolute inset-0" />
    </>
  );
}

export function SeriesBadge({ serie, muted }: { serie: number; muted?: boolean }) {
  return (
    <p className="pill label">
      <span className={muted ? "text-muted" : "text-accent"}>Série limitée à</span>
      <span>{serie} pièces</span>
    </p>
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
  return (
    <Image
      src={`/images/${slug}.webp`}
      alt={`Montre ${name}`}
      fill
      sizes={sizes}
      priority={priority}
      decoding="sync"
      className="object-contain"
    />
  );
}

/** Règle graduée de la maquette : chaque numéro mène à un modèle. */
export function Ruler({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5" role="group" aria-label="Choisir un modèle">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <span className="hidden items-center sm:flex">
            <Ticks bright={index === active} />
          </span>
          <button
            type="button"
            aria-label={`Modèle ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => onSelect(index)}
            className={[
              "px-0.5 text-[0.6875rem] font-bold",
              index === active ? "text-ink" : "text-dim hover:text-ink",
            ].join(" ")}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
          {index === active ? (
            <span className="hidden items-center sm:flex">
              <Ticks bright />
            </span>
          ) : null}
        </div>
      ))}
      <Ticks />
    </div>
  );
}

function Ticks({ bright }: { bright?: boolean }) {
  return (
    <span aria-hidden className="flex items-center gap-1.5">
      {[0, 1, 2, 3].map((tick) => (
        <span key={tick} className={["h-2 w-px", bright ? "bg-ink" : "bg-dim/70"].join(" ")} />
      ))}
    </span>
  );
}

/** Rangée du bas : modèle précédent, règle, modèle suivant. */
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
    <div className="grid grid-cols-2 items-center gap-y-4 lg:grid-cols-[1fr_auto_1fr]">
      <button
        type="button"
        onClick={() => onSelect((active - 1 + count) % count)}
        className="label flex items-center gap-3 text-muted hover:text-ink"
      >
        <SwitchIcon />
        {previous}
      </button>
      <div className="order-last col-span-2 lg:order-none lg:col-span-1">
        <Ruler count={count} active={active} onSelect={onSelect} />
      </div>
      <button
        type="button"
        onClick={() => onSelect((active + 1) % count)}
        className="label flex items-center justify-end gap-3 text-right text-muted hover:text-ink"
      >
        {next}
        <SwitchIcon flip />
      </button>
    </div>
  );
}
