"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { USD_RATE, money, type Lang } from "@/content/catalogue";
import { dictionary } from "@/content/i18n";

export type Currency = "EUR" | "USD";
type Settings = { lang: Lang; currency: Currency };

const KEY = "point:reglages";
const DEFAULTS = "fr|EUR";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function write(value: string) {
  window.localStorage.setItem(KEY, value);
  listeners.forEach((listener) => listener());
}

/** Langue et devise, gardées dans le navigateur. Français et euros par défaut. */
export function useSettings() {
  const raw = useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(KEY) ?? DEFAULTS,
    () => DEFAULTS,
  );
  return useMemo(() => {
    const [lang, currency] = raw.split("|") as [Lang, Currency];
    const settings: Settings = { lang, currency };
    return {
      ...settings,
      setLang: (next: Lang) => write(`${next}|${currency}`),
      setCurrency: (next: Currency) => write(`${lang}|${next}`),
    };
  }, [raw]);
}

/** Textes de l'interface dans la langue choisie. */
export function useT() {
  const { lang } = useSettings();
  return dictionary[lang];
}

/**
 * Le prix en dollars est indicatif : seul le prix en euros est facturé, c'est
 * donc lui qui reste affiché dans le récapitulatif et au paiement.
 */
export function usePrice() {
  const { lang, currency } = useSettings();
  return useMemo(() => {
    const eur = (cents: number) => money(cents, "EUR", lang);
    const usd = (cents: number) => money(Math.round(cents * USD_RATE), "USD", lang);
    return { currency, eur, usd, isUsd: currency === "USD" };
  }, [lang, currency]);
}

/** Tient à jour la langue déclarée par la page, pour les lecteurs d'écran. */
export function LangSync() {
  const { lang } = useSettings();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
