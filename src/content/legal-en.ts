import { euros, tvaCents } from "@/content/catalogue";
import { garantie, livraison, vendeur } from "@/content/vendeur";

/** Traduction de courtoisie : la version française fait foi. */

const { delai } = livraison;
const delaiEn = delai.replace("à", "to").replace("jours ouvrés", "working days");

export function precontractuelEn(totalCents: number) {
  return [
    [
      "Total price",
      `${euros(totalCents, "en")} including VAT, of which ${euros(tvaCents(totalCents), "en")} is 20% VAT. Delivery included: no other charges apply.`,
    ],
    ["Payment", "By bank card, with strong authentication by your bank."],
    ["Delivery", `${livraison.transporteur}, to mainland France, within ${delaiEn}.`],
    ["Withdrawal", "14 days from receipt, with no reason needed and no penalty. Return shipping is on us. Refund no later than 14 days after your request."],
    [
      "Guarantees",
      `2-year legal guarantee of conformity, legal guarantee against hidden defects and ${garantie.commerciale.replace(" ans", "-year")} commercial warranty.`,
    ],
    ["Seller", `${vendeur.denomination}, ${vendeur.siege}. Phone: ${vendeur.telephone}.`],
    ["Disputes", `Free recourse to ${vendeur.mediateur.nom}, consumer mediator.`],
  ] as const;
}

export const exceptionsRetractationEn = [
  "Goods made to your specifications or clearly personalised",
  "Goods liable to deteriorate or expire rapidly",
  "Goods unsealed after delivery that cannot be returned for hygiene or health protection reasons",
  "Audio or video recordings and software unsealed after delivery",
  "Newspapers, periodicals and magazines, except subscriptions",
] as const;

export const cgvEn = [
  [
    "Purpose and scope",
    "These terms govern the online sale of POINT watches by POINT SAS to consumers, meaning individuals buying from a professional seller for purposes outside their professional activity. This site is offered in French and, as a courtesy, in English. Deliveries are limited to mainland France and French law applies, whichever language is chosen.",
  ],
  [
    "Capacity",
    "To order, the customer declares being of legal age and able to enter into a contract, or acting with the consent of their legal representatives.",
  ],
  [
    "Language and currency",
    "The contract is concluded in French: this English version is a courtesy translation and the French version prevails. Prices in dollars are indicative only, at a fixed rate of 1 euro to 1.10 dollars. Only the price in euros is billed.",
  ],
  [
    "Product",
    "POINT watches are lawful products, freely sold in France and CE marked. Their essential characteristics are set out on each product page.",
  ],
  [
    "Offer",
    "The offer binds POINT SAS for as long as it is available online, while displayed stocks last. The detailed description on each product page is binding: images are for illustration only.",
  ],
  [
    "Formation of the contract",
    "The contract is formed in two clicks. First click: the customer asks to review the order, sees its details and total price, and may correct any errors. Second click: the customer confirms by clicking « Order with obligation to pay », after accepting these terms. POINT SAS acknowledges receipt of the order without undue delay and sends confirmation on a durable medium.",
  ],
  [
    "Prices",
    "Prices are in euros including VAT, with French VAT of 20% included. They include delivery to mainland France.",
  ],
  [
    "Payment",
    "Payment is by bank card, with strong authentication. The account is debited when the order is placed.",
  ],
  [
    "Delivery",
    `Watches are delivered by ${livraison.transporteur} within ${delaiEn}, and no later than 30 days after the order. In the event of delay, the customer may require POINT SAS to deliver within a reasonable time, then terminate the contract if delivery does not take place. The risk of loss or damage passes to the customer on taking physical possession of the goods.`,
  ],
  [
    "Right of withdrawal",
    "As this is a distance sale, the customer has 14 days from receipt to withdraw, with no reason and no penalty, using the model form or any unambiguous statement. The customer returns the watch within 14 days of the decision, at the expense of POINT SAS. Reimbursement takes place no later than 14 days after POINT SAS is informed of the withdrawal, using the same means of payment unless otherwise agreed. It may be withheld until the goods are recovered or proof of shipment is supplied.",
  ],
  [
    "Commercial warranty",
    `POINT SAS warrants its watches against manufacturing defects for 3 years from delivery, through free repair or replacement. This warranty is in addition to the legal guarantees and does not replace them. To use it, call ${vendeur.telephone}.`,
  ],
  [
    "Personal data",
    "Order data is processed to carry out the sale. The full policy is set out in the legal notice.",
  ],
  [
    "Mediation and disputes",
    `In the event of a dispute, the customer first contacts customer service. Failing agreement, the customer may refer the matter free of charge to ${vendeur.mediateur.nom}, ${vendeur.mediateur.adresse}, without prejudice to action before the French courts.`,
  ],
] as const;

