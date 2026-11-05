"use client";

import { useEffect, useState } from "react";

const ticks = Array.from({ length: 60 }, (_, index) => index);

/** Durée d'affichage du cadran. À garder alignée sur .intro-hand dans globals.css. */
const HOLD_MS = 1500;

/**
 * Cadran joué à chaque chargement ou rechargement de page. Il disparaît par
 * minuteur, jamais par une animation : un navigateur qui met les animations
 * en pause ne peut donc pas laisser la page masquée. Placé dans le layout, il
 * ne se rejoue pas lors des navigations internes.
 */
export default function IntroDial() {
  const [phase, setPhase] = useState<"shown" | "leaving" | "gone">("shown");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduced ? 0 : HOLD_MS;
    const leave = window.setTimeout(() => {
      setPhase("leaving");
      // Le contenu de la page peut maintenant faire son entrée.
      document.documentElement.dataset.ready = "";
    }, hold);
    const gone = window.setTimeout(() => setPhase("gone"), hold + 350);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(gone);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className="intro transition-opacity duration-300"
      style={{ opacity: phase === "leaving" ? 0 : 1 }}
    >
      <svg viewBox="0 0 200 200" className="size-52">
        {ticks.map((tick) => (
          <circle
            key={tick}
            cx="100"
            cy="14"
            r={tick % 5 === 0 ? 1.8 : 0.9}
            fill="#f6f3f0"
            opacity={tick % 5 === 0 ? 0.9 : 0.4}
            transform={`rotate(${tick * 6} 100 100)`}
          />
        ))}
        <g className="intro-hand">
          <line x1="100" y1="116" x2="100" y2="30" stroke="#dca681" strokeWidth="1.6" />
          <circle cx="100" cy="100" r="3.5" fill="#dca681" />
        </g>
      </svg>
    </div>
  );
}
