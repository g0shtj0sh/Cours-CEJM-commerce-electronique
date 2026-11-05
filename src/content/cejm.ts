/**
 * Volet pédagogique CEJM — le commerce électronique.
 *
 * Le site vitrine sert de cas pratique : chaque étape du parcours d'achat
 * ci-dessous est effectivement illustrée par un bloc de la page.
 */

/** Le parcours d'achat est une vraie séquence : il est donc numéroté. */
export const parcours = [
  {
    titre: "Information précontractuelle",
    texte:
      "Avant toute commande, le vendeur affiche les caractéristiques essentielles du bien, " +
      "le prix toutes taxes comprises, les frais de livraison, la date ou le délai de livraison, " +
      "l'identité du vendeur et l'existence des garanties légales. Une information manquante " +
      "est opposable au professionnel.",
    source: "Code de la consommation, art. L111-1 et L221-5",
  },
  {
    titre: "Commande et formation du contrat",
    texte:
      "Le contrat électronique n'est formé qu'après que l'acheteur a pu vérifier le détail de sa " +
      "commande et son prix total, puis corriger d'éventuelles erreurs, avant de la confirmer. " +
      "C'est la règle dite du « double clic » : le premier valide le panier, le second engage.",
    source: "Code civil, art. 1127-1 et 1127-2 ; LCEN du 21 juin 2004",
  },
  {
    titre: "Paiement et authentification forte",
    texte:
      "Depuis la deuxième directive sur les services de paiement, le paiement en ligne exige une " +
      "authentification à deux facteurs parmi trois catégories : ce que le client sait, ce qu'il " +
      "possède, ce qu'il est. En pratique, validation dans l'application bancaire plutôt que " +
      "simple code reçu par SMS.",
    source: "Directive (UE) 2015/2366 (DSP2), authentification forte obligatoire depuis 2019",
  },
  {
    titre: "Accusé de réception",
    texte:
      "Le vendeur confirme la commande par voie électronique sans délai injustifié et fournit un " +
      "récapitulatif sur support durable. Ce document fait preuve du contenu du contrat.",
    source: "Code de la consommation, art. L221-13",
  },
  {
    titre: "Livraison et transfert des risques",
    texte:
      "À défaut de délai indiqué, le bien est livré au plus tard trente jours après la conclusion " +
      "du contrat. Le risque de perte ou de détérioration ne passe au consommateur qu'à la prise " +
      "de possession physique du bien : un colis perdu par le transporteur reste à la charge du vendeur.",
    source: "Code de la consommation, art. L216-1 et L216-4",
  },
  {
    titre: "Droit de rétractation",
    texte:
      "L'acheteur dispose de quatorze jours à compter de la réception pour se rétracter sans motif " +
      "ni pénalité. Le vendeur rembourse sous quatorze jours après avoir été informé, frais de " +
      "livraison aller inclus. Les frais de retour peuvent rester à la charge du client si " +
      "l'information a été donnée avant la commande.",
    source: "Code de la consommation, art. L221-18 à L221-25",
  },
  {
    titre: "Garanties après l'achat",
    texte:
      "La garantie légale de conformité couvre deux ans ; pendant ces vingt-quatre mois, tout défaut " +
      "est présumé exister depuis la livraison, c'est au vendeur de prouver le contraire. S'y ajoute " +
      "la garantie des vices cachés, et éventuellement une garantie commerciale, qui ne peut jamais " +
      "réduire les deux premières.",
    source: "Code de la consommation, art. L217-3 et suivants ; Code civil, art. 1641",
  },
] as const;

