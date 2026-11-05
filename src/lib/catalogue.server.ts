import { existsSync } from "node:fs";
import path from "node:path";
import { catalogue, type Model } from "@/content/catalogue";

export type ShopModel = Model & {
  /** Vrai si l'image détourée existe : le modèle est alors en vente. */
  ready: boolean;
  /** Vrai si une mise en scène existe pour ce modèle. */
  hasScene: boolean;
};

function imageExists(file: string): boolean {
  return existsSync(path.join(process.cwd(), "public", "images", file));
}

/** Déposer une image dans public/images suffit à mettre un modèle en vente. */
export function shopModels(): ShopModel[] {
  return catalogue.map((model) => ({
    ...model,
    ready: imageExists(`${model.slug}.webp`),
    hasScene: imageExists(`${model.slug}-scene.webp`),
  }));
}

/** Image éditoriale si elle existe, sinon une image de secours. */
export function editorialImage(file: string, fallback: string): string {
  return imageExists(file) ? `/images/${file}` : `/images/${fallback}`;
}
