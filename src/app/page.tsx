import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { VEDETTE } from "@/content/catalogue";
import HomeHero from "@/components/HomeHero";
import { editorialImage, shopModels } from "@/lib/catalogue.server";

export default function Home() {
  const models = shopModels()
    .filter((model) => model.ready)
    .sort((a, b) => Number(b.slug === VEDETTE) - Number(a.slug === VEDETTE));

  const stories = [
    {
      href: "/marque",
      title: "Pourquoi POINT",
      text: "Une marque, un brevet et cinq formes déposées.",
      image: editorialImage("editorial-marque.webp", "carre-noir-scene.webp"),
    },
    {
      href: "/montres",
      title: "La gamme",
      text: "Carré, Octo, Rond, Ligne et Parcours, en séries limitées.",
      image: editorialImage("editorial-gamme.webp", "rond-cuivre-scene.webp"),
    },
    {
      href: "/garantie",
      title: "Garantie & service",
      text: "Trois ans de garantie et 14 jours pour changer d'avis.",
      image: editorialImage("editorial-service.webp", "octo-olive-scene.webp"),
    },
  ];

  return (
    <>
      <HomeHero models={models}>
        <section aria-label="À découvrir" className="pad grid gap-6 pb-14 md:grid-cols-3">
          {stories.map((story) => (
            <Link
              key={story.href}
              href={story.href}
              className="group relative block aspect-[4/3] overflow-hidden rounded-panel bg-card"
            >
              <Image
                src={story.image}
                alt=""
                fill
                decoding="sync"
                sizes="(min-width: 768px) 30vw, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <span className="absolute inset-x-6 bottom-5 block">
                <span className="label block">{story.title}</span>
                <span className="mt-1 block text-sm text-ink/75">{story.text}</span>
              </span>
            </Link>
          ))}
        </section>
      </HomeHero>
      <Footer />
    </>
  );
}
