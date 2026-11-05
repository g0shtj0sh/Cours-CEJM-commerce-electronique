/**
 * Gamme POINT. Tout le site lit ce fichier : la vitrine, le panier et le
 * récapitulatif affichent donc forcément les mêmes prix et caractéristiques.
 *
 * Un modèle n'est mis en vente que si son image existe dans
 * public/images/<slug>.webp. Sinon il apparaît comme « Prochainement ».
 *
 * Les modèles sont classés par ordre d'ajout au site : ajouter les suivants
 * à la fin de la liste.
 *
 * Le descriptif fait foi face aux visuels : chaque modèle doit décrire ce
 * que montre réellement son image (fonctions, couleurs de l'écran, voyants).
 */

export type FamilyId = "parcours" | "carre" | "octo" | "rond" | "ligne";

export type Family = {
  id: FamilyId;
  label: string;
  forme: string;
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
  {
    id: "ligne",
    label: "Ligne (1)",
    forme: "Allongé",
    tailleMm: 36,
    boitier: "36 × 50 × 10 mm",
    masse: "34 g, bracelet compris",
    etancheite: "5 ATM : douche et nage en surface",
    autonomie: "14 jours en usage courant",
  },
  {
    id: "parcours",
    label: "Parcours (1)",
    forme: "Carré",
    tailleMm: 42,
    boitier: "42 × 44 × 11 mm",
    masse: "60 g, bracelet compris",
    etancheite: "5 ATM : douche et nage en surface",
    autonomie: "30 jours en usage courant",
  },
];

export type Model = {
  slug: string;
  /** Regroupe les déclinaisons d'une même montre : même boîtier, autre couleur. */
  groupe?: string;
  /** Nom du coloris et couleur de sa pastille. */
  coloris: string;
  pastille: string;
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
  matiere: "Fluoroélastomère" | "Nylon" | "Acier" | "Titane" | "Cuir";
  fermoir: string;
  /** Ce que montre l'écran, couleurs comprises. */
  affichage: string;
  /** Phrase propre au modèle, reprise dans le descriptif. */
  particularite: string;
  /** Fonction ajoutée à la liste commune, si le modèle en a une. */
  fonctionPlus?: string;
  /** Forme propre au modèle, si elle diffère de sa famille. */
  forme?: string;
  /** Silhouette utilisée par le filtre « Forme ». */
  silhouette?: Exclude<FamilyId, "parcours">;
  /** Dimensions propres au modèle, si elles diffèrent de sa famille. */
  boitier?: string;
  masse?: string;
  tailleMm?: number;
  /** Couleur d'ambiance de la page, en composantes RVB. */
  ambient: string;
  accent: string;
};

const CHIFFRES = "Chiffres en points blancs";
const VOYANTS = "Une colonne de voyants latéraux signale le niveau de charge.";

const parcours = (decor: string) =>
  `Un chemin relie A à B, de 00:00 à 23:59, et un point orange y avance au fil de la journée, dans un décor ${decor}. C'est une façon de lire l'heure : la montre ne suit pas votre position.`;

