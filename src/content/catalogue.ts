/**
 * Gamme POINT. Tout le site lit ce fichier : la vitrine, le panier et le
 * récapitulatif affichent donc forcément les mêmes prix et caractéristiques.
 *
 * Chaque modèle a un nom propre. Ses variantes reprennent ce nom, suivi du nom
 * de la variante entre parenthèses : Prisme (Neige). Les noms ne se traduisent pas.
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

export type Lang = "fr" | "en";
export type Text = { fr: string; en: string };

const t = (fr: string, en: string): Text => ({ fr, en });
const same = (value: string): Text => ({ fr: value, en: value });

export type FamilyId = "carre" | "octo" | "rond" | "ligne" | "parcours";

export type Family = {
  id: FamilyId;
  label: Text;
  forme: Text;
  tailleMm: number;
  boitier: Text;
  masse: Text;
  etancheite: Text;
  autonomie: Text;
};

const SPLASH = t("5 ATM : douche et nage en surface", "5 ATM: showering and surface swimming");
const DAYS_30 = t("30 jours en usage courant", "30 days of normal use");

export const families: readonly Family[] = [
  {
    id: "carre",
    label: t("Carré", "Square"),
    forme: t("carré", "square"),
    tailleMm: 40,
    boitier: t("40 × 44 × 11 mm", "40 × 44 × 11 mm"),
    masse: t("46 g, bracelet compris", "46 g including strap"),
    etancheite: SPLASH,
    autonomie: DAYS_30,
  },
  {
    id: "octo",
    label: same("Octo"),
    forme: t("octogonal", "octagonal"),
    tailleMm: 44,
    boitier: t("44 × 44 × 12 mm", "44 × 44 × 12 mm"),
    masse: t("62 g, bracelet compris", "62 g including strap"),
    etancheite: t("10 ATM : natation", "10 ATM: swimming"),
    autonomie: t("45 jours en usage courant", "45 days of normal use"),
  },
  {
    id: "rond",
    label: t("Rond", "Round"),
    forme: t("rond", "round"),
    tailleMm: 42,
    boitier: t("42 mm de diamètre, 11 mm d'épaisseur", "42 mm diameter, 11 mm thick"),
    masse: t("58 g, bracelet compris", "58 g including strap"),
    etancheite: SPLASH,
    autonomie: DAYS_30,
  },
  {
    id: "ligne",
    label: t("Ligne", "Slim"),
    forme: t("allongé", "elongated"),
    tailleMm: 36,
    boitier: t("36 × 50 × 10 mm", "36 × 50 × 10 mm"),
    masse: t("34 g, bracelet compris", "34 g including strap"),
    etancheite: SPLASH,
    autonomie: t("14 jours en usage courant", "14 days of normal use"),
  },
  {
    id: "parcours",
    label: same("Parcours"),
    forme: t("carré", "square"),
    tailleMm: 42,
    boitier: t("42 × 44 × 11 mm", "42 × 44 × 11 mm"),
    masse: t("60 g, bracelet compris", "60 g including strap"),
    etancheite: SPLASH,
    autonomie: DAYS_30,
  },
];

export type Matiere = "Fluoroélastomère" | "Nylon" | "Acier" | "Titane" | "Cuir";

export const matiereLabels: Record<Matiere, Text> = {
  "Fluoroélastomère": t("Fluoroélastomère", "Fluoroelastomer"),
  Nylon: same("Nylon"),
  Acier: t("Acier", "Steel"),
  Titane: t("Titane", "Titanium"),
  Cuir: t("Cuir", "Leather"),
};

export type Model = {
  slug: string;
  /** Regroupe les variantes d'un même modèle. */
  groupe?: string;
  /** Nom de la variante, ou couleur si le modèle n'a pas de variante. */
  coloris: Text;
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
  boitierMatiere: Text;
  bracelet: Text;
  /** Sert au filtre de la collection. */
  matiere: Matiere;
  fermoir: Text;
  /** Ce que montre l'écran, couleurs comprises. */
  affichage: Text;
  /** Phrase propre au modèle, reprise dans le descriptif. */
  particularite: Text;
  /** Fonction ajoutée à la liste commune, si le modèle en a une. */
  fonctionPlus?: Text;
  /** Forme propre au modèle, si elle diffère de sa famille. */
  forme?: Text;
  /** Silhouette utilisée par le filtre « Forme ». */
  silhouette?: Exclude<FamilyId, "parcours">;
  /** Dimensions propres au modèle, si elles diffèrent de sa famille. */
  boitier?: Text;
  masse?: Text;
  tailleMm?: number;
  /** Couleur d'ambiance de la page, en composantes RVB. */
  ambient: string;
  accent: string;
};

