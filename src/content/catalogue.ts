/**
 * Gamme POINT. Tout le site lit ce fichier : la vitrine, le panier et le
 * récapitulatif affichent donc forcément les mêmes prix et caractéristiques.
 *
 * Un modèle n'est mis en vente que si son image existe dans
 * public/images/<slug>.webp. Sinon il apparaît comme « Prochainement ».
 */

export type FamilyId = "carre" | "octo" | "rond";

export type Family = {
  id: FamilyId;
  label: string;
  forme: string;
  /** Taille du boîtier, utilisée par le filtre. */
  tailleMm: number;
  boitier: string;
  masse: string;
  etancheite: string;
  autonomie: string;
};

export const families: readonly Family[] = [
  {
    id: "carre",
    label: "Carré (1)",
    forme: "Carré",
    tailleMm: 40,
    boitier: "40 × 44 × 11 mm",
    masse: "46 g, bracelet compris",
    etancheite: "5 ATM : douche et nage en surface",
    autonomie: "30 jours en usage courant",
  },
  {
    id: "octo",
    label: "Octo (1)",
    forme: "Octogonal",
    tailleMm: 44,
    boitier: "44 × 44 × 12 mm",
    masse: "62 g, bracelet compris",
    etancheite: "10 ATM : natation",
    autonomie: "45 jours en usage courant",
  },
  {
    id: "rond",
    label: "Rond (1)",
    forme: "Rond",
    tailleMm: 42,
    boitier: "42 mm de diamètre, 11 mm d'épaisseur",
    masse: "58 g, bracelet compris",
    etancheite: "5 ATM : douche et nage en surface",
    autonomie: "30 jours en usage courant",
  },
];

export type Model = {
  slug: string;
  family: FamilyId;
  /** Nom complet, affiché en grand. */
  name: string;
  ref: string;
  priceCents: number;
  /** Nombre de pièces de la série. */
  serie: number;
  /** Stock réel : conditionne ce que l'offre a le droit d'annoncer. */
  stock: number;
  boitierMatiere: string;
  bracelet: string;
  /** Sert au filtre de la collection. */
  matiere: "Fluoroélastomère" | "Nylon" | "Acier" | "Titane";
  fermoir: string;
  affichage: string;
  /** Couleur d'ambiance de la page, en composantes RVB. */
  ambient: string;
  accent: string;
};

const CHIFFRES = "Chiffres en points lumineux";

