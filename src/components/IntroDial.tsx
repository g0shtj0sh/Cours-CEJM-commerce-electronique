"use client";

import { useEffect, useState } from "react";

/** Temps avant que le panneau ne se lève, compté depuis l'ouverture de la page. */
const HOLD_MS = 820;
const LEAVE_MS = 440;

const LETTERS = [
  ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  ["10001", "11001", "10101", "10101", "10011", "10001", "10001"],
  ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
];

const COLUMNS = 29;
const ROWS = 7;

/** La matrice complète : les points du mot POINT sont marqués pour s'allumer. */
const dots = Array.from({ length: ROWS * COLUMNS }, (_, index) => {
  const row = Math.floor(index / COLUMNS);
  const column = index % COLUMNS;
  const letter = LETTERS[Math.floor(column / 6)];
  const lit = column % 6 !== 5 && letter[row][column % 6] === "1";
  return { row, column, lit };
});

/**
 * Ouverture du site, à chaque chargement : un point orange traverse la matrice
 * et allume POINT sur son passage, puis l'écran se lève en panneau, comme lors
 * d'un changement de page. Il disparaît par minuteur, jamais par une animation :
 * un navigateur qui les met en pause ne peut pas laisser la page masquée.
 */
export default function IntroDial() {
  const [phase, setPhase] = useState<"shown" | "leaving" | "gone">("shown");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Compté depuis l'ouverture : la durée ne dépend pas du temps de chargement du script.
    const hold = reduced ? 0 : Math.max(120, HOLD_MS - performance.now());
    const leave = window.setTimeout(() => {
      setPhase("leaving");
      // Le contenu de la page peut maintenant faire son entrée.
      document.documentElement.dataset.ready = "";
      window.dispatchEvent(new Event("point:ready"));
    }, hold);
    const gone = window.setTimeout(() => setPhase("gone"), hold + LEAVE_MS);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(gone);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div aria-hidden className="intro" data-leaving={phase === "leaving" ? "" : undefined}>
      <svg viewBox="-1 -1 31 9" className="intro-matrix">
        {dots.map(({ row, column, lit }) => (
          <circle
            key={`${row}-${column}`}
            cx={column}
            cy={row}
            r={lit ? 0.4 : 0.16}
            className={lit ? "intro-lit" : "intro-idle"}
            style={lit ? { animationDelay: `${column * 17 + (row % 3) * 8}ms` } : undefined}
          />
        ))}
        <circle cx="0" cy="3" r="0.55" className="intro-spark" />
      </svg>
    </div>
  );
}