const CHIFFRES = t("Chiffres en points blancs", "Numerals in white dots");
const VOYANTS = t(
  "Une colonne de voyants latéraux signale le niveau de charge.",
  "A column of side lights shows the charge level.",
);
const BOUCLE = t("Boucle à ardillon", "Pin buckle");
const TITANE_PASSANT = t("Passant et boucle en titane", "Titanium keeper and buckle");
const DEPLOYANTE = t("Boucle déployante", "Deployant clasp");
const AIMANT = t("Fermoir coulissant magnétique", "Sliding magnetic clasp");
const INDEX = t(
  "Les aiguilles et les index sont dessinés en points lumineux.",
  "The hands and hour markers are drawn in lit dots.",
);

const PARCOURS_ECRAN = t(
  "Heure, chemin et décor en points blancs, point orange",
  "Time, path and scenery in white dots, orange dot",
);
const PARCOURS_FONCTION = t("parcours de la journée", "day path");
const parcours = (fr: string, en: string): Text =>
  t(
    `Un chemin relie A à B, de 00:00 à 23:59, et un point orange y avance au fil de la journée, dans un décor ${fr}. C'est une façon de lire l'heure : la montre ne suit pas votre position.`,
    `A path links A to B, from 00:00 to 23:59, and an orange dot moves along it through the day, in a ${en} setting. It is a way of reading the time: the watch does not track your position.`,
  );

