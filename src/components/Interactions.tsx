"use client";

import { useEffect } from "react";
import { scramble } from "@/lib/scramble";

/** Inclinaison maximale d'une carte, en degrés, et déplacement de la montre, en pixels. */
const TILT = 3.5;
const DRIFT = 14;

/**
 * Tout ce qui répond à la souris, réuni ici : la lumière et l'inclinaison des
 * cartes de montres, la montre qui réagit, les titres qui se déchiffrent au
 * survol. Rien ne se lance au tactile ni si la personne a demandé moins
 * d'animations.
 */
export default function Interactions() {
  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!pointer.matches || reduce.matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const stage = { x: 0, y: 0 };
    let card: HTMLElement | null = null;
    let cardEvent: PointerEvent | null = null;
    let frame = 0;

    const leaveCard = () => {
      card?.style.removeProperty("--rx");
      card?.style.removeProperty("--ry");
      card = null;
    };

    const loop = () => {
      const stageX = (target.x / window.innerWidth - 0.5) * DRIFT;
      const stageY = (target.y / window.innerHeight - 0.5) * DRIFT;
      stage.x += (stageX - stage.x) * 0.06;
      stage.y += (stageY - stage.y) * 0.06;
      document.querySelectorAll<HTMLElement>(".parallax").forEach((element) => {
        element.style.transform = `translate3d(${stage.x}px, ${stage.y}px, 0)`;
      });

      if (card && cardEvent) {
        const box = card.getBoundingClientRect();
        const x = cardEvent.clientX - box.left;
        const y = cardEvent.clientY - box.top;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
        card.style.setProperty("--ry", `${(x / box.width - 0.5) * TILT * 2}deg`);
        card.style.setProperty("--rx", `${(0.5 - y / box.height) * TILT * 2}deg`);
      }
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const element = event.target as Element | null;
      const next = element?.closest?.<HTMLElement>("a.card") ?? null;
      if (next !== card) {
        leaveCard();
        card = next;
      }
      cardEvent = event;
    };

    // Un titre ne repart pas tant que son effet est en cours.
    const running = new WeakSet<HTMLElement>();
    const onOver = (event: PointerEvent) => {
      const element = (event.target as Element | null)?.closest?.<HTMLElement>("[data-scramble]");
      if (!element || running.has(element) || !element.textContent) return;
      running.add(element);
      const text = element.textContent;
      scramble(element, text, { duration: 460 });
      window.setTimeout(() => running.delete(element), 520);
    };

    frame = requestAnimationFrame(loop);
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  return null;
}
