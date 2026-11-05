const LETTERS = "ABCDEFGHIJKLMNOPRSTUVXYZ0123456789";
const DIGITS = "0123456789";

/** Vitesse du défilement des caractères : assez lente pour rester lisible comme un effet. */
const STEP_MS = 48;

export type ScrambleOptions = {
  duration?: number;
  delay?: number;
  /** Ne brouille que les chiffres : pour un prix, dont le reste du texte ne doit pas bouger. */
  digits?: boolean;
};

/**
 * Fait « déchiffrer » un texte : chaque caractère défile au hasard, puis se fixe
 * sur le bon, de gauche à droite. Le texte final est toujours rétabli à la fin
 * et l'effet est ignoré si la personne a demandé moins d'animations.
 * Renvoie de quoi interrompre l'effet.
 */
export function scramble(
  element: HTMLElement,
  text: string,
  { duration = 760, delay = 0, digits = false }: ScrambleOptions = {},
) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const pool = digits ? DIGITS : LETTERS;
  const chars = [...text];
  const moving = (char: string) => (digits ? /[0-9]/.test(char) : /[\p{L}\p{N}]/u.test(char));
  const locks = chars.map(
    (_, index) => (index / chars.length) * duration * 0.72 + Math.random() * duration * 0.28,
  );

  const start = performance.now() + delay;
  let lastStep = 0;
  let frame = 0;

  const tick = (now: number) => {
    const elapsed = now - start;
    if (elapsed >= duration) {
      element.textContent = text;
      return;
    }
    if (now - lastStep >= STEP_MS) {
      lastStep = now;
      element.textContent = chars
        .map((char, index) =>
          moving(char) && elapsed < locks[index]
            ? pool[Math.floor(Math.random() * pool.length)]
            : char,
        )
        .join("");
    }
    frame = requestAnimationFrame(tick);
  };

  frame = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(frame);
    element.textContent = text;
  };
}

/** Attend la fin de l'animation d'ouverture avant d'exécuter `run`. */
export function whenReady(run: () => void) {
  if (document.documentElement.dataset.ready !== undefined) {
    run();
    return () => {};
  }
  window.addEventListener("point:ready", run, { once: true });
  return () => window.removeEventListener("point:ready", run);
}
