import { euros, tvaCents, type Lang } from "@/content/catalogue";
import {
  cgvEn,
  encadreGarantieEn,
  exceptionsRetractationEn,
  precontractuelEn,
  proprieteIndustrielleEn,
} from "@/content/legal-en";
import { garantie, livraison, vendeur } from "@/content/vendeur";

const { delai, transporteur, zone } = livraison;

/** Présentées avant la commande, puis répétées dans le récapitulatif. */
export function precontractuel(totalCents: number) {
  return [
    [
      "Prix total",
      `${euros(totalCents)} toutes taxes comprises, dont ${euros(tvaCents(totalCents))} de TVA à 20 %. Livraison incluse : aucun autre frais n'est dû.`,
    ],
    ["Paiement", "Par carte bancaire, avec authentification forte auprès de votre banque."],
    ["Livraison", `${transporteur}, en ${zone}, sous ${delai}.`],
    [
      "Rétractation",
      "14 jours à compter de la réception, sans motif et sans pénalité. Le retour est à notre charge. Remboursement au plus tard 14 jours après votre demande.",
    ],
    [
      "Garanties",
      `Garantie légale de conformité de ${garantie.conformite}, garantie légale des vices cachés et garantie commerciale de ${garantie.commerciale}.`,
    ],
    ["Vendeur", `${vendeur.denomination}, ${vendeur.siege}. Téléphone : ${vendeur.telephone}.`],
    ["Litiges", `Recours gratuit à ${vendeur.mediateur.nom}, médiateur de la consommation.`],
  ] as const;
}

/** Cas prévus par l'article L221-28. Aucun ne concerne ces montres. */
export const exceptionsRetractation = [
  "Biens confectionnés selon vos spécifications ou nettement personnalisés",
  "Biens susceptibles de se détériorer ou de se périmer rapidement",
  "Biens descellés après livraison et qui ne peuvent être renvoyés pour des raisons d'hygiène ou de protection de la santé",
  "Enregistrements audio ou vidéo et logiciels descellés après livraison",
  "Journaux, périodiques et magazines, hors abonnement",
] as const;