export const catalogue: readonly Model[] = [
  {
    slug: "carre-clair",
    groupe: "prisme",
    coloris: same("Neige"),
    pastille: "#e9e4dc",
    family: "carre",
    name: "Prisme (Neige)",
    ref: "PT-C1-CL",
    priceCents: 24900,
    serie: 500,
    stock: 184,
    boitierMatiere: t("Polycarbonate translucide, châssis en aluminium", "Translucent polycarbonate, aluminium frame"),
    bracelet: t("Fluoroélastomère côtelé blanc", "Ribbed white fluoroelastomer"),
    matiere: "Fluoroélastomère",
    fermoir: BOUCLE,
    affichage: CHIFFRES,
    particularite: VOYANTS,
    ambient: "150 132 112",
    accent: "#e3d3bf",
  },
  {
    slug: "carre-noir",
    groupe: "prisme",
    coloris: same("Encre"),
    pastille: "#1d1d1f",
    family: "carre",
    name: "Prisme (Encre)",
    ref: "PT-C1-NR",
    priceCents: 24900,
    serie: 500,
    stock: 212,
    boitierMatiere: t("Polycarbonate fumé, châssis en aluminium", "Smoked polycarbonate, aluminium frame"),
    bracelet: t("Fluoroélastomère côtelé noir", "Ribbed black fluoroelastomer"),
    matiere: "Fluoroélastomère",
    fermoir: BOUCLE,
    affichage: CHIFFRES,
    particularite: VOYANTS,
    ambient: "134 72 32",
    accent: "#ff9a52",
  },
  {
    slug: "octo-olive",
    groupe: "bastion",
    coloris: same("Maquis"),
    pastille: "#5b6b35",
    family: "octo",
    name: "Bastion (Maquis)",
    ref: "PT-O1-OL",
    priceCents: 29900,
    serie: 300,
    stock: 121,
    boitierMatiere: t("Polycarbonate fumé, cornes et vis en titane", "Smoked polycarbonate, titanium lugs and screws"),
    bracelet: t("Nylon tissé olive", "Woven olive nylon"),
    matiere: "Nylon",
    fermoir: TITANE_PASSANT,
    affichage: CHIFFRES,
    particularite: VOYANTS,
    ambient: "72 90 46",
    accent: "#bfd08c",
  },
  {
    slug: "rond-maille",
    coloris: t("Argent", "Silver"),
    pastille: "#9b9ea3",
    family: "rond",
    name: "Halo",
    ref: "PT-R1-ML",
    priceCents: 32900,
    serie: 150,
    stock: 0,
    boitierMatiere: t("Polycarbonate fumé, cornes en acier", "Smoked polycarbonate, steel lugs"),
    bracelet: t("Maille milanaise en acier", "Steel Milanese mesh"),
    matiere: "Acier",
    fermoir: AIMANT,
    affichage: CHIFFRES,
    particularite: VOYANTS,
    ambient: "96 104 118",
    accent: "#c4cedb",
  },
  {
    slug: "rond-cuivre",
    groupe: "meridien",
    coloris: same("Aurore"),
    pastille: "#c98a5e",
    family: "rond",
    name: "Méridien (Aurore)",
    ref: "PT-R1-CV",
    priceCents: 44900,
    serie: 50,
    stock: 23,
    boitierMatiere: t("Titane brossé, lunette en cuivre", "Brushed titanium, copper bezel"),
    bracelet: t("Maillons en titane brossé", "Brushed titanium links"),
    matiere: "Titane",
    fermoir: DEPLOYANTE,
    affichage: t("Aiguilles et index en points blancs et orange", "Hands and hour markers in white and orange dots"),
    particularite: INDEX,
    ambient: "138 84 52",
    accent: "#dca681",
  },
  {
    slug: "rond-orbite",
    coloris: t("Noir", "Black"),
    pastille: "#1a1a1d",
    family: "rond",
    name: "Orbite",
    ref: "PT-R1-OB",
    priceCents: 34900,
    serie: 150,
    stock: 67,
    boitierMatiere: t("Aluminium anodisé noir", "Black anodised aluminium"),
    bracelet: t("Maille milanaise noire", "Black Milanese mesh"),
    matiere: "Acier",
    fermoir: AIMANT,
    affichage: t("Chiffres en points blancs, anneaux en points blancs et bleus", "Numerals in white dots, rings in white and blue dots"),
    particularite: t(
      "Deux anneaux de points entourent l'heure et suivent la progression de la journée et de vos pas.",
      "Two rings of dots surround the time and follow the progress of your day and your steps.",
    ),
    ambient: "24 78 104",
    accent: "#7fd4ec",
  },
  {
    slug: "octo-orange",
    coloris: same("Orange"),
    pastille: "#e8651f",
    family: "octo",
    name: "Azimut",
    ref: "PT-O1-OR",
    priceCents: 32900,
    serie: 300,
    stock: 143,
    boitierMatiere: t("Titane brut à facettes, vis apparentes", "Faceted raw titanium, exposed screws"),
    bracelet: t("Fluoroélastomère orange", "Orange fluoroelastomer"),
    matiere: "Fluoroélastomère",
    fermoir: t("Boucle à ardillon en titane", "Titanium pin buckle"),
    affichage: t("Chiffres en points blancs, boussole en points blancs et orange", "Numerals in white dots, compass in white and orange dots"),
    particularite: t("Une boussole s'affiche sous l'heure.", "A compass is shown below the time."),
    fonctionPlus: t("boussole", "compass"),
    ambient: "150 66 20",
    accent: "#ff8f4a",
  },
  {
    slug: "ligne-cobalt",
    coloris: same("Cobalt"),
    pastille: "#1c2f9e",
    family: "ligne",
    name: "Pouls",
    ref: "PT-L1-CB",
    priceCents: 14900,
    serie: 500,
    stock: 268,
    boitierMatiere: t("Acier brossé", "Brushed steel"),
    bracelet: t("Nylon tissé bleu cobalt", "Woven cobalt blue nylon"),
    matiere: "Nylon",
    fermoir: t("Passant coulissant en acier", "Sliding steel keeper"),
    affichage: t("Chiffres en points blancs, courbe en points bleus", "Numerals in white dots, curve in blue dots"),
    particularite: t(
      "Un capteur affiche votre rythme cardiaque sous l'heure. Les mesures restent dans la montre. Ce n'est pas un dispositif médical.",
      "A sensor shows your heart rate below the time. Readings stay in the watch. This is not a medical device.",
    ),
    fonctionPlus: t("rythme cardiaque", "heart rate"),
    boitier: t("24 × 56 × 10 mm", "24 × 56 × 10 mm"),
    masse: t("28 g, bracelet compris", "28 g including strap"),
    tailleMm: 24,
    ambient: "28 44 130",
    accent: "#8ea6ff",
  },
  {
    slug: "ligne-cristal",
    coloris: t("Transparent", "Clear"),
    pastille: "#dfe5e3",
    family: "ligne",
    name: "Cristal",
    ref: "PT-L1-CR",
    priceCents: 19900,
    serie: 300,
    stock: 156,
    boitierMatiere: t("Polycarbonate transparent", "Clear polycarbonate"),
    bracelet: t("Fluoroélastomère translucide", "Translucent fluoroelastomer"),
    matiere: "Fluoroélastomère",
    fermoir: t("Boucle à ardillon en acier", "Steel pin buckle"),
    affichage: t("Chiffres en points blancs, témoin vert", "Numerals in white dots, green indicator"),
    particularite: t("Un témoin vert signale que la montre est chargée.", "A green indicator shows that the watch is charged."),
    ambient: "70 100 74",
    accent: "#b3ec7a",
  },
  {
    slug: "carre-cobalt",
    groupe: "prisme",
    coloris: same("Azur"),
    pastille: "#1f3fd0",
    family: "carre",
    name: "Prisme (Azur)",
    ref: "PT-C1-CB",
    priceCents: 26900,
    serie: 250,
    stock: 96,
    boitierMatiere: t("Polycarbonate bleu translucide, châssis en aluminium", "Translucent blue polycarbonate, aluminium frame"),
    bracelet: t("Fluoroélastomère côtelé bleu nuit", "Ribbed midnight blue fluoroelastomer"),
    matiere: "Fluoroélastomère",
    fermoir: BOUCLE,
    affichage: CHIFFRES,
    particularite: VOYANTS,
    ambient: "20 88 124",
    accent: "#58bdf0",
  },
  {
    slug: "octo-noir",
    groupe: "bastion",
    coloris: same("Ombre"),
    pastille: "#17171a",
    family: "octo",
    name: "Bastion (Ombre)",
    ref: "PT-O1-NR",
    priceCents: 29900,
    serie: 300,
    stock: 88,
    boitierMatiere: t("Polycarbonate noir fumé, cornes et vis en titane noirci", "Smoked black polycarbonate, blackened titanium lugs and screws"),
    bracelet: t("Nylon tissé noir", "Woven black nylon"),
    matiere: "Nylon",
    fermoir: t("Passant et boucle en titane noirci", "Blackened titanium keeper and buckle"),
    affichage: CHIFFRES,
    particularite: VOYANTS,
    ambient: "74 74 84",
    accent: "#c9c9d6",
  },
  {
    slug: "octo-sable",
    groupe: "bastion",
    coloris: same("Dune"),
    pastille: "#cdb07c",
    family: "octo",
    name: "Bastion (Dune)",
    ref: "PT-O1-SB",
    priceCents: 29900,
    serie: 300,
    stock: 64,
    boitierMatiere: t("Polycarbonate fumé, cornes et vis en titane", "Smoked polycarbonate, titanium lugs and screws"),
    bracelet: t("Nylon tissé sable", "Woven sand nylon"),
    matiere: "Nylon",
    fermoir: TITANE_PASSANT,
    affichage: CHIFFRES,
    particularite: VOYANTS,
    ambient: "134 108 70",
    accent: "#e2c592",
  },
  {
    slug: "rond-nuit",
    groupe: "meridien",
    coloris: same("Abysse"),
    pastille: "#2d5fb8",
    family: "rond",
    name: "Méridien (Abysse)",
    ref: "PT-R1-NT",
    priceCents: 44900,
    serie: 50,
    stock: 31,
    boitierMatiere: t("Titane noirci, lunette en titane bleui", "Blackened titanium, blued titanium bezel"),
    bracelet: t("Maillons en titane noirci", "Blackened titanium links"),
    matiere: "Titane",
    fermoir: DEPLOYANTE,
    affichage: t("Aiguilles et index en points blancs et bleus", "Hands and hour markers in white and blue dots"),
    particularite: INDEX,
    ambient: "36 58 118",
    accent: "#8fb0f5",
  },
  {
    slug: "parcours-urbain",
    groupe: "parcours",
    coloris: same("Urbain"),
    pastille: "#b9b8b2",
    family: "parcours",
    name: "Parcours (Urbain)",
    ref: "PT-P1-UR",
    priceCents: 37900,
    serie: 250,
    stock: 94,
    boitierMatiere: t("Titane brossé", "Brushed titanium"),
    bracelet: t("Maillons en titane brossé", "Brushed titanium links"),
    matiere: "Titane",
    fermoir: DEPLOYANTE,
    affichage: PARCOURS_ECRAN,
    particularite: parcours("de ville", "city"),
    fonctionPlus: PARCOURS_FONCTION,
    forme: t("carré", "square"),
    silhouette: "carre",
    boitier: t("42 × 44 × 11 mm", "42 × 44 × 11 mm"),
    masse: t("84 g, bracelet compris", "84 g including strap"),
    tailleMm: 42,
    ambient: "84 92 110",
    accent: "#ff9a52",
  },
  {
    slug: "parcours-desert",
    groupe: "parcours",
    coloris: same("Désert"),
    pastille: "#b77a4f",
    family: "parcours",
    name: "Parcours (Désert)",
    ref: "PT-P1-DS",
    priceCents: 42900,
    serie: 100,
    stock: 37,
    boitierMatiere: t("Bronze brossé", "Brushed bronze"),
    bracelet: t("Cuir de veau grainé marron", "Brown grained calf leather"),
    matiere: "Cuir",
    fermoir: t("Boucle à ardillon en bronze", "Bronze pin buckle"),
    affichage: PARCOURS_ECRAN,
    particularite: parcours("de désert", "desert"),
    fonctionPlus: PARCOURS_FONCTION,
    forme: t("tonneau", "tonneau"),
    silhouette: "ligne",
    boitier: t("38 × 48 × 10 mm", "38 × 48 × 10 mm"),
    masse: t("72 g, bracelet compris", "72 g including strap"),
    tailleMm: 38,
    ambient: "150 80 30",
    accent: "#f2b36b",
  },
  {
    slug: "parcours-montagne",
    groupe: "parcours",
    coloris: same("Montagne"),
    pastille: "#5b6b35",
    family: "parcours",
    name: "Parcours (Montagne)",
    ref: "PT-P1-MT",
    priceCents: 34900,
    serie: 250,
    stock: 118,
    boitierMatiere: t("Aluminium champagne, lunette noire", "Champagne aluminium, black bezel"),
    bracelet: t("Nylon tissé olive", "Woven olive nylon"),
    matiere: "Nylon",
    fermoir: t("Passant cousu", "Sewn keeper"),
    affichage: PARCOURS_ECRAN,
    particularite: parcours("de montagne", "mountain"),
    fonctionPlus: PARCOURS_FONCTION,
    forme: t("octogonal", "octagonal"),
    silhouette: "octo",
    boitier: t("44 × 44 × 12 mm", "44 × 44 × 12 mm"),
    masse: t("58 g, bracelet compris", "58 g including strap"),
    tailleMm: 44,
    ambient: "84 96 44",
    accent: "#cdd88e",
  },
  {
    slug: "parcours-foret",
    groupe: "parcours",
    coloris: same("Forêt"),
    pastille: "#93a88a",
    family: "parcours",
    name: "Parcours (Forêt)",
    ref: "PT-P1-FR",
    priceCents: 29900,
    serie: 250,
    stock: 142,
    boitierMatiere: t("Polycarbonate fumé", "Smoked polycarbonate"),
    bracelet: t("Fluoroélastomère côtelé vert sauge", "Ribbed sage green fluoroelastomer"),
    matiere: "Fluoroélastomère",
    fermoir: t("Boucle à ardillon en acier noirci", "Blackened steel pin buckle"),
    affichage: t(
      "Heure, chemin et décor en points blancs, point orange, rivière en points verts",
      "Time, path and scenery in white dots, orange dot, river in green dots",
    ),
    particularite: parcours("de forêt", "forest"),
    fonctionPlus: PARCOURS_FONCTION,
    forme: t("allongé", "elongated"),
    silhouette: "ligne",
    boitier: t("36 × 50 × 10 mm", "36 × 50 × 10 mm"),
    masse: t("36 g, bracelet compris", "36 g including strap"),
    tailleMm: 36,
    ambient: "62 92 66",
    accent: "#bcd8ac",
  },
  {
    slug: "parcours-cosmos",
    groupe: "parcours",
    coloris: same("Cosmos"),
    pastille: "#1a1a1d",
    family: "parcours",
    name: "Parcours (Cosmos)",
    ref: "PT-P1-CS",
    priceCents: 36900,
    serie: 250,
    stock: 103,
    boitierMatiere: t("Acier noirci", "Blackened steel"),
    bracelet: t("Maille milanaise noire", "Black Milanese mesh"),
    matiere: "Acier",
    fermoir: AIMANT,
    affichage: PARCOURS_ECRAN,
    particularite: parcours("de ciel étoilé", "starry sky"),
    fonctionPlus: PARCOURS_FONCTION,
    forme: t("rond", "round"),
    silhouette: "rond",
    boitier: t("42 mm de diamètre, 11 mm d'épaisseur", "42 mm diameter, 11 mm thick"),
    masse: t("66 g, bracelet compris", "66 g including strap"),
    tailleMm: 42,
    ambient: "52 40 110",
    accent: "#b9adff",
  },
];

