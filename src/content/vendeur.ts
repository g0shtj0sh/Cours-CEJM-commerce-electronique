/**
 * Identité du vendeur, reprise par les mentions légales et les CGV.
 *
 * POINT SAS est fictive (projet de cours). Le SIREN a volontairement une
 * clé invalide et le téléphone appartient à la plage réservée à la fiction
 * par l'Arcep : aucun ne peut désigner une vraie entreprise ou personne.
 * Seul l'hébergeur est réel, puisque le site est bien hébergé chez lui.
 */
export const vendeur = {
  denomination: "POINT SAS",
  formeJuridique: "Société par actions simplifiée",
  capital: "50 000 €",
  siege: "12 rue des Cadrans, 59000 Lille, France",
  rcs: "RCS Lille 912 345 678",
  tva: "FR 74 912345678",
  telephone: "03 53 01 20 01",
  telephoneLien: "+33353012001",
  horaires: "du lundi au vendredi, de 9 h à 18 h, appel non surtaxé",
  email: "contact@point-montres.example",
  directeurPublication: "Camille Rousseau, présidente",
  hebergeur: {
    nom: "Vercel Inc.",
    adresse: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    telephone: "+1 559 288 7060",
  },
  mediateur: {
    nom: "Médiation Commerce Nord",
    adresse: "3 place des Accords, 59000 Lille",
  },
} as const;

export const livraison = {
  transporteur: "Colissimo suivi",
  zone: "France métropolitaine",
  delai: "3 à 5 jours ouvrés",
} as const;

export const garantie = { conformite: "2 ans", commerciale: "3 ans" } as const;
