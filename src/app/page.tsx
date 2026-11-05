import Footer from "@/components/Footer";
import HomeHero from "@/components/HomeHero";
import HomeStories from "@/components/HomeStories";
import { VEDETTE } from "@/content/catalogue";
import { editorialImage, shopModels } from "@/lib/catalogue.server";

export default function Home() {
  const models = shopModels()
    .filter((model) => model.ready)
    .sort((a, b) => Number(b.slug === VEDETTE) - Number(a.slug === VEDETTE));

  return (
    <>
      <HomeHero models={models}>
        <HomeStories
          images={{
            why: editorialImage("editorial-marque.webp", "carre-noir-scene.webp"),
            range: editorialImage("editorial-gamme.webp", "rond-cuivre-scene.webp"),
            service: editorialImage("editorial-service.webp", "octo-olive-scene.webp"),
          }}
        />
      </HomeHero>
      <Footer />
    </>
  );
}