/** Modèle affiché en premier sur l'accueil. */
export const VEDETTE = "carre-noir";

export const strapSizes = ["S 14 – 17 cm", "M 16 – 19 cm", "L 18 – 21 cm"] as const;

export const TVA = 0.2;

/**
 * Taux indicatif de l'affichage en dollars. POINT ne vend qu'en France et ne
 * facture qu'en euros : le prix en dollars est une simple information.
 */
export const USD_RATE = 1.1;

export function familyOf(model: Model): Family {
  return families.find((family) => family.id === model.family) ?? families[0];
}

export function tailleOf(model: Model): number {
  return model.tailleMm ?? familyOf(model).tailleMm;
}

export function silhouetteOf(model: Model): FamilyId {
  return model.silhouette ?? model.family;
}

/** Toutes les variantes d'un modèle, lui-même compris. */
export function colorways(model: Model): Model[] {
  if (!model.groupe) return [model];
  return catalogue.filter((item) => item.groupe === model.groupe);
}

export function findModel(slug: string): Model | undefined {
  return catalogue.find((model) => model.slug === slug);
}

/** Ce texte engage le vendeur : les visuels ne sont pas contractuels. */
export function descriptif(model: Model, lang: Lang): string {
  const family = familyOf(model);
  const forme = (model.forme ?? family.forme)[lang];
  const boitier = (model.boitier ?? family.boitier)[lang];
  const matiere = model.boitierMatiere[lang].toLowerCase();
  const particularite = model.particularite[lang];
  const autonomie = family.autonomie[lang];

  if (lang === "en") {
    return (
      `${model.name} is a digital wristwatch with a dot matrix display. ` +
      `Its ${forme} case measures ${boitier}. ` +
      `It combines ${matiere}, under a flat sapphire crystal. ` +
      `The watch shows the time and date, and offers a stopwatch, an alarm and a pedometer. ` +
      `${particularite} ` +
      `It has no microphone, speaker or GPS, and transmits no data. ` +
      `Battery life is ${autonomie}.`
    );
  }
  return (
    `${model.name} est une montre-bracelet numérique à écran à matrice de points. ` +
    `Son boîtier ${forme} mesure ${boitier}. ` +
    `Il associe ${matiere}, sous un verre saphir plat. ` +
    `La montre indique l'heure et la date, et propose un chronomètre, une alarme et un podomètre. ` +
    `${particularite} ` +
    `Elle n'a ni microphone, ni haut-parleur, ni GPS, et ne transmet aucune donnée. ` +
    `Son autonomie est de ${autonomie}.`
  );
}