/** Repères de cours, hors séquence : panneaux de référence. */
export const reperes = [
  {
    titre: "Les modèles d'affaires",
    entrees: [
      ["B to C", "L'entreprise vend au particulier. C'est le cas de cette page."],
      ["B to B", "Vente entre professionnels : prix hors taxes, conditions négociées, volumes."],
      ["C to C", "Particuliers entre eux, via une plateforme qui prélève une commission."],
      [
        "Place de marché",
        "La plateforme n'est pas vendeuse : elle met en relation et héberge. Le régime de responsabilité diffère.",
      ],
      [
        "Dropshipping",
        "Le vendeur n'a pas de stock ; le fournisseur expédie. Le vendeur reste pourtant seul responsable envers l'acheteur.",
      ],
      [
        "Abonnement",
        "Revenu récurrent et prévisible, en échange d'un droit de résiliation facilité par la loi.",
      ],
    ],
  },
  {
    titre: "Ce que le numérique change à l'économie",
    entrees: [
      [
        "Coûts de transaction",
        "Chercher, comparer et contracter coûte moins cher en ligne. Ronald Coase expliquait la taille des entreprises par ces coûts : les réduire redessine les frontières du marché.",
      ],
      [
        "Désintermédiation",
        "Le producteur atteint le client sans grossiste ni détaillant. Mais de nouveaux intermédiaires apparaissent aussitôt — moteurs de recherche, places de marché, comparateurs.",
      ],
      [
        "Effets de réseau",
        "La valeur d'une plateforme croît avec son nombre d'utilisateurs. Sur un marché biface, acheteurs et vendeurs s'attirent mutuellement, ce qui mène à la concentration.",
      ],
      [
        "Longue traîne",
        "Le stock illimité rend rentable la vente de références peu demandées. Le cumul des produits de niche peut dépasser celui des best-sellers.",
      ],
      [
        "Asymétrie d'information",
        "L'acheteur ne touche pas le produit. Avis, notes et retours gratuits servent à rétablir la confiance — et deviennent eux-mêmes un enjeu de régulation.",
      ],
    ],
  },
  {
    titre: "Données personnelles",
    entrees: [
      [
        "Base légale",
        "Tout traitement repose sur l'une des six bases du règlement : consentement, contrat, obligation légale, intérêt vital, mission d'intérêt public, intérêt légitime.",
      ],
      [
        "Consentement",
        "Libre, spécifique, éclairé et univoque. Le silence ou une case précochée ne valent pas consentement.",
      ],
      [
        "Traceurs",
        "Les cookies non essentiels exigent un accord préalable. Refuser doit être aussi simple qu'accepter : un bouton « tout refuser » au même niveau que « tout accepter ».",
      ],
      [
        "Droits de la personne",
        "Accès, rectification, effacement, limitation, portabilité, opposition. Réponse due sous un mois.",
      ],
      [
        "Sanctions",
        "Jusqu'à 20 millions d'euros ou 4 % du chiffre d'affaires mondial, le montant le plus élevé étant retenu.",
      ],
    ],
    source: "Règlement (UE) 2016/679 (RGPD) ; loi Informatique et Libertés, art. 82",
  },
  {
    titre: "Obligations du site lui-même",
    entrees: [
      [
        "Mentions légales",
        "Identité et coordonnées de l'éditeur, numéro d'immatriculation, nom de l'hébergeur. Leur absence est un délit.",
      ],
      [
        "Conditions générales de vente",
        "Opposables seulement si l'acheteur a pu en prendre connaissance avant de commander.",
      ],
      [
        "Médiation de la consommation",
        "Tout professionnel vendant à des particuliers doit désigner un médiateur et en indiquer les coordonnées.",
      ],
      [
        "Territorialité de la TVA",
        "Pour les ventes à distance dans l'Union, la taxe est due au taux du pays du consommateur au-delà de 10 000 € de ventes annuelles, déclarée par le guichet unique depuis juillet 2021.",
      ],
    ],
    source: "LCEN, art. 6 ; Code de la consommation, art. L616-1",
  },
  {
    titre: "Les limites du modèle",
    entrees: [
      [
        "Dépendance",
        "Acquérir ses clients par la publicité ou une place de marché, c'est louer sa clientèle : la marge part en commissions et en enchères.",
      ],
      [
        "Dernier kilomètre",
        "Le poste logistique le plus coûteux et le plus émetteur, pour une livraison souvent annoncée gratuite.",
      ],
      [
        "Retours",
        "Le droit de rétractation est un coût réel : manutention, reconditionnement, invendus. Il pousse à mieux décrire le produit en amont.",
      ],
      [
        "Cybersécurité",
        "Une fuite de base clients engage la responsabilité du vendeur et doit être notifiée sous soixante-douze heures.",
      ],
      [
        "Concurrence par le prix",
        "La comparaison instantanée comprime les marges et favorise ceux qui tiennent sur les volumes.",
      ],
    ],
  },
] as const;
