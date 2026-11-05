/**
 * Fiche produit — point d'entrée unique.
 *
 * Tout le site lit ce fichier : changer de produit = changer ces valeurs
 * et remplacer `model.src` par un autre fichier .glb dans /public/models.
 * Aucun composant ne contient de données produit en dur.
 */

export type Finish = {
  id: string;
  label: string;
  /** Aperçu de la pastille dans l'interface */
  chip: string;
  /** Teinte appliquée à la base color du modèle 3D (multiplicative) */
  tint: string;
  /** Gain appliqué à la teinte. Au-dessus de 1, éclaircit la texture d'origine. */
  gain: number;
  /** 0 = mat, 1 = miroir */
  roughness: number;
  metalness: number;
};

export const product = {
  brand: "Timbre",
  name: "Timbre 03",
  /** Découpage du wordmark pour l'animation de chargement */
  wordmark: ["T", "I", "M", "B", "R", "E"],
  reference: "TMB-03",

  tagline: "Une radio large bande à poser, pas à ranger.",
  pitch:
    "Deux haut-parleurs large bande, un tuner FM à antenne télescopique et " +
    "une batterie qui tient quarante heures. Le panneau avant rétroéclairé " +
    "reste lisible à trois mètres. Rien de plus.",

  /** Prix en centimes, pour éviter toute arithmétique flottante. */
  priceCents: 34900,
  vatRate: 0.2,
  currency: "EUR",

  model: {
    src: "/models/radio.glb",
    /** Le modèle source mesure ~2 cm : on le ramène à une taille utile. */
    scale: 90,
    credit: {
      title: "Boom Box",
      author: "Microsoft",
      license: "CC0 1.0 Universal",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      sourceUrl:
        "https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/BoomBox",
    },
  },

  finishes: [
    {
      id: "graphite",
      label: "Graphite",
      chip: "#2b3034",
      tint: "#ffffff",
      gain: 1,
      roughness: 0.5,
      metalness: 0.8,
    },
    {
      id: "aluminium",
      label: "Argent",
      chip: "#c6c8c3",
      tint: "#ffffff",
      gain: 3.4,
      roughness: 0.26,
      metalness: 0.95,
    },
    {
      id: "bleu",
      label: "Bleu de cobalt",
      chip: "#1a4e8a",
      tint: "#7aa3dd",
      gain: 2.6,
      roughness: 0.4,
      metalness: 0.78,
    },
  ] satisfies Finish[],

  /** Fiche technique. `value` est rendu en condensé tabulaire. */
  specs: [
    { label: "Haut-parleurs", value: "2 × large bande 102 mm, aimant néodyme" },
    { label: "Puissance", value: "2 × 15 W RMS" },
    { label: "Bande passante", value: "52 Hz – 20 kHz (± 3 dB)" },
    { label: "Autonomie", value: "40 h à volume 50 %" },
    { label: "Charge", value: "USB-C 30 W, 0 → 80 % en 55 min" },
    { label: "Tuner", value: "FM 87,5 – 108 MHz, antenne télescopique" },
    { label: "Connexions", value: "Bluetooth 5.4, entrée ligne 3,5 mm" },
    { label: "Corps", value: "ABS teinté masse, façade aluminium, grille acier" },
    { label: "Étanchéité", value: "IP54 (projections, poussière)" },
    { label: "Dimensions", value: "286 × 158 × 112 mm, antenne repliée" },
    { label: "Masse", value: "1,86 kg" },
  ],

  /** Arguments mis en avant à côté du panneau nocturne. */
  highlights: [
    {
      title: "Panneau rétroéclairé",
      text: "Fréquence, source et niveau de charge restent lisibles dans le noir, sans éclairer la pièce.",
    },
    {
      title: "Réparable",
      text: "Batterie et grille se remplacent avec un tournevis cruciforme. Vues éclatées et pièces en vente dix ans.",
    },
  ],

  shipping: {
    carrier: "Colissimo suivi",
    delayText: "Expédié sous 48 h, livré en 2 à 4 jours ouvrés",
    freeFromCents: 5000,
    costCents: 0,
  },
} as const;

export type Product = typeof product;

/** Formatage monétaire français à partir de centimes. */
export function euros(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

/** Part de TVA contenue dans un prix TTC. */
export function vatPortionCents(ttcCents: number, rate: number): number {
  return Math.round(ttcCents - ttcCents / (1 + rate));
}