export function specs(model: Model, lang: Lang): [string, string][] {
  const family = familyOf(model);
  const boitier = `${(model.boitier ?? family.boitier)[lang]}. ${model.boitierMatiere[lang]}`;
  const masse = (model.masse ?? family.masse)[lang];

  if (lang === "en") {
    const fonctions = ["Time", "date", "stopwatch", "alarm", "pedometer"];
    if (model.fonctionPlus) fonctions.push(model.fonctionPlus.en);
    return [
      ["Screen", "Dot matrix, sapphire crystal"],
      ["Display", model.affichage.en],
      ["Case", boitier],
      ["Weight", masse],
      ["Strap", `${model.bracelet.en}, wrist sizes 14 to 21 cm`],
      ["Clasp", model.fermoir.en],
      ["Water resistance", family.etancheite.en],
      ["Battery life", family.autonomie.en],
      ["Charging", "Magnetic USB-C base included, wall adapter not included"],
      ["Functions", fonctions.join(", ")],
      ["Connectivity", "None: the watch does not communicate with any device"],
      ["Spare parts", "Available for 7 years after purchase"],
    ];
  }
  const fonctions = ["Heure", "date", "chronomètre", "alarme", "podomètre"];
  if (model.fonctionPlus) fonctions.push(model.fonctionPlus.fr);
  return [
    ["Écran", "Matrice de points, verre saphir"],
    ["Affichage", model.affichage.fr],
    ["Boîtier", boitier],
    ["Masse", masse],
    ["Bracelet", `${model.bracelet.fr}, tours de poignet de 14 à 21 cm`],
    ["Fermoir", model.fermoir.fr],
    ["Étanchéité", family.etancheite.fr],
    ["Autonomie", family.autonomie.fr],
    ["Recharge", "Base magnétique USB-C incluse, adaptateur secteur non inclus"],
    ["Fonctions", fonctions.join(", ")],
    ["Connectivité", "Aucune : la montre ne communique avec aucun appareil"],
    ["Pièces détachées", "Disponibles pendant 7 ans après l'achat"],
  ];
}

export function money(cents: number, currency: "EUR" | "USD", lang: Lang): string {
  return new Intl.NumberFormat(lang === "en" ? "en-GB" : "fr-FR", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(cents / 100);
}

/** Prix en euros, seul montant facturé. */
export function euros(cents: number, lang: Lang = "fr"): string {
  return money(cents, "EUR", lang);
}

/** Part de TVA contenue dans un prix toutes taxes comprises. */
export function tvaCents(ttcCents: number): number {
  return Math.round(ttcCents - ttcCents / (1 + TVA));
}
