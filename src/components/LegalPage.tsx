import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Surface } from "@/components/Shared";

/** Gabarit commun des pages d'information. */
export default function LegalPage({
  title,
  active,
  children,
}: {
  title: string;
  active?: "garantie" | "marque";
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative overflow-hidden">
        <Surface />
        <div className="relative">
          <Header active={active} />
          <main className="pad pt-10 pb-16">
            <h1 className="matrix max-w-[16ch] text-[clamp(2.25rem,4.5vw,3.75rem)]">
              {title}
            </h1>
            <div className="mt-10 max-w-3xl space-y-10">{children}</div>
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
      <div className="copy mt-2 space-y-3">{children}</div>
    </section>
  );
}

export function GuaranteeBox({ lines }: { lines: readonly string[] }) {
  return (
    <div className="space-y-3 rounded-panel border border-line p-6 text-sm leading-relaxed text-muted">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
