"use client";

import { useEffect, useRef } from "react";
import { scramble, whenReady, type ScrambleOptions } from "@/lib/scramble";

/**
 * Texte qui se déchiffre à son arrivée. Le texte complet est dans la page dès le
 * départ : l'effet ne change que son affichage, pendant moins d'une seconde.
 * `onView` attend que le texte entre à l'écran, pour les titres plus bas dans la page.
 */
export default function DotText({
  text,
  as = "span",
  className,
  onView,
  hover,
  ...options
}: {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  onView?: boolean;
  /** Rejoue l'effet au survol. */
  hover?: boolean;
} & ScrambleOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const { delay, duration, digits } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let stop = () => {};
    const play = () => {
      stop = scramble(element, text, { delay, duration, digits });
    };

    let observer: IntersectionObserver | undefined;
    const cancelReady = whenReady(() => {
      if (!onView) {
        play();
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          play();
        },
        { threshold: 0.6 },
      );
      observer.observe(element);
    });

    return () => {
      cancelReady();
      observer?.disconnect();
      stop();
    };
  }, [text, onView, delay, duration, digits]);

  // Les balises possibles acceptent toutes la même référence.
  const Tag = as as "span";
  return (
    <Tag ref={ref} className={className} data-scramble={hover ? "" : undefined}>
      {text}
    </Tag>
  );
}
