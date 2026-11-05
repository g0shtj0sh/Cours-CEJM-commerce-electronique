"use client";

import { useEffect } from "react";
import { scramble } from "@/lib/scramble";

/** Inclinaison maximale d'une carte, en degrés, et déplacement de la montre, en pixels. */
const TILT = 3.5;
const DRIFT = 14;

/**
 * Tout ce qui répond à la souris, réuni ici : le halo du fond, la lumière et
 * l'inclinaison des cartes, la montre qui réagit, les titres qui se déchiffrent
 * au survol. Rien ne se lance au tactile ni si la personne a demandé moins
 * d'animations.
 */
export default function Interactions() {
  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!pointer.matches || reduce.matches) return;

    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const stage = { x: 0, y: 0 };
    let card: HTMLElement | null = null;
    let cardEvent: PointerEvent | null = null;
    let frame = 0;
    let seen = false;

    const leaveCard = () => {
      card?.style.removeProperty("--rx");
      card?.style.removeProperty("--ry");
      card = null;
    };

    const loop = () => {
      eased.x += (target.x - eased.x) * 0.2;
      eased.y += (target.y - eased.y) * 0.2;
      // Le halo vit dans le fond de chaque page : il reste derrière le contenu.
      document.querySelectorAll<HTMLElement>(".cursor-glow").forEach((element) => {
        const box = element.parentElement?.getBoundingClientRect();
        if (!box) return;
        element.style.transform = `translate3d(${eased.x - box.left}px, ${eased.y - box.top}px, 0)`;
      });

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
      if (!seen) {
        seen = true;
        eased.x = target.x;
        eased.y = target.y;
        document.documentElement.dataset.pointer = "";
      }
      const element = event.target as Element | null;
      const next = element?.closest?.<HTMLElement>(".card") ?? null;
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

    const onLeave = () => delete document.documentElement.dataset.pointer;
    const onEnter = () => {
      if (seen) document.documentElement.dataset.pointer = "";
    };

    frame = requestAnimationFrame(loop);
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return null;
}