export const catalogue: readonly Model[] = [
  {
    slug: "carre-clair",
    family: "carre",
    name: "Carré (1) Clair",
    ref: "PT-C1-CL",
    priceCents: 24900,
    serie: 500,
    stock: 184,
    boitierMatiere: "Polycarbonate translucide, châssis en aluminium",
    bracelet: "Fluoroélastomère côtelé blanc",
    matiere: "Fluoroélastomère",
    fermoir: "Boucle à ardillon",
    affichage: CHIFFRES,
    ambient: "150 132 112",
    accent: "#e3d3bf",
  },
  {
    slug: "carre-noir",
    family: "carre",
    name: "Carré (1) Noir",
    ref: "PT-C1-NR",
    priceCents: 24900,
    serie: 500,
    stock: 212,
    boitierMatiere: "Polycarbonate fumé, châssis en aluminium",
    bracelet: "Fluoroélastomère côtelé noir",
    matiere: "Fluoroélastomère",
    fermoir: "Boucle à ardillon",
    affichage: CHIFFRES,
    ambient: "134 72 32",
    accent: "#ff9a52",
  },
  {
    slug: "carre-cobalt",
    family: "carre",
    name: "Carré (1) Cobalt",
    ref: "PT-C1-CB",
    priceCents: 26900,
    serie: 250,
    stock: 96,
    boitierMatiere: "Polycarbonate bleu translucide, châssis en aluminium",
    bracelet: "Fluoroélastomère côtelé bleu nuit",
    matiere: "Fluoroélastomère",
    fermoir: "Boucle à ardillon",
    affichage: CHIFFRES,
    ambient: "20 88 124",
    accent: "#58bdf0",
  },
  {
    slug: "octo-olive",
    family: "octo",
    name: "Octo (1) Olive",
    ref: "PT-O1-OL",
    priceCents: 29900,
    serie: 300,
    stock: 121,
    boitierMatiere: "Polycarbonate fumé, cornes et vis en titane",
    bracelet: "Nylon tissé olive",
    matiere: "Nylon",
    fermoir: "Passant et boucle en titane",
    affichage: CHIFFRES,
    ambient: "72 90 46",
    accent: "#bfd08c",
  },
  {
    slug: "octo-noir",
    family: "octo",
    name: "Octo (1) Noir",
    ref: "PT-O1-NR",
    priceCents: 29900,
    serie: 300,
    stock: 88,
    boitierMatiere: "Polycarbonate noir fumé, cornes et vis en titane noirci",
    bracelet: "Nylon tissé noir",
    matiere: "Nylon",
    fermoir: "Passant et boucle en titane noirci",
    affichage: CHIFFRES,
    ambient: "74 74 84",
    accent: "#c9c9d6",
  },
  {
    slug: "octo-sable",
    family: "octo",
    name: "Octo (1) Sable",
    ref: "PT-O1-SB",
    priceCents: 29900,
    serie: 300,
    stock: 64,
    boitierMatiere: "Polycarbonate fumé, cornes et vis en titane",
    bracelet: "Nylon tissé sable",
    matiere: "Nylon",
    fermoir: "Passant et boucle en titane",
    affichage: CHIFFRES,
    ambient: "134 108 70",
    accent: "#e2c592",
  },
  {
    slug: "rond-maille",
    family: "rond",
    name: "Rond (1) Maille",
    ref: "PT-R1-ML",
    priceCents: 32900,
    serie: 150,
    stock: 0,
    boitierMatiere: "Polycarbonate fumé, cornes en acier",
    bracelet: "Maille milanaise en acier",
    matiere: "Acier",
    fermoir: "Fermoir coulissant magnétique",
    affichage: CHIFFRES,
    ambient: "96 104 118",
    accent: "#c4cedb",
  },
  {
    slug: "rond-cuivre",
    family: "rond",
    name: "Rond (1) Cuivre",
    ref: "PT-R1-CV",
    priceCents: 44900,
    serie: 50,
    stock: 23,
    boitierMatiere: "Titane brossé, lunette en cuivre",
    bracelet: "Maillons en titane brossé",
    matiere: "Titane",
    fermoir: "Boucle déployante",
    affichage: "Aiguilles et index en points lumineux",
    ambient: "138 84 52",
    accent: "#dca681",
  },
  {
    slug: "rond-nuit",
    family: "rond",
    name: "Rond (1) Nuit",
    ref: "PT-R1-NT",
    priceCents: 44900,
    serie: 50,
    stock: 31,
    boitierMatiere: "Titane noirci, lunette en titane bleui",
    bracelet: "Maillons en titane noirci",
    matiere: "Titane",
    fermoir: "Boucle déployante",
    affichage: "Aiguilles et index en points lumineux",
    ambient: "36 58 118",
    accent: "#8fb0f5",
  },
];

export const strapSizes = ["S 14 – 17 cm", "M 16 – 19 cm", "L 18 – 21 cm"] as const;

export const TVA = 0.2;

export function familyOf(model: Model): Family {
  return families.find((family) => family.id === model.family) ?? families[0];
}

export function findModel(slug: string): Model | undefined {
  return catalogue.find((model) => model.slug === slug);
}

/** Ce texte engage le vendeur : les visuels ne sont pas contractuels. */
export function descriptif(model: Model): string {
  const family = familyOf(model);
  return (
    `${model.name} est une montre-bracelet numérique à écran matriciel monochrome. ` +
    `Son boîtier ${family.forme.toLowerCase()} mesure ${family.boitier}. ` +
    `Il associe ${model.boitierMatiere.toLowerCase()}, sous un verre saphir plat. ` +
    `La montre indique l'heure et la date, et propose un chronomètre, une alarme et un podomètre. ` +
    `Quatre voyants latéraux signalent le niveau de charge. ` +
    `Elle n'a ni microphone, ni haut-parleur, ni GPS, et ne collecte aucune donnée. ` +
    `Son autonomie est de ${family.autonomie}.`
  );
}

export function specs(model: Model): [string, string][] {
  const family = familyOf(model);
  return [
    ["Écran", "Matrice monochrome de 32 × 32 points, verre saphir"],
    ["Affichage", model.affichage],
    ["Boîtier", `${family.boitier}. ${model.boitierMatiere}`],
    ["Masse", family.masse],
    ["Bracelet", `${model.bracelet}, tours de poignet de 14 à 21 cm`],
    ["Fermoir", model.fermoir],
    ["Étanchéité", family.etancheite],
    ["Autonomie", family.autonomie],
    ["Recharge", "Base magnétique USB-C incluse, adaptateur secteur non inclus"],
    ["Fonctions", "Heure, date, chronomètre, alarme, podomètre"],
    ["Connectivité", "Aucune : la montre ne communique avec aucun appareil"],
    ["Pièces détachées", "Disponibles pendant 7 ans après l'achat"],
  ];
}

export function euros(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

/** Part de TVA contenue dans un prix toutes taxes comprises. */
export function tvaCents(ttcCents: number): number {
  return Math.round(ttcCents - ttcCents / (1 + TVA));
}
