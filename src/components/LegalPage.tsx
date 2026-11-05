"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Surface } from "@/components/Shared";
import { useT } from "@/lib/settings";

/**
 * Gabarit des pages d'information. Le texte se répartit en colonnes pour
 * occuper toute la largeur ; `wide` reçoit les blocs à afficher en pleine
 * largeur en dessous, et `columns={false}` laisse la page gérer sa mise en page.
 */
export default function LegalPage({
  title,
  active,
  columns = true,
  wide,
  children,
}: {
  title: string;
  active?: "garantie" | "marque";
  columns?: boolean;
  wide?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative overflow-hidden">
        <Surface />
        <div className="relative">
          <Header active={active} />
          <main className="pad rise pt-10 pb-16">
            <h1 className="matrix text-[clamp(2.25rem,4.5vw,3.75rem)]">{title}</h1>
            {columns ? (
              <div className="mt-10 lg:columns-2 lg:gap-14 2xl:columns-3 [&>*]:mb-10 [&>*]:break-inside-avoid">
                {children}
              </div>
            ) : (
              <div className="mt-10 space-y-10">{children}</div>
            )}
            {wide}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="copy mt-2 max-w-none space-y-3 break-words">{children}</div>
    </section>
  );
}

export function GuaranteeBox({ lines }: { lines: readonly string[] }) {
  const t = useT();
  return (
    <section className="rounded-panel border border-line p-5 lg:p-8">
      <h2 className="text-lg font-semibold">{t.pages.legalGuarantees}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted lg:columns-2 lg:gap-12 2xl:columns-3">
        {lines.map((line) => (
          <p key={line} className="mb-3 break-inside-avoid">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