export const cgv = [
  [
    "Objet et champ d'application",
    "Les présentes conditions régissent la vente en ligne des montres POINT par POINT SAS à des consommateurs, c'est-à-dire des personnes physiques qui achètent à un vendeur professionnel à des fins étrangères à leur activité professionnelle. Le site est proposé en français et, par courtoisie, en anglais. Les livraisons sont limitées à la France métropolitaine : le droit français s'applique, quelle que soit la langue choisie.",
  ],
  [
    "Capacité",
    "Pour commander, le client déclare être majeur et capable de contracter, ou agir avec l'accord de ses représentants légaux.",
  ],
  [
    "Langue et devise",
    "Le contrat est conclu en français : la version anglaise du site est une traduction de courtoisie et la version française fait foi. Les prix en dollars sont indicatifs, au taux fixe de 1 euro pour 1,10 dollar. Seul le prix en euros est facturé.",
  ],
  [
    "Produit",
    "Les montres POINT sont des produits licites, en vente libre en France, portant le marquage CE. Leurs caractéristiques essentielles figurent sur chaque fiche produit.",
  ],
  [
    "Offre",
    "L'offre engage POINT SAS tant qu'elle est accessible en ligne, dans la limite des stocks affichés. Le descriptif détaillé de chaque fiche produit fait foi : les visuels sont non contractuels.",
  ],
  [
    "Formation du contrat",
    "Le contrat se forme en deux clics. Premier clic : le client demande à vérifier sa commande, voit son détail et son prix total, et peut corriger ses erreurs. Second clic : il confirme en cliquant sur « Commander avec obligation de paiement », après avoir accepté les présentes conditions. POINT SAS accuse réception de la commande sans délai injustifié et en adresse la confirmation sur support durable.",
  ],
  [
    "Prix",
    `Les prix sont indiqués en euros toutes taxes comprises, TVA française de 20 % incluse. Ils incluent les frais de livraison en ${zone}.`,
  ],
  [
    "Paiement",
    "Le paiement s'effectue par carte bancaire, avec authentification forte. Le compte est débité au moment de la commande.",
  ],
  [
    "Livraison",
    `Les montres sont livrées par ${transporteur} sous ${delai}, et au plus tard 30 jours après la commande. En cas de retard, le client peut enjoindre POINT SAS de livrer dans un délai raisonnable, puis résoudre le contrat si la livraison n'intervient pas. Le risque de perte ou de détérioration passe au client lorsqu'il prend physiquement possession du bien.`,
  ],
  [
    "Droit de rétractation",
    "La vente ayant lieu à distance, le client dispose de 14 jours à compter de la réception pour se rétracter, sans motif ni pénalité, à l'aide du formulaire type ou de toute déclaration dénuée d'ambiguïté. Il renvoie la montre dans les 14 jours suivant sa décision, aux frais de POINT SAS. Le remboursement intervient au plus tard 14 jours après que POINT SAS a été informée de la rétractation, par le même moyen de paiement sauf accord contraire. Il peut être différé jusqu'à la récupération du bien ou la preuve de son expédition.",
  ],
  [
    "Garantie commerciale",
    `POINT SAS garantit ses montres contre tout défaut de fabrication pendant ${garantie.commerciale} à compter de la livraison, par réparation ou remplacement gratuit. Cette garantie s'ajoute aux garanties légales et ne les remplace pas. Pour la mettre en œuvre, appelez le ${vendeur.telephone}.`,
  ],
  [
    "Données personnelles",
    "Les données de commande sont traitées pour exécuter la vente. La politique complète figure dans les mentions légales.",
  ],
  [
    "Médiation et litiges",
    `En cas de litige, le client contacte d'abord le service client. À défaut d'accord, il peut saisir gratuitement ${vendeur.mediateur.nom}, ${vendeur.mediateur.adresse}, sans préjudice d'une action devant les tribunaux français.`,
  ],
] as const;

