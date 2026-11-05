import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import ProductView from "@/components/ProductView";
import { accroche, euros } from "@/content/catalogue";
import { shopModels } from "@/lib/catalogue.server";

/** Page générée d'avance pour chaque modèle : pas d'état de chargement. */
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

function readyModels() {
  return shopModels().filter((model) => model.ready);
}

export function generateStaticParams() {
  return readyModels().map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const model = readyModels().find((item) => item.slug === slug);
  if (!model) return {};
  const title = `${model.name} | POINT`;
  const description = `${accroche(model, "fr")}. ${euros(model.priceCents)} TTC, livraison incluse.`;
  const images = [{ url: `/images/${model.slug}.webp`, alt: `Montre ${model.name}` }];
  return {
    title: model.name,
    description,
    openGraph: { title, description, images, siteName: "POINT", locale: "fr_FR", type: "website" },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function ModelPage({ params }: Props) {
  const { slug } = await params;
  const models = readyModels();
  const model = models.find((item) => item.slug === slug);
  if (!model) notFound();

  return (
    <>
      <ProductView model={model} models={models} />
      <Footer />
    </>
  );
}
