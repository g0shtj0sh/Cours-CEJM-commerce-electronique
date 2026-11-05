# Prompts pour générer les images POINT avec ChatGPT

**Où on en est :** les 18 montres et les 3 cartes de l'accueil sont en place. Il reste
seulement, en option, les mises en scène d'Octo Noir et de Rond Nuit (bloc 4).

Dans ChatGPT, joins **ton image de la page sombre** et **tes images de montres**
(toutes celles que tu as déjà), puis colle
le bloc 1. Envoie ensuite les blocs 2, 3 et 4 un par un, dans la même conversation.

Dépose chaque fichier dans `public/images/`, avec exactement le nom indiqué.
Le site détecte l'image tout seul : un modèle marqué « Bientôt » passe en vente
dès que son image est présente. Il suffit ensuite de pousser le code.

ChatGPT donne souvent des PNG. Convertis-les en `.webp`, ou dis-moi quand ils sont
prêts et je m'en occupe (détourage, retouche, conversion).

---

## Bloc 1 — Les règles communes (à coller en premier)

```text
Je crée le site d'une marque fictive de montres numériques appelée POINT.
Tu vois en pièces jointes la page de référence et mes montres actuelles.

Pour TOUTES les images de cette conversation :
- Rendu produit photoréaliste, qualité studio, très haute définition.
- Même style de montre que mes pièces jointes : boîtier translucide laissant
  voir les pièces internes, vis cruciformes apparentes, disques métalliques
  guillochés, couronne moletée, petit bouton orange sur le flanc droit, et
  colonne de voyants blancs sur le flanc gauche.
- Écran noir à matrice de points : des points blancs ronds, bien séparés.
  L'écran affiche 10:08 et, en dessous, le mot POINT en petites capitales.
- Le mot NODAL ne doit jamais apparaître. Aucune autre marque, aucun logo.
- Fond transparent (PNG avec canal alpha), sans sol ni ombre portée.
- Format carré. La montre est entière, centrée, et occupe presque tout le cadre.
- Même angle de trois quarts que mes images de référence.

Confirme que tu as compris. Je t'envoie ensuite les images à générer.
```

---

## Bloc 2 — Mes 5 premières montres, avec le bon nom sur l'écran

Sur ton site, j'ai déjà remplacé « NODAL » par « POINT » et détouré tes images :
ce bloc sert seulement à obtenir une version plus propre et plus nette.

```text
Regénère ces montres à l'identique, en très haute définition, sur fond transparent.
Seul changement : l'écran affiche POINT au lieu de NODAL.
Génère une image à la fois.

1. carre-clair.png : ma montre carrée à boîtier translucide et bracelet blanc côtelé.
2. carre-noir.png : la même montre, boîtier fumé noir, bracelet noir côtelé, en entier.
3. octo-olive.png : ma montre octogonale fumée à bracelet nylon vert olive.
4. rond-maille.png : ma montre ronde translucide à bracelet milanais.
5. rond-cuivre.png : ma montre ronde à lunette cuivre et bracelet en titane.
```

---

## Bloc 3 — Les 2 modèles qui manquent

```text
Crée maintenant 2 nouveaux modèles de la gamme, une image à la fois, en gardant
exactement le même angle et le même éclairage que leur famille.

1. carre-cobalt.png : la montre carrée, boîtier en polycarbonate bleu translucide,
   bracelet côtelé bleu nuit.
2. octo-sable.png : la montre octogonale, boîtier fumé, bracelet en nylon tissé
   couleur sable.
```

---

## Bloc 4 — Les images de mise en scène

Elles apparaissent en petit dans la vignette de l'accueil et dans les trois
grandes cartes. Celles-ci ont un fond : c'est voulu.

```text
Pour ces images, oublie le fond transparent. Crée des photographies sombres,
très contrastées, au format 4:3, dans l'ambiance de la page de référence.
Aucun texte ajouté, aucun visage reconnaissable, aucune marque sauf POINT sur l'écran.

1. editorial-marque.png : gros plan sur l'écran à matrice de points d'une montre
   POINT carrée noire, posée sur une pierre sombre, lumière rasante.
2. editorial-gamme.png : trois montres POINT (carrée, octogonale, ronde) alignées
   sur une surface noire, éclairage latéral chaud.
3. editorial-service.png : vue d'atelier, mains gantées qui ouvrent une montre POINT
   avec un petit tournevis, outils d'horloger flous, fond très sombre.
4. carre-cobalt-scene.png : la montre Carré cobalt posée sur une pierre noire, 3:2.
5. octo-noir-scene.png : la montre Octo noire posée sur une pierre noire, 3:2.
6. octo-sable-scene.png : la montre Octo sable posée sur une pierre noire, 3:2.
7. rond-nuit-scene.png : la montre Rond nuit posée sur une pierre noire, 3:2.
```

---

## Bloc 5 — Nouvelle image de la carte « Pourquoi POINT »

Cette carte parle de la marque, pas d'un produit : l'image ne doit donc pas
montrer de montre. Enregistre-la sous `editorial-marque.png`, elle remplacera
l'actuelle.

```text
Crée une nouvelle image pour la carte « Pourquoi POINT » de mon site. Elle
présente la marque, pas un produit : aucune montre, aucun bracelet, aucun
écran, aucun objet reconnaissable.

Sujet : une photographie macro d'une plaque d'aluminium noir anodisé, percée
d'une grille parfaitement régulière de minuscules trous ronds, comme la matrice
de points d'un afficheur éteint. Les points s'estompent dans le noir vers les
bords. Un seul point est allumé, en orange vif, légèrement à droite du centre
et au-dessus du milieu de l'image. Il diffuse une petite lueur chaude sur les
points voisins. C'est le seul élément de couleur de l'image.

Style : photo de produit de studio, très sombre et très contrastée, lumière
rasante chaude venue du coin supérieur gauche, faible profondeur de champ,
même ambiance que mes autres images.

Contraintes : format 4:3, aucun texte, aucune lettre, aucun chiffre, aucun logo.
Garde tout le quart inférieur très sombre et sans détail, car j'y place du texte.
```

---

## Si le rendu ne va pas

- **Les points de l'écran sont flous ou forment un vrai écran** : « l'écran doit être
  une grille de points ronds séparés, chaque point visible individuellement ».
- **Le fond n'est pas transparent** : garde l'image et dis-le-moi, je la détoure.
- **NODAL revient sur l'écran** : « remplace ce mot par POINT, sans rien changer d'autre ».
- **La montre change de forme** : « garde exactement la même montre que l'image
  précédente, même angle, même éclairage, seule la couleur change ».

## Noms attendus au final

| Dossier `public/images/` | Rôle |
| --- | --- |
| `carre-clair.webp`, `carre-noir.webp`, `carre-cobalt.webp`, `octo-olive.webp`, `octo-orange.webp`, `octo-noir.webp`, `octo-sable.webp`, `rond-maille.webp`, `rond-cuivre.webp`, `rond-nuit.webp`, `rond-orbite.webp`, `ligne-cobalt.webp`, `ligne-cristal.webp` | Les 13 montres, déjà en place |
| `editorial-marque.webp`, `editorial-gamme.webp`, `editorial-service.webp` | Les 3 cartes de l'accueil |
| `carre-cobalt-scene.webp`, `octo-noir-scene.webp`, `octo-sable-scene.webp`, `rond-nuit-scene.webp` | Vignette de l'accueil, facultatif |
