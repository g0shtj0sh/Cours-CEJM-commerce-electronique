"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { euros, product } from "@/content/product";
import { useFinish } from "@/components/FinishContext";
import FinishPicker from "@/components/FinishPicker";

const ProductStage = dynamic(() => import("@/components/three/ProductStage"), {
  ssr: false,
});
const ModelProgress = dynamic(
  () => import("@/components/three/ProductStage").then((m) => m.ModelProgress),
  { ssr: false },
);

/**
 * Une lettre du wordmark. Au chargement, elle passe de la largeur la plus
 * étroite de la police à la plus large : le mot s'ouvre jusqu'aux marges.
 * C'est le seul mouvement non déclenché de la page.
 */
function Letter({
  char,
  index,
  still,
}: {
  char: string;
  index: number;
  still: boolean;
}) {
  const width = useMotionValue(still ? 125 : 62);
  const settings = useMotionTemplate`"wdth" ${width}`;

  useEffect(() => {
    if (still) return;
    const controls = animate(width, 125, {
      duration: 1.2,
      delay: 0.15 + index * 0.07,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [index, still, width]);

  return (
    <motion.span
      aria-hidden
      className="inline-block"
      style={{ fontVariationSettings: settings }}
    >
      {char}
    </motion.span>
  );
}

export default function Hero() {
  const { finish } = useFinish();
  const still = useReducedMotion() ?? false;

  return (
    <section id="produit" className="rule-b pt-24 pb-0">
      <div className="shell">
        <h1 className="d-xl">
          <span className="sr-only">{product.name}</span>
          <span
            aria-hidden
            className="flex justify-between leading-none select-none"
          >
            {product.wordmark.map((char, index) => (
              <Letter key={index} char={char} index={index} still={still} />
            ))}
          </span>
        </h1>

        {/* Le produit chevauche le bas du wordmark : la profondeur vient de
            ce recouvrement, pas d'une ombre portée. */}
        <div className="relative -mt-[13vw] h-[min(58vh,30rem)] md:-mt-[11vw] md:h-[min(68vh,38rem)]">
          <ProductStage
            finish={finish}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          />
        </div>

        <div className="flex items-end justify-between gap-6 pb-3">
          <p className="t-data text-ink-soft">
            Réf. {product.reference} — glissez sur l&apos;objet pour le tourner
          </p>
          <div className="hidden w-48 sm:block">
            <ModelProgress />
          </div>
        </div>
      </div>

      <div className="rule-t">
        <div className="shell grid gap-y-8 py-8 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-5">
            <p className="body-l">{product.tagline}</p>
          </div>

          <div className="md:col-span-4 md:hair-l md:pl-8">
            <FinishPicker />
          </div>

          <div className="md:col-span-3 md:hair-l md:pl-8">
            <p className="d-m">{euros(product.priceCents)}</p>
            <p className="t-data mt-1 text-ink-soft">
              toutes taxes comprises, livraison offerte
            </p>
            <a
              href="#commander"
              className="mt-4 inline-block border border-ink bg-ink px-5 py-2.5 text-alu-hi transition-colors hover:bg-blue"
            >
              Commander
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
