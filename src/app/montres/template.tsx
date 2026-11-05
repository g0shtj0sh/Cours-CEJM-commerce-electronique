import PageTransition from "@/components/PageTransition";

/** Le gabarit racine ne change pas entre /montres et une fiche : celui-ci prend le relais. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
