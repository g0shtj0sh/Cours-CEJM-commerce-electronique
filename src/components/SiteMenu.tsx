"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { CloseIcon } from "@/components/Icons";
import { Surface } from "@/components/Shared";
import Tip from "@/components/Tip";
import { vendeur } from "@/content/vendeur";

const primary = [
  { href: "/montres", label: "Montres", image: "/images/parcours-collection.webp" },
  { href: "/favoris", label: "Favoris", image: "/images/carre-noir-scene.webp" },
  { href: "/panier", label: "Panier", image: "/images/rond-cuivre-scene.webp" },
  { href: "/garantie", label: "Garantie", image: "/images/editorial-service.webp" },
  { href: "/marque", label: "La marque", image: "/images/editorial-marque.webp" },
];

const secondary = [
  { href: "/", label: "Accueil" },
  { href: "/cgv", label: "Conditions de vente" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

/**
 * Menu plein écran. Un point orange, le signe de la marque, se place devant
 * le lien survolé, et l'image à droite change avec lui.
 */
export default function SiteMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <Tip label="Menu">
        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex"
        >
          <span className="flex h-5 w-5 flex-col justify-center gap-1.5" aria-hidden>
            <span className="h-px bg-ink" />
            <span className="h-px bg-ink" />
            <span className="h-px bg-ink" />
          </span>
        </button>
      </Tip>

      {open
        ? createPortal(
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu du site"
              data-lenis-prevent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70] overflow-y-auto bg-night"
            >
              <Surface />
              <div className="pad relative flex min-h-full flex-col pt-8 pb-8 lg:pt-11">
                <div className="flex items-center justify-between">
                  <Link href="/" onClick={close} className="matrix flex items-start text-[1.75rem]">
                    POINT
                    <span className="mt-0.5 ml-0.5 font-sans text-[0.625rem] font-semibold">®</span>
                  </Link>
                  <button
                    ref={closeButton}
                    type="button"
                    aria-label="Fermer le menu"
                    onClick={close}
                    className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="my-auto grid items-center gap-10 py-10 lg:grid-cols-2">
                  <nav aria-label="Menu principal">
                    <ul className="space-y-3 lg:space-y-4">
                      {primary.map((item, index) => (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.28, delay: 0.04 + index * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            onClick={close}
                            onMouseEnter={() => setActive(index)}
                            onFocus={() => setActive(index)}
                            className="flex items-center gap-4"
                          >
                            <span
                              aria-hidden
                              className={[
                                "size-3 rounded-full bg-[#ff8a3d] transition-all duration-200",
                                active === index ? "opacity-100" : "scale-50 opacity-0",
                              ].join(" ")}
                            />
                            <span
                              className={[
                                "matrix text-[clamp(2.5rem,6vw,5rem)] transition-colors duration-200",
                                active === index ? "text-ink" : "text-dim",
                              ].join(" ")}
                            >
                              {item.label}
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  <div className="relative hidden aspect-[4/3] overflow-hidden rounded-panel bg-card lg:block">
                    {primary.map((item, index) => (
                      <Image
                        key={item.href}
                        src={item.image}
                        alt=""
                        fill
                        decoding="sync"
                        sizes="45vw"
                        className={[
                          "object-cover transition-opacity duration-300",
                          active === index ? "opacity-100" : "opacity-0",
                        ].join(" ")}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-5">
                  <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {secondary.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} onClick={close} className="label text-muted hover:text-ink">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <a href={`tel:${vendeur.telephoneLien}`} className="label text-muted hover:text-ink">
                    Service client {vendeur.telephone}
                  </a>
                </div>
              </div>
            </motion.div>,
            document.body,
          )
        : null}
    </>
  );
}