export const encadreGarantieEn = [
  "This is a courtesy translation of the notice required by French law (annex A to article D. 211-2 of the Consumer Code). The French text prevails.",
  "The consumer has two years from delivery of the goods to enforce the legal guarantee of conformity if a lack of conformity appears. During this period, the consumer need only establish that the lack of conformity exists, not when it appeared.",
  "Where the sales contract provides for digital content or a digital service to be supplied continuously for more than two years, the legal guarantee applies to that content or service throughout the supply period. During this period, the consumer need only establish that the lack of conformity exists, not when it appeared.",
  "The legal guarantee of conformity requires the professional, where applicable, to supply all updates needed to keep the goods in conformity.",
  "The legal guarantee of conformity entitles the consumer to repair or replacement of the goods within thirty days of the request, free of charge and without major inconvenience.",
  "If the goods are repaired under the legal guarantee of conformity, the consumer benefits from a six-month extension of the initial guarantee.",
  "If the consumer asks for repair but the seller imposes replacement, the legal guarantee of conformity is renewed for two years from the date of replacement.",
  "The consumer may obtain a price reduction while keeping the goods, or end the contract and be fully reimbursed against return of the goods, if:",
  "1. The professional refuses to repair or replace the goods;",
  "2. Repair or replacement takes place after thirty days;",
  "3. Repair or replacement causes major inconvenience to the consumer, in particular where the consumer permanently bears the cost of taking back or removing the non-conforming goods, or the cost of installing the repaired or replacement goods;",
  "4. The lack of conformity persists despite the seller's unsuccessful attempt to bring the goods into conformity.",
  "The consumer is also entitled to a price reduction or termination of the contract where the lack of conformity is so serious that immediate reduction or termination is justified. The consumer need not first ask for repair or replacement.",
  "The consumer is not entitled to termination of the sale if the lack of conformity is minor.",
  "Any period during which the goods are immobilised for repair or replacement suspends the remaining guarantee until the goods are delivered back in working order.",
  "These rights result from articles L. 217-1 to L. 217-32 of the French Consumer Code.",
  "A seller who obstructs the legal guarantee of conformity in bad faith is liable to a civil fine of up to 300,000 euros, which may be raised to 10% of average annual turnover (article L. 241-5 of the Consumer Code).",
  "The consumer also benefits from the legal guarantee against hidden defects under articles 1641 to 1649 of the French Civil Code, for two years from discovery of the defect. This guarantee entitles the consumer to a price reduction if the goods are kept, or to a full refund against return of the goods.",
] as const;

export const proprieteIndustrielleEn = [
  {
    titre: "POINT® trademark",
    numero: "INPI filing no. 26 5 000 001",
    texte:
      "Registered in France for watches (class 14) and online sales (class 35), for 10 years, renewable without limit. The name is distinctive: it describes neither the product nor one of its essential characteristics. It was filed with the INPI after a prior-rights search, to check that the name was free. The ® symbol marks a registered trademark. Only these goods and services are protected.",
  },
  {
    titre: "Patent",
    numero: "Application FR 26 00001",
    texte:
      "Covers driving the display by zones, powering only the lit dots to extend battery life. An invention is patentable if it is new, involves an inventive step and is capable of industrial application. Maximum term: 20 years.",
  },
  {
    titre: "Registered designs",
    numero: "INPI filing no. 26 0001",
    texte:
      "Protect the appearance of the Square, Octo, Round, Slim and Tonneau cases, for 5 years, renewable in 5-year periods, up to 25 years.",
  },
] as const;