/** Texte imposé mot pour mot : annexe A à l'article D. 211-2 du Code de la consommation. */
export const encadreGarantie = [
  "Le consommateur dispose d'un délai de deux ans à compter de la délivrance du bien pour obtenir la mise en œuvre de la garantie légale de conformité en cas d'apparition d'un défaut de conformité. Durant ce délai, le consommateur n'est tenu d'établir que l'existence du défaut de conformité et non la date d'apparition de celui-ci.",
  "Lorsque le contrat de vente du bien prévoit la fourniture d'un contenu numérique ou d'un service numérique de manière continue pendant une durée supérieure à deux ans, la garantie légale est applicable à ce contenu numérique ou ce service numérique tout au long de la période de fourniture prévue. Durant ce délai, le consommateur n'est tenu d'établir que l'existence du défaut de conformité affectant le contenu numérique ou le service numérique et non la date d'apparition de celui-ci.",
  "La garantie légale de conformité emporte obligation pour le professionnel, le cas échéant, de fournir toutes les mises à jour nécessaires au maintien de la conformité du bien.",
  "La garantie légale de conformité donne au consommateur droit à la réparation ou au remplacement du bien dans un délai de trente jours suivant sa demande, sans frais et sans inconvénient majeur pour lui.",
  "Si le bien est réparé dans le cadre de la garantie légale de conformité, le consommateur bénéficie d'une extension de six mois de la garantie initiale.",
  "Si le consommateur demande la réparation du bien, mais que le vendeur impose le remplacement, la garantie légale de conformité est renouvelée pour une période de deux ans à compter de la date de remplacement du bien.",
  "Le consommateur peut obtenir une réduction du prix d'achat en conservant le bien ou mettre fin au contrat en se faisant rembourser intégralement contre restitution du bien, si :",
  "1° Le professionnel refuse de réparer ou de remplacer le bien ;",
  "2° La réparation ou le remplacement du bien intervient après un délai de trente jours ;",
  "3° La réparation ou le remplacement du bien occasionne un inconvénient majeur pour le consommateur, notamment lorsque le consommateur supporte définitivement les frais de reprise ou d'enlèvement du bien non conforme, ou s'il supporte les frais d'installation du bien réparé ou de remplacement ;",
  "4° La non-conformité du bien persiste en dépit de la tentative de mise en conformité du vendeur restée infructueuse.",
  "Le consommateur a également droit à une réduction du prix du bien ou à la résolution du contrat lorsque le défaut de conformité est si grave qu'il justifie que la réduction du prix ou la résolution du contrat soit immédiate. Le consommateur n'est alors pas tenu de demander la réparation ou le remplacement du bien au préalable.",
  "Le consommateur n'a pas droit à la résolution de la vente si le défaut de conformité est mineur.",
  "Toute période d'immobilisation du bien en vue de sa réparation ou de son remplacement suspend la garantie qui restait à courir jusqu'à la délivrance du bien remis en état.",
  "Les droits mentionnés ci-dessus résultent de l'application des articles L. 217-1 à L. 217-32 du code de la consommation.",
  "Le vendeur qui fait obstacle de mauvaise foi à la mise en œuvre de la garantie légale de conformité encourt une amende civile d'un montant maximal de 300 000 euros, qui peut être porté jusqu'à 10 % du chiffre d'affaires moyen annuel (article L. 241-5 du code de la consommation).",
  "Le consommateur bénéficie également de la garantie légale des vices cachés en application des articles 1641 à 1649 du code civil, pendant une durée de deux ans à compter de la découverte du défaut. Cette garantie donne droit à une réduction de prix si le bien est conservé ou à un remboursement intégral contre restitution du bien.",
] as const;

/** Titres fictifs, cohérents avec les règles de la propriété industrielle. */
export const proprieteIndustrielle = [
  {
    titre: "Marque POINT®",
    numero: "Dépôt INPI n° 26 5 000 001",
    texte:
      "Enregistrée en France pour les montres (classe 14) et la vente en ligne (classe 35), pour 10 ans renouvelables sans limite. Le nom est distinctif : il ne désigne ni le produit ni l'une de ses caractéristiques essentielles. Le dépôt à l'INPI a suivi une recherche d'antériorités, pour vérifier que le nom était libre. Le symbole ® signale une marque enregistrée. Seuls ces produits et services sont protégés.",
  },
  {
    titre: "Brevet d'invention",
    numero: "Demande FR 26 00001",
    texte:
      "Porte sur le pilotage de l'écran par zones, qui n'alimente que les points allumés pour prolonger l'autonomie. Une invention est brevetable si elle est nouvelle, implique une activité inventive et peut être appliquée industriellement. Durée maximale : 20 ans.",
  },
  {
    titre: "Dessins et modèles",
    numero: "Dépôt INPI n° 26 0001",
    texte:
      "Protègent l'apparence des boîtiers Carré, Octo, Rond, Ligne et Tonneau, pour 5 ans renouvelables par périodes de 5 ans, jusqu'à 25 ans.",
  },
] as const;

/** Textes légaux dans la langue choisie. L'anglais est une traduction de courtoisie. */
export function legalContent(lang: Lang) {
  if (lang === "en") {
    return {
      precontractuel: precontractuelEn,
      exceptions: exceptionsRetractationEn,
      cgv: cgvEn,
      encadre: encadreGarantieEn,
      propriete: proprieteIndustrielleEn,
      delayText: "3 to 5 working days",
    };
  }
  return {
    precontractuel,
    exceptions: exceptionsRetractation,
    cgv,
    encadre: encadreGarantie,
    propriete: proprieteIndustrielle,
    delayText: delai,
  };
}