export const catalogue: readonly Model[] = [
  {
    slug: "carre-clair",
    groupe: "carre",
    coloris: "Clair",
    pastille: "#e9e4dc",
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
    particularite: VOYANTS,
    ambient: "150 132 112",
    accent: "#e3d3bf",
  },
  {
    slug: "carre-noir",
    groupe: "carre",
    coloris: "Noir",
    pastille: "#1d1d1f",
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
    particularite: VOYANTS,
    ambient: "134 72 32",
    accent: "#ff9a52",
  },
  {
    slug: "octo-olive",
    groupe: "octo",
    coloris: "Olive",
    pastille: "#5b6b35",
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
    particularite: VOYANTS,
    ambient: "72 90 46",
    accent: "#bfd08c",
  },
  {
    slug: "rond-maille",
    coloris: "Argent",
    pastille: "#9b9ea3",
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
    particularite: VOYANTS,
    ambient: "96 104 118",
    accent: "#c4cedb",
  },
  {
    slug: "rond-cuivre",
    groupe: "rond-index",
    coloris: "Cuivre",
    pastille: "#c98a5e",
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
    affichage: "Aiguilles et index en points blancs et orange",
    particularite: "Les aiguilles et les index sont dessinés en points lumineux.",
    ambient: "138 84 52",
    accent: "#dca681",
  },
  {
    slug: "rond-orbite",
    coloris: "Noir",
    pastille: "#1a1a1d",
    family: "rond",
    name: "Rond (1) Orbite",
    ref: "PT-R1-OB",
    priceCents: 34900,
    serie: 150,
    stock: 67,
    boitierMatiere: "Aluminium anodisé noir",
    bracelet: "Maille milanaise noire",
    matiere: "Acier",
    fermoir: "Fermoir coulissant magnétique",
    affichage: "Chiffres en points blancs, anneaux en points blancs et bleus",
    particularite:
      "Deux anneaux de points entourent l'heure et suivent la progression de la journée et de vos pas.",
    ambient: "24 78 104",
    accent: "#7fd4ec",
  },
  {
    slug: "octo-orange",
    coloris: "Orange",
    pastille: "#e8651f",
    family: "octo",
    name: "Octo (1) Orange",
    ref: "PT-O1-OR",
    priceCents: 32900,
    serie: 300,
    stock: 143,
    boitierMatiere: "Titane brut à facettes, vis apparentes",
    bracelet: "Fluoroélastomère orange",
    matiere: "Fluoroélastomère",
    fermoir: "Boucle à ardillon en titane",
    affichage: "Chiffres en points blancs, boussole en points blancs et orange",
    particularite: "Une boussole s'affiche sous l'heure.",
    fonctionPlus: "boussole",
    ambient: "150 66 20",
    accent: "#ff8f4a",
  },
  {
    slug: "ligne-cobalt",
    coloris: "Cobalt",
    pastille: "#1c2f9e",
    family: "ligne",
    name: "Ligne (1) Cobalt",
    ref: "PT-L1-CB",
    priceCents: 14900,
    serie: 500,
    stock: 268,
    boitierMatiere: "Acier brossé",
    bracelet: "Nylon tissé bleu cobalt",
    matiere: "Nylon",
    fermoir: "Passant coulissant en acier",
    affichage: "Chiffres en points blancs, courbe en points bleus",
    particularite:
      "Un capteur affiche votre rythme cardiaque sous l'heure. Les mesures restent dans la montre. Ce n'est pas un dispositif médical.",
    fonctionPlus: "rythme cardiaque",
    boitier: "24 × 56 × 10 mm",
    masse: "28 g, bracelet compris",
    tailleMm: 24,
    ambient: "28 44 130",
    accent: "#8ea6ff",
  },
  {
    slug: "ligne-cristal",
    coloris: "Cristal",
    pastille: "#dfe5e3",
    family: "ligne",
    name: "Ligne (1) Cristal",
    ref: "PT-L1-CR",
    priceCents: 19900,
    serie: 300,
    stock: 156,
    boitierMatiere: "Polycarbonate transparent",
    bracelet: "Fluoroélastomère translucide",
    matiere: "Fluoroélastomère",
    fermoir: "Boucle à ardillon en acier",
    affichage: "Chiffres en points blancs, témoin vert",
    particularite: "Un témoin vert signale que la montre est chargée.",
    ambient: "70 100 74",
    accent: "#b3ec7a",
  },
  {
    slug: "carre-cobalt",
    groupe: "carre",
    coloris: "Cobalt",
    pastille: "#1f3fd0",
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
    particularite: VOYANTS,
    ambient: "20 88 124",
    accent: "#58bdf0",
  },
  {
    slug: "octo-noir",
    groupe: "octo",
    coloris: "Noir",
    pastille: "#17171a",
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
    particularite: VOYANTS,
    ambient: "74 74 84",
    accent: "#c9c9d6",
  },
  {
    slug: "octo-sable",
    groupe: "octo",
    coloris: "Sable",
    pastille: "#cdb07c",
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
    particularite: VOYANTS,
    ambient: "134 108 70",
    accent: "#e2c592",
  },
  {
    slug: "rond-nuit",
    groupe: "rond-index",
    coloris: "Bleu nuit",
    pastille: "#2d5fb8",
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
    affichage: "Aiguilles et index en points blancs et bleus",
    particularite: "Les aiguilles et les index sont dessinés en points lumineux.",
    ambient: "36 58 118",
    accent: "#8fb0f5",
  },
  {
    slug: "parcours-urbain",
    coloris: "Titane",
    pastille: "#b9b8b2",
    family: "parcours",
    name: "Parcours (1) Urbain",
    ref: "PT-P1-UR",
    priceCents: 37900,
    serie: 250,
    stock: 94,
    boitierMatiere: "Titane brossé",
    bracelet: "Maillons en titane brossé",
    matiere: "Titane",
    fermoir: "Boucle déployante",
    affichage: "Heure, chemin et décor en points blancs, point orange",
    particularite: parcours("de ville"),
    fonctionPlus: "parcours de la journée",
    forme: "Carré",
    silhouette: "carre",
    boitier: "42 × 44 × 11 mm",
    masse: "84 g, bracelet compris",
    tailleMm: 42,
    ambient: "84 92 110",
    accent: "#ff9a52",
  },
  {
    slug: "parcours-desert",
    coloris: "Bronze",
    pastille: "#b77a4f",
    family: "parcours",
    name: "Parcours (1) Désert",
    ref: "PT-P1-DS",
    priceCents: 42900,
    serie: 100,
    stock: 37,
    boitierMatiere: "Bronze brossé",
    bracelet: "Cuir de veau grainé marron",
    matiere: "Cuir",
    fermoir: "Boucle à ardillon en bronze",
    affichage: "Heure, chemin et décor en points blancs, point orange",
    particularite: parcours("de désert"),
    fonctionPlus: "parcours de la journée",
    forme: "Tonneau",
    silhouette: "ligne",
    boitier: "38 × 48 × 10 mm",
    masse: "72 g, bracelet compris",
    tailleMm: 38,
    ambient: "150 80 30",
    accent: "#f2b36b",
  },
  {
    slug: "parcours-montagne",
    coloris: "Olive",
    pastille: "#5b6b35",
    family: "parcours",
    name: "Parcours (1) Montagne",
    ref: "PT-P1-MT",
    priceCents: 34900,
    serie: 250,
    stock: 118,
    boitierMatiere: "Aluminium champagne, lunette noire",
    bracelet: "Nylon tissé olive",
    matiere: "Nylon",
    fermoir: "Passant cousu",
    affichage: "Heure, chemin et décor en points blancs, point orange",
    particularite: parcours("de montagne"),
    fonctionPlus: "parcours de la journée",
    forme: "Octogonal",
    silhouette: "octo",
    boitier: "44 × 44 × 12 mm",
    masse: "58 g, bracelet compris",
    tailleMm: 44,
    ambient: "84 96 44",
    accent: "#cdd88e",
  },
  {
    slug: "parcours-foret",
    coloris: "Sauge",
    pastille: "#93a88a",
    family: "parcours",
    name: "Parcours (1) Forêt",
    ref: "PT-P1-FR",
    priceCents: 29900,
    serie: 250,
    stock: 142,
    boitierMatiere: "Polycarbonate fumé",
    bracelet: "Fluoroélastomère côtelé vert sauge",
    matiere: "Fluoroélastomère",
    fermoir: "Boucle à ardillon en acier noirci",
    affichage: "Heure, chemin et décor en points blancs, point orange, rivière en points verts",
    particularite: parcours("de forêt"),
    fonctionPlus: "parcours de la journée",
    forme: "Allongé",
    silhouette: "ligne",
    boitier: "36 × 50 × 10 mm",
    masse: "36 g, bracelet compris",
    tailleMm: 36,
    ambient: "62 92 66",
    accent: "#bcd8ac",
  },
  {
    slug: "parcours-cosmos",
    coloris: "Noir",
    pastille: "#1a1a1d",
    family: "parcours",
    name: "Parcours (1) Cosmos",
    ref: "PT-P1-CS",
    priceCents: 36900,
    serie: 250,
    stock: 103,
    boitierMatiere: "Acier noirci",
    bracelet: "Maille milanaise noire",
    matiere: "Acier",
    fermoir: "Fermoir coulissant magnétique",
    affichage: "Heure, chemin et décor en points blancs, point orange",
    particularite: parcours("de ciel étoilé"),
    fonctionPlus: "parcours de la journée",
    forme: "Rond",
    silhouette: "rond",
    boitier: "42 mm de diamètre, 11 mm d'épaisseur",
    masse: "66 g, bracelet compris",
    tailleMm: 42,
    ambient: "52 40 110",
    accent: "#b9adff",
  },
];

