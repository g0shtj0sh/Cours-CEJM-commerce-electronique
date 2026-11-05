# Cours CEJM — Commerce électronique

Site vitrine d'un produit, avec objet 3D interactif, doublé d'un volet
pédagogique sur le commerce électronique (cadre juridique, modèles
d'affaires, données personnelles).

Le produit présenté — **Timbre 03**, une radio portable — est fictif.
Aucune vente n'est proposée et le bloc de commande ne traite aucun
paiement : il sert à illustrer la règle du « double clic ».

## Stack

| Couche | Choix |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), TypeScript |
| Styles | Tailwind CSS v4, tokens déclarés dans `globals.css` |
| 3D | React Three Fiber 9, drei, postprocessing (bloom) |
| Animation | Motion (wordmark), Lenis (défilement lissé) |
| Hébergement | Vercel |

## Démarrer

```bash
npm install
npm run dev
```

Puis <http://localhost:3000>.

Autres commandes : `npm run build`, `npm run lint`, `npx tsc --noEmit`.

## Organisation

```
src/
  app/
    globals.css          système de design (couleurs, type, filets)
    layout.tsx           police Archivo, défilement lissé
    page.tsx             composition de la page
  content/
    product.ts           fiche produit — tout le site lit ce fichier
    cejm.ts              contenu du cours
  components/
    three/
      ProductStage.tsx   Canvas, éclairage, cadrage, bloom
      ProductModel.tsx   chargement du .glb, finitions, animation d'entrée
    sections/            Hero, Specs, NightPanel, Cejm, Order
public/
  models/radio.glb       modèle 3D optimisé (190 Ko)
```

## Changer de produit

Tout passe par `src/content/product.ts` : nom, prix, fiche technique,
finitions et chemin du modèle. Aucun composant ne contient de donnée
produit en dur.

Pour remplacer le modèle 3D, déposer un `.glb` dans `public/models/`,
mettre à jour `model.src`, puis ajuster `model.scale` (le cadrage de la
caméra, lui, s'adapte tout seul à la forme du conteneur).

Un modèle brut pèse souvent plusieurs mégaoctets. Pour l'alléger :

```bash
npx @gltf-transform/cli optimize entree.glb public/models/radio.glb --texture-compress webp --texture-size 1024 --compress meshopt
```

C'est ce qui a ramené le modèle actuel de 10,6 Mo à 190 Ko, textures PBR
comprises.

## Parti pris de design

Référence visuelle : une façade d'ampli hi-fi sérigraphiée. Aucun
arrondi, aucune ombre portée — la profondeur vient de filets d'un pixel
et du contraste de valeur. Une seule famille typographique, Archivo,
exploitée sur son axe de largeur : très large pour le wordmark, normale
pour le texte, condensée pour les données techniques. Le seul élément
aux formes souples de la page est l'objet 3D.

## Crédits

Modèle 3D [Boom Box](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/BoomBox)
par Microsoft, [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
(domaine public).
