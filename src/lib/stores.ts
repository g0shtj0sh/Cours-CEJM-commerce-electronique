"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Panier et favoris, gardés dans le navigateur (localStorage) : c'est du
 * stockage fonctionnel, rien n'est envoyé à un serveur.
 */
function createStore(key: string) {
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((listener) => listener());

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      window.addEventListener("storage", listener);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
      };
    },
    read: () => window.localStorage.getItem(key) ?? "[]",
    write(value: string) {
      window.localStorage.setItem(key, value);
      emit();
    },
  };
}

const serverSnapshot = () => "[]";

function useList<T>(store: ReturnType<typeof createStore>): T[] {
  const raw = useSyncExternalStore(store.subscribe, store.read, serverSnapshot);
  return useMemo(() => JSON.parse(raw) as T[], [raw]);
}

export type CartLine = { id: string; slug: string; strapSize: string };

const cartStore = createStore("point:panier");
const favoritesStore = createStore("point:favoris");

export function useCart() {
  const lines = useList<CartLine>(cartStore);
  return useMemo(
    () => ({
      lines,
      add(slug: string, strapSize: string) {
        const line = { id: crypto.randomUUID(), slug, strapSize };
        cartStore.write(JSON.stringify([...lines, line]));
      },
      remove(id: string) {
        cartStore.write(JSON.stringify(lines.filter((line) => line.id !== id)));
      },
      setStrapSize(id: string, strapSize: string) {
        cartStore.write(
          JSON.stringify(
            lines.map((line) => (line.id === id ? { ...line, strapSize } : line)),
          ),
        );
      },
      clear() {
        cartStore.write("[]");
      },
    }),
    [lines],
  );
}

export function useFavorites() {
  const slugs = useList<string>(favoritesStore);
  return useMemo(
    () => ({
      slugs,
      toggle(slug: string) {
        const next = slugs.includes(slug)
          ? slugs.filter((item) => item !== slug)
          : [...slugs, slug];
        favoritesStore.write(JSON.stringify(next));
      },
    }),
    [slugs],
  );
}