/** Modèle affiché en premier sur l'accueil. */
export const VEDETTE = "carre-noir";

export const strapSizes = ["S 14 – 17 cm", "M 16 – 19 cm", "L 18 – 21 cm"] as const;

export const TVA = 0.2;

export function familyOf(model: Model): Family {
  return families.find((family) => family.id === model.family) ?? families[0];
}

export function tailleOf(model: Model): number {
  return model.tailleMm ?? familyOf(model).tailleMm;
}

export function silhouetteOf(model: Model): FamilyId {
  return model.silhouette ?? model.family;
}

/** Toutes les déclinaisons d'une montre, elle-même comprise. */
export function colorways(model: Model): Model[] {
  if (!model.groupe) return [model];
  return catalogue.filter((item) => item.groupe === model.groupe);
}

export function findModel(slug: string): Model | undefined {
  return catalogue.find((model) => model.slug === slug);
}

/** Ce texte engage le vendeur : les visuels ne sont pas contractuels. */
export function descriptif(model: Model): string {
  const family = familyOf(model);
  return (
    `${model.name} est une montre-bracelet numérique à écran à matrice de points. ` +
    `Son boîtier ${(model.forme ?? family.forme).toLowerCase()} mesure ${model.boitier ?? family.boitier}. ` +
    `Il associe ${model.boitierMatiere.toLowerCase()}, sous un verre saphir plat. ` +
    `La montre indique l'heure et la date, et propose un chronomètre, une alarme et un podomètre. ` +
    `${model.particularite} ` +
    `Elle n'a ni microphone, ni haut-parleur, ni GPS, et ne transmet aucune donnée. ` +
    `Son autonomie est de ${family.autonomie}.`
  );
}

export function specs(model: Model): [string, string][] {
  const family = familyOf(model);
  const fonctions = ["Heure", "date", "chronomètre", "alarme", "podomètre"];
  if (model.fonctionPlus) fonctions.push(model.fonctionPlus);
  return [
    ["Écran", "Matrice de points, verre saphir"],
    ["Affichage", model.affichage],
    ["Boîtier", `${model.boitier ?? family.boitier}. ${model.boitierMatiere}`],
    ["Masse", model.masse ?? family.masse],
    ["Bracelet", `${model.bracelet}, tours de poignet de 14 à 21 cm`],
    ["Fermoir", model.fermoir],
    ["Étanchéité", family.etancheite],
    ["Autonomie", family.autonomie],
    ["Recharge", "Base magnétique USB-C incluse, adaptateur secteur non inclus"],
    ["Fonctions", fonctions.join(", ")],
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
