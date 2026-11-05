"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { CloseIcon } from "@/components/Icons";
import { SettingsToggles } from "@/components/Settings";
import { Surface } from "@/components/Shared";
import Tip from "@/components/Tip";
import { vendeur } from "@/content/vendeur";
import { useT } from "@/lib/settings";

/**
 * Menu plein écran. Un point orange, le signe de la marque, se place devant
 * le lien survolé, et l'image à droite change avec lui.
 */
export default function SiteMenu() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const closeButton = useRef<HTMLButtonElement>(null);

  const primary = [
    { href: "/montres", label: t.menu.watches, image: "/images/parcours-collection.webp" },
    { href: "/favoris", label: t.menu.favorites, image: "/images/carre-noir-scene.webp" },
    { href: "/panier", label: t.menu.cart, image: "/images/rond-cuivre-scene.webp" },
    { href: "/garantie", label: t.menu.warranty, image: "/images/editorial-service.webp" },
    { href: "/marque", label: t.menu.brand, image: "/images/editorial-marque.webp" },
  ];

  const secondary = [
    { href: "/", label: t.menu.home },
    { href: "/cgv", label: t.menu.terms },
    { href: "/mentions-legales", label: t.menu.legal },
  ];

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
      <Tip label={t.menu.tip}>
        <button
          type="button"
          aria-label={t.menu.open}
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
              aria-label={t.menu.dialog}
              data-lenis-prevent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70] overflow-y-auto bg-night"
            >
              <Surface />
              <div className="pad relative flex min-h-full flex-col pt-6 pb-6 lg:pt-11 lg:pb-8">
                <div className="flex items-center justify-between">
                  <Link href="/" onClick={close} className="matrix flex items-start text-[1.75rem]">
                    POINT
                    <span className="mt-0.5 ml-0.5 font-sans text-[0.625rem] font-semibold">®</span>
                  </Link>
                  <button
                    ref={closeButton}
                    type="button"
                    aria-label={t.menu.close}
                    onClick={close}
                    className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="my-auto grid items-center gap-10 py-6 lg:grid-cols-2 lg:py-10">
                  <nav aria-label={t.menu.main}>
                    <ul className="space-y-2 lg:space-y-4">
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
                            className="flex items-center gap-3 lg:gap-4"
                          >
                            <span
                              aria-hidden
                              className={[
                                "size-3 shrink-0 rounded-full bg-[#ff8a3d] transition-[opacity,transform] duration-200",
                                active === index ? "opacity-100" : "scale-50 opacity-0",
                              ].join(" ")}
                            />
                            <span
                              className={[
                                "matrix text-[clamp(2.25rem,min(6vw,9vh),5rem)] transition-colors duration-200",
                                active === index ? "text-ink" : "text-muted",
                              ].join(" ")}
                            >
                              {item.label}
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  <div className="relative hidden aspect-[4/3] max-h-[60vh] overflow-hidden rounded-panel bg-card lg:block">
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

                <div className="space-y-4 border-t border-line pt-5">
                  <SettingsToggles />
                  <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
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
                      {t.menu.support} {vendeur.telephone}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>,
            document.body,
          )
        : null}
    </>
  );
}
