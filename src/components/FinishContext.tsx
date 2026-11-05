"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { product, type Finish } from "@/content/product";

type FinishState = {
  finish: Finish;
  setFinishId: (id: string) => void;
};

const FinishContext = createContext<FinishState | null>(null);

/**
 * La finition choisie est partagée par le hero, le panneau nocturne et le
 * bloc de commande : changer de coloris met les trois à jour.
 */
export function FinishProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<string>(product.finishes[1].id);

  const value = useMemo<FinishState>(() => {
    const finish =
      product.finishes.find((f) => f.id === id) ?? product.finishes[1];
    return { finish, setFinishId: setId };
  }, [id]);

  return (
    <FinishContext.Provider value={value}>{children}</FinishContext.Provider>
  );
}

export function useFinish(): FinishState {
  const value = useContext(FinishContext);
  if (!value) throw new Error("useFinish doit être utilisé dans FinishProvider");
  return value;
}
