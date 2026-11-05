# POINT — Cours CEJM, commerce électronique

Boutique en ligne simulée pour le travail de groupe de CEJM : une marque fictive
de montres numériques, avec le parcours d'achat complet et les mentions
obligatoires du commerce électronique.

**Tout est fictif.** La société, ses identifiants et ses titres de propriété
industrielle sont inventés. Aucune vente n'a lieu, aucun numéro de carte n'est
demandé et les données saisies restent dans le navigateur.

## Démarrer

```bash
npm install
npm run dev
```

Puis <http://localhost:3000>. Autres commandes : `npm run build`, `npm run lint`.

## Pages

| Adresse | Contenu |
| --- | --- |
| `/` | Accueil, carrousel dont l'ambiance suit le modèle |
| `/montres` | Collection avec filtres, par famille |
| `/montres/[slug]` | Fiche produit, descriptif et informations avant commande |
| `/panier` | Panier, TVA et total TTC |
| `/commande` | Coordonnées, vérification, paiement simulé, confirmation |
| `/garantie` | Livraison, rétractation, formulaire type, garanties |
| `/marque` | Marque, brevet, dessins et modèles |
| `/cgv`, `/mentions-legales` | Conditions de vente, mentions et données personnelles |

## Modifier le contenu

- **Modèles, prix, stocks, caractéristiques** : `src/content/catalogue.ts`
- **Identité du vendeur, livraison** : `src/content/vendeur.ts`
- **CGV, garanties, propriété industrielle** : `src/content/legal.ts`

## Images

Déposer une image dans `public/images/` suffit : un modèle marqué « Bientôt » passe
en vente dès que `public/images/<slug>.webp` existe. Les prompts ChatGPT et la liste
des noms attendus sont dans [docs/prompt-images.md](docs/prompt-images.md).

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion, Lenis. Déployé sur
Vercel à chaque push sur `main`.
