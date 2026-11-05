import { ViewTransition } from "react";

/**
 * Changement de page de la maquette : la nouvelle page descend du haut de
 * l'écran en panneau arrondi par-dessus l'ancienne, qui s'assombrit. Les
 * animations sont décrites dans globals.css.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
