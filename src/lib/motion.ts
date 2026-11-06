/** Courbe commune aux animations : départ franc, arrivée très douce. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

let clearTimer: number | undefined;

/**
 * Le panneau qui descend convient aux pages nouvelles. Un retour arrière se fait
 * en fondu : `data-nav`, lu par globals.css, choisit l'animation pendant le temps
 * de la transition.
 */
export function markBackNavigation() {
  const html = document.documentElement;
  html.dataset.nav = "back";
  window.clearTimeout(clearTimer);
  clearTimer = window.setTimeout(() => {
    delete html.dataset.nav;
  }, 900);
}

/** Met à jour l'adresse et l'onglet sans changer de page : le retour mène à la page d'avant. */
export function showVariantInAddress({ slug, name }: { slug: string; name: string }) {
  window.history.replaceState(null, "", `/montres/${slug}`);
  document.title = `${name} | POINT`;
}
