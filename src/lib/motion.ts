/** Courbe commune aux animations : départ franc, arrivée très douce. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

let clearTimer: number | undefined;

/**
 * Le panneau qui descend convient aux pages nouvelles. Un retour arrière ou un
 * changement de variante se fait en fondu : `data-nav`, lu par globals.css,
 * choisit l'animation pendant le temps de la transition.
 */
export function markNavigation(kind: "back" | "variant") {
  const html = document.documentElement;
  html.dataset.nav = kind;
  window.clearTimeout(clearTimer);
  clearTimer = window.setTimeout(() => {
    delete html.dataset.nav;
  }, 900);
}
